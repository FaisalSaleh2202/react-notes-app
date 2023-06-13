import React from 'react';
import { Link } from 'react-router-dom';
import { getAllNotes, deleteNote } from '../utils/local-data';
import { getActiveNotes } from '../utils/network-data';
import NoteList from '../components/NoteList';
import { MdAddCircle } from 'react-icons/md';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';
import CircularIndeterminate from '../components/CircularProgressWithLabel';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
      notesResultSearch: getActiveNotes(),
      loading: true,
      keyword: props.defaultKeyword || '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  async componentDidMount() {
    this.state.loading = true;
    const { data } = await getActiveNotes();

    // this.state.notes = data;
    this.state.loading = false;
    this.setState(() => {
      return {
        notesResultSearch: data,
      };
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.keywordChange !== this.props.keywordChange) {
      const { data } = await getActiveNotes();

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

  async componentWillUnmount() {}

  onDeleteHandler(id) {
    deleteNote(Number(id));
    this.state(() => {
      return {
        notes: getAllNotes(),
      };
    });
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
            <>
              <section className='homepage'>
                <h2> {locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
                <SearchBar
                  keyword={this.state.keyword}
                  keywordChange={this.onKeywordChangeHandler}
                />
                {this.state.notesResultSearch.length ? (
                  <NoteList notes={this.state.notesResultSearch} />
                ) : (
                  <div className='notes-list-empty'>
                    <p>
                      {locale === 'id' ? 'No notes' : 'Tidak ada note aktif'}
                    </p>
                  </div>
                )}
              </section>
              <div className='homepage__action'>
                <Link to='/add'>
                  <button className='action' type='button'>
                    <MdAddCircle />
                  </button>
                </Link>
              </div>
            </>
          );
        }}
      </LocaleConsumer>
    );
  }
}

HomePage.propTypes = {
  keywordChange: PropTypes.func,
  defaultKeyword: PropTypes.string,
};

export default HomePageWrapper;
