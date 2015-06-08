import $ from 'jquery';
import _ from 'underscore';
import People from './people';

export default class Area {
  constructor(name) {
    this.name = name;
    this.people = new People;
  }

  load(people) {
    _.each(people, (value, key) => {
      this.people.addAge(value.age, value.man, value.female);
    });
  }
}
