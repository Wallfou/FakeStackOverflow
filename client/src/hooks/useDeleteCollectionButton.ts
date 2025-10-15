import { useState } from 'react';
import { deleteCollection } from '../services/collectionService.ts';

interface UseDeleteCollectionButtonReturn {
  handleDelete: () => Promise<void>;
  confirmDelete: () => void;
  cancelDelete: () => void;
  loading: boolean;
  error: string | null;
  showConfirmation: boolean;
}

function useDeleteCollectionButton(
  collectionId: string,
  onDeleted?: () => void,
): UseDeleteCollectionButtonReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState(false);

  const handleDelete = async () => {
    setError(null);
    setConfirmation(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        throw new Error('no username found, please login');
      }
      const response = await deleteCollection(collectionId, username);

      if ('error' in response) {
        throw new Error(response.error);
      }

      setConfirmation(false);
      if (onDeleted) onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed to delete collection');
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setConfirmation(false);
    setError(null);
  };

  return {
    handleDelete,
    confirmDelete,
    cancelDelete,
    loading,
    error,
    showConfirmation: confirmation,
  };
}

export default useDeleteCollectionButton;
