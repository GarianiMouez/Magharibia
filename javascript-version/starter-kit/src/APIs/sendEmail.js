const axios = require('axios')

async function sendEmail(body) {
  try {
    const res = await axios.post('http://localhost:4500/send-email', body)
    console.log('email sended:', res.data)
    return true
  } catch (error) {
    alert('message non envoyée', error.response.data.message)
    return false
  }
}

module.exports = {
  sendEmail
}
