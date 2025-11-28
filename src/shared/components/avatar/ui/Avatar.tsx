import React from 'react';
import styles from "./Avatar.module.css";

const Avatar = ({size, avatarReference,firstName, lastName, email}) => {

    const avatarAltText = firstName ? firstName.toUpperCase().split('')[0] : (lastName ? lastName.toUpperCase().split('')[0] : email.toUpperCase().split('')[0])
    const avatarElement = avatarReference ? <div className={styles.avatar}><img src={avatarReference}/></div> : <div className={styles.avatar}><p>{avatarAltText}</p></div>

    return (
        <div>
            {avatarElement}
        </div>
    );
};

export default Avatar;