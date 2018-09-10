<?php
function init() {

  $shop_page = get_page_by_path('shop');

  if( empty($page) ) {
    wp_insert_post( array(
      'post_type' => 'page',
      'post_title' => 'Shop',
      'post_name' => 'shop',
      'post_status' => 'publish'
    ));
  }

}

init();

?>
