import React from 'react';
import NoteInput from '../components/NoteInput.jsx';
import { addNote } from '../utils/network-data.js';
import { useNavigate } from 'react-router-dom';


function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate('/');
  }

  return (
    <section>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;
