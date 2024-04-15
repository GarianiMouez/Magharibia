const axios = require('axios')

const baseURL = 'http://localhost:4500/client'

const deleteFunction = async id => {
  try {
    const res = await axios.delete(`${baseURL}/${id}`)
    console.log('Client deleted:', res.data)
    return true
  } catch (error) {
    console.error('Error deleting client:', error)
    return false
  }
}

const fetchData = async () => {
  try {
    const res = await axios.get(baseURL)
    console.log('Fetched data:', res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching API data:', error)
    return []
  }
}

const AddFunction = async body => {
  try {
    const res = await axios.post(baseURL, body)
    console.log('Client added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding client:', error)
    return false
  }
}

const updateFunction = async (id, body) => {
  try {
    console.log('fffffffaaa')
    const res = await axios.put(`${baseURL}/${id}`, body)
    console.log('fffffffaaabbbbb')

    console.log('Client updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating client:', error)
    return false
  }
}

const getByid = async id => {
  try {
    const res = await axios.get(`${baseURL}/${id}`)
    return res.data
  } catch (error) {
    console.error('Error fetching client by ID:', error)
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
