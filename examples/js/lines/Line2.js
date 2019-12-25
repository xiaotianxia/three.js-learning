/**
 * Generated from 'examples/jsm/lines/Line2.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('/Users/denzel/Desktop/test/three.js-learning/examples/jsm/lines/LineSegments2.js'), require('/Users/denzel/Desktop/test/three.js-learning/examples/jsm/lines/LineGeometry.js'), require('/Users/denzel/Desktop/test/three.js-learning/examples/jsm/lines/LineMaterial.js')) :
	typeof define === 'function' && define.amd ? define(['exports', '/Users/denzel/Desktop/test/three.js-learning/examples/jsm/lines/LineSegments2.js', '/Users/denzel/Desktop/test/three.js-learning/examples/jsm/lines/LineGeometry.js', '/Users/denzel/Desktop/test/three.js-learning/examples/jsm/lines/LineMaterial.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, LineSegments2_js, LineGeometry_js, LineMaterial_js) { 'use strict';

	/**
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 */

	var Line2 = function ( geometry, material ) {

		LineSegments2_js.LineSegments2.call( this );

		this.type = 'Line2';

		this.geometry = geometry !== undefined ? geometry : new LineGeometry_js.LineGeometry();
		this.material = material !== undefined ? material : new LineMaterial_js.LineMaterial( { color: Math.random() * 0xffffff } );

	};

	Line2.prototype = Object.assign( Object.create( LineSegments2_js.LineSegments2.prototype ), {

		constructor: Line2,

		isLine2: true

	} );

	exports.Line2 = Line2;

})));
