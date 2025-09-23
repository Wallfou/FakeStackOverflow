import './index.css';
import { DatabaseCommunity } from '../../../../types/types';
import CommunityMembershipButton from '../communityMembershipButton';

/**
 * Card component for displaying community information.
 * Uses the useCommunityCard hook for membership status.
 * 
 * @param cardInput - Object containing community data and error reporting function.
 * 
 * Note: Preserve all class names for styling and testing purposes.
 * You may add new class names as needed.
 */
const CommunityCard = (cardInput: {
  community: DatabaseCommunity;
  setError: (error: string | null) => void;
}) => {

  return (
    <div className='community-card'>
      <h3 className='community-card-title'>Name</h3>
      <p className='community-card-description'>Description</p>
      <p className='community-card-meta'>
        <strong>Visibility:</strong> private
      </p>
      <p className='community-card-meta'>
        <strong>Participants:</strong> Count
      </p>
      <div className='community-card-actions'>
        <button className='btn-action-community'>
          View Community
        </button>
        {/* Add a button to join or leave the community */}
      </div>
    </div>
  );
};

export default CommunityCard;
