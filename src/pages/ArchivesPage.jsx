import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import NoteList from '../components/NoteList';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';
import CircularIndeterminate from '../components/CircularProgressWithLabel';

function ArchivesPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivesPage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      notesResultSearch: '',
      keyword: props.defaultKeyword || '',
      loading: true,
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    this.state.loading = true;

    const { data } = await getArchivedNotes();

    this.state.loading = false;

    // this.state.notes = data;
    this.setState(() => {
      return {
        notesResultSearch: data,
      };
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.keywordChange !== this.props.keywordChange) {
      const { data } = await getArchivedNotes();

      this.state.notesResultSearch = data;

      const notes = this.state.notesResultSearch.filter(note => {
        return note.title
          .toLocaleLowerCase()
          .includes(this.state.keyword.toLocaleLowerCase());
      });

      this.setState(() => {
        return { notesResultSearch: notes };
      });
    }
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });
    this.props.keywordChange(keyword);
  }

  render() {
    if (this.state.loading) {
      return <CircularIndeterminate />;
    }

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section className='archives-page'>
              <h2> {locale === 'id' ? 'Catatan Arsip' : 'Archived Note'} </h2>
              <SearchBar
                keyword={this.state.keyword}
                keywordChange={this.onKeywordChangeHandler}
              />
              {this.state.notesResultSearch.length ? (
                <NoteList notes={this.state.notesResultSearch} />
              ) : (
                <div className='notes-list-empty'>
                  <p>Tidak Ada Note Arsip</p>
                </div>
              )}
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ArchivesPage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivesPageWrapper;
