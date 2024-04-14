function convertDuration(start, end) {
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

module.exports = { convertDuration }
