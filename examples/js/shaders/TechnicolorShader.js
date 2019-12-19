/**
 * Generated from 'examples/jsm/shaders/TechnicolorShader.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}));
}(this, (function (exports) { 'use strict';

	/**
	 * @author flimshaw / http://charliehoey.com
	 *
	 * Technicolor Shader
	 * Simulates the look of the two-strip technicolor process popular in early 20th century films.
	 * More historical info here: http://www.widescreenmuseum.com/oldcolor/technicolor1.htm
	 * Demo here: http://charliehoey.com/technicolor_shader/shader_test.html
	 */



	var TechnicolorShader = {

		uniforms: {

			"tDiffuse": { value: null }

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
			"varying vec2 vUv;",

			"void main() {",

			"	vec4 tex = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );",
			"	vec4 newTex = vec4(tex.r, (tex.g + tex.b) * .5, (tex.g + tex.b) * .5, 1.0);",

			"	gl_FragColor = newTex;",

			"}"

		].join( "\n" )

	};

	exports.TechnicolorShader = TechnicolorShader;

})));
