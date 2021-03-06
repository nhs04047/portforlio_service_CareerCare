import React, { useState, useEffect } from 'react';
import UserEditForm from './UserEditForm';
import ChangePw from './ChangePw';
import UserCard from './UserCard';
import * as Api from '../../api';
import EditProfile from './EditProfile';

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  const [editingPw, setEditingPw] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get('users', portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          setEditingPw={setEditingPw}
          setIsEditProfile={setIsEditProfile}
        />
      )}
      {editingPw ? (
        <ChangePw
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
          setEditingPw={setEditingPw}
        />
      ) : null}
      {isEditProfile ? (
        <EditProfile
          user={user}
          setUser={setUser}
          setIsEditProfile={setIsEditProfile}
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : null}
    </>
  );
}

export default User;
