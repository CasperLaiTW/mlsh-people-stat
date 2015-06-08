var express = require('express'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  app = express(),
  port = process.env.PORT || 3000,
  router = express.Router(),
  Api = require('./server/api'),
  _ = require('underscore');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(require('express-promise')());
var areas = [
  {name: '苗栗市', code: 20},
  {name: '竹南鎮', code: 21},
  {name: '頭份鎮', code: 22},
  {name: '後龍鎮', code: 23},
  {name: '通霄鎮', code: 24},
  {name: '苑裡鎮', code: 25},
  {name: '卓蘭鎮', code: 26},
  {name: '大湖鄉', code: 27},
  {name: '公館鄉', code: 28},
  {name: '三義鄉', code: 29},
  {name: '銅鑼鄉', code: 30},
  {name: '西湖鄉', code: 31},
  {name: '造橋鄉', code: 32},
  {name: '頭屋鄉', code: 33},
  {name: '三灣鄉', code: 34},
  {name: '獅潭鄉', code: 35},
  {name: '南庄鄉', code: 36},
  {name: '泰安鄉', code: 37},
];
app.get('/stat', function (request, response, next) {
  var api = new Api();
  var data = [];

  _.each(areas, function (value) {
    var result = api.load(value.code);
    data.push({name: value.name, people: result});
  });
  response.json(data);
});

app.listen(port);
console.log('App running on port', port);