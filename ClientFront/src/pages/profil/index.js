// ** React Imports
import { useState } from 'react'
import cities from 'src/views/forms/form-wizard/data/index'
import { updateFunction } from 'src/APIs/clientApis'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import { useAuth } from 'src/hooks/useAuth'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

const initialData = {
  id: '',
  Fname: '',
  Lname: '',
  BirthDate: '',
  username: '',
  image: '',
  cin: '',
  email: '',
  tlf: '',
  City: '',
  cp: '',
  adress: ''
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const TabAccount = () => {
  const { logout, user } = useAuth()

  const displayData = () => {
    formData.City = City.City + ' ' + City.SubCity
    formData.cp = City.cp
    console.log('Test city:', formData.City)

    // Créer un nouvel objet FormData
    let dataToSubmit = new FormData()
    for (const key in formData) {
      if (key !== 'role' && key !== 'image') {
        dataToSubmit.append(key, formData[key])
      }
    }
    dataToSubmit.append('image', image)

    for (const [key, value] of dataToSubmit.entries()) {
      console.log(key + ': ' + value)
    }
    // Appeler la fonction de mise à jour avec les données FormData
    updateFunction(formData.id, dataToSubmit)
  }

  // ** State
  const [inputValue, setInputValue] = useState('')
  const [formData, setFormData] = useState(user)
  const initialCity = cities.find(
    el => el.City.toLowerCase() + ' ' + el.SubCity.toLowerCase() === user.City.toLowerCase()
  )
  const [City, setCity] = useState(initialCity || null)

  const [imgSrc, setImgSrc] = useState(
    user.image ? 'http://localhost:4500/static/clients/' + user.image : '/images/defaultUser.png'
  )
  const [image, setImage] = useState()
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const handleInputImageChange = event => {
    const reader = new FileReader()
    const { files } = event.target
    const file = files[0]
    setImage(file)
    console.log('test image', file)
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc(!user.image ? '/images/defaultUser.png ' : 'http://localhost:4500/static/clients/' + user.image)
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Détails du Profil' />
          <form>
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Importer une nouvelle photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                    Réinitialiser
                  </ResetButtonStyled>
                  {/* <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography> */}
                </div>
              </Box>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Prénom'
                    placeholder='Prénom'
                    value={formData.Fname}
                    onChange={e => handleFormChange('Fname', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Nom'
                    placeholder='Nom'
                    value={formData.Lname}
                    onChange={e => handleFormChange('Lname', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    type='email'
                    label='E-mail'
                    value={formData.email}
                    placeholder='xx.yyy@example.com'
                    onChange={e => handleFormChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='CIN'
                    placeholder='CIN'
                    value={formData.cin}
                    onChange={e => handleFormChange('cin', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Identifiant'
                    placeholder='Identifiant'
                    value={formData.username}
                    onChange={e => handleFormChange('username', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    type='number'
                    label='Téléphone'
                    value={formData.tlf}
                    placeholder='20 202 202'
                    onChange={e => handleFormChange('number', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position='start'>+ 216</InputAdornment> }}
                  />
                </Grid>
                {/* 
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Ville'
                    placeholder='California'
                    value={formData.City}
                    onChange={e => handleFormChange('City', e.target.value)}
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    value={City}
                    onChange={(option, val) => {
                      setCity(val)
                      setCp(val.cp)
                    }}
                    options={cities}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => option.City + ' ' + option.SubCity || ''}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        size='small'
                        label='Ville'
                        placeholder='Ville'
                        value={formData.City}
                      />
                    )}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    type='number'
                    label='Code Postal'
                    placeholder='231465'
                    value={formData.cp}
                    onChange={e => handleFormChange('cp', e.target.value)}
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Addresse'
                    placeholder='Address'
                    value={formData.adress}
                    onChange={e => handleFormChange('adress', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                  <Button
                    variant='contained'
                    sx={{ mr: 4 }}
                    onClick={() => {
                      displayData()
                    }}
                  >
                    Enregistrer
                  </Button>
                  <Button
                    type='reset'
                    variant='tonal'
                    color='secondary'
                    onClick={() => {
                      setFormData(user)
                      let initialCity = cities.find(
                        el => el.City.toLowerCase() + ' ' + el.SubCity.toLowerCase() === user.City.toLowerCase()
                      )
                      setCity(initialCity)
                    }}
                  >
                    Réinitialiser
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>

      {/* Delete Account Card */}
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Delete Account' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <FormControl>
                  <Controller
                    name='checkbox'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormControlLabel
                        label='I confirm my account deactivation'
                        sx={{ '& .MuiTypography-root': { color: errors.checkbox ? 'error.main' : 'text.secondary' } }}
                        control={
                          <Checkbox
                            {...field}
                            size='small'
                            name='validation-basic-checkbox'
                            sx={errors.checkbox ? { color: 'error.main' } : null}
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText
                      id='validation-basic-checkbox'
                      sx={{ mx: 0, color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}
                    >
                      Please confirm you want to delete account
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                Deactivate Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid> */}

      {/* Deactivate Account Dialogs */}
      {/* <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            <Icon icon='tabler:alert-circle' fontSize='5.5rem' />
            <Typography>Are you sure you would like to cancel your subscription?</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
            Yes
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 8,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon fontSize='5.5rem' icon={userInput === 'yes' ? 'tabler:circle-check' : 'tabler:circle-x'} />
            <Typography variant='h4' sx={{ mb: 5 }}>
              {userInput === 'yes' ? 'Deleted!' : 'Cancelled'}
            </Typography>
            <Typography>
              {userInput === 'yes' ? 'Your subscription cancelled successfully.' : 'Unsubscription Cancelled!!'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
  )
}

export default TabAccount
