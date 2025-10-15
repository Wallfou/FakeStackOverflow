import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

interface Collection {
  id: string;
  name: string;
  items: unknown[];
}

interface UseCollectionPageResult {
  collection: Collection | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL ?? 'http://localhost:4000';

function useCollectionPage(collectionId: string): UseCollectionPageResult {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get<Collection>(`/api/collections/${collectionId}`);
      setCollection(result.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to fetch collection');
      } else {
        setError('failed to fetch collection');
      }
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, { transports: ['websocket'] });

    socket.emit('joiningCollectionRoom', collectionId);

    socket.on('collectionUpdated', (updatedCollection: Collection) => {
      if (updatedCollection.id === collectionId) {
        setCollection(updatedCollection);
      }
    });

    socket.on('collectionDeleted', (deletedId: string) => {
      if (deletedId === collectionId) {
        setCollection(null);
        setError('collection has been deleted');
      }
    });

    return () => {
      socket.emit('leavingCollectionROom', collectionId);
      socket.disconnect();
    };
  }, [collectionId]);

  return {
    collection,
    loading,
    error,
    refresh: fetchCollection,
  };
}

export default useCollectionPage;
