export default class Toposort {
    edges = [];

    Toposort = Toposort;

    /**
     * Adds dependency edges.
     *
     * @since   0.1.0
     * @param   {String} item               An dependent name. Must be an string and not empty
     * @param   {String[]|String} [deps]    An dependency or array of dependencies
     * @returns {Toposort}                  The Toposort instance
     */
    add( item, deps ) {
        if( typeof item !== "string" || !item ) {
            throw new TypeError( "Dependent name must be given as a not empty string" );
        }

        deps = Array.isArray( deps ) ? deps : [deps];

        if( deps.length > 0 ) {
            for( let dep of deps ) {
                if( typeof dep !== "string" || !dep ) {
                    throw new TypeError( "Dependency name must be given as a not empty string" );
                }

                this.edges.push( [item, dep] );
            }

        } else {
            this.edges.push( [item] );
        }

        return this;
    }

    /**
     * Runs the toposorting and return an ordered array of strings
     *
     * @since   0.1.0
     * @returns {String[]}  The list of items topologically sorted.
     */
    sort() {
        let nodes = [];

        for( let edge of this.edges ) {
            for( let node of edge ) {
                if( nodes.indexOf( node ) === -1 ) {
                    nodes.push( node );
                }
            }
        }

        let place = nodes.length;

        let sorted = new Array( nodes.length );

        var visit = ( node, predecessors ) => {
            if( predecessors.length !== 0 && predecessors.indexOf( node ) !== -1 ) {
                throw new Error( `Cyclic dependency found. ${node} is dependent of itself.\nDependency chain: ${predecessors.join( " -> " )} => ${node}` );
            }

            let index = nodes.indexOf( node );

            if( index !== -1 ) {
                let copy = false;

                nodes[index] = false;

                for( let edge of this.edges ) {
                    if( edge[0] === node ) {
                        copy = copy || predecessors.concat( [node] );

                        visit( edge[1], copy );
                    }
                }

                sorted[--place] = node;
            }
        };

        for( let i = 0; i < nodes.length; i++ ) {
            let node = nodes[i];

            if( node !== false ) {
                nodes[i] = false;

                for( let edge of this.edges ) {
                    if( edge[0] === node ) {
                        visit( edge[1], [node] );
                    }
                }

                sorted[--place] = node;
            }
        }

        return sorted;
    }

    /**
     * Clears edges
     *
     * @since   0.4.0
     * @returns {Toposort}                  The Toposort instance
     */
    clear() {
        this.edges = [];

        return this;
    }
}
