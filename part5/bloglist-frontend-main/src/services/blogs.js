import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// const del = (id) => {
//     return axios.delete(`${baseUrl}/${id}`)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject);
// };

// eslint-disable-next-line
export default { setToken, getAll, create };
