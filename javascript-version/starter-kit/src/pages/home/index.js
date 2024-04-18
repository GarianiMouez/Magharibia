import axios from 'axios'

// ** MUI Import
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import Table from '../home/table/table'
import { useState } from 'react'

const Dashboard = ({ ships, clients, campanies, netAmounts, totalAmounts }) => {
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
  return (
    <ApexChartWrapper>
      <>
        <Grid container rowSpacing={1} spacing={4} justifyContent='center'>
          <Grid item xs={6} sm={4} lg={2}>
            <CardStatsVertical
              stats={campanies.length}
              avatarColor='primary'
              chipColor='default'
              title='Nombre des Entreprises'
              subtitle='Last week'
              avatarIcon='tabler:home-2'
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CardStatsVertical
              stats={clients.length}
              chipText='+25.2%'
              avatarColor='primary'
              chipColor='default'
              title='Nombre des Clients'
              subtitle='Last week'
              avatarIcon='tabler:user'
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CardStatsVertical
              stats={ships.length}
              chipText='+25.2%'
              avatarColor='primary'
              chipColor='default'
              title='Nombre des Bateaux'
              subtitle='Last week'
              avatarIcon='tabler:ship'
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CardStatsVertical
              stats={netAmounts}
              chipText='+25.2%'
              avatarColor='primary'
              chipColor='default'
              title={<div dangerouslySetInnerHTML={{ __html: 'Montants<br/>Nets' }} />}
              subtitle='Last week'
              avatarIcon='tabler:currency-dollar'
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CardStatsVertical
              stats={totalAmounts}
              chipText='+25.2%'
              avatarColor='primary'
              chipColor='default'
              title={<div dangerouslySetInnerHTML={{ __html: 'Montants<br/>Toteaux' }} />}
              subtitle='Last week'
              avatarIcon='tabler:report-money'
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '20px' }}></Grid>

        <Grid item rowSpacing={10}>
          <Table
            value={value}
            data={clients}
            columns={clientColumns}
            filteredRows={clientsFilteredRows}
            handleFilter={handleFilter}
          />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: '20px' }}></Grid>

        <Grid item rowSpacing={10}>
          <Table
            value={value}
            data={campanies}
            columns={campaniesColumns}
            filteredRows={campaniesFilteredRows}
            handleFilter={handleFilter}
          />
        </Grid>
      </>
    </ApexChartWrapper>
  )
}

export const getStaticProps = async () => {
  try {
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
    console.log(campanies)
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

    return {
      props: {
        ships,
        clients,
        campanies,
        netAmounts,
        totalAmounts,
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
