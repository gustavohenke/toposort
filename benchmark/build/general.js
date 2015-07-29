(function( global, factory ) {
    if( typeof define === 'function' && define.amd ) {
        define( ['exports', '../../index.js', '../0.3.1/toposort.js'], factory );
    } else if( typeof exports !== 'undefined' ) {
        factory( exports, require( '../../index.js' ), require( '../0.3.1/toposort.js' ) );
    } else {
        var mod = {
            exports: {}
        };
        factory( mod.exports, global.Toposort, global.OldToposort );
        global.general = mod.exports;
    }
})( this, function( exports, _indexJs, _toposortJs ) {
    'use strict';

    function _interopRequireDefault( obj ) {
        return obj && obj.__esModule ? obj : {'default': obj};
    }

    var _Toposort = _interopRequireDefault( _indexJs );

    var _OldToposort = _interopRequireDefault( _toposortJs );

    suite( 'simple dependency chains', function() {
        set( 'delay', 0 );
        set( 'mintime', 1750 );

        bench( 'old version', function() {
            var t = new _OldToposort.default();

            t.add( '3', '1' ).add( '2', '3' ).add( '4', ['2', '3'] ).add( '5', ['3', '4'] ).add( '6',
                ['3', '4', '5'] ).add( '7', '1' ).add( '8', ['1', '2', '3', '4', '5'] ).add( '9', ['8', '6', '7'] );

            var out = t.sort();
        } );

        bench( 'new version', function() {
            var t = new _Toposort.default();

            t.add( '3', '1' ).add( '2', '3' ).add( '4', ['2', '3'] ).add( '5', ['3', '4'] ).add( '6',
                ['3', '4', '5'] ).add( '7', '1' ).add( '8', ['1', '2', '3', '4', '5'] ).add( '9', ['8', '6', '7'] );

            var out = t.sort();
        } );
    } );
} );
