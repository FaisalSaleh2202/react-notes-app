import React from 'react';
import { useParams } from 'react-router-dom';
import {
  deleteNote,
  getActiveNotes,
  getNote,
  getArchivedNotes,
  unarchiveNote,
  archiveNote,
} from '../utils/network-data';
import NoteItemDetail from '../components/NoteItemDetail';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';
import CircularIndeterminate from '../components/CircularProgressWithLabel';

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={String(id)} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
      loading: true,
    };

    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    this.onUnArchiveNoteHandler = this.onUnArchiveNoteHandler.bind(this);
  }

  async componentDidMount() {
    this.state.loading = true;

    const { data } = await getNote(this.props.id);

    this.state.loading = false;

    this.setState(() => {
      return {
        note: data,
      };
    });
  }

  async onDeleteNoteHandler() {
    await deleteNote(this.props.id);

    // update the contact state from api.js
    const { data } = getActiveNotes();
    this.setState(() => {
      return {
        note: data,
      };
    });
  }

  onArchiveNoteHandler() {
    const id = this.state.note.id;
    archiveNote(id);
    this.setState(() => {
      return {
        note: getActiveNotes(),
      };
    });
  }

  onUnArchiveNoteHandler() {
    const id = this.state.note.id;
    unarchiveNote(id);
    this.setState(() => {
      return {
        note: getArchivedNotes(),
      };
    });
  }

  render() {
    if (this.state.loading) {
      return <CircularIndeterminate />;
    }
    return (
      <>
        <NoteItemDetail
          title={this.state.note.title}
          body={this.state.note.body}
          createdAt={showFormattedDate(this.state.note.createdAt)}
          onDelete={this.onDeleteNoteHandler}
          onArchive={this.onArchiveNoteHandler}
          onUnArchive={this.onUnArchiveNoteHandler}
          archived={this.state.note.archived}
        />
      </>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
