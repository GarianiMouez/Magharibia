const axios = require('axios')

const deleteFunction = async id => {
  try {
    const res = await axios.delete(`http://localhost:4500/pcontract/${id}`)
    console.log('pcontract deleted:', res.data)
    return true
  } catch (error) {
    console.error('Error deleting pcontract:', error)
    return false
  }
}

const FetchContract = async () => {
  try {
    const contractsRes = await axios.get('http://localhost:4500/pcontract')
    const clientsRes = await axios.get('http://localhost:4500/client')
    const shipsRes = await axios.get('http://localhost:4500/ship')

    const contracts = contractsRes.data
    const clients = clientsRes.data
    const ships = shipsRes.data

    const result = contracts.map(contract => {
      const ship = ships.find(ship => ship.id === contract.ShipId)
      const client = clients.find(client => client.id === contract.ClientId)
      return {
        ...contract,
        shipName: ship.name,
        clientName: client.Fname + ' ' + client.Lname
      }
    })
    return result
  } catch (error) {
    return []
  }
}

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:4500/pcontract')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching API data:', error)
    return []
  }
}

const AddPcontract = async body => {
  try {
    const res = await axios.post(`http://localhost:4500/pcontract`, body)
    console.log('pcontract added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding pcontract:', error)
    return false
  }
}

const updateFunction = async (id, body) => {
  try {
    const res = await axios.put(`http://localhost:4500/pcontract/${id}`, body)
    console.log('pcontract updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating pcontract:', error)
    return false
  }
}
const getByid = async id => {
  try {
    const res = await axios.get(`http://localhost:4500/pcontract/${id}`)
    return res.data
  } catch (error) {
    return false
  }
}

module.exports = {
  FetchContract,
  deleteFunction,
  fetchData,
  AddPcontract,
  updateFunction,
  getByid
}
