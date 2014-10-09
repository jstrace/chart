
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
console.log(chart(data, { width: n, height: n }));
```

## Options

These are keys in the `options` object that you can pass to the `chart()` function.

- `width` _Number_ The number of columns for the chart to span. Default __130__.
- `height` _Number_ The number of rows for the chart to span. Default __30__.
- `fill` _Boolean_ The chart will fill the terminal window.  If `height` or `width` are set, they will override. Default __false__.
- `pos` _String_ The character to use for positive values on the chart. Default __█__.
- `neg` _String_ The character to use for negative values on the chart. Default __░__.
- `padding` _Number_ The number of cols & rows to pad the chart. Default __3__.

# License

  MIT
