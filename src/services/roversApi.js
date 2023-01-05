import axios from 'axios';

// const API_KEY = 'ehZwOo8rreqdAS6moCnXC8ysqCHe3N3cGdYzk1Ik';
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

axios.defaults.baseURL = BASE_URL;
// axios.defaults.params = {
//   api_key: API_KEY,
// };

async function FetchPosts() {
  try {
    const { data } = await axios(BASE_URL);
    return data;
  } catch (error) {
    console.log('error', { error });
    return null;
  }
}
// async function FetchRoverTotal(name) {
//   try {
//     const config = {
//       url: `/manifests/${name}`,
//     };
//     const { data } = await axios(config);
//     return data;
//   } catch (error) {
//     console.log('error', { error });
//     return null;
//   }
// }

// async function fetchRovers() {
//   try {
//     const config = {
//       url: `/rovers`,
//     };
//     const { data } = await axios(config);
//     return data;
//   } catch (error) {
//     console.log('error', { error });
//     return null;
//   }
// }

const api = {
  FetchPosts,
  // FetchRoverTotal,
  // fetchRovers,
};

export default api;
