import Area from './area';
import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import Stat from './stat';
import 'semantic-ui-css/semantic.min.css';

let areas = [];
let app = document.getElementById('app');

$.get('/stat', (response) => {
  _.each(response, (value) => {
    let area = new Area(value.name);
    area.load(value.people);
    areas.push(area);
  });
  React.render(<Stat areas={areas} />, app);
});


