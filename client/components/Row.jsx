import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Day from './Day.jsx';

// each td hs fixed width and length
const Row = ({ days }) => (
  <tr>
    {days.map((day) => (
      <td key={shortid.generate()}>
        <Day day={day.day} morning={day.morning} lunch={day.lunch} />
      </td>
    ))}
  </tr>
);

export default Row;
