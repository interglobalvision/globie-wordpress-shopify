<?php
/*
Plugin Name:  Globie Wordpress Shopify
Plugin URI:   https://github.com/interglobalvision/globie-wordpress-shopify
Description:  Shopify integration for Wordpress
Version:      1.0.0
Author:       WordPress.org
Author URI:   https://interglobal.vision/
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  igv
*/

function globie_wordpress_shopify_init() {

  add_action( 'init', 'globie_wordpress_shopify_register_post_types' );

  add_action( 'wp_enqueue_scripts', 'globie_wordpress_shopify_enqueue_scripts' );

  add_action( 'cmb2_admin_init', 'globie_wordpress_shopify_register_settings' );

  add_action( 'cmb2_init', 'globie_wordpress_shopify_register_metaboxes' );

}

function globie_wordpress_shopify_register_post_types() {

  $labels = array(
    'name' => _x( 'Products', 'product' ),
    'singular_name' => _x( 'Product', 'product' ),
    'add_new' => _x( 'Add New', 'product' ),
    'add_new_item' => _x( 'Add New Product', 'product' ),
    'edit_item' => _x( 'Edit Product', 'product' ),
    'new_item' => _x( 'New Product', 'product' ),
    'view_item' => _x( 'View Product', 'product' ),
    'search_items' => _x( 'Search Products', 'product' ),
    'not_found' => _x( 'No products found', 'product' ),
    'not_found_in_trash' => _x( 'No products found in Trash', 'product' ),
    'parent_item_colon' => _x( 'Parent Product:', 'product' ),
    'menu_name' => _x( 'Products', 'product' ),
  );

  $args = array(
    'labels' => $labels,
    'hierarchical' => false,
    'supports' => array( 'title', 'editor', 'thumbnail' ),
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 5,
    'show_in_nav_menus' => true,
    'publicly_queryable' => true,
    'exclude_from_search' => false,
    'has_archive' => 'shop',
    'query_var' => true,
    'can_export' => true,
    'rewrite' => true,
    'capability_type' => 'post'
  );

  register_post_type( 'product', $args );
}

function globie_wordpress_shopify_register_metaboxes() {
  /*if (!class_exists( 'cmb2_bootstrap_202' )) {
    return new WP_Error( 'globie_wordpress_shopify_need_cmb2', __( "globie_wordpress_shopify depends on cmb2. please require it first.", "igv" ) );
  }*/

  $prefix = '_igv_';

  // Product Metabox

  $product_options = new_cmb2_box( array(
    'id'            => 'product_meta',
    'title'         => __( 'Product Information', 'igv' ),
    'object_types'  => array( 'product', ), // Post type
    'context'       => 'normal',
    'priority'      => 'high',
    'show_names'    => true, // Show field names on the left
    // 'cmb_styles' => false, // false to disable the CMB stylesheet
    // 'closed'     => true, // Keep the metabox closed by default
  ) );

  $product_options->add_field( array(
    'name'       => __( 'Shopify Product Handle', 'igv' ),
    'id'         => $prefix . 'shopify_product_handle',
    'desc'    => __( 'The handle can be found on product URLs. Ex. in https://myshop.myshopify.com/products/my-product "my-product" is the handle', 'igb' ),
    'type'       => 'text',
  ) );

}

function globie_wordpress_shopify_register_settings() {

  $prefix = '_igv_';

	$shop_options = new_cmb2_box( array(
		'id'           => $prefix . 'shopify_options_metabox',
		'title'        => esc_html__( 'Shopify Config', 'igv' ),
		'object_types' => array( 'options-page' ),
		'option_key'   => 'shopify_config', // The option key and admin menu page slug.
		'icon_url'     => 'dashicons-products', // Menu icon. Only applicable if 'parent_slug' is left empty.
	) );

	$shop_options->add_field( array(
    'name'    => esc_html__( 'Shopify Domain', 'igv' ),
    'desc'    => esc_html__( 'ex. shop.materialvodka.com', 'igv' ),
    'id'      => $prefix . 'shopify_domain',
    'type'    => 'text',
  ) );

  $shop_options->add_field( array(
    'name'    => esc_html__( 'Shopify StoreFront Access Token', 'igv' ),
    'id'      => $prefix . 'shopify_token',
    'type'    => 'text',
  ) );

}

function globie_wordpress_shopify_enqueue_scripts() {
  $shop_scripts = plugin_dir_url( __FILE__ ) . 'dist/js/main.js';

  wp_register_script( 'globie_wordpress_shopify_scripts', $shop_scripts );

  $shopify_domain = globie_wordpress_shopify_get_option('_igv_shopify_domain');
  $shopify_token = globie_wordpress_shopify_get_option('_igv_shopify_token');

  $javascriptVars = array(
    'domain' => !empty($shopify_domain) ? $shopify_domain : null,
    'storefrontAccessToken' => !empty($shopify_token) ? $shopify_token : null
  );

  wp_localize_script( 'globie_wordpress_shopify_scripts', 'Shopify', $javascriptVars );
  wp_enqueue_script( 'globie_wordpress_shopify_scripts', $shop_scripts,'','',true);

}

function globie_wordpress_shopify_get_option( $key = '', $default = false ) {
  if ( function_exists( 'cmb2_get_option' ) ) {
    // Use cmb2_get_option as it passes through some key filters.
    return cmb2_get_option( 'shopify_config', $key, $default );
  }
  // Fallback to get_option if CMB2 is not loaded yet.
  $opts = get_option( 'shopify_config', $default );
  $val = $default;
  if ( 'all' == $key ) {
    $val = $opts;
  } elseif ( is_array( $opts ) && array_key_exists( $key, $opts ) && false !== $opts[ $key ] ) {
    $val = $opts[ $key ];
  }
  return $val;
}

globie_wordpress_shopify_init();

?>
