import React from 'react';
import { fetchUser } from '../data/user';
import User from '../../models/user';

export const UserContext = React.createContext(null);
export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;

export function GetUser(id) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function _getUser(id) {
      const user = await fetchUser(id);
      setUser(new User(user));
    }

    if (id) _getUser(id);
  }, [id, setUser]);

  return user
};
