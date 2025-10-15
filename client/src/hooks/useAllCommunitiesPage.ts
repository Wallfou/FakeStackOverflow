import { useState, useEffect, useCallback } from 'react';
import { getCommunities } from '../services/communityService.ts';
import { DatabaseCommunity } from '../../../shared/types/community';
import { io, Socket } from 'socket.io-client';

interface UseAllCommunitiesPageReturn {
  communities: DatabaseCommunity[];
  loading: boolean;
  error: string | null;
  refreshCommunities: () => Promise<void>;
}

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL ?? 'http://localhost:4000';

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
    const socket: Socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    const handleCommunityUpdate = (payload: {
      type: 'created' | 'updated' | 'deleted';
      community: DatabaseCommunity;
    }) => {
      if (payload.type === 'created') {
        setCommunities(prev => [...prev, payload.community]);
      } else if (payload.type === 'updated') {
        setCommunities(prev =>
          prev.map(community =>
            community._id.toString() === payload.community._id.toString()
              ? payload.community
              : community,
          ),
        );
      } else if (payload.type === 'deleted') {
        setCommunities(prev =>
          prev.filter(community => community._id.toString() !== payload.community._id.toString()),
        );
      }
    };

    socket.on('communityUpdate', handleCommunityUpdate);
    return () => {
      socket.off('communityUpdate', handleCommunityUpdate);
      socket.disconnect();
    };
  }, []);

  return {
    communities,
    loading,
    error,
    refreshCommunities,
  };
};

export default useAllCommunitiesPage;
