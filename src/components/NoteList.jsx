import NoteItem from './NoteItem';
import PropTypes from 'prop-types';

function NoteList({ notes }) {
  return (
    <section className='notes-list'>
      {notes.map(note => {
        return <NoteItem key={note.id} {...note}></NoteItem>;
      })}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default NoteList;
