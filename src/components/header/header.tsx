import React from 'react';
import './header.scss';

const Header: React.FC = () => {
  return(
    <header className="app-header">
        <p>
          Memory. Figure Skating edition
        </p>
        <i className="fa fa-music"></i>
        <i className="fa fa-volume-up"></i>
        <i className="fa fa-cogs"></i>
    </header>
  )
};

export default Header;
