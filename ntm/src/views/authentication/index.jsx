import React from 'react';
import LoginTab from './logins/tab';
import RegisterTab from './register/tab';
import Tabs from '../components/tabs';
import './index.scss';

const Authentication = (props) => {
  const tabs = React.useMemo(() => [
    {
      name: 'Login',
      children: <LoginTab {...props} />
    },
    {
      name: 'Register',
      children: <RegisterTab />
    }
  ], [props]);

  return (
    <div className={'auth-body'}>
      <Tabs tabs={tabs} defaultTab={tabs[0].name} />    
    </div>
  );
};

export default React.memo(Authentication);
