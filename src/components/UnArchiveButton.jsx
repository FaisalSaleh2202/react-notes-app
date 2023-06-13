import { useNavigate } from 'react-router-dom';
import { MdUnarchive } from 'react-icons/md';
import PropTypes from 'prop-types';

function UnArchiveButton({ onUnArchive }) {
  const navigate = useNavigate();
  return (
    <button
      className='action'
      onClick={() => {
        onUnArchive();
        navigate('/');
      }}>
      <MdUnarchive />
    </button>
  );
}

UnArchiveButton.propTypes = {
  onUnArchive: PropTypes.func.isRequired,
};

export default UnArchiveButton;
