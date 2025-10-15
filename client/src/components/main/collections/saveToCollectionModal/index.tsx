import './index.css';
import { PopulatedDatabaseQuestion } from '../../../../types/types';
import useSaveToCollectionModal from '../../../../hooks/useSaveToCollectionModal';
import { useEffect } from 'react';

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
  const { openModal, closeModal, collections, loading, error, toggleQuestionInCollection } =
    useSaveToCollectionModal();

  useEffect(() => {
    if (question?._id) {
      openModal(question._id.toString());
    }
  }, [question, openModal]);

  const handleClose = () => {
    closeModal();
    onClose();
  };

  return (
    <div className='modal-backdrop' onClick={handleClose}>
      <div className='modal-container' onClick={e => e.stopPropagation()}>
        <h2 className='modal-title'>Save to Collection</h2>
        {loading && <div className='loading-message'>loading collections...</div>}
        {error && <div className='error-message'>{error}</div>}
        <ul className='collection-list'>
          {collections.map(col => (
            <li className='collection-row' key={col._id.toString()}>
              <span className='collection-name'>{col.name}</span>
              <span className={`status-tag ${col.isSaved ? 'Saved' : 'Unsaved'}`}>
                {col.isSaved ? 'Saved' : 'Unsaved'}
              </span>
              <button
                className='save-btn'
                onClick={() => toggleQuestionInCollection(col._id.toString())}>
                {col.isSaved ? 'Unsave' : 'Save'}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleClose} className='close-btn'>
          Close
        </button>
      </div>
    </div>
  );
};

export default SaveToCollectionModal;
