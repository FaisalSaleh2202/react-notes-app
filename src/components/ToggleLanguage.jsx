import LocaleContext from '../contexts/ThemeContext';
import flagIdImg from '../assets/flag-indonesia_1f1ee-1f1e9.png';
import flagEnImg from '../assets/flag-united-states_1f1fa-1f1f8.png';

function ToggleLanguage() {
  return (
    <LocaleContext.Consumer>
      {({ locale, toggleLocale }) => {
        return (
          <button className='toggle-locale' onClick={toggleLocale}>
            {locale === 'id' ? (
              <img src={flagEnImg} alt='imageToggle' />
            ) : (
              <img src={flagIdImg} alt='imageToggle' />
            )}
          </button>
        );
      }}
    </LocaleContext.Consumer>
  );
}

export default ToggleLanguage;
