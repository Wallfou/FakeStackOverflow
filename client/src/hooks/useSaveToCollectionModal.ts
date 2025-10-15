import { useState, useEffect, useCallback } from 'react';
import { getAllCollectionsByUsername, toggleSaveQuestion } from '../services/collectionService.ts';
import { DatabaseCollection } from '../../../shared/types/collection';

interface CollectionWithSaveStatus extends DatabaseCollection {
  isSaved: boolean;
}

function useSaveToCollectionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [collections, setCollections] = useState<CollectionWithSaveStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = useCallback((questionId: string) => {
    setCurrentQuestionId(questionId);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setCurrentQuestionId(null);
    setError(null);
  }, []);

  const fetchCollections = useCallback(async () => {
    if (!currentQuestionId) return;

    const username = localStorage.getItem('username');
    if (!username) {
      setError('username not found, pls login');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCollectionsByUsername(username, username);

      if ('error' in response) {
        throw new Error(response.error);
      }

      const collections = response as DatabaseCollection[];
      const collectionsWithStatus: CollectionWithSaveStatus[] = collections.map(collection => ({
        ...collection,
        isSaved: collection.questions.some(qId => qId.toString() === currentQuestionId),
      }));
      setCollections(collectionsWithStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed to fetch collections');
      setCollections([]);
    } finally {
      setLoading(false);
    }
  }, [currentQuestionId]);

  const toggleQuestionInCollection = useCallback(
    async (collectionId: string) => {
      if (!currentQuestionId) return;

      const username = localStorage.getItem('username');
      if (!username) return;

      try {
        const response = await toggleSaveQuestion(collectionId, currentQuestionId, username);

        if ('error' in response) {
          throw new Error(response.error);
        }
        setCollections(prev =>
          prev.map(col => {
            if (col._id.toString() === collectionId) {
              return { ...col, isSaved: !col.isSaved };
            }
            return col;
          }),
        );
      } catch (err) {
        setError('failed to update collection');
      }
    },
    [currentQuestionId],
  );

  useEffect(() => {
    if (isOpen && currentQuestionId) {
      fetchCollections();
    }
  }, [isOpen, currentQuestionId, fetchCollections]);

  return {
    isOpen,
    openModal,
    closeModal,
    collections,
    loading,
    error,
    toggleQuestionInCollection,
  };
}

export default useSaveToCollectionModal;
