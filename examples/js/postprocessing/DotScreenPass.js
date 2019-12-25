/**
 * Generated from 'examples/jsm/postprocessing/DotScreenPass.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('/Users/denzel/Desktop/test/three.js-learning/examples/jsm/postprocessing/Pass.js'), require('/Users/denzel/Desktop/test/three.js-learning/examples/jsm/shaders/DotScreenShader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', '/Users/denzel/Desktop/test/three.js-learning/examples/jsm/postprocessing/Pass.js', '/Users/denzel/Desktop/test/three.js-learning/examples/jsm/shaders/DotScreenShader.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, THREE, Pass_js, DotScreenShader_js) { 'use strict';

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	var DotScreenPass = function ( center, angle, scale ) {

		Pass_js.Pass.call( this );

		if ( DotScreenShader_js.DotScreenShader === undefined )
			console.error( "DotScreenPass relies on DotScreenShader" );

		var shader = DotScreenShader_js.DotScreenShader;

		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

		if ( center !== undefined ) this.uniforms[ "center" ].value.copy( center );
		if ( angle !== undefined ) this.uniforms[ "angle" ].value = angle;
		if ( scale !== undefined ) this.uniforms[ "scale" ].value = scale;

		this.material = new THREE.ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

		this.fsQuad = new Pass_js.Pass.FullScreenQuad( this.material );

	};

	DotScreenPass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

		constructor: DotScreenPass,

		render: function ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

			this.uniforms[ "tDiffuse" ].value = readBuffer.texture;
			this.uniforms[ "tSize" ].value.set( readBuffer.width, readBuffer.height );

			if ( this.renderToScreen ) {

				renderer.setRenderTarget( null );
				this.fsQuad.render( renderer );

			} else {

				renderer.setRenderTarget( writeBuffer );
				if ( this.clear ) renderer.clear();
				this.fsQuad.render( renderer );

			}

		}

	} );

	exports.DotScreenPass = DotScreenPass;

})));
