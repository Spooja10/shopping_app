// import React from 'react'

// import './LinkWithIcon.css'
// import { NavLink } from 'react-router-dom';

// const LinkWithIcon = ({ title, link, emoji, sidebar}) => {
//   return (
//      <NavLink to={link} className={sidebar ? 'align_center sidebar_link' : 'align_center'}>{title} 
//      <img src={emoji} alt="" className='link_emoji'/>
//      </NavLink>

    
// )
// }

// export default LinkWithIcon;

import React from 'react';
import { Link } from 'react-router-dom';

const LinkWithIcon = ({ id, title, link, emoji, sidebar }) => (
  <Link to={link} className={`link_with_icon ${sidebar ? 'sidebar_link' : ''}`}>
    <img src={emoji} alt={title} className="category_icon" />  {/* emoji should be a valid image path */}
    {title}
  </Link>
);

export default LinkWithIcon;