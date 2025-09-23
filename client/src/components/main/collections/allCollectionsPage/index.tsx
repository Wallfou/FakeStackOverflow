import './index.css';
import DeleteCollectionButton from '../../collections/deleteCollectionButton';

/**
 * Component for displaying all collections belonging to a user.
 * Uses the useAllCollectionsPage hook for state management.
 * 
 * Note: All classnames must be preserved for CSS styling and testing.
 * You can add more classnames as needed.
 */
const AllCollectionsPage = () => {

  return (
    <div className='collections-page'>
      <div className='collections-header'>
        <h1 className='collections-title'>Username's Collections</h1>
        <button className='collections-create-btn'>
            Create Collection if owner
          </button>
      </div>

      <div className='collections-list'>
        <div
            className='collection-card'
            onClick={() => alert('Navigate to collection details')}>
            <h2 className='collection-name'>Collection Name</h2>
            <p className='collection-description'>Collecton Desc</p>
            <p className='collection-privacy'>Collection Privacy</p>
            <p className='collection-questions'>Number of Questions in the collection</p>
            <DeleteCollectionButton collectionId='someId'/>
          </div>
      </div>
    </div>
  );
};

export default AllCollectionsPage;
