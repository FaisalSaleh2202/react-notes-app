import React from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';


class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onBodyChangeHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <form
        className='add-new-page__input'
        onSubmit={this.onSubmitEventHandler}>
        <input
          type='text'
          value={this.state.title}
          onChange={this.onTitleChangeHandler}
          className='add-new-page__input__title'
          placeholder='Catatan Rahasia'
        />
        <textarea
          className='add-new-page__input__body'
          // contentEditable='true'
          placeholder='Sebenarnya saya adalah ....'
          value={this.state.body}
          onChange={this.onBodyChangeHandler}></textarea>

        <div className='add-new-page__action'>
          <button className='action' type='submit' title='simpan'>
            <MdDone />
          </button>
        </div>
      </form>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
