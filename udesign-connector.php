<?php
/*
Plugin Name: UD Connector for Oxygen
Plugin URI: https://unremarkable.design
Description: Enable copy/paste functionality between UD and Oxygen Builder.
Version: 0.1.3
Author: Lucian Dinu
Author URI: 
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class UDesign_Connector_Oxy
{

  function __construct()
  {
    //Check if Oxygen is installed and active
    if (!defined('CT_VERSION') || version_compare(CT_VERSION, '2.9.9') == -1) return;
    //Register actions
    add_action('init', array($this, 'init'), 11);
    add_action('admin_head',  array($this, 'admin_head'));
    add_action('oxygen_enqueue_ui_scripts',  array($this, 'oxygen_enqueue_ui_scripts'));
  }

  function init()
  {
    //TBD
  }

  function admin_head()
  {
    //TBD
    echo '
    <style>
    </style>
    ';
  }

  function oxygen_enqueue_ui_scripts()
  {
    if (!function_exists('oxygen_vsb_current_user_can_access')) {
      return;
    }

    wp_enqueue_style('oxygen-editor-udesign', plugin_dir_url(__FILE__) . 'assets/style.css');
    
    wp_enqueue_script('oxygen-editor-udesign', plugin_dir_url(__FILE__) . 'assets/app.js', [], '1.0.0', true);

  }
}



new UDesign_Connector_Oxy();
