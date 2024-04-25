// ** React Imports
import { useState, useEffect, forwardRef, Fragment, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteFunction, fetchData, AddFunction, updateFunction, getByid } from 'src/APIs/campaniesApis'
import TableHeader from './TableHeader/index'
import axios from 'axios'

import cities from 'src/views/forms/form-wizard/data/index'
const citiesOptions = cities.map(element => ({
  value: element.cp,
  label: element.City + ' ' + element.SubCity
}))

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
import { sendEmail } from 'src/APIs/sendEmail'

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
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.City}</Typography>
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
const InvoiceList = ({ apiData }) => {
  ///****DATA*****////
  const [filteredData, setFilteredData] = useState(apiData)

  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().email().required(),
        Ename: yup.string().required(),
        cp: yup.mixed().required(),
        adress: yup.string().required(),
        rne: yup.number().required().positive().integer(),
        tlf: yup.number().required().positive().integer()
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

  /// delete
  const [showDelete, setShowDelete] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [selectedId, setSelectedID] = useState(-1)
  const [selectedCampany, setSelectedCampany] = useState(null)

  // Gestion de la suppression
  const handleClickDelete = row => {
    setShowDelete(true)
    setSelectedID(row.id)
  }
  const handleClickUpdate = row => {
    setSelectedCampany(row)
    reset({
      ...row,
      cp: citiesOptions.find(option => option.value === row.cp) ?? null
    })
    setShowUpdate(true)
    console.log('row', selectedCampany)
  }

  const deleteCampany = async id => {
    const deleted = await deleteFunction(id)
    if (deleted) {
      const newData = await fetchData()
      setFilteredData(newData)
      setShowDelete(false)
    }
  }

  const addClinet = async data => {
    const add = await AddFunction(data)
    if (add) {
      const newData = await fetchData()
      setFilteredData(newData)
      setShowDelete(false)
    }
  }

  const updateCampany = async (id, data) => {
    const update = await updateFunction(id, data)
    if (update) {
      const newData = await fetchData()
      setFilteredData(newData)
      setShowDelete(false)
    }
  }
  const onSubmit = data => {
    data.cp = cp
    data.City = city.City + ' ' + city.SubCity
    setShowUpdate(false)
    setCity(null)
    setCp(null)

    updateCampany(selectedCampany?.id, data)

    reset()
  }

  // ** State
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [endDateRange, setEndDateRange] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [startDateRange, setStartDateRange] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [city, setCity] = useState(null)
  const [cp, setCp] = useState(null)

  // ** Hooks

  const handleFilter = val => {
    setValue(val)
  }

  const filteredRows = filteredData.filter(
    row =>
      row.Ename.toLowerCase().includes(value.toLowerCase()) ||
      row.rne.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row.tlf.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
      row.email.toLowerCase().includes(value.toLowerCase()) ||
      row.City.toLowerCase().includes(value.toLowerCase())
  )

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

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
          <Typography variant='h6'>Gestion des Entreprises</Typography>
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
                    AddCampany={addClinet}
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
                    onConfirm={deleteCampany}
                    selectedId={selectedId}
                  />
                  <Dialog
                    fullWidth
                    open={showUpdate}
                    maxWidth='sm'
                    scroll='body'
                    onClose={() => {
                      setShowUpdate(false)
                      setSelectedCampany(null)
                      reset()
                    }}
                    TransitionComponent={Transition}
                    onBackdropClick={() => {
                      setShowUpdate(false)
                      setSelectedCampany(null)
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
                          setSelectedCampany(null)

                          reset()
                        }}
                      >
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                      </CustomCloseButton>
                      <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3 }}>
                          Modifier les informations de l'Entreprise
                        </Typography>
                      </Box>
                      <DatePickerWrapper>
                        <form
                          onSubmit={handleSubmit(data => {
                            console.log('mouezzzzzzzz', data)
                            let x = { ...data, City: data.cp.label, cp: data.cp.value }
                            console.log('xxxxxx', x)
                            setShowUpdate(false)

                            updateCampany(selectedCampany?.id, x)
                          })}
                        >
                          <Controller
                            name={'Ename'}
                            control={control}
                            render={({ field }) => (
                              <CustomTextField
                                {...field}
                                sx={{ mb: 4 }}
                                variant='outlined'
                                size='small'
                                fullWidth
                                label={'Nom'}
                                error={!!errors['Ename']}
                                helperText={'Ce champs requis'}

                                // helperText={errors['Ename']?.message}
                              />
                            )}
                          />
                          <Controller
                            name={'rne'}
                            control={control}
                            render={({ field }) => (
                              <CustomTextField
                                {...field}
                                sx={{ mb: 4 }}
                                variant='outlined'
                                size='small'
                                fullWidth
                                label={'rne'}
                                error={!!errors['rne']}
                                // helperText={errors['rne']?.message}
                                helperText={'Ce champs requis'}
                              />
                            )}
                          />
                          <Controller
                            name={'email'}
                            control={control}
                            render={({ field }) => (
                              <CustomTextField
                                {...field}
                                sx={{ mb: 4 }}
                                variant='outlined'
                                size='small'
                                fullWidth
                                label={'Email'}
                                error={!!errors['email']}
                                // helperText={errors['email']?.message}
                                helperText={'Ce champs requis'}
                              />
                            )}
                          />
                          {/* <Controller
                            name={'gender'}
                            control={control}
                            render={({ field }) => (
                              <CustomAutocomplete
                                options={['Homme', 'Femme']}
                                id='autocomplete-size-medium-multi'
                                {...field}
                                getOptionLabel={option => option}
                                renderInput={params => (
                                  <CustomTextField
                                    {...params}
                                    size='small'
                                    label='Gener'
                                    placeholder='Gener'
                                    error={!!errors['gender']}
                                    helperText={errors['gender']?.message}
                                  />
                                )}
                              />
                            )}
                          /> */}
                          {/* <Controller
                          name={'gender'}
                          control={control}
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              variant='outlined'
                              size='small'
                              fullWidth
                              label={'Gener'}
                              error={!!errors['gender']}
                              helperText={errors['gender']?.message}
                            />
                          )}
                        /> */}
                          {/* <Controller
                          name={'BirthDate'}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              showYearDropdown
                              showMonthDropdown
                              placeholderText='DD/MM/YYYY'
                              selected={field.value}
                              {...field}
                              customInput={
                                <CustomTextField
                                  ariant='outlined'
                                  size='small'
                                  fullWidth
                                  label={'Date de Naissance'}
                                  error={!!errors['BirthDate']}
                                  helperText={errors['BirthDate']?.message}
                                />
                              }
                            />
                          )}
                        /> */}
                          <Controller
                            name={'tlf'}
                            control={control}
                            render={({ field }) => (
                              <CustomTextField
                                {...field}
                                sx={{ mb: 4 }}
                                variant='outlined'
                                size='small'
                                fullWidth
                                label={'Numéro de téléphone'}
                                error={!!errors['tlf']}
                                // helperText={errors['tlf']?.message}
                                helperText={'Ce champs requis'}
                              />
                            )}
                          />
                          <Controller
                            name={'cp'}
                            control={control}
                            render={({ field }) => (
                              <CustomAutocomplete
                                sx={{ mb: 4 }}
                                options={citiesOptions}
                                id='autocomplete-size-medium-multi'
                                {...field}
                                onChange={(e, v) => field.onChange(v)}
                                getOptionLabel={option => {
                                  return option.label ?? ''
                                }}
                                isOptionEqualToValue={(option, val) => {
                                  return option.value === val.value
                                }}
                                renderInput={params => (
                                  <CustomTextField
                                    {...params}
                                    size='small'
                                    label='Ville'
                                    placeholder='Ville'
                                    helperText={'Ce champs requis'}
                                  />
                                )}
                              />
                            )}
                          />

                          <Controller
                            name={'adress'}
                            control={control}
                            render={({ field }) => (
                              <CustomTextField
                                {...field}
                                variant='outlined'
                                size='small'
                                fullWidth
                                label={'Addresse '}
                                error={!!errors['adress']}
                                // helperText={errors['adress']?.message}
                                helperText={'Ce champs requis'}
                              />
                            )}
                          />
                          <Button type='submit' variant='contained' color='primary' sx={{ mt: 5 }}>
                            Soumettre
                          </Button>
                        </form>
                      </DatePickerWrapper>
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
    const res = await axios.get('http://localhost:4500/campanies')
    const apiData = res.data
    return {
      props: {
        apiData
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
