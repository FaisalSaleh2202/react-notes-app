import React from 'react';
import useInput from '../hooks/CustomHooks';
import { LocaleConsumer } from '../contexts/LocaleContext';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, onEmailChangeHandler] = useInput('');
  const [password, onPasswordChangeHandler] = useInput('');

  const onSubmitHandler = async event => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <form onSubmit={onSubmitHandler} className='input-login'>
            <label htmlFor='email'>Email</label>
            <input type='email' value={email} onChange={onEmailChangeHandler} />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              value={password}
              onChange={onPasswordChangeHandler}
            />
            <button>{locale === 'id' ? 'Masuk' : 'Login'}</button>
          </form>
        );
      }}
    </LocaleConsumer>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
