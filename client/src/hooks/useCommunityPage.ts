import { useState, useEffect, useCallback } from 'react';
import { getCommunityById } from '../services/communityService.ts';
import { DatabaseCommunity } from '../../../shared/types/community';
import { io, Socket } from 'socket.io-client';

interface UseCommunityPageReturn {
  community: DatabaseCommunity | null;
  loading: boolean;
  error: string | null;
  refreshCommunity: () => Promise<void>;
  isParticipant: boolean;
  isAdmin: boolean;
  canViewCommunity: boolean;
}

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:8000';

const useCommunityPage = (communityId: string): UseCommunityPageReturn => {
  const [community, setCommunity] = useState<DatabaseCommunity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentUsername = localStorage.getItem('username') || '';
  const isParticipant = community?.participants?.includes(currentUsername) || false;
  const isAdmin = community?.admin === currentUsername || false;
  const canViewCommunity =
    community?.visibility?.toUpperCase() !== 'PRIVATE' || isParticipant || isAdmin;
  const fetchCommunity = useCallback(async () => {
    if (!communityId) {
      setError('no community id');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await getCommunityById(communityId);
      if ('error' in response) {
        throw new Error(response.error);
      }
      setCommunity(response);

      const isPrivate = response.visibility?.toUpperCase() === 'PRIVATE';
      const userIsParticipant = response.participants?.includes(currentUsername);
      const userIsAdmin = response.admin === currentUsername;
      if (isPrivate && !userIsParticipant && !userIsAdmin) {
        setError('you dont have permission to view');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed to fetch community');
      setCommunity(null);
    } finally {
      setLoading(false);
    }
  }, [communityId, currentUsername]);

  const refreshCommunity = useCallback(async () => {
    await fetchCommunity();
  }, [fetchCommunity]);

  useEffect(() => {
    fetchCommunity();
  }, [fetchCommunity]);

  useEffect(() => {
    if (!communityId) return;

    const socket: Socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    socket.emit('joinCommunity', communityId);

    const handleCommunityUpdate = (payload: {
      type: 'created' | 'updated' | 'deleted';
      community: DatabaseCommunity;
    }) => {
      if (payload.community._id.toString() === communityId) {
        if (payload.type === 'updated') {
          setCommunity(payload.community);

          const isPrivate = payload.community.visibility?.toUpperCase() === 'PRIVATE';
          const userIsParticipant = payload.community.participants?.includes(currentUsername);
          const userIsAdmin = payload.community.admin === currentUsername;
          if (isPrivate && !userIsParticipant && !userIsAdmin) {
            setError('you dont have permission to view');
          } else {
            setError(null);
          }
        } else if (payload.type === 'deleted') {
          setCommunity(null);
          setError('community deleted alr');
        }
      }
    };
    socket.on('communityUpdate', handleCommunityUpdate);

    return () => {
      socket.emit('leaveCommunity', communityId);
      socket.off('communityUpdate', handleCommunityUpdate);
      socket.disconnect();
    };
  }, [communityId, currentUsername]);

  return {
    community,
    loading,
    error,
    refreshCommunity,
    isParticipant,
    isAdmin,
    canViewCommunity,
  };
};

export default useCommunityPage;
