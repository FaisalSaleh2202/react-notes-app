import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function DeleteButton({ onDelete }) {
  const navigate = useNavigate();

  return (
    <button
      className='action'
      type='button'
      title='delete'
      onClick={() => {
        onDelete();
        navigate('/');
      }}>
      <MdDelete />
    </button>
  );
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
