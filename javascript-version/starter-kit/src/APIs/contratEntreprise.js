const axios = require('axios')

const deleteFunction = async id => {
  try {
    const res = await axios.delete(`http://localhost:4500/econtract/${id}`)
    console.log('econtract deleted:', res.data)
    return true
  } catch (error) {
    console.error('Error deleting econtract:', error)
    return false
  }
}

const FetchContract = async () => {
  try {
    const contractsRes = await axios.get('http://localhost:4500/econtract')
    const campanysRes = await axios.get('http://localhost:4500/campanies')
    const shipsRes = await axios.get('http://localhost:4500/ship')

    const contracts = contractsRes.data
    const campanies = campanysRes.data
    const ships = shipsRes.data

    const result = contracts.map(contract => {
      const ship = ships.find(ship => ship.id === contract.ShipId && ship.ownerType === 'enterprise')
      const campany = campanies.find(campany => campany.id === contract.CompanyId)
      return {
        ...contract,
        shipName: ship?.name,
        campanyName: campany.Ename ? campany.Ename : 'test',
        campany: campany,
        ship: ship
      }
    })
    return result
  } catch (error) {
    return []
  }
}

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:4500/econtract')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching API data:', error)
    return []
  }
}

const AddEcontract = async body => {
  try {
    const res = await axios.post(`http://localhost:4500/econtract`, body)
    console.log('econtract added:', res.data)
    return true
  } catch (error) {
    console.error('Error adding econtract:', error)
    return false
  }
}

const updateFunction = async (id, body) => {
  try {
    const res = await axios.put(`http://localhost:4500/econtract/${id}`, body)
    console.log('econtract updated:', res.data)
    return true
  } catch (error) {
    console.error('Error updating econtract:', error)
    return false
  }
}
const getByid = async id => {
  try {
    const res = await axios.get(`http://localhost:4500/econtract/${id}`)
    return res.data
  } catch (error) {
    return false
  }
}

module.exports = {
  deleteFunction,
  fetchData,
  AddEcontract,
  updateFunction,
  FetchContract,
  getByid
}
