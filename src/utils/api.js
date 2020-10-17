const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const defaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const instance = axios.create({
  timeout: 5000,
  headers: defaultHeader,
  withCredentials: true,
});

const standardResponse = (response) => Promise.resolve(response.data);

const errorResponse = (error) =>
  Promise.reject(new Error(error.response.data.error));

const api = () => {
  let opt = {
    instance,
  };

  return {
    setOptions: (options) => {
      opt = {
        ...opt,
        ...options,
      };
    },
    get: (url, query) =>
      opt.instance
        .get(`${BASE_URL}${url}`, { params: query })
        .then(standardResponse)
        .catch(errorResponse),
    post: (url, data) =>
      opt.instance
        .post(`${BASE_URL}${url}`, data)
        .then(standardResponse)
        .catch(errorResponse),
    delete: (url) =>
      opt.instance
        .delete(`${BASE_URL}${url}`)
        .then(standardResponse)
        .catch(errorResponse),
  };
};

export default api();
