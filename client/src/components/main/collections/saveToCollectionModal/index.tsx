import './index.css';
import { PopulatedDatabaseQuestion } from '../../../../types/types';

/**
 * Modal component for saving questions to collections.
 * Uses the useSaveToCollectionModal hook for managing collections and toggle state.
 * 
 * @param question - The question to be saved.
 * @param onClose - Function to close the modal.
 * 
 * Note: You must peserve the className for styling and testing purposes.
 * You may add additional classNames as needed.
 */
const SaveToCollectionModal = ({
  question,
  onClose,
}: {
  question: PopulatedDatabaseQuestion;
  onClose: () => void;
}) => {

  const isSaved = false; // Placeholder for actual saved state

  return (
    <div className='modal-backdrop' onClick={e => e.stopPropagation()}>
      <div className='modal-container' onClick={e => e.stopPropagation()}>
        <h2 className='modal-title'>Save to Collection</h2>
        <ul className='collection-list'>
          <li className='collection-row'>
            <span className='collection-name'>Collection Name</span>
            <span className={`status-tag ${isSaved ? 'saved' : 'unsaved'}`}>
              Saved
            </span>
            <button className='save-btn'> 
              Save or Unsave
            </button>
          </li>
        </ul>
        <button onClick={onClose} className='close-btn'>
          Close
        </button>
      </div>
    </div>
  );
};

export default SaveToCollectionModal;
