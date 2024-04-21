// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { deleteFunction, fetchData, AddFunction, updateFunction, getByid } from 'src/APIs/adminApis'
import TableHeader from '../admin/TableHeader/index'
import axios from 'axios'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import InputAdornment from '@mui/material/InputAdornment'

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

// ** Third Party Imports
import format from 'date-fns/format'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DeleteDialog from '../admin/dialogs/deleteDialog'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import { tr } from 'date-fns/locale'
import email from 'src/store/apps/email'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** renders admin column
const renderClient = row => {
  if (row.image) {
    return <CustomAvatar src={row.image} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.firstName + ' ' + row.lastName || 'John Doe')}
      </CustomAvatar>
    )
  }
}

// const defaultColumns = [
//   {
//     flex: 0.25,
//     field: 'firstName',
//     minWidth: 150,
//     headerName: 'Prénom',
//     renderCell: params => {
//       return params.value ? 'Super Admin' : 'Admin'
//     }
//   },

//   {
//     flex: 0.25,
//     field: 'lastName',
//     minWidth: 150,
//     headerName: 'Nom'
//   },
//   {
//     flex: 0.25,
//     field: 'isSuperAdmin',
//     minWidth: 150,
//     headerName: 'Status',
//     renderCell: params => {
//       return params.value ? 'Super Admin' : 'Admin'
//     }
//   },

//   {
//     flex: 0.25,
//     field: 'email',
//     minWidth: 150,
//     headerName: 'E-mail'
//   }
// ]
const defaultColumns = [
  {
    flex: 0.25,
    field: 'firstName',
    minWidth: 200, // Augmentez la largeur pour accueillir l'image et le texte
    headerName: 'Prénom',
    renderCell: params => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={
              params.row?.image ? 'http://localhost:4500/static/admins/' + params.row?.image : '/images/defaultUser.png'
            }
            alt={params.row.firstName}
            style={{ width: 35, height: 35, marginRight: 10, borderRadius: '50%' }}
          />
          {/* Afficher le prénom */}
          <span>{params.row.firstName}</span>
        </div>
      )
    }
  },
  {
    flex: 0.25,
    field: 'lastName',
    minWidth: 150,
    headerName: 'Nom'
  },
  {
    flex: 0.25,
    field: 'isSuperAdmin',
    minWidth: 150,
    headerName: 'Status',
    renderCell: params => {
      return params.value ? 'Super Admin' : 'Admin'
    }
  },
  {
    flex: 0.25,
    field: 'email',
    minWidth: 150,
    headerName: 'E-mail'
  }
]

const defaultoject = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  image: '',
  isSuperAdmin: '',
  createdAt: '',
  updatedAt: ''
}

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
  const handleImageUpload = image => {
    setSelectedImage(image)
  }
  // ***
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const [confirmPassValues, setConfirmPassValues] = useState({
    password: '',
    showPassword: false
  })

  const [passwordError, setPasswordError] = useState(false)

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleConfirmPassChange = prop => event => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }
  ///****DATA*****////
  const [filteredData, setFilteredData] = useState(apiData)

  /// delete
  const [showDelete, setShowDelete] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [selectedId, setSelectedID] = useState(-1)
  const [selectedAdmin, setSelectedAdmin] = useState(null)

  // Gestion de la suppression
  const handleClickDelete = row => {
    setShowDelete(true)
    setSelectedID(row.id)
  }
  const handleClickUpdate = async row => {
    let admin = await getByid(row.id)
    console.log(admin)
    setSelectedAdmin(admin)
    setShowUpdate(true)
  }

  const deleteAdmin = async id => {
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

  const updateAdmin = async (id, data) => {
    const update = await updateFunction(id, data)
    if (update) {
      const newData = await fetchData()
      setFilteredData(newData)
      setShowDelete(false)
    }
  }
  const onSubmit = data => {
    setShowUpdate(false)

    console.log(data)
    let submitedData = data
    if (submitedData?.isSuperAdmin == 'Admin') {
      submitedData.isSuperAdmin = false
    } else {
      submitedData.isSuperAdmin = true
    }
    console.log('submted ', submitedData)
    submitedData.password = selectedAdmin.password
    submitedData.password = selectedAdmin.image
    updateAdmin(selectedAdmin?.id, submitedData)

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
      row.firstName.toLowerCase().includes(value.toLowerCase()) ||
      row.lastName.toLowerCase().includes(value.toLowerCase()) ||
      row.email.toLowerCase().includes(value.toLowerCase())
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
                    onClick: async () => {
                      await handleClickUpdate(row)
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
          <Typography variant='h6'>Gestion des Administrateurs</Typography>
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
                    Addadmin={addClinet}
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

                  <DeleteDialog
                    open={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={deleteAdmin}
                    selectedId={selectedId}
                  />
                  <Dialog
                    fullWidth
                    open={showUpdate}
                    maxWidth='sm'
                    scroll='body'
                    onClose={() => {
                      setShowUpdate(false)
                      setSelectedAdmin(defaultoject)
                      reset()
                    }}
                    TransitionComponent={Transition}
                    onBackdropClick={() => {
                      setShowUpdate(false)
                      setSelectedAdmin(defaultoject)
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
                          setSelectedAdmin(defaultoject)

                          reset()
                        }}
                      >
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                      </CustomCloseButton>
                      <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3 }}>
                          Modifier les informations du admin
                        </Typography>
                      </Box>
                      <Box sx={{ marginTop: '5%' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <CustomTextField
                                value={selectedAdmin?.firstName}
                                fullWidth
                                label='Prénom'
                                {...register('firstName', { required: true })}
                                onChange={e => setSelectedAdmin({ ...selectedAdmin, firstName: e.target.value })}
                                placeholder='Prénom'
                                sx={{ position: 'relative' }}
                              />
                              {errors.firstName && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                              {watch('firstName') && (
                                <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>
                                  {watch('firstName').length}/50
                                </span>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <CustomTextField
                                value={selectedAdmin?.lastName}
                                fullWidth
                                label='Nom'
                                {...register('lastName', { required: true })}
                                onChange={e => setSelectedAdmin({ ...selectedAdmin, lastName: e.target.value })}
                                placeholder='Nom'
                                sx={{ position: 'relative' }}
                              />
                              {errors.firstName && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                              {watch('firstName') && (
                                <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>
                                  {watch('firstName').length}/50
                                </span>
                              )}
                            </Grid>

                            <Grid item xs={12}>
                              <CustomTextField
                                value={selectedAdmin?.username}
                                fullWidth
                                label='Username/Identifiant'
                                {...register('username', { required: true })}
                                onChange={e => setSelectedAdmin({ ...selectedAdmin, username: e.target.value })}
                                placeholder='username'
                                sx={{ position: 'relative' }}
                              />
                              {errors.username && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                              {watch('username') && (
                                <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>
                                  {watch('username').length}/50
                                </span>
                              )}
                            </Grid>
                            {/* <Grid item xs={12}>
                              <CustomTextField
                                fullWidth
                                label='Mot de passe'
                                value={selectedAdmin?.password}
                                {...register('password', { required: true })}
                                id='form-layouts-basic-password'
                                onChange={handleChange('password')}
                                type={values.showPassword ? 'text' : 'password'}
                                aria-describedby='form-layouts-basic-password-helper'
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                      <IconButton
                                        edge='end'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={e => e.preventDefault()}
                                        aria-label='toggle password visibility'
                                      >
                                        <Icon
                                          fontSize='1.25rem'
                                          icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                                        />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <CustomTextField
                                fullWidth
                                label='Confirmez le mot de passe'
                                value={selectedAdmin?.password}
                                id='form-layouts-confirm-password'
                                {...register('confirmPassword', { required: true })}
                                onChange={handleConfirmPassChange('password')}
                                aria-describedby='form-layouts-confirm-password-helper'
                                type={confirmPassValues.showPassword ? 'text' : 'password'}
                                error={passwordError} // Ajoutez une erreur si les mots de passe ne correspondent pas
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                      <IconButton
                                        edge='end'
                                        onClick={handleClickConfirmPassShow}
                                        onMouseDown={e => e.preventDefault()}
                                        aria-label='toggle password visibility'
                                      >
                                        <Icon
                                          fontSize='1.25rem'
                                          icon={confirmPassValues.showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                                        />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }}
                              />
                              {passwordError && <span style={{ color: 'red' }}>Passwords do not match</span>}
                            </Grid> */}
                            <Grid item xs={12}>
                              <CustomTextField
                                fullWidth
                                value={selectedAdmin?.email}
                                label='E-mail'
                                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                                placeholder='E-mail'
                                onChange={e => setSelectedAdmin({ ...selectedAdmin, email: e.target.value })}
                                sx={{ position: 'relative' }}
                              />
                              {errors.email && (
                                <span style={{ color: 'red' }}>
                                  Ce champ est requis et doit être une adresse e-mail valide.
                                </span>
                              )}
                              {watch('email') && (
                                <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>
                                  {watch('email').length}/50
                                </span>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <CustomAutocomplete
                                value={selectedAdmin?.isSuperAdmin ? 'Super Admin' : 'Admin'}
                                options={['Admin', 'Super Admin']}
                                onChange={(event, val) => {
                                  const isSuperAdminValue = val === 'Admin' ? false : true
                                  setValues('isSuperAdmin', isSuperAdminValue)
                                  console.log(val)
                                }}
                                id='autocomplete-size-medium-multi'
                                renderInput={params => (
                                  <CustomTextField
                                    {...params}
                                    size='small'
                                    label='Status'
                                    placeholder='Status'
                                    {...register('isSuperAdmin', { required: true })}
                                  />
                                )}
                              />
                            </Grid>
                            {/* <Grid item xs={12} sx={{ mt: 1 }}>
                              <label>Importer Image</label>

                              <FileUploaderSingle
                                register={name => register('image', { required: true, name })}
                                onImageUpload={handleImageUpload}
                              />
                              {errors.fileUpload && (
                                <span style={{ color: 'red' }}>Veuillez sélectionner un fichier.</span>
                              )}
                            </Grid> */}
                            <Grid item xs={12}>
                              <Button variant='contained' type='submit'>
                                Envoyer
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Box>

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
    const res = await axios.get('http://localhost:4500/admins')
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
