import React from 'react';
import LoginTab from './logins/tab';
import RegisterTab from './register/tab';
import Tabs from '../components/tabs';
import { UserContext } from '../../view-models/context/user';
import './index.scss';

const Authentication = () => {
  const user = React.useContext(UserContext);

  const tabs = React.useMemo(() => [
    {
      name: 'Login',
      children: <LoginTab />
    },
    {
      name: 'Register',
      children: <RegisterTab />
    }
  ], []);

  return (
    <div className={'auth-body'}>
      <Tabs tabs={tabs} defaultTab={tabs[0].name} />    
    </div>
  );
};

export default React.memo(Authentication);
