import './index.css';
import DeleteCollectionButton from '../deleteCollectionButton';
import QuestionView from '../../questionPage/question';

/**
 * Component for displaying a single collection with its questions.
 * Uses the useCollectionPage hook for state management and real-time updates.
 */
const CollectionPage = () => {

  return (
    <div className='collection-page'>
      <div className='collection-header'>
        <div className='header-row'>
          <h1 className='collection-title'>Collection Name</h1>
          <DeleteCollectionButton collectionId="someId" />
        </div>
        <p className='collection-description'>Collection Description</p>
        <p className='collection-meta'>
          {"Public or Private Collection and by which user"}
        </p>
      </div>

      <div className='questions-list'>
        <h1> Collection of Question Views</h1>
      </div>
    </div>
  );
};

export default CollectionPage;
