import React from 'react';
import Tabs from '../../components/tabs';
import UserLoginForm from './user';
import AdminLoginForm from './admin';

export default React.memo(() => {

  const tabs = React.useMemo(() => [
    {
      name: 'User Registration',
      children: <UserLoginForm />
    },
    {
      name: 'Admin Registration',
      children: <AdminLoginForm />
    }
  ], []);

  return (
    <Tabs tabs={tabs} defaultTab={tabs[0].name} />
  );
});