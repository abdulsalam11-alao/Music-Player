import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faRandom } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ isShuffling, onToggleShuffle, onToggleSongList }) => (
    <div className="footer">
        <FontAwesomeIcon icon={faList} onClick={onToggleSongList} className="control-icon" />
        <FontAwesomeIcon icon={faRandom} className={`control-icon ${isShuffling ? 'active' : ''}`} onClick={onToggleShuffle} />
    </div>
);

export default Footer;
