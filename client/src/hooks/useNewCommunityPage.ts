import { useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCommunity } from '../services/communityService.ts';
import { Community } from '../../../shared/types/community';

interface FormState {
  name: string;
  description: string;
  visibility: 'PUBLIC' | 'PRIVATE';
}

interface FormErrors {
  name?: string;
  description?: string;
  general?: string;
}

interface UseNewCommunityPageReturn {
  formData: FormState;
  errors: FormErrors;
  isSubmitting: boolean;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  postCommunity: () => Promise<void>;
  resetForm: () => void;
}

const useNewCommunityPage = (): UseNewCommunityPageReturn => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    description: '',
    visibility: 'PUBLIC',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors],
  );

  const postCommunity = useCallback(async () => {
    const validateForm = (): boolean => {
      const newErrors: FormErrors = {};
      if (!formData.name.trim()) {
        newErrors.name = 'community name required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    if (!validateForm()) {
      return;
    }
    const username = localStorage.getItem('username');
    if (!username) {
      setErrors({ general: 'logic to create communities' });
      return;
    }
    try {
      setIsSubmitting(true);
      setErrors({});

      const newCommunity: Community = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        visibility: formData.visibility,
        admin: username,
        participants: [username],
      };
      const response = await createCommunity(newCommunity);
      if ('error' in response) {
        throw new Error(response.error);
      }
      const communityId = response._id.toString();
      navigate(`/community/${communityId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'failed to create commuynity';
      setErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, navigate]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      description: '',
      visibility: 'PUBLIC',
    });
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    postCommunity,
    resetForm,
  };
};

export default useNewCommunityPage;
