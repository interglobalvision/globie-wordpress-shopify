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

function igv_globie_wordpress_shopify_init() {

  igv_globie_wordpress_shopify_register_product();

  add_action( 'cmb2_admin_init', 'igv_globie_wordpress_shopify_register_options' );

  add_action( 'cmb2_init', 'igv_globie_wordpress_shopify_metaboxes' );

}

function igv_globie_wordpress_shopify_register_product() {
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

function igv_globie_wordpress_shopify_metaboxes() {
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

function igv_globie_wordpress_shopify_register_options() {

  $prefix = '_igv_';

	$shop_options = new_cmb2_box( array(
		'id'           => $prefix . 'option_metabox',
		'title'        => esc_html__( 'Shopify Config', 'igv' ),
		'object_types' => array( 'options-page' ),
		'option_key'      => $prefix . 'shopify_options', // The option key and admin menu page slug.
		'icon_url'        => 'dashicons-products', // Menu icon. Only applicable if 'parent_slug' is left empty.
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

igv_globie_wordpress_shopify_init();

?>
