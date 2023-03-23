import React, { useState } from 'react';
import MyPets from './MyPets';
import ProfileSetting from './ProfileSetting';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  return (
    <div>
      <h1>My Profile</h1>
      <div className="tab">
        <button className={activeTab === 'Settings' ? 'active' : ''} onClick={() => handleTabClick('Settings')}>
          Settings
        </button>
        <button className={activeTab === 'MyPets' ? 'active' : ''} onClick={() => handleTabClick('MyPets')}>
          My Pets
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'Settings' && <ProfileSetting />}
        {activeTab === 'MyPets' && <MyPets />}
      </div>
    </div>
  );
}

export default ProfilePage;



