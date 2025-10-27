import api from './config';
import { Community, DatabaseCommunity, CommunityResponse } from '../../../shared/types/community';

/**
 * Fetch a singple community by ID.
 * @param communityId the unique ID of the community to fetch.
 * @returns Resolves with the coimmunity record or an error object.
 */
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

/**
 * Fetch all communities.
 * @returns resolves with an array of communities.
 */
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

/**
 * Toggles a user's membership in a community.
 * Joines if not a member, leave if already a member.
 * @param communityId the target community id.
 * @param username The username whose membership is being toggled.
 * @returns Resolves with the updated community record.
 */
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

/**
 * Create a new community.
 * @param community The community payload to create with name, description, and creatorUsername.
 * @returns Resolves with the community created.
 */
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

/**
 * Deletes a community by id.
 * @param communityId The unique ID of the community to delete.
 * @param username The username performing the deletion for auth.
 * @returns Resolves with a sever confirming deletion or failure.
 */
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
