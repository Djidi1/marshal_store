export const axios = require('axios');
const AUTH_TOKEN = 'Bearer ';

axios.defaults.baseURL = 'https://marshal.bh-app.ru/api';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

