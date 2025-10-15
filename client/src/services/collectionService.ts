import api from './config';
import {
  Collection,
  DatabaseCollection,
  PopulatedDatabaseCollection,
  CollectionResponse,
} from '../../../shared/types/collection';

export const getAllCollectionsByUsername = async (
  usernameToView: string,
  currentUsername: string,
): Promise<PopulatedDatabaseCollection[] | { error: string }> => {
  try {
    const res = await api.get(
      `/api/collection/user/${usernameToView}?currentUsername=${currentUsername}`,
    );

    if (res.status !== 200) {
      throw new Error('Error when fetching all collections');
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'Error when fetching all collections') {
      throw error;
    }
    throw new Error('Error when fetching all collections');
  }
};

/**
 * Fetches a single collection by ID with user authorization.
 * @param collectionId - The ID of the collection to fetch (path parameter)
 * @param username - The current user for authorization (query parameter)
 * @returns PopulatedDatabaseCollection object or error
 */
export const getCollectionById = async (
  collectionId: string,
  username: string,
): Promise<PopulatedDatabaseCollection | { error: string }> => {
  try {
    const res = await api.get(`/api/collection/${collectionId}?username=${username}`);

    if (res.status !== 200) {
      throw new Error('Error when fetching collection');
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'Error when fetching collection') {
      throw error;
    }
    throw new Error('Error when fetching collection');
  }
};

/**
 * Creates a new collection.
 * @param collection - The collection object to create
 * @returns The created DatabaseCollection object or error
 */
export const createCollection = async (
  collection: Collection,
): Promise<DatabaseCollection | { error: string }> => {
  try {
    const res = await api.post('/api/collection', collection);

    if (res.status !== 200) {
      throw new Error('Error when creating collection');
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'Error when creating collection') {
      throw error;
    }
    throw new Error('Error when creating collection');
  }
};

/**
 * Permanently removes a collection with user verification.
 * @param collectionId - The ID of the collection to delete (path parameter)
 * @param username - The current user for verification (query parameter)
 * @returns Deletion confirmation or error
 */
export const deleteCollection = async (
  collectionId: string,
  username: string,
): Promise<CollectionResponse> => {
  try {
    const res = await api.delete(`/api/collection/delete/${collectionId}?username=${username}`);

    if (res.status !== 200) {
      throw new Error('Error when deleting collection');
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'Error when deleting collection') {
      throw error;
    }
    throw new Error('Error when deleting collection');
  }
};

/**
 * Adds or removes a question from a collection using toggle logic.
 * @param collectionId - The ID of the collection
 * @param questionId - The ID of the question to toggle
 * @param username - The current user for authorization
 * @returns Operation result or error
 */
export const toggleSaveQuestion = async (
  collectionId: string,
  questionId: string,
  username: string,
): Promise<DatabaseCollection | { error: string }> => {
  try {
    const res = await api.patch('/api/collection/toggle-question', {
      collectionId,
      questionId,
      username,
    });

    if (res.status !== 200) {
      throw new Error('Error when toggling save question');
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'Error when toggling save question') {
      throw error;
    }
    throw new Error('Error when toggling save question');
  }
};
