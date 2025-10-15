import './index.css';
import CommunityCard from '../communityCard';
import NewCommunityButton from '../newCommunityButton';
import useAllCommunitiesPage from '../../../../hooks/useAllCommunitiesPage';
import { useState, useMemo } from 'react';

/**
 * Component for displaying all communities.
 * Uses the useAllCommunitiesPage hook for state management.
 *
 * Note: You must preserve the class names for styling and testing purposes.
 * You can add additional class names if needed.
 */
const AllCommunitiesPage = () => {
  const { communities, loading, error } = useAllCommunitiesPage();
  const [searchTerm, setSearchTerm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const filteredCommunities = useMemo(() => {
    if (!searchTerm.trim()) return communities;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return communities.filter(
      community =>
        community.name.toLowerCase().includes(lowerSearchTerm) ||
        (community.description && community.description.toLowerCase().includes(lowerSearchTerm)),
    );
  }, [communities, searchTerm]);

  return (
    <div className='community-page'>
      <h2 className='community-title'>Communities</h2>
      <div className='community-controls'>
        <input
          className='community-search'
          placeholder='Search communities ...'
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <NewCommunityButton />
      </div>
      {(error || localError) && <p className='community-error'>{error || localError}</p>}
      {loading && <div className='loading-message'>loading communities rn...</div>}
      <div className='communities-list'>
        {!loading && !error && filteredCommunities.length === 0 && (
          <div className='no-communities-message'>
            {searchTerm
              ? 'there are no communities matching ur search'
              : 'there are no communities yet'}
          </div>
        )}
        {filteredCommunities.map(community => (
          <CommunityCard
            key={community._id.toString()}
            community={community}
            setError={setLocalError}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCommunitiesPage;
