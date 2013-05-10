<?php
/**
 * WordPress.com-specific functions and definitions
 *
 * @package Cheer
 * @since Cheer 1.0
 */

global $themecolors;

/**
 * Set a default theme color array for WP.com.
 *
 * @global array $themecolors
 * @since Cheer 1.0
 */
$themecolors = array(
	'bg' => 'f4f0e4',
	'border' => 'cccccc',
	'text' => '333333',
	'link' => '388958',
	'url' => '388958',
);

/*
 * De-queue Google fonts if custom fonts are being used instead
 */

function cheer_dequeue_fonts() {
	if ( class_exists( 'TypekitData' ) ) {
		if ( TypekitData::get( 'upgraded' ) ) {
			$customfonts = TypekitData::get( 'families' );
				if ( ! $customfonts )
					return;

				$site_title = $customfonts['site-title'];
				$headings = $customfonts['headings'];
				$body_text = $customfonts['body-text'];

				if ( $site_title['id'] && $headings['id'] && $body_text['id'] ) {
					wp_dequeue_style( 'cheer-maiden-orange' );
					wp_dequeue_style( 'cheer-ribeyemarrow' );
					wp_dequeue_style( 'cheer-lancelot' );
				}
		}
	}
}

add_action( 'wp_enqueue_scripts', 'cheer_dequeue_fonts' );

