import './index.css';

/**
 * Form component for creating a new collection.
 * Uses the useNewCollectionPage hook for form state management.
 
 * Note: Preserve the class names for styling and testing purposes.
 * You can add additional class names if needed.
*/
const NewCollectionPage = () => {
  
  return (
    <div className='new-collection-page'>
      <h1 className='new-collection-title'>Create New Collection</h1>

      <input
        type='text'
        placeholder='Collection Name'
        className='new-collection-input'
      />

      <input
        type='text'
        placeholder='Collection Description'
        className='new-collection-input'
      />

      <label className='new-collection-checkbox'>
        <input type='checkbox' checked={false} />
          Private Collection
      </label>

      <button className='new-collection-btn'>
        Create
      </button>

      <p className='new-collection-error'>Display proper error message</p>
    </div>
  );
};

export default NewCollectionPage;
