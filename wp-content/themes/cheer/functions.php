<?php
/**
 * Cheer functions and definitions
 *
 * @package Cheer
 * @since Cheer 1.0
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 *
 * @since Cheer 1.0
 */
if ( ! isset( $content_width ) )
	$content_width = 650; /* pixels */

if ( ! function_exists( 'cheer_setup' ) ):
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 *
 * @since Cheer 1.0
 */
function cheer_setup() {

	/**
	 * Custom template tags for this theme.
	 */
	require( get_template_directory() . '/inc/template-tags.php' );

	/**
	 * Custom functions that act independently of the theme templates
	 */
	require( get_template_directory() . '/inc/tweaks.php' );

	/**
	 * WordPress.com-specific functions and definitions
	 */
	//require( get_template_directory() . '/inc/wpcom.php' );

	/**
	 * Make theme available for translation
	 * Translations can be filed in the /languages/ directory
	 * If you're building a theme based on _s, use a find and replace
	 * to change 'cheer' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'cheer', get_template_directory() . '/languages' );

	/**
	 * Add default posts and comments RSS feed links to head
	 */
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Add support for custom backgrounds
	 */
	$defaults = array(
		'default-color'	=> 'f3efe3',
		'default-image'	=> get_template_directory_uri() . '/img/background.jpg',
	);
	add_theme_support( 'custom-background', $defaults );

	/**
	 * This theme uses wp_nav_menu() in one location.
	 */
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'cheer' ),
	) );

	/**
	 * Add support for the Aside Post Formats
	 */
	add_theme_support( 'post-formats', array( 'aside', ) );
}
endif; // cheer_setup
add_action( 'after_setup_theme', 'cheer_setup' );

/**
 * Register widgetized area and update sidebar with default widgets
 *
 * @since Cheer 1.0
 */
function cheer_widgets_init() {
	register_sidebar( array(
		'name' => __( 'Sidebar', 'cheer' ),
		'id' => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h1 class="widget-title">',
		'after_title' => '</h1>',
	) );
}
add_action( 'widgets_init', 'cheer_widgets_init' );

/**
 * Enqueue scripts and styles
 */
function cheer_scripts() {
	wp_enqueue_style( 'style', get_stylesheet_uri() );

	wp_enqueue_style( 'cheer-maiden-orange' );
	wp_enqueue_style( 'cheer-ribeyemarrow' );
	wp_enqueue_style( 'cheer-lancelot' );

	wp_enqueue_script( 'small-menu', get_template_directory_uri() . '/js/small-menu.js', array( 'jquery' ), '20120206', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
	}
}
add_action( 'wp_enqueue_scripts', 'cheer_scripts' );


/**
 * Enqueue Google Fonts
 */

function cheer_fonts() {

	/*	translators: If there are characters in your language that are not supported
		by Maiden Orange, translate this to 'off'. Do not translate into your own language. */

	if ( 'off' !== _x( 'on', 'Maiden Orange font: on or off', 'cheer' ) ) {

		$maiden_subsets = 'latin,latin-ext';

		/* translators: To add an additional Maiden Orange character subset specific to your language, translate
		this to 'greek', 'cyrillic' or 'vietnamese'. Do not translate into your own language. */
		$maiden_subset = _x( 'no-subset', 'Maiden Orange font: add new subset (greek, cyrillic, vietnamese)', 'cheer' );

		if ( 'cyrillic' == $maiden_subset )
			$maiden_subsets .= ',cyrillic,cyrillic-ext';
		elseif ( 'greek' == $maiden_subset )
			$maiden_subsets .= ',greek,greek-ext';
		elseif ( 'vietnamese' == $maiden_subset )
			$maiden_subsets .= ',vietnamese';

		$protocol = is_ssl() ? 'https' : 'http';

		$maiden_query_args = array(
			'family' => 'Maiden+Orange',
			'subset' => $maiden_subsets,
		);
		wp_register_style( 'cheer-maiden-orange', add_query_arg( $maiden_query_args, "$protocol://fonts.googleapis.com/css" ), array(), null );
	}

	/*	translators: If there are characters in your language that are not supported
		by Ribeye Marrow, translate this to 'off'. Do not translate into your own language. */

	if ( 'off' !== _x( 'on', 'Ribeye Marrow font: on or off', 'cheer' ) ) {

		$ribeyemarrow_subsets = 'latin,latin-ext';

		/* translators: To add an additional Ribeye Marrow character subset specific to your language, translate
		this to 'greek', 'cyrillic' or 'vietnamese'. Do not translate into your own language. */
		$ribeyemarrow_subset = _x( 'no-subset', 'Ribeye Marrow font: add new subset (greek, cyrillic, vietnamese)', 'cheer' );

		if ( 'cyrillic' == $ribeyemarrow_subset )
			$ribeyemarrow_subsets .= ',cyrillic,cyrillic-ext';
		elseif ( 'greek' == $ribeyemarrow_subset )
			$ribeyemarrow_subsets .= ',greek,greek-ext';
		elseif ( 'vietnamese' == $ribeyemarrow_subset )
			$ribeyemarrow_subsets .= ',vietnamese';

		$protocol = is_ssl() ? 'https' : 'http';

		$ribeyemarrow_query_args = array(
			'family' => 'Rye',
			'subset' => $ribeyemarrow_subsets,
		);
		wp_register_style( 'cheer-ribeyemarrow', add_query_arg( $ribeyemarrow_query_args, "$protocol://fonts.googleapis.com/css" ), array(), null );
	}

	/*	translators: If there are characters in your language that are not supported
		by Lancelot, translate this to 'off'. Do not translate into your own language. */

	if ( 'off' !== _x( 'on', 'Lancelot font: on or off', 'cheer' ) ) {

		$lancelot_subsets = 'latin,latin-ext';

		/* translators: To add an additional Lancelot character subset specific to your language, translate
		this to 'greek', 'cyrillic' or 'vietnamese'. Do not translate into your own language. */
		$lancelot_subset = _x( 'no-subset', 'Lancelot font: add new subset (greek, cyrillic, vietnamese)', 'cheer' );

		if ( 'cyrillic' == $lancelot_subset )
			$lancelot_subsets .= ',cyrillic,cyrillic-ext';
		elseif ( 'greek' == $lancelot_subset )
			$lancelot_subsets .= ',greek,greek-ext';
		elseif ( 'vietnamese' == $lancelot_subset )
			$lancelot_subsets .= ',vietnamese';

		$protocol = is_ssl() ? 'https' : 'http';

		$lancelot_query_args = array(
			'family' => 'Lancelot',
			'subset' => $lancelot_subsets,
		);
		wp_register_style( 'cheer-lancelot', add_query_arg( $lancelot_query_args, "$protocol://fonts.googleapis.com/css" ), array(), null );
	}

}

add_action( 'init', 'cheer_fonts' );


/**
 * Enqueue font styles in custom header admin
 */

function cheer_admin_fonts( $hook_suffix ) {

	if ( 'appearance_page_custom-header' != $hook_suffix )
		return;

	wp_enqueue_style( 'cheer-maiden-orange' );
	wp_enqueue_style( 'cheer-ribeyemarrow' );
	wp_enqueue_style( 'cheer-lancelot' );

}
add_action( 'admin_enqueue_scripts', 'cheer_admin_fonts' );

/**
 * Add theme options in the Customizer
 */

function cheer_customize( $wp_customize ) {

	$wp_customize->add_section( 'cheer_settings', array(
		'title'          => 'Theme Options',
		'priority'       => 35,
	) );

	$wp_customize->add_setting( 'cheer_color_scheme', array(
		'default'        => 'traditional',
		'type'           => 'theme_mod',
		'capability'     => 'edit_theme_options',
	) );

	$wp_customize->add_control( 'cheer_color_scheme', array(
		'label'      => __( 'Color Scheme', 'cheer' ),
		'section'    => 'cheer_settings',
		'settings'	 => 'cheer_color_scheme',
		'type'       => 'radio',
		'choices'    => array(
			'modern' => 'Modern',
			'traditional' => 'Traditional',
			),
	) );

}

add_action( 'customize_register', 'cheer_customize' );


/**
 * Implement the Custom Header feature
 */
require( get_template_directory() . '/inc/custom-header.php' );

