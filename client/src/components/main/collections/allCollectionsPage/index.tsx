import './index.css';
import DeleteCollectionButton from '../../collections/deleteCollectionButton';
import useAllCollectionsPage from '../../../../hooks/useAllCollectionsPage';
import { useParams, useNavigate } from 'react-router-dom';
import { DatabaseCollection } from '../../../../../../shared/types/collection';

const AllCollectionsPage = () => {
  const { username = '' } = useParams();
  const navigate = useNavigate();
  const { collections, loading, error } = useAllCollectionsPage(username);
  const typedCollections = collections as DatabaseCollection[];

  return (
    <div className='collections-page'>
      <div className='collections-header'>
        <h1 className='collections-title'>{username}'s Collections</h1>
        <button className='collections-create-btn' onClick={() => navigate('/new/collection')}>
          Create Collection
        </button>
      </div>

      <div className='collections-list'>
        {loading && <div className='loading-message'>loading collections...</div>}

        {error && <div className='error-message'>{error}</div>}

        {!loading && !error && typedCollections.length === 0 && (
          <div className='loading-message'>no collection yet</div>
        )}

        {typedCollections.map(collection => (
          <div
            className='collection-card'
            key={collection._id.toString()}
            onClick={() => navigate(`/collections/${username}/${collection._id.toString()}`)}>
            <h2 className='collection-name'>{collection.name}</h2>
            <p className='collection-description'>{collection.description || 'No description'}</p>
            <p className='collection-privacy'>{collection.isPrivate ? 'Private' : 'Public'}</p>
            <p className='collection-questions'>{collection.questions.length} Questions</p>
            <DeleteCollectionButton collectionId={collection._id.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCollectionsPage;
