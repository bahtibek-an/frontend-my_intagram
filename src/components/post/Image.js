import React from 'react';

const Image = ({ src, caption }) => {
    return (
        <img
            src={src}
            alt={caption}
        />
    );
};

export default Image;
