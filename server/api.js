var Q = require('q');
var request = Q.denodeify(require('request'));
var Parser = require('jq-html-parser');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

module.exports = function () {
  var url = 'http://mlhr.miaoli.gov.tw/tables1_print.php?unit=';

  var load = function (code) {
    var json = path.resolve(__dirname, '../people/' + code + '.json');
    if (fs.exists(json, function(exists) {
      if (exists) {
        return local(json);
      } else {
        var response = request(url + code);
        return response.then(function(response) {
          var result = parser(response[0].body);
          var str = JSON.stringify(result);
          fs.writeFile(json, str);
          return result;
        });
      }
    }));
  }

  var local = function (path, callback) {
    var file = fs.readFileSync(path);
    return JSON.parse(file);
  };

  var parser = function (body) {
    var config = {
      age: {
        selector: 'table > tbody tr',
        multiple: true,
        html: true,
        regexp: '<b>(.*)</b>'
      },
      people: {
        selector: 'table > tbody tr td',
        multiple: true,
        regexp: '([0-9\.%]+)'
      }
    };
    var parser = new Parser(config);
    var result = parser.parse(body);
    var data = [];
     _.each(result.age, function(value, key) {
        var all = _.rest(result.people, 4);
        var start = key * 7;
        var end = start + 6;
        var filter = all.slice(start, end);
        var man = {
          value: filter[0],
          percent: filter[1]
        };
        var female = {
          value: filter[2],
          percent: filter[3]
        }
        data.push({value: value, man: man, female: female});
     });
     return data;
  }

  return {
    load: load
  };
};