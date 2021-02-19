import React from 'react';
import './App.scss';
import Header from './../header';
import Footer from './../footer';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <p>
          Здесь будет приложенька. Основная часть.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
