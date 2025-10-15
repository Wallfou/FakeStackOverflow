import './index.css';
import DeleteCollectionButton from '../deleteCollectionButton';
import QuestionView from '../../questionPage/question';
import useCollectionPage from '../../../../hooks/useCollectionPage';
import { useParams } from 'react-router-dom';
import { PopulatedDatabaseCollection } from '../../../../../../shared/types/collection';

/**
 * Component for displaying a single collection with its questions.
 * Uses the useCollectionPage hook for state management and real-time updates.
 */
const CollectionPage = () => {
  const { collectionId = '' } = useParams();
  const { collection, loading, error } = useCollectionPage(collectionId);
  const typedCollection = collection as PopulatedDatabaseCollection | null;

  const description = typedCollection?.description
    ? String(typedCollection.description)
    : undefined;
  const isPrivate = typedCollection?.isPrivate;
  const username = typedCollection?.username;
  const questions = typedCollection?.questions || [];

  return (
    <div className='collection-page'>
      <div className='collection-header'>
        <div className='header-row'>
          <h1 className='collection-title'>
            {typedCollection ? typedCollection.name : 'Collection Name'}
          </h1>
          <DeleteCollectionButton collectionId={typedCollection?._id?.toString() || ''} />
        </div>
        <p className='collection-description'>{description}</p>
        <p className='collection-meta'>
          {isPrivate !== undefined && username
            ? `${isPrivate ? 'Private' : 'Public'} Collection by ${username}`
            : 'Public or Private Collection and by which user'}
        </p>
      </div>

      <div className='questions-list'>
        {loading && <div className='loading-message'>Loading collection...</div>}
        {error && <div className='error-message'>{error}</div>}
        {!loading && !error && questions.length === 0 && <h1> Collection of Question Views</h1>}
        {questions.length > 0 &&
          questions.map(q => <QuestionView question={q} key={q._id?.toString() || ''} />)}
      </div>
    </div>
  );
};

export default CollectionPage;
