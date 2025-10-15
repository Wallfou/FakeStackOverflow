import './index.css';
import useNewCollectionPage from '../../../../hooks/useNewCollectionPage';

/**
 * Form component for creating a new collection.
 * Uses the useNewCollectionPage hook for form state management.
 
 * Note: Preserve the class names for styling and testing purposes.
 * You can add additional class names if needed.
*/
const NewCollectionPage = () => {
  const {
    name,
    description,
    isPrivate,
    loading,
    error,
    setName,
    setDescription,
    setIsPrivate,
    postCollection,
  } = useNewCollectionPage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postCollection();
  };

  return (
    <div className='new-collection-page'>
      <h1 className='new-collection-title'>Create New Collection</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='collection name'
          className='new-collection-input'
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={loading}
          required
        />

        <input
          type='text'
          placeholder='collection description'
          className='new-collection-input'
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={loading}
        />

        <label className='new-collection-checkbox'>
          <input
            type='checkbox'
            checked={isPrivate}
            onChange={e => setIsPrivate(e.target.checked)}
            disabled={loading}
          />
          Private Collection
        </label>

        <button type='submit' className='new-collection-btn' disabled={loading}>
          {loading ? 'creating rn...' : 'Create'}
        </button>
      </form>

      {error && <p className='new-collection-error'>{error}</p>}
    </div>
  );
};

export default NewCollectionPage;
