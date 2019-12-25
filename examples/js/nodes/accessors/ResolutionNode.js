/**
 * Generated from 'examples/jsm/nodes/accessors/ResolutionNode.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('/Users/denzel/Desktop/test/three.js-learning/examples/jsm/nodes/inputs/Vector2Node.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', '/Users/denzel/Desktop/test/three.js-learning/examples/jsm/nodes/inputs/Vector2Node.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE));
}(this, (function (exports, THREE, Vector2Node_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ResolutionNode() {

		Vector2Node_js.Vector2Node.call( this );

		this.size = new THREE.Vector2();

	}

	ResolutionNode.prototype = Object.create( Vector2Node_js.Vector2Node.prototype );
	ResolutionNode.prototype.constructor = ResolutionNode;
	ResolutionNode.prototype.nodeType = "Resolution";

	ResolutionNode.prototype.updateFrame = function ( frame ) {

		if ( frame.renderer ) {

			frame.renderer.getSize( this.size );

			var pixelRatio = frame.renderer.getPixelRatio();

			this.x = this.size.width * pixelRatio;
			this.y = this.size.height * pixelRatio;

		} else {

			console.warn( "ResolutionNode need a renderer in NodeFrame" );

		}

	};

	ResolutionNode.prototype.copy = function ( source ) {

		Vector2Node_js.Vector2Node.prototype.copy.call( this, source );

		this.renderer = source.renderer;

		return this;

	};

	ResolutionNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.renderer = this.renderer.uuid;

		}

		return data;

	};

	exports.ResolutionNode = ResolutionNode;

})));
