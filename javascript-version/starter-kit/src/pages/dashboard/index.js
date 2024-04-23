import axios from 'axios'

// ** MUI Import
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Statics from './statics/stat'
import Table from '../dashboard/table/table'
import AnalyticsSupportTracker from 'src/pages/dashboard/track/track'
import AnalyticsLineChart from './LineChart/line'
import { useState } from 'react'
import AnalyticsBarChart from './barChart/bar'
import CardStatsVertical from './couter/counter'

const Dashboard = ({
  pcontracts,
  econtracts,
  ageGroups,
  year,
  amountsByYear,
  ships,
  clients,
  campanies,
  netAmounts,
  totalAmounts,
  nbMan,
  nbWoman,
  nbShipCampany,
  nbShipPersonne
}) => {
  const [lineChartDataNet, setLineChartDataNet] = useState([
    {
      name: '2024',
      data: amountsByYear['2024'].net
    }
  ])
  const [lineChartDataTot, setLineChartDataTot] = useState([
    {
      name: '2024',
      data: amountsByYear['2024'].total
    }
  ])

  const test = [
    {
      name: '2024',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }
  ]

  const decorationSeries = [
    {
      name: '2024',
      data: amountsByYear['2024'].total // Exemple de données pour une ligne droite
    }
  ]
  const decorationSeries1 = [
    {
      name: '2024',
      data: amountsByYear['2024'].net // Exemple de données pour une ligne droite
    }
  ]

  console.log(nbShipCampany, nbShipPersonne)
  const [value, setValue] = useState('')
  const handleFilter = val => {
    setValue(val)
  }
  const clientColumns = [
    // {
    //   flex: 0.1,
    //   minWidth: 80,
    //   field: 'invoiceStatus',
    //   renderHeader: () => <Icon icon='tabler:trending-up' />,
    //   renderCell: ({ row }) => {
    //     const { dueDate, balance, invoiceStatus } = row
    //     const color = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].color : 'primary'

    //     return (
    //       <Tooltip
    //         title={
    //           <div>
    //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
    //               {invoiceStatus}
    //             </Typography>
    //             <br />
    //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
    //               Balance:
    //             </Typography>{' '}
    //             {balance}
    //             <br />
    //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
    //               Due Date:
    //             </Typography>{' '}
    //             {dueDate}
    //           </div>
    //         }
    //       >
    //         <CustomAvatar skin='light' color={color} sx={{ width: '1.875rem', height: '1.875rem' }}>
    //           {/* <Icon icon={invoiceStatusObj[invoiceStatus].icon} /> */}
    //         </CustomAvatar>
    //       </Tooltip>
    //     )
    //   }
    // },
    {
      flex: 0.25,
      field: 'Fname',
      minWidth: 150,
      headerName: 'Prénom'
    },
    {
      flex: 0.25,
      field: 'Lname',
      minWidth: 150,
      headerName: 'Nom'
    },
    {
      flex: 0.25,
      field: 'gender',
      minWidth: 150,
      headerName: 'Genre'
    },
    {
      flex: 0.25,
      field: 'email',
      minWidth: 150,
      headerName: 'E-mail'
    },
    {
      flex: 0.25,
      field: 'cin',
      minWidth: 100,
      headerName: 'CIN'
    },
    {
      flex: 0.25,
      field: 'tlf',
      minWidth: 100,
      headerName: 'Téléphone'
    },
    {
      flex: 0.25,
      field: 'City',
      minWidth: 100,
      headerName: 'Ville',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.City}</Typography>
    }
  ]

  const campaniesColumns = [
    {
      flex: 0.25,
      field: 'Ename',
      minWidth: 150,
      headerName: 'Entreprise'
    },
    {
      flex: 0.25,
      field: 'rne',
      minWidth: 100,
      headerName: 'RNE'
    },
    {
      flex: 0.25,
      field: 'email',
      minWidth: 150,
      headerName: 'E-mail'
    },

    {
      flex: 0.25,
      field: 'tlf',
      minWidth: 100,
      headerName: 'Téléphone'
    },
    {
      flex: 0.25,
      field: 'City',
      minWidth: 100,
      headerName: 'Ville',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.City}</Typography>
    }
  ]

  const campaniesFilteredRows = campanies.filter(
    row =>
      row?.Ename?.toLowerCase().includes(value.toLowerCase()) ||
      row?.rne?.toLowerCase().includes(value.toLowerCase()) ||
      row?.tlf?.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row?.email.toLowerCase().includes(value.toLowerCase()) ||
      row?.city?.toLowerCase().includes(value.toLowerCase())
  )
  const clientsFilteredRows = clients.filter(
    row =>
      row?.Fname?.toLowerCase().includes(value.toLowerCase()) ||
      row?.Lname?.toLowerCase().includes(value.toLowerCase()) ||
      row?.cin?.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row?.tlf?.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row?.email?.toLowerCase().includes(value.toLowerCase()) ||
      row?.City?.toLowerCase().includes(value.toLowerCase())
  )
  const handlechangeNet = e => {
    let data = []
    data.push({
      name: e,
      data: amountsByYear[e].net
    })
    setLineChartDataNet(data)
    console.log('mouez gharianni')
  }
  const handlechangeTot = e => {
    let data = []
    data.push({
      name: e,
      data: amountsByYear[e].total
    })
    setLineChartDataTot(data)
    console.log('mouez gharianni')
  }
  return (
    <ApexChartWrapper>
      <Statics
        stat1={clients.length}
        stat2={campanies.length}
        stat3={ships.length}
        stat4={pcontracts.length + econtracts.length}
        stat5={netAmounts}
        stat6={totalAmounts}
      />

      <Grid container spacing={3}>
        <Grid item xs={7}>
          <AnalyticsSupportTracker
            cardTitle={'Pourcentage selon genre'}
            gTitle={'Personnes Physiques'}
            titleF={'Femmes'}
            titleH={'Hommes'}
            stat1={nbWoman}
            stat2={nbMan}
            stat3={clients.length}
            stat4={clients.length}
            height={260}
          />
        </Grid>
        <Grid item xs={5}>
          <AnalyticsBarChart dataSeries={[{ name: 'age', data: ageGroups }]} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <AnalyticsLineChart
            dataSeries={lineChartDataNet}
            year={year}
            dataSetChange={handlechangeNet}
            title={'Montans Nets'}
          />
        </Grid>
        <Grid item xs={6}>
          <AnalyticsLineChart
            dataSeries={lineChartDataTot}
            year={year}
            dataSetChange={handlechangeTot}
            title={'Montnants Totaux'}
          />
        </Grid>
      </Grid>

      <Grid item rowSpacing={10} sx={{ mb: 3 }}>
        <Table
          value={value}
          data={clients}
          columns={clientColumns}
          filteredRows={clientsFilteredRows}
          handleFilter={handleFilter}
        />
      </Grid>

      <Grid item rowSpacing={10}>
        <Table
          value={value}
          data={campanies}
          columns={campaniesColumns}
          filteredRows={campaniesFilteredRows}
          handleFilter={handleFilter}
        />
      </Grid>
    </ApexChartWrapper>
  )
}

export const getStaticProps = async () => {
  function getYear(dateString) {
    const date = new Date(dateString)
    return date.getUTCFullYear().toString()
  }
  function calculateAge(birthDate) {
    const today = new Date()
    const birthYear = new Date(birthDate).getFullYear()
    const age = today.getFullYear() - birthYear
    return age
  }
  const ageGroups = [0, 0, 0, 0]
  try {
    const amountsByYear = {}
    const pcontractsRes = await axios.get('http://localhost:4500/pcontract')
    const pcontracts = pcontractsRes.data
    const econtractsRes = await axios.get('http://localhost:4500/econtract')
    const econtracts = econtractsRes.data

    const campanieRes = await axios.get('http://localhost:4500/campanies')
    const clientsRes = await axios.get('http://localhost:4500/client')
    const clients = clientsRes.data
    const shipsRes = await axios.get('http://localhost:4500/ship')
    const ships = shipsRes.data

    const campanies = campanieRes.data
    console.log(clients)
    var nbMan = 0
    var nbWoman = 0
    var nbShipCampany = 0
    var nbShipPersonne = 0
    for (let i = 0; i < ships.length; i++) {
      console.log(ships[i].ownerType)
      if (ships[i].ownerType === 'person') {
        nbShipPersonne += 1
      } else {
        nbShipCampany += 1
      }
    }

    for (let i = 0; i < clients.length; i++) {
      console.log(clients[i].gender)
      if (clients[i].gender === 'Homme') {
        nbMan += 1
      } else {
        nbWoman += 1
      }
    }

    var netAmounts = 0
    var totalAmounts = 0
    for (let i = 0; i < econtracts.length; i++) {
      netAmounts += econtracts[i].netAmount
      totalAmounts += econtracts[i].totalAmount
    }
    for (let i = 0; i < pcontracts.length; i++) {
      netAmounts += pcontracts[i].netAmount
      totalAmounts += pcontracts[i].totalAmount
    }
    pcontracts.forEach(contract => {
      const year = getYear(contract.createdAt)
      if (!amountsByYear[year]) {
        amountsByYear[year] = { net: new Array(12).fill(0), total: new Array(12).fill(0) }
      }
    })

    pcontracts.forEach(contract => {
      const year = getYear(contract.SDate)
      const month = new Date(contract.SDate).getMonth()
      amountsByYear[year].net[month] += contract.netAmount
      amountsByYear[year].total[month] += contract.totalAmount
    })
    const year = Object.keys(amountsByYear)
    clients.forEach(person => {
      const age = calculateAge(person.BirthDate)

      if (age >= 18 && age <= 25) {
        ageGroups[0]++
      } else if (age > 25 && age <= 30) {
        ageGroups[1]++
      } else if (age > 30 && age <= 40) {
        ageGroups[2]++
      } else if (age > 40) {
        ageGroups[3]++
      }
    })
    return {
      props: {
        ageGroups,
        year,
        amountsByYear,
        ships,
        clients,
        campanies,
        netAmounts,
        totalAmounts,
        pcontracts,
        econtracts,
        nbMan,
        nbWoman,
        nbShipCampany,
        nbShipPersonne,
        pcontracts,
        econtracts
      }
    }
  } catch (error) {
    console.error('Error fetching API data:', error)
    return {
      props: {
        apiData: []
      }
    }
  }
}

export default Dashboard
