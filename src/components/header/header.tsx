import React from 'react';
import useSound from 'use-sound';
import {
  BrowserRouter as Router, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import './header.scss';
import { PlayFunction } from 'use-sound/dist/types';

interface IForHeader {
  isSoundsOn: boolean,
  updateSoundOn: React.Dispatch<React.SetStateAction<boolean>>,
  isMusicOn: boolean,
  updateMusicOn: React.Dispatch<React.SetStateAction<boolean>>,
  playMusic: PlayFunction,
  stop: (id?: string) => void,
}

const Header: React.FC<IForHeader> = (props: IForHeader) => {
  const {
    isSoundsOn,
    updateSoundOn,
    isMusicOn,
    updateMusicOn,
    playMusic,
    stop,
  } = props;

  const MusicClickHandler = () => {
    updateMusicOn(!isMusicOn);
    if (isMusicOn) {
      playMusic();
    };
    if (!isMusicOn) {
      stop();
    }
  };

  const VolumeClickHandler = () => {
    updateSoundOn(!isSoundsOn);
  };

  return(
    <header className="app-header">
        <p className="font-main-title">
          Memory. Figure Skating edition
        </p>
        <nav className="navigation">
          <i className={`bi ${isMusicOn ? "bi-music-note-list" : "bi-music-note"} btn-header`} onClick={MusicClickHandler}></i>
          <i className={`bi ${isSoundsOn ? "bi-volume-up-fill": "bi-volume-mute-fill"} btn-header`} onClick={VolumeClickHandler}></i>
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
