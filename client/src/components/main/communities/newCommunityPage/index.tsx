import './index.css';

/**
 * Form component for creating a new community.
 * Uses the useNewCommunityPage hook for form state management.
 
 * Note: Preserve the class names for styling purposes and testing.
 * You may add additional class names if needed. 
*/
const NewCommunityPage = () => {

  return (
    <div className='new-community-page'>
      <h2 className='new-community-title'>Create a New Community</h2>
      <h3>Community Name</h3>
      <input
        className='new-community-input'
        placeholder='Community name'
        type='text'
        required
      />
      <h3>Community Description</h3>
      <input
        className='new-community-input'
        placeholder='Community description'
        type='text'
        required
      />
      <label className='new-community-checkbox-label'>
        <input
          type='checkbox'
          checked={false}
          className='new-community-checkbox'
        />
        Public Community
      </label>
      <button className='new-community-submit'>
        Create
      </button>
      <p className='new-community-error'>Error Message</p>
    </div>
  );
};

export default NewCommunityPage;
