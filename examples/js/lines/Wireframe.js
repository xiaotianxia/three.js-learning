/**
 * Generated from 'examples/jsm/lines/Wireframe.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/lines/LineSegmentsGeometry.js'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/lines/LineMaterial.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', '/Users/denzel/Desktop/test/three.js/examples/jsm/lines/LineSegmentsGeometry.js', '/Users/denzel/Desktop/test/three.js/examples/jsm/lines/LineMaterial.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, THREE, LineSegmentsGeometry_js, LineMaterial_js) { 'use strict';

	/**
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 */

	var Wireframe = function ( geometry, material ) {

		THREE.Mesh.call( this );

		this.type = 'Wireframe';

		this.geometry = geometry !== undefined ? geometry : new LineSegmentsGeometry_js.LineSegmentsGeometry();
		this.material = material !== undefined ? material : new LineMaterial_js.LineMaterial( { color: Math.random() * 0xffffff } );

	};

	Wireframe.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {

		constructor: Wireframe,

		isWireframe: true,

		computeLineDistances: ( function () { // for backwards-compatability, but could be a method of LineSegmentsGeometry...

			var start = new THREE.Vector3();
			var end = new THREE.Vector3();

			return function computeLineDistances() {

				var geometry = this.geometry;

				var instanceStart = geometry.attributes.instanceStart;
				var instanceEnd = geometry.attributes.instanceEnd;
				var lineDistances = new Float32Array( 2 * instanceStart.data.count );

				for ( var i = 0, j = 0, l = instanceStart.data.count; i < l; i ++, j += 2 ) {

					start.fromBufferAttribute( instanceStart, i );
					end.fromBufferAttribute( instanceEnd, i );

					lineDistances[ j ] = ( j === 0 ) ? 0 : lineDistances[ j - 1 ];
					lineDistances[ j + 1 ] = lineDistances[ j ] + start.distanceTo( end );

				}

				var instanceDistanceBuffer = new THREE.InstancedInterleavedBuffer( lineDistances, 2, 1 ); // d0, d1

				geometry.setAttribute( 'instanceDistanceStart', new THREE.InterleavedBufferAttribute( instanceDistanceBuffer, 1, 0 ) ); // d0
				geometry.setAttribute( 'instanceDistanceEnd', new THREE.InterleavedBufferAttribute( instanceDistanceBuffer, 1, 1 ) ); // d1

				return this;

			};

		}() )

	} );

	exports.Wireframe = Wireframe;

})));
