import React from 'react';
import './header.scss';

const Header: React.FC = () => {

  const MusicClickHandler = () => {
    alert('music icon is clicked');
  };

  const VolumeClickHandler = () => {
    alert('volume icon is clicked');
  };

  const SettingsHandler = () => {
    alert('settings are clicked');
  };

  return(
    <header className="app-header">
        <p className="font-main-title">
          Memory. Figure Skating edition
        </p>
        <i className="fa fa-music btn-header" onClick={MusicClickHandler}></i>
        <i className="fa fa-volume-up btn-header" onClick={VolumeClickHandler}></i>
        <i className="fa fa-cogs btn-header" onClick={SettingsHandler}></i>
    </header>
  )
};

export default Header;
