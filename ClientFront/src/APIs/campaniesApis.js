const axios = require('axios')

const deleteFunction = async id => {
  try {
    const res = await axios.delete(`http://localhost:4500/campanies/${id}`)
    console.log('campanies deleted:', res.data)
    return true
  } catch (error) {
    console.error('Error deleting campanies:', error)
    return false
  }
}

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:4500/campanies')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching API data:', error)
    return []
  }
}

const AddFunction = async body => {
  try {
    const res = await axios.post(`http://localhost:4500/campanies`, body)
    console.log('campanies added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding campanies:', error)
    return false
  }
}

const updateFunction = async (id, body) => {
  try {
    const res = await axios.put(`http://localhost:4500/campanies/${id}`, body)
    console.log('campanies updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating campanies:', error)
    return false
  }
}
const getByid = async id => {
  try {
    const res = await axios.get(`http://localhost:4500/campanies/${id}`)
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
