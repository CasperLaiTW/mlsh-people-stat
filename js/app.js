import Area from './area';
import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import Stat from './stat';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-modal';

let areas = [];
let app = document.getElementById('app');

Modal.setAppElement(app);
Modal.injectCSS();
let view = (
  <Modal isOpen={true}>
    <div className="modal-content">
      <div className="modal-header">
        <h2>Please wait</h2>
      </div>
      <div className="modal-body">
        <p className="lead">Loading...</p>
      </div>
    </div>
  </Modal>
);
React.render(view, app);

$.get('/stat', (response) => {
  _.each(response, (value) => {
    let area = new Area(value.name);
    area.load(value.people);
    areas.push(area);
  });
  React.render(<Stat areas={areas} />, app);
});


