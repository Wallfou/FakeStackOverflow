import './index.css';
import useNewCommunityPage from '../../../../hooks/useNewCommunityPage';
import { ChangeEvent } from 'react';

/**
 * Form component for creating a new community.
 * Uses the useNewCommunityPage hook for form state management.
 
 * Note: Preserve the class names for styling purposes and testing.
 * You may add additional class names if needed. 
*/
const NewCommunityPage = () => {
  const { formData, errors, isSubmitting, handleInputChange, postCommunity } =
    useNewCommunityPage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postCommunity();
  };

  return (
    <div className='new-community-page'>
      <h2 className='new-community-title'>Create a New Community</h2>
      <form onSubmit={handleSubmit}>
        <h3>Community Name</h3>
        <input
          className='new-community-input'
          placeholder='Community name'
          type='text'
          required
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        <h3>Community Description</h3>
        <input
          className='new-community-input'
          placeholder='Community description'
          type='text'
          required
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        <label className='new-community-checkbox-label'>
          <input
            type='checkbox'
            checked={false}
            className='new-community-checkbox'
            onChange={e => {
              const newVisibility = e.target.checked ? 'PUBLIC' : 'PRIVATE';
              const syntheticEvent = {
                target: {
                  name: 'visibility',
                  value: newVisibility,
                },
              } as ChangeEvent<HTMLSelectElement>;
              handleInputChange(syntheticEvent);
            }}
            disabled={isSubmitting}
          />
          Public Community
        </label>
        <button type='submit' className='new-community-submit' disabled={isSubmitting}>
          {isSubmitting ? 'creating rn...' : 'create'}
        </button>
      </form>
      {(errors.name || errors.description || errors.general) && (
        <p className='new-community-error'>{errors.name || errors.description || errors.general}</p>
      )}
    </div>
  );
};

export default NewCommunityPage;
