// test-login.js
const axios = require('axios');

axios.post('http://localhost:5004/api/auth/login', {
  email: 'bhuvan@test.com',
  password: '123456'
})
.then(res => {
  console.log(res.data);
})
.catch(err => {
  console.log(err.response?.data || err.message);
});