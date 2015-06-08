import React from 'react';
import _ from 'underscore';

export default class Stat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = _.first(this.props.areas).people.age.map((age, key) => {
      let data = _.map(this.props.areas, (area) => {
        return _.findWhere(area.people.age, {age: age.age});
      });
      return (
        <tbody>
          <tr>
            <td rowSpan="4">{age.age}</td>
          </tr>
          <tr>
            <td>男</td>
            {data.map((value, index) =>
              <td key={'m'+index}>{value.man.value}</td>
            )}
          </tr>
          <tr>
            <td>女</td>
            {data.map((value, index) =>
              <td key={'f'+index}>{value.female.value}</td>
            )}
          </tr>
          <tr>
            <td>合計</td>
            {data.map((value, index) =>
              <td key={'total'+index}>{parseInt(value.female.value) + parseInt(value.man.value)}</td>
            )}
          </tr>
        </tbody>
      );
    });

    return (
      <div>
        <table className="ui compact celled definition table">
          <thead>
              <tr>
                <th></th>
                <th></th>
                {this.props.areas.map((area, index) =>
                  <th key={index}>{area.name}</th>
                )}
              </tr>
          </thead>
          {body}
        </table>
      </div>
    );
  }
}


/**
 * Component property types.
 * @type {Object}
 */
Stat.propTypes = {
  areas: React.PropTypes.array.isRequired
}