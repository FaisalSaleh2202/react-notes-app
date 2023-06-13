import DeleteButton from './DeleteButton';
import ArchiveButton from './ArchiveButton';
import UnArchiveButton from './UnArchiveButton';
import PropTypes from 'prop-types';

function NoteItemDetail({
  title,
  archived,
  createdAt,
  body,
  onDelete,
  onArchive,
  onUnArchive,
}) {
  console.log(archived, title);
  return (
    <section className='detail-page' >
      <h3 className='detail-page__title'>{title}</h3>
      <p className='detail-page__createdAt'>{createdAt}</p>
      <div className='detail-page__body'>{body}</div>
      <div className='detail-page__action'>
        {archived ? (
          <UnArchiveButton onUnArchive={onUnArchive} />
        ) : (
          <ArchiveButton onArchive={onArchive} />
        )}
        <DeleteButton onDelete={onDelete} />
      </div>
    </section>
  );
}

NoteItemDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnArchive: PropTypes.func.isRequired,
};

export default NoteItemDetail;
