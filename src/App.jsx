import React from 'react';
import Navigation from './components/Navigation';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ArchivesPage from './pages/ArchivesPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { putAccessToken, getUserLogged } from './utils/network-data';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import { FaMoon, FaSun } from 'react-icons/fa';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
    };
    this.state = {
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        console.log('theme');

        this.setState(prevState => {
          // mendapatkan nilai tema baru berdasarkan state sebelumnya
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          // menyimpan nilai tema baru ke local storage
          localStorage.setItem('theme', newTheme);
          // mengembalikan state dengan nilai theme terbaru.
          return {
            theme: newTheme,
          };
        });
      },

      locale: localStorage.getItem('locale') || 'en',
      toggleLocale: () => {
        console.log('locale');
        this.setState(prevState => {
          const newLocale = prevState.locale === 'id' ? 'en' : 'id';
          localStorage.setItem('locale', newLocale);
          return {
            locale: newLocale,
          };
        });
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    // theme
    document.documentElement.setAttribute('data-theme', this.state.theme);

    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleContext.Provider value={this.state}>
          <div className='app-container'>
            <header>
              <h1>
                <Link to='/'>
                  {this.state.locale === 'id'
                    ? 'Aplikasi Catatan'
                    : 'Notes App'}
                </Link>
              </h1>
              <button
                className='toggle-locale'
                onClick={this.state.toggleLocale}>
                {this.state.locale == 'id' ? 'en' : 'id'}
              </button>
              <button className='toggle-theme' onClick={this.state.toggleTheme}>
                {this.state.theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </header>
            <main>
              <Routes>
                <Route
                  path='/*'
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                  path='*'
                  element={
                    <>
                      <h1>Page Not Found</h1>
                    </>
                  }
                />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      );
    }

    return (
      <>
        <LocaleContext.Provider value={this.state}>
          <ThemeContext.Provider value={this.state}>
            <div className='app-container'>
              <header>
                <h1>
                  <Link to='/'>
                    {this.state.locale === 'id'
                      ? 'Aplikasi Catatan'
                      : 'Notes App'}
                  </Link>
                  <span>
                    {this.state.authedUser ? this.state.authedUser.name : ''}
                  </span>
                </h1>
                <Navigation logout={this.onLogout} />
              </header>
              <main>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/add' element={<AddPage />} />
                  <Route path='/archives' element={<ArchivesPage />} />
                  <Route path='/notes/:id' element={<DetailPage />} />
                  <Route
                    path='*'
                    element={
                      <>
                        <h1>Page Not Found</h1>
                      </>
                    }
                  />
                </Routes>
              </main>
            </div>
          </ThemeContext.Provider>
        </LocaleContext.Provider>
      </>
    );
  }
}

export default App;
