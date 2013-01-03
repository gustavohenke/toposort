# Sorting directed acyclic graphs
_This was originally done by Marcel Klehr. [Why not checkout his original repo?](https://github.com/marcelklehr/node-toposort)_

## Installation
`npm install toposort-class`

## Example
Let's say, you have a list of pluginsor tasks, which depend on each other (`depends` defines plugins or tasks that should be executed before the plugin that declares the directive):

```
var plugins =
[ {name: "foo", depends: ['bar']}
, {name: "bar", depends: ["ron"]}
, {name: "john", depends: ["bar"]}
, {name: "tom", depends: ["john"]}
, {name: "ron", depends: []}
]
```

A quick analysis, will result in the following dependency tree:

```
tom
 |
john  foo
 |     |
 - - - - 
    |
   bar
    |
   ron
```

and thus the following execution flow:

```
   ron
    |
   bar
 - - - - 
 |     |
john  foo
 |
tom
```

Let's try this with `toposort`:

```js
var toposort = require('toposort-class');

// this will sort our plugins by dependecy
var toposort = new Toposort();
toposort.add("foo", "bar");
toposort.add("bar", "ron");
toposort.add("john", "bar");
toposort.add("tom", "john");

// now, we reverse the results to get the resulting execution flow, as above
var results = toposort.sort().reverse();

console.log(results)
/*
Output:
[ 'ron', 'bar', 'foo', 'john', 'tom' ]
*/
```

## Legal
MIT License