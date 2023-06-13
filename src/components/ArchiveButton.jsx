import { useNavigate } from 'react-router-dom';
import { MdArchive } from 'react-icons/md';
import PropTypes from 'prop-types';

function ArchiveButton({ onArchive }) {
  const navigate = useNavigate();
  return (
    <button
      className='action'
      onClick={() => {
        onArchive();
        navigate('/');
      }}>
      <MdArchive />
    </button>
  );
}
export default ArchiveButton;

ArchiveButton.propTypes = {
  onArchive: PropTypes.func.isRequired,
};
