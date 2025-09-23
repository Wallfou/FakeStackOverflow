import './index.css';
import CommunityCard from '../communityCard';
import NewCommunityButton from '../newCommunityButton';

/**
 * Component for displaying all communities.
 * Uses the useAllCommunitiesPage hook for state management.
 * 
 * Note: You must preserve the class names for styling and testing purposes.
 * You can add additional class names if needed.
 */
const AllCommunitiesPage = () => {
  
  return (
    <div className='community-page'>
      <h2 className='community-title'>Communities</h2>
      <div className='community-controls'>
        <input
          className='community-search'
          placeholder='Search communities ...'
          type='text'
        />
        <NewCommunityButton />
      </div>
      <p className='community-error'>Error</p>
      <div className='communities-list'>
        {
          /**
           * Render CommunityCard components for each community.
           */
        }
      </div>
    </div>
  );
};

export default AllCommunitiesPage;
