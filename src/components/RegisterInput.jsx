import React from 'react';
import useInput from '../hooks/CustomHooks';
import PropTypes from 'prop-types'

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPassword] = useInput('');

  const onSubmitHandlder = event => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className='input-register' onSubmit={onSubmitHandlder}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' value={name} onChange={handleNameChange} />
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        id='email'
        value={email}
        onChange={handleEmailChange}
      />
      <label htmlFor='passwrod'>Password</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={handlePasswordChange}
      />
      <label htmlFor='passwrod'>Confrim Password</label>
      <input
        type='password'
        id='confirmPassword'
        value={confirmPassword}
        onChange={handleConfirmPassword}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
