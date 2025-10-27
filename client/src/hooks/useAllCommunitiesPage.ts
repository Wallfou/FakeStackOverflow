import { useState, useEffect, useCallback } from 'react';
import { getCommunities } from '../services/communityService.ts';
import { DatabaseCommunity } from '../../../shared/types/community';
import useUserContext from './useUserContext';

interface UseAllCommunitiesPageReturn {
  communities: DatabaseCommunity[];
  loading: boolean;
  error: string | null;
  refreshCommunities: () => Promise<void>;
}

/**
 * Custom hook for managing the state of all communities.
 * Fetches communities on mount and handles real-time updates via socket events.
 *
 * @returns Object containing communities array, loading state, error state, and refresh function
 */
const useAllCommunitiesPage = (): UseAllCommunitiesPageReturn => {
  const [communities, setCommunities] = useState<DatabaseCommunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useUserContext();

  const fetchCommunities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCommunities();
      if ('error' in response) {
        throw new Error(response.error);
      }
      if (!Array.isArray(response)) {
        throw new Error('invalid response');
      }
      setCommunities(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed to fetch communities');
      setCommunities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshCommunities = useCallback(async () => {
    await fetchCommunities();
  }, [fetchCommunities]);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  useEffect(() => {
    if (!socket) return;

    const handleCommunityUpdate = (payload: {
      type: 'created' | 'updated' | 'deleted';
      community: DatabaseCommunity;
    }) => {
      setCommunities(prev => {
        if (payload.type === 'created') {
          return [...prev, payload.community];
        }
        if (payload.type === 'updated') {
          return prev.map(c =>
            String(c._id) === String(payload.community._id) ? payload.community : c,
          );
        }
        return prev.filter(c => String(c._id) !== String(payload.community._id));
      });
    };

    socket.on('communityUpdate', handleCommunityUpdate);
    return () => {
      socket.off('communityUpdate', handleCommunityUpdate);
    };
  }, [socket]);

  return {
    communities,
    loading,
    error,
    refreshCommunities,
  };
};

export default useAllCommunitiesPage;
