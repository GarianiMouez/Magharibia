// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { deleteFunction, fetchShip, AddFunction, updateFunction, getByid } from 'src/APIs/shipsAPIs'
import TableHeader from './TableHeader/index'
import axios from 'axios'
import Marks from './Marks'

import cities from 'src/views/forms/form-wizard/data/index'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Fade from '@mui/material/Fade'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
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

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useSelector } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DeleteDialog from './dialogs/deleteDialog'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** renders client column
const renderClient = row => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns = [
  {
    flex: 0.25,
    field: 'description',
    minWidth: 150,
    headerName: 'Description'
  },
  {
    flex: 0.25,
    field: 'name',
    minWidth: 150,
    headerName: 'Nom'
  },
  {
    flex: 0.25,
    field: 'mark',
    minWidth: 150,
    headerName: 'Marque'
  }
]
/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

/* eslint-enable */
const ShipList = ({ apiData, client }) => {
  ///****DATA*****////
  const [filteredData, setFilteredData] = useState(apiData)
  const [mark, setMark] = useState(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [clientId, setClientId] = useState(null)

  /// delete
  const [showDelete, setShowDelete] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [selectedId, setSelectedID] = useState(-1)
  const [selectedShip, setSelectedShip] = useState(null)

  // Gestion de la suppression
  const handleClickDelete = row => {
    setShowDelete(true)
    setSelectedID(row.id)
  }
  const handleClickUpdate = async row => {
    try {
      let ship = await getByid(row.id)

      let selectedMark = Marks.find(el => el.mark === ship.mark)
      setMark(selectedMark)

      setSelectedShip(ship)

      setShowUpdate(true)
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération du navire :", error)
    }
  }

  const deleteShip = async id => {
    const deleted = await deleteFunction(id)
    if (deleted) {
      const newData = await fetchShip()
      setFilteredData(newData)
      setShowDelete(false)
      reset()
    }
  }

  const addClinet = async data => {
    const add = await AddFunction(data)
    if (add) {
      const newData = await fetchShip()
      setFilteredData(newData)
      setShowDelete(false)
      reset()
    }
  }

  const updateClient = async (id, data) => {
    const update = await updateFunction(id, data)
    if (update) {
      const newData = await fetchShip()
      setFilteredData(newData)
      setShowDelete(false)
    }
  }
  const onSubmit = data => {
    setShowUpdate(false)
    let submittedData = { ...data, ClientId: clientId }
    delete submittedData.client

    updateClient(selectedShip?.id, submittedData)
    setSelectedShip(null)

    reset()
  }

  // ** State
  const [value, setValue] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

  // ** Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()

  const handleFilter = val => {
    setValue(val)
  }

  const filteredRows = filteredData.filter(
    row =>
      row.description.toLowerCase().includes(value.toLowerCase()) ||
      row.name.toLowerCase().includes(value.toLowerCase()) ||
      row.mark.toLowerCase().includes(value.toLowerCase())
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
          <Typography variant='h6'>Gestion des Bateaux</Typography>
        </Grid>
        <Grid item xs={12}>
          <DatePickerWrapper>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <TableHeader
                    value={value}
                    selectedRows={selectedRows}
                    handleFilter={handleFilter}
                    Addship={addClinet}
                  />
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

                  {/* updateDialog */}
                  <DeleteDialog
                    open={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={deleteShip}
                    selectedId={selectedId}
                  />
                  <Dialog
                    fullWidth
                    open={showUpdate}
                    maxWidth='sm'
                    scroll='body'
                    onClose={() => {
                      setShowUpdate(false)
                      setSelectedShip(null)
                      reset()
                    }}
                    TransitionComponent={Transition}
                    onBackdropClick={() => {
                      setShowUpdate(false)
                      setSelectedShip(null)
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
                          setSelectedShip(null)

                          reset()
                        }}
                      >
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                      </CustomCloseButton>
                      <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3 }}>
                          Modifier les informations du Bateau
                        </Typography>
                      </Box>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <CustomTextField
                              required
                              id='textarea-outlined-static'
                              value={selectedShip?.name || ''}
                              fullWidth
                              label='Nom'
                              {...register('name', { required: true })}
                              onChange={e => {
                                setSelectedShip({ ...selectedShip, name: e.target.value })
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <CustomTextField
                              required
                              value={selectedShip?.description || ''}
                              rows={5}
                              multiline
                              fullWidth
                              label='Description'
                              placeholder='Description'
                              id='textarea-outlined-static'
                              {...register('description', { required: true })}
                              onChange={e => setSelectedShip({ ...selectedShip, description: e.target.value })}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <CustomAutocomplete
                              required
                              options={Marks}
                              value={mark}
                              onChange={(event, val) => {
                                setMark(val)
                                if (val) {
                                  setSelectedShip(selectedShip => ({
                                    ...selectedShip,
                                    marks: val
                                  }))
                                }
                              }}
                              id='autocomplete-size-medium-multi'
                              getOptionLabel={option => option.mark || ''}
                              renderInput={params => (
                                <CustomTextField
                                  required
                                  {...params}
                                  size='small'
                                  label='Marque'
                                  placeholder='Marque'
                                  {...register('mark', { required: true })}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <CustomAutocomplete
                              required
                              options={client}
                              value={selectedShip?.client || ''}
                              onChange={(event, val) => {
                                if (val) {
                                  setSelectedShip(prevState => ({
                                    ...prevState,
                                    client: val
                                  }))
                                  setClientId(val.id)
                                }
                              }}
                              id='autocomplete-size-medium-multi'
                              getOptionLabel={option => option.Fname + ' ' + option.Lname || ''}
                              renderInput={params => (
                                <CustomTextField
                                  required
                                  {...params}
                                  size='small'
                                  label='Client'
                                  placeholder='Client'
                                  {...register('client', { required: true })}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button variant='contained' type='submit'>
                              Envoyer
                            </Button>
                          </Grid>
                        </Grid>
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
    const res = await axios.get('http://localhost:4500/ship')
    const clientRes = await axios.get('http://localhost:4500/client')
    const client = clientRes.data
    const apiData = res.data
    return {
      props: {
        apiData,
        client
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

export default ShipList
