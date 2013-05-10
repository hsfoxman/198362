/**
 * Compatibility settings and functions for Jetpack from Automattic
 * See http://jetpack.me/support/infinite-scroll/
 *
 * @package Cheer
 */

/**
 * Enable support for Infinite Scroll
 */
add_theme_support( 'infinite-scroll', array(
	'type'           => 'scroll',
	'container'      => 'content',
	'footer'         => 'main',
) );