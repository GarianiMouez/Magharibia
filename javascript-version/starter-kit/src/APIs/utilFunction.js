import { fetchShip } from './shipsAPIs'

export const getShipsPerClint = async clientId => {
  try {
    const ships = await fetchShip()
    return ships.filter(ship => ship.ownerId === clientId && ship.ownerType === 'person')
  } catch (error) {
    console.error('Error fetching ships:', error)
    return []
  }
}
export const getShipsPerCompany = async clientId => {
  try {
    const ships = await fetchShip()
    return ships.filter(ship => ship.ownerId === clientId && ship.ownerType === 'enterprise')
  } catch (error) {
    console.error('Error fetching ships:', error)
    return []
  }
}

export const formatDate = date => {
  if (!(date instanceof Date)) {
    date = new Date(date) // Convertir en Date si ce n'est pas déjà le cas
  }
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // +1 car les mois vont de 0 à 11
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const convertDuration = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ]

  const startDay = startDate.getDate()
  const startMonth = months[startDate.getMonth()]
  const startYear = startDate.getFullYear()

  const endDay = endDate.getDate()
  const endMonth = months[endDate.getMonth()]
  const endYear = endDate.getFullYear()

  const duration = `Du ${startDay} ${startMonth} ${startYear} jusqu'à ${endDay} ${endMonth} ${endYear}`
  console.log('duration', duration)

  return duration
}
