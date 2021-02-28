import React, { ReactNode, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import './settings.scss';

interface IForSetting {
  updateFieldSize: React.Dispatch<React.SetStateAction<number>>,
}

const Settings: React.FC<IForSetting> = (props: IForSetting) => {

  const { updateFieldSize } = props;

  return (
    <div className="settings-page">
      <form>
        <div>Set gamefield size</div>

      </form>
      
      Здесь будут настройки.
    </div>
  );
};

export default Settings;