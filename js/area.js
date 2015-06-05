import $ from 'jquery';
import Parse from 'jq-html-parser';
import _ from 'underscore';
import People from './people';

export default class Area {
  constructor(name, code) {
    this.name = name;
    this.url = 'http://mlhr.miaoli.gov.tw/tables1_print.php?unit=' + code;
    this.people = new People;
    this.config = {
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
  }

  load() {
    $.ajax({
      url: this.url,
      crossDomain: true,
      type: 'GET',
      success: (response, status, xhr) => {
        if ( status == "error" ) {
          return console.log('An error occured.');
        }
        console.log(response);
        }
    });

    // request.get(this.url, function(error, response, body) {
    //   if (error || (response.statusCode != 200)) {
    //     return console.log("An error occured.");
    //   }
    //   this.parse(body);
    // });
    // return this;
  }

  parse(body) {
    let parser = new Parser(this.config);
    let result = parser.parse(body);
    _.each(result.age, (value, key) => {
      let all = _.rest(result.people, 4);
      let start = key * 7;
      let end = start + 6;
      let filter = all.slice(start, end);
      let man = {
        value: filter[0],
        percent: filter[1]
      };
      let female = {
        value: filter[2],
        percent: filter[3]
      }
      this.people.addAge(value, man, female);
    });
  }
}
