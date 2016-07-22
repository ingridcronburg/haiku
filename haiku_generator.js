var fs = require('fs');

var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
}

function formatData(data) {
  var lines = data.split("\n");
  var table = [];

  lines.forEach(function(line) {
    if (!line.match(/\(\d+\)/)) {
      var lineSplit = line.split("  ");

      if (lineSplit[1]) {
        var syllables = lineSplit[1].replace(/\D/g, '').length;

        if (!table[syllables]) {
          table[syllables] = [];
        }

        table[syllables].push(lineSplit[0].toLowerCase());
      }
    }
  });

  return table;
}

var wordsBySyllable = formatData(cmudictFile);

function getStructure() {
  function getLine(num) {
    var line = [];

    function sum(arr) {
      return arr.reduce(function(x, y) {return x + y;});
    }

    line.push(Math.floor(Math.random() * num) + 1);

    while (sum(line) < num) {
      line.push(Math.floor(Math.random() * (num - sum(line))) + 1);
    }

    return line;
  }

  var structureArray = [];

  structureArray.push(getLine(5), getLine(7), getLine(5));

  return structureArray;
}

function createHaiku() {
  var structure = getStructure();
  var poem = [];

  function getWord(num) {
    var rand = Math.floor(Math.random() * wordsBySyllable[num].length) + 1;
    
    return wordsBySyllable[num][rand];
  }

  structure.forEach(function(line) {
    poem.push(line.map(getWord).join(" "));
  });

  return poem.join("\n");
}

module.exports = {
  createHaiku: createHaiku,
};
