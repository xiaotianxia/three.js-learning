/**
 * Generated from 'examples/jsm/nodes/misc/NormalMapNode.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/core/TempNode.js'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/inputs/Vector2Node.js'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/core/FunctionNode.js'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/accessors/UVNode.js'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/accessors/NormalNode.js'), require('/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/accessors/PositionNode.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', '/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/core/TempNode.js', '/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/inputs/Vector2Node.js', '/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/core/FunctionNode.js', '/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/accessors/UVNode.js', '/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/accessors/NormalNode.js', '/Users/denzel/Desktop/test/three.js/examples/jsm/nodes/accessors/PositionNode.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE, global.THREE, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, THREE, TempNode_js, Vector2Node_js, FunctionNode_js, UVNode_js, NormalNode_js, PositionNode_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NormalMapNode( value, scale ) {

		TempNode_js.TempNode.call( this, 'v3' );

		this.value = value;
		this.scale = scale || new Vector2Node_js.Vector2Node( 1, 1 );

	}

	NormalMapNode.Nodes = ( function () {

		var perturbNormal2Arb = new FunctionNode_js.FunctionNode(

			// Per-Pixel Tangent Space Normal Mapping
			// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

`vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 map, vec2 vUv, vec2 normalScale ) {

	// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

	vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
	vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
	vec2 st0 = dFdx( vUv.st );
	vec2 st1 = dFdy( vUv.st );

	float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude

	vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );
	vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );
	vec3 N = normalize( surf_norm );

	vec3 mapN = map * 2.0 - 1.0;

	mapN.xy *= normalScale;

	#ifdef DOUBLE_SIDED

		// Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331

		if ( dot( cross( S, T ), N ) < 0.0 ) mapN.xy *= - 1.0;

	#else

		mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

	#endif

	mat3 tsn = mat3( S, T, N );
	return normalize( tsn * mapN );

}`	, null, { derivatives: true } );

		return {
			perturbNormal2Arb: perturbNormal2Arb
		};

	} )();

	NormalMapNode.prototype = Object.create( TempNode_js.TempNode.prototype );
	NormalMapNode.prototype.constructor = NormalMapNode;
	NormalMapNode.prototype.nodeType = "NormalMap";

	NormalMapNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var perturbNormal2Arb = builder.include( NormalMapNode.Nodes.perturbNormal2Arb );

			this.normal = this.normal || new NormalNode_js.NormalNode();
			this.position = this.position || new PositionNode_js.PositionNode( PositionNode_js.PositionNode.VIEW );
			this.uv = this.uv || new UVNode_js.UVNode();

			var scale = this.scale.build( builder, 'v2' );

			if ( builder.material.side === THREE.BackSide ) {

				scale = '-' + scale;

			}

			return builder.format( perturbNormal2Arb + '( -' + this.position.build( builder, 'v3' ) + ', ' +
				this.normal.build( builder, 'v3' ) + ', ' +
				this.value.build( builder, 'v3' ) + ', ' +
				this.uv.build( builder, 'v2' ) + ', ' +
				scale + ' )', this.getType( builder ), output );

		} else {

			console.warn( "THREE.NormalMapNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec3( 0.0 )', this.getType( builder ), output );

		}

	};

	NormalMapNode.prototype.copy = function ( source ) {

		TempNode_js.TempNode.prototype.copy.call( this, source );

		this.value = source.value;
		this.scale = source.scale;

		return this;

	};

	NormalMapNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;
			data.scale = this.scale.toJSON( meta ).uuid;

		}

		return data;

	};

	exports.NormalMapNode = NormalMapNode;

})));
