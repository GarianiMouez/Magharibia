const axios = require('axios')

const BASE_URL = 'http://localhost:4500'

const fetchData = async endpoint => {
  try {
    const res = await axios.get(`${BASE_URL}/${endpoint}`)
    return res.data
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error)
    return []
  }
}

const postData = async (endpoint, body) => {
  try {
    const res = await axios.post(`${BASE_URL}/${endpoint}`, body)
    console.log(`${endpoint} added:`, res.data)
    return true
  } catch (error) {
    console.error(`Error adding ${endpoint}:`, error)
    return false
  }
}

const putData = async (endpoint, id, body) => {
  try {
    const res = await axios.put(`${BASE_URL}/${endpoint}/${id}`, body)
    console.log(`${endpoint} updated:`, res.data)
    return true
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error)
    return false
  }
}

const deleteData = async (endpoint, id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${endpoint}/${id}`)
    console.log(`${endpoint} deleted:`, res.data)
    return true
  } catch (error) {
    console.error(`Error deleting ${endpoint}:`, error)
    return false
  }
}

const DisplayContractPerClient = async clientId => {
  try {
    const [contracts, ships] = await Promise.all([fetchData('pcontract'), fetchData('ship')])

    const result = contracts.filter(contract => contract.ClientId === clientId)

    const finalResult = result.map(contract => {
      const ship = ships.find(ship => ship.id === contract.ShipId)
      return {
        ...contract,
        shipName: ship.name
      }
    })

    return finalResult
  } catch (error) {
    console.error('An error occurred:', error)
    throw error
  }
}

const FetchContract = async () => {
  try {
    const [contracts, clients, ships] = await Promise.all([
      fetchData('pcontract'),
      fetchData('client'),
      fetchData('ship')
    ])

    const result = contracts.map(contract => {
      const ship = ships.find(ship => ship.id === contract.ShipId)
      const client = clients.find(client => client.id === contract.ClientId)
      return {
        ...contract,
        shipName: ship.name,
        clientName: `${client.Fname} ${client.Lname}`
      }
    })
    return result
  } catch (error) {
    console.error('An error occurred:', error)
    return []
  }
}

const getByid = async (id, endpoint) => {
  try {
    const res = await axios.get(`${BASE_URL}/${endpoint}/${id}`)
    return res.data
  } catch (error) {
    console.error(`Error getting ${endpoint} by id:`, error)
    return null
  }
}

module.exports = {
  FetchContract,
  deleteData,
  fetchData,
  postData,
  putData,
  DisplayContractPerClient,
  getByid
}
