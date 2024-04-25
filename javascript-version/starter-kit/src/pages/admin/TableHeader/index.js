import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useForm } from 'react-hook-form'

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
import InputAdornment from '@mui/material/InputAdornment'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import { sendEmail } from 'src/APIs/sendEmail'

// ** Styled Components

const TableHeader = props => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Fonction pour gérer l'enregistrement de l'image
  const handleImageUpload = image => {
    setSelectedImage(image)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()

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

  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)

    reset()
  }
  const onSubmit = async data => {
    if (data.password !== data.confirmPassword) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
      setShow(false)
      reset()
      const { confirmPassword, ...submittedData } = data
      submittedData.isSuperAdmin = submittedData.isSuperAdmin === 'Admin' ? false : true
      submittedData.image = selectedImage ? selectedImage : null

      const formData = new FormData()
      for (const key in submittedData) {
        formData.append(key, submittedData[key])
      }
      console.log('heder', data)

      props.Addadmin(formData)

      let body = {
        senderEmail: 'mouezghariani2@gmail.com',
        recipientEmail: data.email,
        subject: 'Inscription chez Maghribia Assurance',
        text: `Cher ${data.firstName}\n \n \n Nous sommes ravi de vous compte est créé avec success \n  \t username : ${data.username} \n \t mot de passe : ${data.password}\n Merci de votre conféance \n\n Cordiallement`
      }
      await sendEmail(body)
    }
  }

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <CustomTextField
            value={props.value} // Utilisez props.value au lieu de value
            sx={{ mr: 4, mb: 2 }}
            placeholder='Recherche ...'
            onChange={e => props.handleFilter(e.target.value)} // Utilisez props.handleFilter au lieu de handleFilter
          />

          <Button sx={{ mb: 2 }} onClick={handleClick} variant='contained'>
            Ajouter Admin
          </Button>
        </Box>
      </Box>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={handleClose} // Utilisez handleClose pour gérer la fermeture du dialogue
        TransitionComponent={Transition}
        onBackdropClick={handleClose} // Utilisez handleClose pour gérer la fermeture du dialogue
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <CustomCloseButton
              onClick={() => {
                setShow(false)
              }}
            >
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Ajouter Nouveau Admin
            </Typography>
          </Box>

          <Box sx={{ marginTop: '5%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nom'
                    {...register('lastName', { required: true })}
                    placeholder='Nom'
                    sx={{ position: 'relative' }}
                  />
                  {errors.lastName && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Prénom'
                    {...register('firstName', { required: true })}
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
                    fullWidth
                    label='Username/Identifiant'
                    {...register('username', { required: true })}
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
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Mot de passe'
                    value={values.password}
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
                            <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
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
                    value={confirmPassValues.password}
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
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='E-mail'
                    {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    placeholder='E-mail'
                    sx={{ position: 'relative' }}
                  />
                  {errors.email && (
                    <span style={{ color: 'red' }}>Ce champ est requis et doit être une adresse e-mail valide.</span>
                  )}
                  {watch('email') && (
                    <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>{watch('email').length}/50</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <CustomAutocomplete
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
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <label>Importer Image</label>

                  <FileUploaderSingle
                    register={name => register('image', { required: true, name })}
                    onImageUpload={handleImageUpload}
                  />
                  {errors.fileUpload && <span style={{ color: 'red' }}>Veuillez sélectionner un fichier.</span>}
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    Soumettre
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
