import React from 'react';
import './App.scss';

import Authentication from '../authentication';
import Dashboard from '../dashboard';
import { UserContextProvider, GetUser } from '../../view-models/context/user';

function App() {;
  // const fetchedUser = GetUser('8498nfi');
  const fetchedUser = GetUser();
  return (
    <UserContextProvider value={fetchedUser}>
      <div className="App">
        <header className="App-header">{'header'}</header>
        <div className={'App-Body'}>
          { fetchedUser?.id ? <Dashboard /> :  <Authentication /> }
        </div>
        <footer className="App-footer">{'footer'}</footer>
      </div>
    </UserContextProvider>
  );
}

export default App;
