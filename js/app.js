import Area from './area';
import _ from 'underscore';

const map = [
  {
    name: '苗栗市',
    code: 20
  }
];

let areas = [];

_.each(map, (value, key) => {
  let area = new Area(value.name, value.code).load();
  // console.log(area);
  // areas.push(area);
});