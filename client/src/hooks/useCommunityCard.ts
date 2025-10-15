import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseCommunity } from '../../../shared/types/community';

interface UseCommunityCardReturn {
  canViewCommunity: boolean;
  isParticipant: boolean;
  participantsCount: number;
  handleViewCommunity: () => void;
  displayDescription: string;
  isAdmin: boolean;
  isPrivate: boolean;
}

const useCommunityCard = (community: DatabaseCommunity): UseCommunityCardReturn => {
  const navigate = useNavigate();

  const currentUsername = localStorage.getItem('username') || '';

  const isPrivate = community.visibility?.toUpperCase() === 'PRIVATE';

  const isParticipant = useMemo(() => {
    if (!currentUsername || !community.participants) return false;
    return community.participants.includes(currentUsername);
  }, [community.participants, currentUsername]);

  const isAdmin = useMemo(() => {
    if (!currentUsername || !community.admin) return false;
    return community.admin === currentUsername;
  }, [community.admin, currentUsername]);

  const canViewCommunity = useMemo(() => {
    if (!isPrivate) return true;

    return isParticipant || isAdmin;
  }, [isPrivate, isParticipant, isAdmin]);

  const participantsCount = community.participants?.length || 0;

  const handleViewCommunity = () => {
    if (!canViewCommunity) {
      return;
    }
    navigate(`/community/${community._id.toString()}`);
  };

  const displayDescription = useMemo(() => {
    if (isPrivate && !canViewCommunity) {
      return 'This is a private community. Join to view details.';
    }

    return community.description || 'No description available';
  }, [isPrivate, community.description, canViewCommunity]);

  return {
    canViewCommunity,
    isParticipant,
    participantsCount,
    handleViewCommunity,
    displayDescription,
    isAdmin,
    isPrivate,
  };
};

export default useCommunityCard;
