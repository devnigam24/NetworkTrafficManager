import React from 'react';
import Tabs from '../../components/tabs';
import UserLoginForm from './user';
import AdminLoginForm from './admin';

export default React.memo((props) => {

  const tabs = React.useMemo(() => [
    {
      name: 'User Login',
      children: <UserLoginForm {...props} />
    },
    {
      name: 'Admin Login',
      children: <AdminLoginForm {...props} />
    }
  ], [props]);

  return (
    <Tabs tabs={tabs} defaultTab={tabs[0].name} />
  );
});