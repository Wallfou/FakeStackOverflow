import './index.css';
import QuestionView from '../../questionPage/question';
import CommunityMembershipButton from '../communityMembershipButton';

/**
 * Component for displaying a single community with members and details.
 * Uses the useCommunityPage hook for state management and real-time updates.
 */
const CommunityPage = () => {

  return (
    <div className='community-page-layout'>
      <main className='questions-section'>
        <h3 className='section-heading'>Questions</h3>
        {/* Render each question in the community */}
      </main>

      <div className='community-sidebar'>
        <h2 className='community-title'>Name</h2>
        <p className='community-description'>Description</p>
        <button className='delete-community-btn'>
            Delete Community only if Admin
        </button>
        {
          /* Add Button to join or leave the community */
        }

        <div className='community-members'>
          <h3 className='section-heading'>Members</h3>
          <ul className='members-list'>
            <li className='member-item'>
                Community Member Usernames
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
