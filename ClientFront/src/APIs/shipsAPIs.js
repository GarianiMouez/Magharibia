const axios = require('axios')

const deleteShip = async id => {
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

const addShip = async body => {
  try {
    const res = await axios.post(`http://localhost:4500/ship`, body)
    console.log('ship added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding ship:', error)
    return false
  }
}

const updateShip = async (id, body) => {
  try {
    const res = await axios.put(`http://localhost:4500/ship/${id}`, body)
    console.log('ship updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating ship:', error)
    return false
  }
}
const getShipByid = async id => {
  try {
    const res = await axios.get(`http://localhost:4500/ship/${id}`)
    return res.data
  } catch (error) {
    return false
  }
}

module.exports = {
  deleteShip,
  fetchShip,
  addShip,
  updateShip,
  getShipByid
}
