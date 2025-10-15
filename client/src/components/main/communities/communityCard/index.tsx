import './index.css';
import { DatabaseCommunity } from '../../../../types/types';
import CommunityMembershipButton from '../communityMembershipButton';
import useCommunityCard from '../../../../hooks/useCommunityCard';

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
  const { community } = cardInput;

  const {
    canViewCommunity,
    participantsCount,
    handleViewCommunity,
    displayDescription,
    isPrivate,
  } = useCommunityCard(community);

  return (
    <div className='community-card'>
      <h3 className='community-card-title'>{community.name}</h3>
      <p className='community-card-description'>{displayDescription}</p>
      <p className='community-card-meta'>
        <strong>Visibility:</strong> {isPrivate ? 'Private' : 'Public'}
      </p>
      <p className='community-card-meta'>
        <strong>Participants:</strong> {participantsCount}
      </p>
      <div className='community-card-actions'>
        <button
          className='btn-action-community'
          onClick={handleViewCommunity}
          disabled={!canViewCommunity}>
          {canViewCommunity ? 'View Community' : 'Members Only'}
        </button>
        <CommunityMembershipButton community={community} />
      </div>
    </div>
  );
};

export default CommunityCard;
