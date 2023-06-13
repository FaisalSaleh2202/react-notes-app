import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';

function NoteItem({ title, body, createdAt, id, archived, owner }) {
  const randColorArray = ['#F2BE22', '#00DFA2', '#00C4FF', 'FF78C4', 'FFE569'];

  const randColor = () => {
    return (
      randColorArray[Math.floor(Math.random() * randColorArray.length)] ||
      '#F2BE22'
    );
  };

  return (
    <div
      className='note-item'
      key={id}
    >
      <h3 className='note-item__title'>
        <Link to={`/notes/${id}`}>{title}</Link>{' '}
      </h3>
      <h4 className='note-item__date'>{showFormattedDate(createdAt)}</h4>
      <p className='note-item__body'>{body}</p>
      <span>{archived}</span>
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  owner: PropTypes.string,
};

export default NoteItem;
