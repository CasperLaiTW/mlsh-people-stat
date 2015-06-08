import Area from './area';
import _ from 'underscore';
import $ from 'jquery';

let areas = [];

$.get('/stat', (response) => {
  _.each(response, (value) => {
    let area = new Area(value.name);
    area.load(value.people);
    areas.push(area);
  });
});