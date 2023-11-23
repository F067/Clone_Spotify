import React from 'react';
import UserAvatarIcon from './UserAvatarIcon';
import { useSelector } from 'react-redux';

function TopNav() {
  const user = useSelector((state) => state.user.user);
  const currentHour = new Date().getHours();
  let greeting = '';
  let name = user && user.firstName

  if (currentHour >= 0 && currentHour < 18) {
    greeting = 'Bonjour ';
  } else {
    greeting = 'Bonsoir ';
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', padding:"20px" }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold', display: 'flex', marginRight:"10px" }}>
          {
            user &&
            <div>
              {greeting}
              {name}
            </div>
          }
        </div>
        <UserAvatarIcon/>
      </div>
    </div>
  );
}

export default TopNav;
