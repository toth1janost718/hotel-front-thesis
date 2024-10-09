import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const NavItem = ({label,to}) => {
    return (
        <Link to={to} className="footer-link">
            <p>{label}</p>
        </Link>

    );
};
    NavItem.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};


export default NavItem;