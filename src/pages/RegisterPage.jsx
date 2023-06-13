import React from 'react';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    await register(user);
    navigate('/');
  }
  return (
    <>
      <section className='register-page'>
        <h2>Isi form untuk mendaftar akun</h2>
        <RegisterInput register={onRegisterHandler}></RegisterInput>
        <p>
          Sudah punya akun? <Link to='/*'>Login di sini.</Link>
        </p>
      </section>
    </>
  );
}

export default RegisterPage;
