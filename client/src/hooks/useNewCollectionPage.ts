import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCollection } from '../services/collectionService.ts';
import { Collection } from '../../../shared/types/collection';

interface UseNewCollectionPageReturn {
  name: string;
  description: string;
  isPrivate: boolean;

  setName: (value: string) => void;
  setDescription: (value: string) => void;
  setIsPrivate: (value: boolean) => void;

  error: string | null;
  loading: boolean;

  postCollection: () => Promise<void>;
}

function useNewCollectionPage(): UseNewCollectionPageReturn {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postCollection = async () => {
    setError(null);

    if (!name.trim()) {
      setError('collection name is required');
      return;
    }

    const username = localStorage.getItem('username');
    if (!username) {
      setError('no username found, please login');
      return;
    }
    setLoading(true);

    try {
      const newCollection: Collection = {
        name: name.trim(),
        description: description.trim() || undefined,
        isPrivate,
        username,
        questions: [],
      };

      const response = await createCollection(newCollection);
      if ('error' in response) {
        throw new Error(response.error);
      }
      navigate(`/collections/${username}/${response._id.toString()}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('failed to create collection');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    isPrivate,
    setIsPrivate,
    error,
    loading,
    postCollection,
  };
}

export default useNewCollectionPage;
