import { useEffect, useState } from 'react';
import { getAllCollectionsByUsername } from '../services/collectionService.ts';
import { DatabaseCollection } from '../../../shared/types/collection';

interface UseAllCollectionsPageResult {
  collections: DatabaseCollection[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

function useAllCollectionsPage(username: string): UseAllCollectionsPageResult {
  const [collections, setCollections] = useState<DatabaseCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = async () => {
    setLoading(true);
    setError(null);

    try {
      const currentUsername = localStorage.getItem('username') || '';
      const response = await getAllCollectionsByUsername(username, currentUsername);
      if ('error' in response) {
        throw new Error(response.error);
      }
      setCollections(response as DatabaseCollection[]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('failed to fetch collections');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchCollections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return { collections, loading, error, refresh: fetchCollections };
}

export default useAllCollectionsPage;
