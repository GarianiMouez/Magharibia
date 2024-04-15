// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'
import TableHeader from './TableHeader/index'
import axios from 'axios'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid'

// ** Styled Components

import { secondsInDay } from 'date-fns'
import { useAuth } from 'src/hooks/useAuth'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** renders client column

const defaultColumns = [
  {
    flex: 0.25,
    field: 'SDate',
    minWidth: 150,
    headerName: 'Début de Contrat'
  },
  {
    flex: 0.25,
    field: 'EDate',
    minWidth: 150,
    headerName: 'Fin de Contrat'
  },

  {
    flex: 0.25,
    field: 'Coqu',
    minWidth: 20,
    headerName: 'coqu'
  },

  {
    flex: 0.25,
    field: 'motor',
    minWidth: 20,
    headerName: 'Moteur'
  },
  {
    flex: 0.25,
    field: 'netAmount',
    minWidth: 20,
    headerName: 'Montant Net'
  },
  {
    flex: 0.25,
    field: 'totalAmount',
    minWidth: 20,
    headerName: 'Montant Total'
  },
  //   {
  //     flex: 0.25,
  //     field: 'clientName',
  //     minWidth: 20,
  //     headerName: 'client'
  //   },
  {
    flex: 0.25,
    field: 'shipName',
    minWidth: 20,
    headerName: 'Ship'
  }
  // {
  //   flex: 0.25,
  //   field: 'City',
  //   minWidth: 100,
  //   headerName: 'Ville',
  //   renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.City}</Typography>
  // }
]

/* eslint-enable */
const InvoiceList = ({ apiData, clients }) => {
  const { user } = useAuth()
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const filtered = apiData.filter(data => data.ClientId === user.id)
    setFilteredData(filtered)
  }, [apiData, user.id])

  // État pour stocker les données filtrées

  // ** State
  const [value, setValue] = useState('')

  const [selectedRows, setSelectedRows] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

  // ** Hooks

  const handleFilter = val => {
    setValue(val)
  }

  // const filteredRows = filteredData.filter(row => row.netAmount.toLowerCase().includes(value.toLowerCase()))
  const filteredRows = filteredData.filter(
    row =>
      row.SDate.toLowerCase().includes(value.toLowerCase()) ||
      row.netAmount.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row.shipName.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row.clientName.toString().toLowerCase().includes(value.toString().toLowerCase())
  )

  const columns = [
    ...defaultColumns
    // {
    //   flex: 0.1,
    //   minWidth: 140,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }) => (
    //     <>
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         <OptionsMenu
    //           menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
    //           iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
    //           options={[
    //             {
    //               text: 'Supprimer',
    //               icon: <Icon icon='tabler:trash' fontSize={20} />,
    //               value: 'delete',
    //               menuItemProps: {
    //                 onClick: () => {
    //                   handleClickDelete(row)
    //                 }
    //               }
    //             },
    //             {
    //               text: 'Modifier',
    //               icon: <Icon icon='tabler:edit' fontSize={20} />,
    //               value: 'Edit',
    //               menuItemProps: {
    //                 onClick: () => {
    //                   handleClickUpdate(row)
    //                 }
    //               }
    //             }
    //           ]}
    //         />
    //       </Box>
    //     </>
    //   )
    // }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h6'>Contrats </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
                <DataGrid
                  autoHeight
                  pagination
                  rowHeight={62}
                  rows={filteredRows}
                  columns={columns}
                  disableRowSelectionOnClick
                  pageSizeOptions={[5, 15, 25]}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  onRowSelectionModelChange={rows => setSelectedRows(rows)}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export const getStaticProps = async () => {
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

    return {
      props: {
        apiData: result,
        clients
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

export default InvoiceList
