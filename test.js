var vows = require("vows"),
	assert = require("assert"),
	Toposort = require("./index");

vows.describe("Toposort").addBatch({
	"should sort correctly": function() {
		var t = new Toposort();
		t.add( "3", "2" )
		 .add( "2", "1" )
		 .add( "6", "5" )
		 .add( "5", [ "2", "4" ] );

		var arr = t.sort(), i = 0, fails = [];
		assert.isArray( arr );

		var possibilities = [
			[ "3", "6", "5", "4", "2", "1" ],
			[ "3", "6", "5", "2", "4", "1" ],
			[ "6", "3", "5", "2", "4", "1" ],
			[ "6", "3", "5", "2", "1", "4" ],
			[ "6", "5", "3", "2", "1", "4" ],
			[ "6", "5", "3", "2", "4", "1" ],
			[ "6", "5", "4", "3", "2", "1" ]
		];

		possibilities.forEach(function( possibility ) {
			try {
				assert.deepEqual( arr, possibility );
			} catch ( e ) {
				fails.push( e );
			}
		});

		if ( fails.length === possibilities.length ) {
			throw fails[ 0 ];
		}
	},
	"should find cyclic dependencies": function() {
		var t = new Toposort();
		t.add( "3", "2" )
		 .add( "2", "1" )
		 .add( "1", "3" )
		
		assert.throws( function() { t.sort(); }, Error );
	},
	"#2 - should add the item if an empty array of dependencies is passed": function() {
		var t = new Toposort(),
			out = t.add( "1", [] ).sort();

		assert.deepEqual( out, [ "1" ] );
	}
}).export( module );