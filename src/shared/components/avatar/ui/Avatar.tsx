import React from 'react';
import styles from './Avatar.module.css';

type AvatarProps = {
    size: number;
    avatarReference?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
};

const Avatar: React.FC<AvatarProps> = ({
                                           size,
                                           avatarReference,
                                           firstName,
                                           lastName,
                                           email
                                       }) => {
    const avatarAltText =
        firstName?.[0]?.toUpperCase() ||
        lastName?.[0]?.toUpperCase() ||
        email[0].toUpperCase();

    const avatarStyle: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
    };

    return (
        <div
            className={styles.avatar}
            style={avatarStyle}
        >
            {avatarReference ? (
                <img src={avatarReference} alt="avatar" />
            ) : (
                <p>{avatarAltText}</p>
            )}
        </div>
    );
};

export default Avatar;
