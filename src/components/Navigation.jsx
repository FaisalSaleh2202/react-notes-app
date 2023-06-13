import React from 'react';
import { Link } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';
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
            <nav className='navigation'>
              <ToggleLanguage />
              <ToggleTheme />
              <ul>
                <li>
                  <Link to='/archives'>
                    {locale === 'id' ? 'Arsip' : 'Archived'}
                  </Link>
                </li>
              </ul>
            </nav>
            <button className='button-logout' onClick={logout}>
              <TbLogout />
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
