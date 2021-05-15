const fetchConfig = {
  headers: { 'Content-Type': 'application/json' }
};

export const fetchUser = async(id) => {
  return await fetch(`${process.env.REACT_APP_USERS_ENDPOINT}/${id}`, fetchConfig).then(async (response) => await response.json());
};

export const createUser = data => fetch(`${process.env.REACT_APP_USERS_ENDPOINT}`, {
  ...fetchConfig,
  body: JSON.stringify(data)
});
