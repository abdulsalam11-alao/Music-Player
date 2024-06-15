import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const VolumeControl = () => (
    <div className="volume">
        <FontAwesomeIcon icon={faVolumeUp} />
        <p>Airpods Pro</p>
    </div>
);

export default VolumeControl;
