import './index.css';
import CommunityMembershipButton from '../communityMembershipButton';
import useCommunityPage from '../../../../hooks/useCommunityPage';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteCommunity } from '../../../../services/communityService.ts';
import { useState } from 'react';

/**
 * Component for displaying a single community with members and details.
 * Uses the useCommunityPage hook for state management and real-time updates.
 */
const CommunityPage = () => {
  const { communityId = '' } = useParams();
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { community, loading, error, isAdmin, canViewCommunity } = useCommunityPage(communityId);

  const handleDeleteCommunity = async () => {
    if (!isAdmin) return;
    try {
      setIsDeleting(true);
      setDeleteError(null);

      const username = localStorage.getItem('username') || '';
      const response = await deleteCommunity(communityId, username);
      if ('error' in response) {
        throw new Error(response.error);
      }
      navigate('/communities');
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'failed to delete community');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className='loading-message'>loading community...</div>;
  }

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  if (!community) {
    return <div className='error-message'>community not found</div>;
  }

  if (!canViewCommunity) {
    return (
      <div className='error-message'>
        you don't have permnission to view this community, its private
      </div>
    );
  }
  return (
    <div className='community-page-layout'>
      <main className='questions-section'>
        <h3 className='section-heading'>Questions</h3>
        <div className='no-questions-message'>no questiosn in communities</div>
      </main>

      <div className='community-sidebar'>
        <h2 className='community-title'>Name</h2>
        <p className='community-description'>{community.description || 'no description'}</p>
        {isAdmin && (
          <>
            <button
              className='delete-community-btn'
              onClick={handleDeleteCommunity}
              disabled={isDeleting}>
              {isDeleting ? 'deleting rn...' : 'delete community'}
            </button>
            {deleteError && <p className='error-message'>{deleteError}</p>}
          </>
        )}

        <CommunityMembershipButton community={community} />

        <div className='community-members'>
          <h3 className='section-heading'>Members: ({community.participants?.length || 0})</h3>
          <ul className='members-list'>
            {community.admin && <li className='member-item'>{community.admin} (Admin)</li>}
            {community.participants?.map(
              participant =>
                participant !== community.admin && (
                  <li key={participant} className='member-item'>
                    {participant}
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
