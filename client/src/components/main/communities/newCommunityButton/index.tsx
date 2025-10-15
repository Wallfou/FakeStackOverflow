import './index.css';
import useNewCommunityButton from '../../../../hooks/useNewCommunityButton';

/**
 * Button component for navigating to new community creation.
 * Uses the useNewCommunityButton hook for navigation logic.
 */
const NewCommunityButton = () => {
  const { buttonText, buttonDisabled, handleClick } = useNewCommunityButton();

  return (
    <button className='new-community-button' onClick={handleClick} disabled={buttonDisabled}>
      {buttonText}
    </button>
  );
};

export default NewCommunityButton;
