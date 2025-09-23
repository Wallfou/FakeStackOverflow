import './index.css';
import { DatabaseCommunity } from '../../../../types/types';

/**
 * Button component for joining/leaving communities.
 * Uses the useCommunityMembershipButton hook for toggle functionality.

 * @param community - The community whose membership status is being managed.

 * Note: Preserve the class names for styling purposes and testing purposes.
 * You can add more class names if needed.
*/
const CommunityMembershipButton = ({ community }: { community: DatabaseCommunity }) => {

  return (
    <>
      <button className='btn-action-community'>
        Join or Leave
      </button>
      <p className='community-error'>Error Message</p>
    </>
  );
};

export default CommunityMembershipButton;
