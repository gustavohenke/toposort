(function( global, factory ) {
    if( typeof define === 'function' && define.amd ) {
        define( ['exports', '../../', 'babel-runtime/helpers/interop-require-default', 'assert'], factory );
    } else if( typeof exports !== 'undefined' ) {
        factory( exports, require( '../../' ), require( 'babel-runtime/helpers/interop-require-default' ),
            require( 'assert' ) );
    } else {
        var mod = {
            exports: {}
        };
        factory( mod.exports, global.Toposort, global._interopRequireDefault, global.assert );
        global.spec = mod.exports;
    }
})( this, function( exports, _, _babelRuntimeHelpersInteropRequireDefault, _assert ) {
    /**
     * Created by Aaron on 7/28/2015.
     */

    'use strict';

    var _Toposort = (0, _babelRuntimeHelpersInteropRequireDefault['default'])( _ );

    var _assert2 = (0, _babelRuntimeHelpersInteropRequireDefault['default'])( _assert );

    describe( 'Toposort', function() {
        it( 'should sort correctly', function() {
            var arr, fails, possibilities;
            var t = new _Toposort['default']();

            t.add( '3', '2' ).add( '2', '1' ).add( '6', '5' ).add( '5', ['2', '4'] );

            arr = t.sort();
            fails = [];

            (0, _assert2['default'])( Array.isArray( arr ) );

            possibilities =
                [['3', '6', '5', '4', '2', '1'], ['3', '6', '5', '2', '4', '1'], ['6', '3', '5', '2', '4', '1'],
                 ['6', '3', '5', '2', '1', '4'], ['6', '5', '3', '2', '1', '4'], ['6', '5', '3', '2', '4', '1'],
                 ['6', '5', '4', '3', '2', '1']];

            possibilities.forEach( function( possibility ) {
                try {
                    _assert2['default'].deepEqual( arr, possibility );
                } catch( e ) {
                    fails.push( e );
                }
            } );

            if( fails.length === possibilities.length ) {
                throw fails[0];
            }
        } );

        it( 'should find cyclic dependencies', function() {
            var t = new _Toposort['default']();
            t.add( '3', '2' ).add( '2', '1' ).add( '1', '3' );

            try {
                t.sort();

                (0, _assert2['default'])( false );
            } catch( err ) {
                (0, _assert2['default'])( err instanceof Error );
            }
        } );

        it( '#2 - should add the item if an empty array of dependencies is passed', function() {
            var t = new _Toposort['default']();
            var out = t.add( '1', [] ).sort();

            _assert2['default'].deepEqual( out, ['1'] );
        } );
    } );
} );
