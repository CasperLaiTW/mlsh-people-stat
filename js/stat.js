import React from 'react';
import _ from 'underscore';

export default class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    }
  }

  handleHideAge() {
    this.setState({hide: true});
  }

  handleShowAge() {
    this.setState({hide: false});
  }

  render() {
    let body = _.first(this.props.areas).people.age.map((age, key) => {
      let data = _.map(this.props.areas, (area) => {
        return _.findWhere(area.people.age, {age: age.age});
      });
      let ageRow = (this.state.hide ? null : <tr><td rowSpan="4" key={'a'+key}>{age.age}</td></tr>);
      return (
        <tbody>
          {ageRow}
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

    let control = (!this.state.hide ? <a href="#" onClick={this.handleHideAge.bind(this)} className="ui button green">隱藏年齡(複製至Excel)</a> : <a href="#" onClick={this.handleShowAge.bind(this)} className="ui button green">顯示年齡</a> )
    return (
      <div>
        {control}
        <table className="ui compact celled definition table">
          <thead>
              <tr>
                <th></th>
                {this.state.hide ? null : <th></th>}
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