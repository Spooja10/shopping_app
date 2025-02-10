import React from 'react';
import { Link } from 'react-router-dom';

const LinkWithIcon = ({ id, title, link, emoji, sidebar }) => (
  <Link to={link} className={`link_with_icon ${sidebar ? 'sidebar_link' : ''}`}>
    <img src={emoji} alt={title} className="category_icon" />  {/* emoji should be a valid image path */}
    {title}
  </Link>
);

export default LinkWithIcon;
