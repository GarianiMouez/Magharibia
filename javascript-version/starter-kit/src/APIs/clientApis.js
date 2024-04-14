const axios = require('axios')

const deleteFunction = async id => {
  try {
    const res = await axios.delete(`http://localhost:4500/client/${id}`)
    console.log('Client deleted:', res.data)
    return true
  } catch (error) {
    console.error('Error deleting client:', error)
    return false
  }
}

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:4500/client')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching API data:', error)
    return []
  }
}

const AddFunction = async body => {
  try {
    const res = await axios.post(`http://localhost:4500/client`, body)
    console.log('Client added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding client:', error)
    return false
  }
}

const updateFunction = async (id, body) => {
  try {
    const res = await axios.put(`http://localhost:4500/client/${id}`, body)
    console.log('Client updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating client:', error)
    return false
  }
}
const getByid = async id => {
  try {
    const res = await axios.get(`http://localhost:4500/client/${id}`)
    return res.data
  } catch (error) {
    return false
  }
}

module.exports = {
  deleteFunction,
  fetchData,
  AddFunction,
  updateFunction,
  getByid
}
