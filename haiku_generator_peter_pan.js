var fs = require('fs');

var cmudictFile = readFile('./cmudict.txt');
var peter_pan = readFile('./peter_pan.txt');

function readFile(file) {
  return fs.readFileSync(file).toString();
}

function formatData(data) {
  var lines = data.split("\n");
  var obj = {};

   lines.forEach(function(line) {
     var lineSplit = line.split("  ");

     if (lineSplit[1]) {
       obj[lineSplit[0].toLowerCase()] = lineSplit[1].replace(/\D/g, '').length;
     }
  });

  return obj;
}

var dictionary = formatData(cmudictFile);
var words = peter_pan.toLowerCase().match(/\b\w+\b/g);
var syllables = words.map(function(word) { return dictionary[word] ? dictionary[word] : 0; });
var syllablesString = syllables.join("");

function getLine(num) {
  var line = [];

  function sum(arr) {
    return arr.reduce(function(x, y) { return x + y; });
  }

  line.push(Math.floor(Math.random() * num) + 1);

  while (sum(line) < num) {
    line.push(Math.floor(Math.random() * (num - sum(line))) + 1);
  }

  return line;
}

function createHaiku() {
  var structure = [5, 7, 5];
  var haiku = [];
  var lines = [];

  structure.forEach(function(num) {
    var line, index;

    do {
      line = getLine(num);
      index = syllablesString.indexOf(line.join(""));
    } while (index === -1);

    var result, matches = [], regexp = new RegExp(line.join(""), 'g');

    while((result = regexp.exec(syllablesString)) !== null) {
      matches.push(result.index);
    }

    var selected = matches[Math.floor(Math.random() * matches.length) + 1];

    lines.push(line);
    haiku.push(line.map(function(syllable, i) {
      return words[selected + i];
    }).join(" "));
  });

  return haiku.join("\n");
}

module.exports = {
  createHaiku: createHaiku,
};
