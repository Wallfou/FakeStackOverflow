import { useState, useCallback, useMemo } from 'react';
import { changeCommunityMembership } from '../services/communityService.ts';
import { DatabaseCommunity } from '../../../shared/types/community';

interface UseCommunityMembershipButtonReturn {
  isParticipant: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  buttonText: string;
  buttonDisabled: boolean;
  handleToggleMembership: () => Promise<void>;
}

const useCommunityMembershipButton = (
  community: DatabaseCommunity,
): UseCommunityMembershipButtonReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [localParticipants, setLocalParticipants] = useState<string[]>(
    community.participants || [],
  );

  const currentUsername = localStorage.getItem('username') || '';

  const isParticipant = useMemo(() => {
    if (!currentUsername) return false;
    return localParticipants.includes(currentUsername);
  }, [localParticipants, currentUsername]);

  const isAdmin = useMemo(() => {
    if (!currentUsername || !community.admin) return false;
    return community.admin === currentUsername;
  }, [community.admin, currentUsername]);

  const buttonText = useMemo(() => {
    if (!currentUsername) return 'login';
    if (isAdmin) return 'admin';
    if (isLoading) return isParticipant ? 'leaving...' : 'joining...';
    return isParticipant ? 'leave community' : 'join community';
  }, [currentUsername, isAdmin, isLoading, isParticipant]);

  const buttonDisabled = useMemo(() => {
    if (!currentUsername || isAdmin || isLoading) return true;
    return false;
  }, [currentUsername, isAdmin, isLoading]);

  const handleToggleMembership = useCallback(async () => {
    if (!currentUsername) {
      setError('not logged in, cant join or leave');
      return;
    }

    if (isAdmin) {
      setError('admins cant leave their own community');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await changeCommunityMembership(community._id.toString(), currentUsername);
      if ('error' in response) {
        throw new Error(response.error);
      }

      if (isParticipant) {
        setLocalParticipants(prev => prev.filter(participant => participant !== currentUsername));
      } else {
        setLocalParticipants(prev => [...prev, currentUsername]);
      }

      if (response.participants) {
        setLocalParticipants(response.participants);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'failed to update membership';
      setError(errorMessage);
      setLocalParticipants(community.participants || []);
    } finally {
      setIsLoading(false);
    }
  }, [currentUsername, isAdmin, community, isParticipant]);

  return {
    isParticipant,
    isAdmin,
    isLoading,
    error,
    buttonText,
    buttonDisabled,
    handleToggleMembership,
  };
};

export default useCommunityMembershipButton;
