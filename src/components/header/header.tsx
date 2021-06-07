import React from 'react';
import {
  BrowserRouter as Router, useHistory,
} from 'react-router-dom';
import hotkeys from 'hotkeys-js';
import './header.scss';
import { PlayFunction } from 'use-sound/dist/types';

interface IForHeader {
  isSoundsOn: boolean,
  updateSoundOn: React.Dispatch<React.SetStateAction<boolean>>,
  isMusicOn: boolean,
  updateMusicOn: React.Dispatch<React.SetStateAction<boolean>>,
  playMusic: PlayFunction,
  stop: (id?: string) => void,
  soundVolume: number,
  updateSoundVolume: React.Dispatch<React.SetStateAction<number>>,
  musicVolume: number,
  updateMusicVolume: React.Dispatch<React.SetStateAction<number>>,
  showModal: boolean,
}

const Header: React.FC<IForHeader> = (props: IForHeader) => {
  const {
    isSoundsOn,
    updateSoundOn,
    isMusicOn,
    updateMusicOn,
    playMusic,
    stop,
    showModal,
  } = props;

  let history = useHistory();

  const redirect = (path: string = '/') => {
    if (showModal) return;
    history.push(path);
  };

  const MusicClickHandler = () => {
    updateMusicOn(!isMusicOn);
    if (isMusicOn) {
      playMusic();
    };
    if (!isMusicOn) {
      stop();
    }
  };
  hotkeys("m", {
     keyup: false,
     keydown: true,
    }, function(event, handler) {
    event.preventDefault();
    MusicClickHandler();
  })

  const VolumeClickHandler = () => {
    updateSoundOn(!isSoundsOn);
  };
  hotkeys("s", {
    keyup: false,
    keydown: true,
   }, function(event, handler) {
    event.preventDefault();
    VolumeClickHandler();
  });

  hotkeys('c', function (event) {
    event.preventDefault();
    redirect('/settings');
  });

  hotkeys('g', function (event) {
    event.preventDefault();
    redirect();
  });

  hotkeys('t', function (event) {
    event.preventDefault();
    redirect('/statistics');
  });

  return(
    <header className="app-header">
        <h1 className="font-main-title">
          <span className="font-main-title-part">Memory. </span>
          <span className="font-main-title-part">Figure Skating edition</span>
        </h1>
        <nav className="navigation">
          <i className={`bi ${isMusicOn ? "bi-music-note-list" : "bi-music-note"} btn-header`} 
            onClick={MusicClickHandler}
            tabIndex={1}></i>
          <i className={`bi ${isSoundsOn ? "bi-volume-up-fill": "bi-volume-mute-fill"} btn-header`}
            onClick={VolumeClickHandler}
            tabIndex={2}></i>
          <i className="fa fa-book btn-header"
            tabIndex={3}
            onClick={() => redirect('/statistics')}></i>
          <i className="fa fa-cogs btn-header"
            tabIndex={4}
            onClick={() => redirect('/settings')}></i>
        </nav>
    </header>
  )
};

export default Header;
