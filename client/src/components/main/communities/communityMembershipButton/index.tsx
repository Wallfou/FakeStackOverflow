import './index.css';
import { DatabaseCommunity } from '../../../../types/types';
import useCommunityMembershipButton from '../../../../hooks/useCommunityMembershipButton';

/**
 * Button component for joining/leaving communities.
 * Uses the useCommunityMembershipButton hook for toggle functionality.

 * @param community - The community whose membership status is being managed.

 * Note: Preserve the class names for styling purposes and testing purposes.
 * You can add more class names if needed.
*/
const CommunityMembershipButton = ({ community }: { community: DatabaseCommunity }) => {
  const { error, buttonText, buttonDisabled, handleToggleMembership } =
    useCommunityMembershipButton(community);

  return (
    <>
      <button
        className='btn-action-community'
        onClick={handleToggleMembership}
        disabled={buttonDisabled}>
        {buttonText}
      </button>
      {error && <p className='community-error'>{error}</p>}
    </>
  );
};

export default CommunityMembershipButton;
