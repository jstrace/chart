
# Chart

  Ascii bar chart for nodejs.

  ![](https://dl.dropboxusercontent.com/u/6396913/misc/Screen%20Shot%202014-02-27%20at%208.56.42%20AM.png)

## Installation

```
$ npm install jstrace/chart
```

## Example

 When `data` exceeds the available width the data will "roll" to the tail-end
 of the array. This may become an option in the future, but that's the default
 behaviour for now ;)

```js
var chart = require('chart');
var clear = require('clear');

var data = [1, 2, ...];

clear();
console.log(chart(data, {
  width: 130,
  height: 30,
  pointChar: '█',
  negativePointChar: '░'
}));
```

# License

  MIT
