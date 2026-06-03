import React from 'react';
import { IUser } from '../../interfaces/IUser';

interface UserInfoProps {
    user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div>
            <h2>User Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Age:</strong> {user.age}</p>
        </div>
    );
};

export default UserInfo;