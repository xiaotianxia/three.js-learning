/**
 * Generated from 'examples/jsm/shaders/ColorCorrectionShader.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Color correction
	 */

	var ColorCorrectionShader = {

		uniforms: {

			"tDiffuse": { value: null },
			"powRGB": { value: new THREE.Vector3( 2, 2, 2 ) },
			"mulRGB": { value: new THREE.Vector3( 1, 1, 1 ) },
			"addRGB": { value: new THREE.Vector3( 0, 0, 0 ) }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

			"	vUv = uv;",

			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform sampler2D tDiffuse;",
			"uniform vec3 powRGB;",
			"uniform vec3 mulRGB;",
			"uniform vec3 addRGB;",

			"varying vec2 vUv;",

			"void main() {",

			"	gl_FragColor = texture2D( tDiffuse, vUv );",
			"	gl_FragColor.rgb = mulRGB * pow( ( gl_FragColor.rgb + addRGB ), powRGB );",

			"}"

		].join( "\n" )

	};

	exports.ColorCorrectionShader = ColorCorrectionShader;

})));
