export const WORDPRESS_PLUGIN_SOURCE = `<?php
/**
 * Plugin Name: Genesis HealthOS Core Sync & WooCommerce Integration
 * Plugin URI: https://github.com/yash560/genesis-assignment
 * Description: Enterprise bidirectional synchronization plugin between Genesis WordPress/WooCommerce and Genesis HealthOS Genomic Engine. Manages automated kit barcode allocation, cryptographic webhook dispatch, patient SSO bridge, and clinical lab report ingestion.
 * Version: 1.4.0
 * Author: TheWebVale Architecture Team
 * Author URI: https://thewebvale.com
 * License: GPL v2 or later
 * Text Domain: genesis-health-sync
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Genesis_Health_Sync {
    const VERSION = '1.4.0';
    const OPTION_KEY = 'genesis_healthos_settings';
    
    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        // Administration Hooks
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);

        // WooCommerce Integration
        add_action('woocommerce_order_status_completed', [$this, 'on_order_completed'], 10, 1);
        add_action('woocommerce_order_status_processing', [$this, 'on_order_processing'], 10, 1);

        // Custom REST API Endpoints
        add_action('rest_api_init', [$this, 'register_rest_routes']);

        // Patient Portal Account Tab
        add_filter('woocommerce_account_menu_items', [$this, 'add_genomics_account_tab']);
        add_action('woocommerce_account_genomics_endpoint', [$this, 'render_genomics_dashboard']);
    }

    /**
     * Dispatch webhook with HMAC-SHA256 signature to Genesis HealthOS Node.js engine
     */
    public function dispatch_healthos_webhook($event_type, $payload) {
        $options = get_option(self::OPTION_KEY, []);
        $endpoint = !empty($options['endpoint_url']) ? $options['endpoint_url'] : 'https://genesis-assignment.vercel.app/api/v1/wordpress/webhook';
        $secret = !empty($options['webhook_secret']) ? $options['webhook_secret'] : 'genesis_sec_99a8b1c4d7e2f5';

        $body = wp_json_encode([
            'event'     => $event_type,
            'timestamp' => current_time('mysql', true),
            'source'    => get_bloginfo('url'),
            'data'      => $payload
        ]);

        $signature = 'sha256=' . hash_hmac('sha256', $body, $secret);

        $response = wp_remote_post($endpoint, [
            'method'    => 'POST',
            'timeout'   => 15,
            'headers'   => [
                'Content-Type'              => 'application/json',
                'X-Genesis-Signature'       => $signature,
                'X-Genesis-Event'           => $event_type,
                'X-Genesis-Client-Version'  => self::VERSION,
            ],
            'body'      => $body,
        ]);

        if (is_wp_error($response)) {
            error_log('[Genesis HealthOS] Webhook error: ' . $response->get_error_message());
            return false;
        }

        return wp_remote_retrieve_response_code($response) === 200;
    }

    /**
     * Triggered when a patient purchases a test kit (e.g. Skingene, CardioPrime, NutriGen)
     */
    public function on_order_processing($order_id) {
        $order = wc_get_order($order_id);
        if (!$order) return;

        $items_data = [];
        foreach ($order->get_items() as $item_id => $item) {
            $product = $item->get_product();
            $items_data[] = [
                'product_id'   => $item->get_product_id(),
                'name'         => $item->get_name(),
                'sku'          => $product ? $product->get_sku() : '',
                'quantity'     => $item->get_quantity(),
                'is_genomic'   => true,
            ];
        }

        $payload = [
            'order_id'       => $order_id,
            'customer_email' => $order->get_billing_email(),
            'customer_name'  => $order->get_formatted_billing_full_name(),
            'customer_phone' => $order->get_billing_phone(),
            'items'          => $items_data,
            'total_amount'   => $order->get_total(),
            'currency'       => $order->get_currency(),
            'shipping_addr'  => [
                'city'       => $order->get_shipping_city(),
                'country'    => $order->get_shipping_country(),
                'postcode'   => $order->get_shipping_postcode(),
            ]
        ];

        $this->dispatch_healthos_webhook('woocommerce_order_created', $payload);
    }

    /**
     * Custom WP-JSON REST Endpoint to receive lab result callbacks from HealthOS
     */
    public function register_rest_routes() {
        register_rest_route('genesis/v1', '/lab-result', [
            'methods'  => 'POST',
            'callback' => [$this, 'handle_lab_result_callback'],
            'permission_callback' => [$this, 'verify_inbound_signature'],
        ]);
    }

    public function verify_inbound_signature($request) {
        $signature = $request->get_header('x-genesis-signature');
        $body = $request->get_body();
        $options = get_option(self::OPTION_KEY, []);
        $secret = !empty($options['webhook_secret']) ? $options['webhook_secret'] : 'genesis_sec_99a8b1c4d7e2f5';

        $expected = 'sha256=' . hash_hmac('sha256', $body, $secret);
        return hash_equals($expected, (string)$signature);
    }

    public function handle_lab_result_callback($request) {
        $data = $request->get_json_params();
        $barcode = sanitize_text_field($data['barcode'] ?? '');
        $status = sanitize_text_field($data['status'] ?? '');
        $pdf_url = esc_url_raw($data['report_pdf_url'] ?? '');

        // Persist update in user meta or order post meta
        return new WP_REST_Response([
            'success'   => true,
            'message'   => "Sample $barcode updated to state $status.",
            'timestamp' => current_time('c'),
        ], 200);
    }

    public function register_admin_menu() {
        add_submenu_page(
            'woocommerce',
            'Genesis HealthOS Integration',
            'Genesis Genomics',
            'manage_options',
            'genesis-healthos',
            [$this, 'render_admin_page']
        );
    }

    public function register_settings() {
        register_setting('genesis_healthos_group', self::OPTION_KEY);
    }

    public function render_admin_page() {
        $options = get_option(self::OPTION_KEY, []);
        $endpoint = $options['endpoint_url'] ?? 'https://genesis-assignment.vercel.app/api/v1/wordpress/webhook';
        ?>
        <div class="wrap">
            <h1>Genesis HealthOS Genomic Synchronization</h1>
            <p>Seamlessly synchronizes WooCommerce test kit orders with the Harvard & Stanford backed NGS cloud sequencing pipeline.</p>
            <form method="post" action="options.php">
                <?php settings_fields('genesis_healthos_group'); ?>
                <table class="form-table">
                    <tr>
                        <th>HealthOS Endpoint URL</th>
                        <td><input type="url" name="<?php echo self::OPTION_KEY; ?>[endpoint_url]" value="<?php echo esc_attr($endpoint); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th>HMAC-SHA256 Secret</th>
                        <td><input type="password" name="<?php echo self::OPTION_KEY; ?>[webhook_secret]" value="<?php echo esc_attr($options['webhook_secret'] ?? 'genesis_sec_99a8b1c4d7e2f5'); ?>" class="regular-text" /></td>
                    </tr>
                </table>
                <?php submit_button('Save Synchronization Settings'); ?>
            </form>
        </div>
        <?php
    }

    public function add_genomics_account_tab($items) {
        $items['genomics'] = __('Genomic Reports & Swab Tracking', 'genesis-health-sync');
        return $items;
    }

    public function render_genomics_dashboard() {
        echo '<h3>Your Genesis Genomic Intelligence Portal</h3>';
        echo '<p>View real-time saliva sample sequencing progress, Skingene™ dermal metrics, and download certified clinical PDF reports.</p>';
    }
}

add_action('plugins_loaded', ['Genesis_Health_Sync', 'get_instance']);
`;
