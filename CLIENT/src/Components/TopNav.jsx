import React from 'react';
import UserAvatarIcon from './UserAvatarIcon';
import { useSelector } from 'react-redux';

function TopNav() {
  const user = useSelector((state) => state.user.user);
  const currentHour = new Date().getHours();
  let greeting = '';
  let name = user && user.firstName

  if (currentHour >= 0 && currentHour < 18) {
    greeting = 'Bonjour';
  } else {
    greeting = 'Bonsoir';
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom:'50px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '13%',
        }}
      >
        <span style={{ fontWeight: 'bold', display: 'flex' }}>
          <div style={{marginRight:'8px'}}>
          </div>
          {greeting} {name}
        </span>
        <UserAvatarIcon />
      </div>
    </div>
  );
}

export default TopNav;
