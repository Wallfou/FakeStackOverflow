import api from './config';
import { Community, DatabaseCommunity, CommunityResponse } from '../../../shared/types/community';

export const getCommunityById = async (
  communityId: string,
): Promise<DatabaseCommunity | { error: string }> => {
  try {
    const res = await api.get(`/api/community/${communityId}`);
    if (res.status !== 200) {
      throw new Error('error fetching community');
    }
    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'error fetching community') {
      throw error;
    }
    throw new Error('error fetching community');
  }
};

export const getCommunities = async (): Promise<DatabaseCommunity[] | { error: string }> => {
  try {
    const res = await api.get('/api/community');
    if (res.status !== 200) {
      throw new Error('error fetching all communities');
    }
    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'error fetching all communities') {
      throw error;
    }
    throw new Error('error fetching all communities');
  }
};

export const changeCommunityMembership = async (
  communityId: string,
  username: string,
): Promise<DatabaseCommunity | { error: string }> => {
  try {
    const res = await api.post('/api/community/membership', {
      communityId,
      username,
    });
    if (res.status !== 200) {
      throw new Error('error toggling community membership');
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'error toggling community membership') {
      throw error;
    }
    throw new Error('error toggling community membership');
  }
};

export const createCommunity = async (
  community: Community,
): Promise<DatabaseCommunity | { error: string }> => {
  try {
    const res = await api.post('/api/community', community);
    if (res.status !== 200) {
      throw new Error('error creating community');
    }
    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'error creating community') {
      throw error;
    }
    throw new Error('error creating community');
  }
};

export const deleteCommunity = async (
  communityId: string,
  username: string,
): Promise<CommunityResponse> => {
  try {
    const res = await api.delete(`/api/community/${communityId}`, {
      data: { username },
    });
    if (res.status !== 200) {
      throw new Error('error deleting community');
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'error deleting community') {
      throw error;
    }
    throw new Error('error deleting community');
  }
};
