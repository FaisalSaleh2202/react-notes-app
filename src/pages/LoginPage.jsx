import React from 'react';
import { login } from '../utils/network-data';
import { useNavigate, Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { LocaleConsumer } from '../contexts/LocaleContext';
import PropTypes from 'prop-types'

function LoginPage({ loginSuccess }) {
  const navigate = useNavigate();

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
    console.log(data);
    navigate('/');
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className='login-page'>
            <h2>
              {locale === 'id'
                ? 'Yuk, login untuk menggunakan aplikas'
                : 'Login to use app, please'}
            </h2>
            <LoginInput login={onLogin} />
            <p>
              {locale === 'id'
                ? 'Belum Punya Akun ?'
                : "Don't have an account ?"}
              <Link to='/register'>
                {locale === 'id' ? 'Daftar Disini' : ' Register here'}
              </Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
