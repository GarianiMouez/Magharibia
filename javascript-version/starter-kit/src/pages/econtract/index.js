// ** React Imports
import { useState, useEffect, forwardRef, Fragment, useMemo } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { deleteFunction, fetchData, updateFunction, getByid, FetchContract } from 'src/APIs/contratEntreprise'
import { formatDate, getShipsPerCompany } from 'src/APIs/utilFunction'
import TableHeader from './TableHeader/index'
import axios from 'axios'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Fade from '@mui/material/Fade'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import OptionsMenu from 'src/@core/components/option-menu'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DeleteDialog from './dialogs/deleteDialog'

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
  {
    flex: 0.25,
    field: 'campanyName',
    minWidth: 20,
    headerName: 'Entreprise'
  },
  {
    flex: 0.25,
    field: 'shipName',
    minWidth: 20,
    headerName: 'Ship'
  }
]

const InvoiceList = ({ apiData, campanies, ships }) => {
  const campaniesOption = campanies.map(entr => ({
    label: entr.Ename,
    value: entr.id
  }))

  const [filteredData, setFilteredData] = useState(apiData)

  const [showDelete, setShowDelete] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [selectedId, setSelectedID] = useState(-1)
  const [selectedContract, setSelectedContract] = useState(null)

  const [value, setValue] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

  const schema = useMemo(
    () =>
      yup.object({
        campany: yup.mixed().required(),
        ship: yup.mixed().required(),
        motor: yup.number().required().positive().integer(),
        Coqu: yup.number().required().positive().integer(),
        SDate: yup.date().required(),
        EDate: yup.date().required()
      }),
    []
  )
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClickDelete = row => {
    setShowDelete(true)
    setSelectedID(row.id)
  }
  const handleClickUpdate = async row => {
    const contract = await getByid(row.id)
    console.log(contract)
    reset({
      ...contract,
      SDate: row.SDate ? new Date(row.SDate).toISOString().split('T')[0] : '',
      EDate: row.EDate ? new Date(row.EDate).toISOString().split('T')[0] : '',
      campany: campaniesOption.find(option => option.value === contract.CompanyId) ?? null,
      ship: shipsOption.find(option => option.value === contract.ShipId) ?? null
    })

    setSelectedContract(row)
    // console.log
    // const campanyShips = await getShipsPerCompany(contract.campanyId)
    // setSelectedcampanyShips(campanyShips)
    setShowUpdate(true)
  }

  const DeletePersonnalContract = async id => {
    const deleted = await deleteFunction(id)
    if (deleted) {
      const newData = await FetchContract()

      setShowDelete(false)
      setFilteredData(newData)
    }
  }

  const updateCampany = async (id, data) => {
    const update = await updateFunction(id, data)
    if (update) {
      const newData = await FetchContract()
      setFilteredData(newData)
      setShowDelete(false)
    }
  }
  const onSubmit = data => {
    data = {
      ...data,
      id: selectedContract.id,
      motor: parseFloat(data.motor),
      Coqu: parseFloat(data.Coqu),
      totalAmount: parseFloat(data.Coqu) + parseFloat(data.motor) + 10,
      netAmount: parseFloat(data.Coqu) + parseFloat(data.motor),
      SDate: formatDate(selectedContract.SDate),
      EDate: formatDate(selectedContract.EDate),
      campanyId: selectedContract.campanyId,
      ShipId: selectedContract.ShipId
    }

    setShowUpdate(false)

    updateCampany(selectedContract?.id, data)

    reset()
  }

  const watchClient = useWatch({ name: 'campany', control })
  console.log('cammb,dm', watchClient)

  const shipsOption = ships
    .filter(ship => {
      return ship.ownerId === watchClient?.value && ship.ownerType === 'enterprise'
    })
    .map(filteredShip => {
      return { label: filteredShip.name, value: filteredShip.id }
    })
  console.log(shipsOption)
  console.log('ships perclient', shipsOption)

  console.log('eeee', errors)

  const handleFilter = val => {
    setValue(val)
  }

  const filteredRows = filteredData.filter(
    row =>
      row.netAmount.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row.shipName.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row.campanyName.toString().toLowerCase().includes(value.toString().toLowerCase())
  )

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionsMenu
              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
              iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
              options={[
                {
                  text: 'Supprimer',
                  icon: <Icon icon='tabler:trash' fontSize={20} />,
                  value: 'delete',
                  menuItemProps: {
                    onClick: () => {
                      handleClickDelete(row)
                    }
                  }
                },
                {
                  text: 'Modifier',
                  icon: <Icon icon='tabler:edit' fontSize={20} />,
                  value: 'Edit',
                  menuItemProps: {
                    onClick: () => {
                      handleClickUpdate(row)
                    }
                  }
                }
              ]}
            />
          </Box>
        </>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h6'>Gestion des Contrats Personnels</Typography>
        </Grid>
        <Grid item xs={12}>
          <DatePickerWrapper>
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

                  {/* deleteDialog */}
                  <DeleteDialog
                    open={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={DeletePersonnalContract}
                    selectedId={selectedId}
                  />
                  {/* updateDialog */}
                  <Dialog
                    fullWidth
                    open={showUpdate}
                    maxWidth='sm'
                    scroll='body'
                    onClose={() => {
                      setShowUpdate(false)
                      setSelectedContract(null)
                      reset()
                    }}
                    TransitionComponent={Transition}
                    onBackdropClick={() => {
                      setShowUpdate(false)
                      setSelectedContract(null)
                      reset()
                    }}
                    sx={{
                      '& .MuiDialog-paper': { overflow: 'visible' }
                    }}
                  >
                    <DialogContent
                      sx={{
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                      }}
                    >
                      <CustomCloseButton
                        onClick={() => {
                          setShowUpdate(false)
                          setSelectedContract(null)

                          reset()
                        }}
                      >
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                      </CustomCloseButton>
                      <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3 }}>
                          Modifier les informations du contrat
                        </Typography>
                      </Box>
                      <form
                        onSubmit={handleSubmit(data => {
                          let x = { ...data, ShipId: data.ship.value, CompanyId: data.campany.value }

                          console.log('sikosiko', x)

                          setShowUpdate(false)

                          updateCampany(x?.id, x)
                        })}
                      >
                        <Controller
                          name={'SDate'}
                          control={control}
                          render={({ field }) => {
                            // console.log(field)
                            return (
                              <CustomTextField
                                {...field}
                                sx={{ mb: 4 }}
                                type='date'
                                variant='outlined'
                                size='small'
                                fullWidth
                                label={'Effet Du '}
                                error={!!errors['SDate']}
                                // helperText={errors['SDate']?.message}
                                helperText={'Ce champs requis'}
                              />
                            )
                          }}
                        />
                        <Controller
                          name={'EDate'}
                          control={control}
                          render={({ field }) => {
                            // console.log(field)
                            return (
                              <CustomTextField
                                {...field}
                                sx={{ mb: 4 }}
                                type='date'
                                variant='outlined'
                                size='small'
                                fullWidth
                                label={'Effet Au'}
                                error={!!errors['EDate']}
                                // helperText={errors['SDate']?.message}
                                helperText={'Ce champs requis'}
                              />
                            )
                          }}
                        />
                        <Controller
                          name={'Coqu'}
                          control={control}
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              sx={{ mb: 4 }}
                              variant='outlined'
                              size='small'
                              fullWidth
                              label={'Coqu'}
                              error={!!errors['Coqu']}
                              helperText={'Ce champs requis'}
                              // helperText={errors['username']?.message}
                            />
                          )}
                        />
                        <Controller
                          name={'motor'}
                          control={control}
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              sx={{ mb: 4 }}
                              variant='outlined'
                              size='small'
                              fullWidth
                              label={'Moteur'}
                              error={!!errors['motor']}
                              helperText={'Ce champs requis'}
                              // helperText={errors['username']?.message}
                            />
                          )}
                        />
                        <Controller
                          name={'campany'}
                          control={control}
                          render={({ field }) => (
                            <CustomAutocomplete
                              options={campaniesOption}
                              id='autocomplete-size-medium-multi'
                              {...field}
                              sx={{ mb: 4 }}
                              onChange={(e, v) => field.onChange(v)}
                              getOptionLabel={option => {
                                return option.label
                              }}
                              isOptionEqualToValue={(option, val) => {
                                return option.value === val.value
                              }}
                              renderInput={params => (
                                <CustomTextField
                                  {...params}
                                  size='small'
                                  label='Entreprise'
                                  placeholder='Entreprise'
                                  helperText={'Ce champs requis'}
                                />
                              )}
                            />
                          )}
                        />
                        {/* bateaux ici */}
                        <Controller
                          name={'Bateaux'}
                          control={control}
                          render={({ field }) => (
                            <CustomAutocomplete
                              options={shipsOption}
                              id='autocomplete-size-medium-multi'
                              {...field}
                              sx={{ mb: 4 }}
                              onChange={(e, v) => field.onChange(v)}
                              getOptionLabel={option => {
                                return option.label
                              }}
                              isOptionEqualToValue={(option, val) => {
                                return option.value === val.value
                              }}
                              renderInput={params => (
                                <CustomTextField
                                  {...params}
                                  size='small'
                                  label='Bateaux'
                                  placeholder='Bateaux'
                                  helperText={'Ce champs requis'}
                                />
                              )}
                            />
                          )}
                        />
                        <Button type='submit' variant='contained' color='primary' sx={{ mt: 5 }}>
                          Soumettre
                        </Button>
                      </form>

                      <Box
                        sx={{
                          rowGap: 2,
                          columnGap: 4,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      ></Box>
                    </DialogContent>
                  </Dialog>
                </Card>
              </Grid>
            </Grid>
          </DatePickerWrapper>
        </Grid>
      </Grid>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const contractsRes = await axios.get('http://localhost:4500/econtract')
    const campanysRes = await axios.get('http://localhost:4500/campanies')
    const shipsRes = await axios.get('http://localhost:4500/ship')

    const contracts = contractsRes.data
    const campanies = campanysRes.data
    const ships = shipsRes.data
    console.log(campanies)

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

    console.log(result)
    return {
      props: {
        apiData: result,
        campanies,
        ships
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
