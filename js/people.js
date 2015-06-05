import Age from './age';

export default class People {
  constructor() {
    this.age = [];
  }

  addAge(age, man, female) {
    this.age.push(new Age(age, man, female));
  }
}