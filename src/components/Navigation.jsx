import React from 'react';
import { Link } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ToggleTheme from './ToggleTheme';
import ToggleLanguage from './ToggleLanguage';
import { LocaleConsumer } from '../contexts/LocaleContext';

function Navigation({ logout }) {

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <>
            <ToggleLanguage />
            <ToggleTheme />
            <nav className='navigation'>
              <ul>
                <li>
                  <Link to='/archives'>
                    {' '}
                    {locale === 'id' ? 'Arsip' : 'Archived'}
                  </Link>
                </li>
              </ul>
            </nav>
            <button className='button-logout' onClick={logout}>
              <FaPowerOff />
            </button>
          </>
        );
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navigation;
