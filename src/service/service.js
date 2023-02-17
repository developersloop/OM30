import axios from 'axios';

export const $http = (type) => {
  return axios.create({
    baseURL: `http://localhost:3000/${type}`
  })
}