import { useState, forwardRef, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import cities from 'src/views/forms/form-wizard/data/index'
const citiesOptions = cities.map(element => ({
  value: element.cp,
  label: element.City + ' ' + element.SubCity
}))

// ** MUI Imports
import Fade from '@mui/material/Fade'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
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

// ** Utils Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { InputAdornment } from '@mui/material'

const TableHeader = props => {
  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
        username: yup.string().required(),
        Fname: yup.string().required(),
        Lname: yup.string().required(),
        gender: yup.mixed().required(),
        cp: yup.mixed().required(),
        adress: yup.string().required(),
        cin: yup.number().required().positive().integer(),
        tlf: yup.number().required().positive().integer(),
        BirthDate: yup.date().required()
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

  const [show, setShow] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [city, setCity] = useState(null)
  const [cp, setCp] = useState(null)
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState(null)

  const handleClick = () => {
    setShow(true)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClose = () => {
    setShow(false)
    setCity(null)
    setCp(null)
    setBirthDate('')
    setGender('')
    reset()
  }

  const onSubmit = data => {
    setShow(false)
    setCity(null)
    setCp(null)
    setBirthDate('')
    reset()
    console.log(data)
    props.Addclient(data)
  }

  const onChangeDate = e => {
    setBirthDate(e)
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
            value={props.value}
            sx={{ mr: 4, mb: 2 }}
            placeholder='Recherche ...'
            onChange={e => props.handleFilter(e.target.value)}
          />

          <Button sx={{ mb: 2 }} onClick={handleClick} variant='contained'>
            Ajouter Client
          </Button>
        </Box>
      </Box>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={handleClose}
        TransitionComponent={Transition}
        onBackdropClick={handleClose}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <DatePickerWrapper>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <CustomCloseButton
                onClick={() => {
                  setShow(false)
                  setCity(null)
                  setCp(null)
                  setBirthDate('')
                }}
              >
                <Icon icon='tabler:x' fontSize='1.25rem' />
              </CustomCloseButton>
              <Typography variant='h3' sx={{ mb: 3 }}>
                Ajouter Nouveau Client
              </Typography>
            </Box>

            {/* form */}
            <Box sx={{ marginTop: '5%' }}>
              <DatePickerWrapper>
                <form
                  onSubmit={handleSubmit(data => {
                    console.log('mouezzzzzzzz', data)
                    let x = { ...data, City: data.cp.label, cp: data.cp.value, gender: data.gender.value }
                    console.log('xxxxxx', x)
                    setShow(false)

                    props.Addclient(x)
                    reset()
                  })}
                >
                  <Controller
                    name={'username'}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        sx={{ mb: 4 }}
                        variant='outlined'
                        size='small'
                        fullWidth
                        label={'Identifaint'}
                        error={!!errors['username']}
                        helperText={'Ce champs requis'}
                      />
                    )}
                  />
                  <Controller
                    name={'password'}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        sx={{ mb: 4 }}
                        variant='outlined'
                        size='small'
                        fullWidth
                        label={'Mot de passe'}
                        error={!!errors['password']}
                        helperText={'Ce champs requis'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                              >
                                <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={'Fname'}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        sx={{ mb: 4 }}
                        variant='outlined'
                        size='small'
                        fullWidth
                        label={'Prénom'}
                        error={!!errors['Fname']}
                        // helperText={errors['Fname']?.message}
                        helperText={'Ce champs requis'}
                      />
                    )}
                  />
                  <Controller
                    name={'Lname'}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        sx={{ mb: 4 }}
                        variant='outlined'
                        size='small'
                        fullWidth
                        label={'Nom'}
                        error={!!errors['Lname']}
                        // helperText={errors['Lname']?.message}
                        helperText={'Ce champs requis'}
                      />
                    )}
                  />
                  <Controller
                    name={'cin'}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        sx={{ mb: 4 }}
                        variant='outlined'
                        size='small'
                        fullWidth
                        label={'CIN'}
                        error={!!errors['cin']}
                        // helperText={errors['cin']?.message}
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
                  <Controller
                    name={'gender'}
                    control={control}
                    render={({ field }) => (
                      <CustomAutocomplete
                        options={[
                          { label: 'Homme', value: 'Homme' },
                          { label: 'Femme', value: 'Femme' }
                        ]}
                        id='autocomplete-size-medium-multi'
                        {...field}
                        sx={{ mb: 4 }}
                        getOptionLabel={option => option.label ?? ''}
                        onChange={(e, v) => field.onChange(v)}
                        isOptionEqualToValue={(option, val) => {
                          return option.value === val.value
                        }}
                        renderInput={params => (
                          <CustomTextField
                            {...params}
                            size='small'
                            label='Gener'
                            placeholder='Gener'
                            error={!!errors['gender']}
                            // helperText={errors['gender']?.message}
                            helperText={'Ce champs requis'}
                          />
                        )}
                      />
                    )}
                  />
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
                    name={'BirthDate'}
                    control={control}
                    render={({ field }) => {
                      console.log(field)
                      return (
                        <CustomTextField
                          {...field}
                          sx={{ mb: 4 }}
                          type='date'
                          variant='outlined'
                          size='small'
                          fullWidth
                          label={'Date de Naissance '}
                          error={!!errors['BirthDate']}
                          // helperText={errors['BirthDate']?.message}
                          helperText={'Ce champs requis'}
                        />
                      )
                    }}
                  />
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
                        options={citiesOptions}
                        id='autocomplete-size-medium-multi'
                        {...field}
                        sx={{ mb: 4 }}
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
                        sx={{ mb: 4 }}
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
            </Box>
          </DatePickerWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
