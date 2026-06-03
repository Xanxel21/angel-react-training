import React from 'react';
import { IUser } from '../../interfaces/IUser';

interface UserInfoProps {
    user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Profession:</strong> {user.profession}</p>
        </div>
    );
};

export default UserInfo;