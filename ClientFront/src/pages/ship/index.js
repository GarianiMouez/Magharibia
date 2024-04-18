// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'
import TableHeader from './TableHeader/index'
import axios from 'axios'
const localizedTextsMap = {
  columnMenuUnsort: 'não classificado',
  columnMenuSortAsc: 'Classificar por ordem crescente',
  columnMenuSortDesc: 'Classificar por ordem decrescente',
  columnMenuFilter: 'Filtro',
  columnMenuHideColumn: 'Ocultar',
  columnMenuShowColumns: 'Mostrar colunas'
}

// ** Next Import
import Link from 'next/link'

// ** MUI Imports

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid'

import { useAuth } from 'src/hooks/useAuth'

const defaultColumns = [
  {
    flex: 0.25,
    field: 'description',
    minWidth: 150,
    headerName: 'Description'
  },
  {
    flex: 0.25,
    field: 'mark',
    minWidth: 150,
    headerName: 'Marque'
  },
  {
    flex: 0.25,
    field: 'name',
    minWidth: 150,
    headerName: 'Nom'
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
    const filtered = apiData.filter(data => data.ownerId === user.id)
    console.log('dddd', filtered)
    setFilteredData(filtered)
    console.log(user)
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
      row.name.toLowerCase().includes(value.toLowerCase()) ||
      row.description.toString().toLowerCase().includes(value.toString().toLowerCase())
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
          <Typography variant='h6'>List des Bateaux</Typography>
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
                  localeText={localizedTextsMap}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps() {
  try {
    const shipsRes = await axios.get('http://localhost:4500/ship')
    const apiData = shipsRes.data

    return {
      props: {
        apiData: apiData
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'API :", error)
    return {
      props: {
        apiData: []
      }
    }
  }
}

export default InvoiceList
