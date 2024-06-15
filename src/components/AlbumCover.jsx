import React from 'react';

const AlbumCover = ({ image, artist }) => (
    <div className="album-cover">
        <img src={process.env.PUBLIC_URL + image} alt={artist} />
    </div>
);

export default AlbumCover;
