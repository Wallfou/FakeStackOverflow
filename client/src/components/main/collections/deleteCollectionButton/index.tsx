import useDeleteCollectionButton from '../../../../hooks/useDeleteCollectionButton';
import './index.css';

/**
 * Button component for deleting a collection.
 * Uses the useDeleteCollectionButton hook for deletion logic.
 * @param collectionId - The ID of the collection to be deleted.
 *
 * Note: All classnames must be preserved for CSS styling and testing.
 * You can add more classnames as needed.
 */
const DeleteCollectionButton = ({ collectionId }: { collectionId: string }) => {
  const { handleDelete, confirmDelete, cancelDelete, loading, error, showConfirmation } =
    useDeleteCollectionButton(collectionId);

  return (
    <>
      <div className='delete-collection-wrapper'>
        <button
          className='delete-collection-button'
          onClick={async event => {
            event.stopPropagation();
            await handleDelete();
          }}
          disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Collection'}
        </button>
      </div>

      {showConfirmation && (
        <div
          className='confirmation-overlay'
          onClick={e => {
            e.stopPropagation();
            cancelDelete();
          }}>
          <div className='confirmation-dialog' onClick={e => e.stopPropagation()}>
            <h3>Confirm Deletion</h3>
            <p>are you sure you want to delete this cannot be undone</p>
            {error && <div className='error-message'>{error}</div>}
            <div className='confirmation-buttons'>
              <button className='confirm-button' onClick={confirmDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
              </button>
              <button className='cancel-button' onClick={cancelDelete} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteCollectionButton;
