import axios from 'axios';

export const $http = (type, method = null) => {
  const configureDefault = { baseURL: `http://localhost:3000/${type}` }

  if(method) configureDefault.method = method
  
  return axios.create(configureDefault)
}