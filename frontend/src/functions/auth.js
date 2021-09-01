import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {idToken : authtoken}
    // {
    //   headers: {
    //     authtoken,
    //   },
    // }
  );
};

export const login = async (email, password) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/login`,
    {email, password}
  );
};

export const register = async (firstName, lastName, email, password) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/register`,
    {firstName, lastName, email, password}
  );
};

export const currentUser = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authorization : 'Bearer ' + token
      },
    }
  );
};

export const currentAdmin = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authorization : 'Bearer ' + token
      },
    }
  );
};