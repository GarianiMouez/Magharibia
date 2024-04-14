const axios = require('axios')

const deleteFunction = async id => {
  try {
    const res = await axios.delete(`http://localhost:4500/admins/${id}`)
    console.log('admins deleted:', res.data)
    return true
  } catch (error) {
    console.error('Error deleting admins:', error)
    return false
  }
}

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:4500/admins')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching API data:', error)
    return []
  }
}

const AddFunction = async body => {
  try {
    const res = await axios.post(`http://localhost:4500/admins`, body)
    console.log('admins added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding admins:', error)
    return false
  }
}

const updateFunction = async (id, body) => {
  try {
    const res = await axios.put(`http://localhost:4500/admins/${id}`, body)
    console.log('admins updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating admins:', error)
    return false
  }
}
const getByid = async id => {
  try {
    const res = await axios.get(`http://localhost:4500/admins/${id}`)
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
