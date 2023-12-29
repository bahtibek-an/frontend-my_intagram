import React from "react";

const Footer = ({ caption, username }) => {
    return (
        <>
            <span className="fs-5">{username} <i className="fs-6">{caption}</i></span>
        </>
    );
};

export default Footer;