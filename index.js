/**
 * Topological sort class.
 * Original by Marcel Klehr, contributed by Gustavo Henke.
 *
 * @class
 * @since   0.1.0
 * @see     https://github.com/marcelklehr/node-toposort
 * @author  Marcel Klehr <mklehr@gmx.net>
 *
 * @see     https://github.com/gustavohenke/node-toposort
 * @author  Gustavo Henke <gustavo@injoin.com.br>
 */
function Toposort() {
	"use strict";
	var self = this,
		edges = [];

	/**
	 * Adds dependency edges.
	 * 
	 * @since   0.1.0
	 * @param   {String} item               An dependent name. Must be an string and not empty
	 * @param   {String[]|String} [deps]    An dependency or array of dependencies 
	 * @returns {Toposort}                  The Toposort instance
	 */
	this.add = function(item, deps) {
		if (typeof item !== "string" || !item) {
			throw new TypeError("Dependent name must be given as a not empty string");
		}

		if (deps) {
			var tmp = Array.isArray(deps) ? deps : [deps];
			tmp.forEach(function(dep) {
				if (typeof dep !== "string" || !dep) {
					throw new TypeError("Dependency name must be given as a not empty string");
				}
			});
			
			tmp.unshift(item);
			edges.push(tmp);
		} else {
			edges.push([item]);
		}

		return self;
	};

	/**
	 * Runs the toposorting and return an ordered array of strings
	 * 
	 * @since   0.1.0
	 * @returns {String[]}  The list of items topologically sorted.
	 */
	this.sort = function() {
		var nodes = [],
			sorted = [];

		edges.forEach(function(edge) {
			edge.forEach(function(n) {
				if (nodes.indexOf(n) === -1) {
					nodes.push(n);
				}
			});
		});

		function visit(node, predecessors, i) {
			if (!predecessors) {
				predecessors = [];
			} else if (predecessors.indexOf(node) > 0) {
				throw new Error(require('util').format("Cyclic dependency found. '%s' is dependent of itself.", node));
			}

			var index = nodes.indexOf(node);
			if (index === -1) {
				return i;
			}

			nodes.splice(index, 1);
			if (predecessors.length === 0) {
				i--;
			}

			var predsCopy = predecessors.slice(0);
			predsCopy.push(node);

			edges.filter(function(e) {
				return e[0] === node;
			}).forEach(function(e) {
				visit(e[1], predsCopy, i);
			});

			sorted.unshift(node);
			return i;
		}

		for (var i = 0; i < nodes.length; i++) {
			i = visit(nodes[i], null, i);
		}

		return sorted;
	};

}

module.exports = exports.Toposort = Toposort;