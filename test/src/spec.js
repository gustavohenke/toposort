import Toposort from "../../";

import assert from "assert";

describe( "Toposort", function() {
    it( "should sort correctly", function() {
        var arr, fails, possibilities;
        var t = new Toposort();

        t.add( "3", "2" )
            .add( "2", "1" )
            .add( "6", "5" )
            .add( "5", ["2", "4"] );

        arr = t.sort();
        fails = [];

        assert( Array.isArray( arr ) );

        possibilities = [
            ["3", "6", "5", "4", "2", "1"],
            ["3", "6", "5", "2", "4", "1"],
            ["6", "3", "5", "2", "4", "1"],
            ["6", "3", "5", "2", "1", "4"],
            ["6", "5", "3", "2", "1", "4"],
            ["6", "5", "3", "2", "4", "1"],
            ["6", "5", "4", "3", "2", "1"]
        ];

        possibilities.forEach( function( possibility ) {
            try {
                assert.deepEqual( arr, possibility );

            } catch( e ) {
                fails.push( e );
            }
        } );

        if( fails.length === possibilities.length ) {
            throw fails[0];
        }
    } );

    it( "should find cyclic dependencies", function() {
        var t = new Toposort();
        t.add( "3", "2" )
            .add( "2", "1" )
            .add( "1", "3" );

        try {
            t.sort();

            assert( false );

        } catch( err ) {
            assert( err instanceof Error );
        }
    } );

    it( "#2 - should add the item if an empty array of dependencies is passed", function() {
        var t = new Toposort();
        var out = t.add( "1", [] ).sort();

        assert.deepEqual( out, ["1"] );
    } );
} );
