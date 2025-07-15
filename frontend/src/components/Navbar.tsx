import React from "react";

/* Navbar component */
const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">LOGO</div>
            <ul className="navbar-links">
                <li className="navbar-item">
                    <a href="/" className="navbar-link">Home</a>
                </li>
                <li className="navbar-item">
                    <a href="#features" className="navbar-link">Features</a>
                </li>
                <li className="navbar-item">
                    <a href="#about" className="navbar-link">About</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;