import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {

  const MusicClickHandler = () => {
    alert('music icon is clicked');
  };

  const VolumeClickHandler = () => {
    alert('volume icon is clicked');
  };

  return(
    <header className="app-header">
        <p className="font-main-title">
          Memory. Figure Skating edition
        </p>
        <nav className="navigation">
          <i className="fa fa-music btn-header" onClick={MusicClickHandler}></i>
          <i className="fa fa-volume-up btn-header" onClick={VolumeClickHandler}></i>
          <Link
            to="/statistics"
            className="navigation-link"
            >
            <i className="fa fa-book btn-header"></i>
          </Link>
          <Link
            to="/settings"
            className="navigation-link"
            >
              <i className="fa fa-cogs btn-header"></i>
          </Link>
        </nav>
    </header>
  )
};

export default Header;
