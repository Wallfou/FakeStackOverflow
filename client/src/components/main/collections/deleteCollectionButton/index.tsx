import './index.css';

/**
 * Button component for deleting a collection.
 * Uses the useDeleteCollectionButton hook for deletion logic.
 * 
 * @param collectionId - The ID of the collection to be deleted.
 * 
 * Note: All classnames must be preserved for CSS styling and testing.
 * You can add more classnames as needed.
 */
const DeleteCollectionButton = ({ collectionId }: { collectionId: string }) => {
  
  return (
    <div className='delete-collection-wrapper'>
      <button
        className='delete-collection-button'
        onClick={event => {
          event.stopPropagation();
        }}>
        Delete Collection
      </button>
    </div>
  );
};


export default DeleteCollectionButton;
