const axios = require('axios')

const deleteFunction = async id => {
  try {
    const res = await axios.delete(`http://localhost:4500/ship/${id}`)
    console.log('ship deleted:', res.data)
    return true
  } catch (error) {
    console.error('Error deleting ship:', error)
    return false
  }
}

const fetchShip = async () => {
  try {
    const res = await axios.get('http://localhost:4500/ship')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching API data:', error)
    return []
  }
}

const AddFunction = async body => {
  try {
    const res = await axios.post(`http://localhost:4500/ship`, body)
    console.log('ship added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding ship:', error)
    return false
  }
}

const updateFunction = async (id, body) => {
  try {
    const res = await axios.put(`http://localhost:4500/ship/${id}`, body)
    console.log('ship updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating ship:', error)
    return false
  }
}
const getByid = async id => {
  try {
    const res = await axios.get(`http://localhost:4500/ship/${id}`)
    return res.data
  } catch (error) {
    return false
  }
}

module.exports = {
  deleteFunction,
  fetchShip,
  AddFunction,
  updateFunction,
  getByid
}
