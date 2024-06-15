import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const Header = ({ album }) => (
    <div className="header">
        <FontAwesomeIcon icon={faArrowLeft} className="menu-icon" />
        <p>{album}</p>
        <FontAwesomeIcon icon={faEllipsisH} className="menu-icon" />
    </div>
);

export default Header;
