import axios from 'axios';

// ----------------------------------------------------------------------
const _axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL + '/api/v2' || ''
});
_axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
_axios.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.9';

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error || 'Something went wrong');
  }
);

export default _axios;
