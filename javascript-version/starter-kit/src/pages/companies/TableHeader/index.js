import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useForm } from 'react-hook-form'

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

const TableHeader = props => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()

  const [show, setShow] = useState(false)
  const [city, setCity] = useState(null)
  const [cp, setCp] = useState(null)

  const handleClick = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
    setCity(null)
    setCp(null)
    reset()
  }

  const onSubmit = data => {
    setShow(false)
    setCity(null)
    setCp(null)
    reset()
    props.AddCampany(data)
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
            placeholder='Search Invoice'
            onChange={e => props.handleFilter(e.target.value)} // Utilisez props.handleFilter au lieu de handleFilter
          />

          <Button sx={{ mb: 2 }} onClick={handleClick} variant='contained'>
            Ajouter Entreprise
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
                setCity(null)
                setCp(null)
              }}
            >
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Ajouter Nouveau Entreprise
            </Typography>
          </Box>

          <Box sx={{ marginTop: '5%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {' '}
                {/* Utilisez Grid container et spacing */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nom de l Entreprise'
                    {...register('Ename', { required: true })}
                    placeholder='Nom'
                    sx={{ position: 'relative' }}
                  />
                  {errors.Ename && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='RNE'
                    {...register('rne', { required: true })}
                    placeholder='RNE'
                    sx={{ position: 'relative' }}
                  />
                  {errors.rne && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                  {watch('rne') && (
                    <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>{watch('rne').length}/50</span>
                  )}
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
                  <CustomTextField
                    fullWidth
                    label='Numéro de Téléphone'
                    {...register('tlf', { required: true, pattern: /^[0-9]*$/ })}
                    placeholder='Numéro de Téléphone'
                    sx={{ position: 'relative' }}
                  />
                  {(errors.tlf || errors.email) && (
                    <span style={{ color: 'red' }}>Ce champ est requis et ne doit pas contenir d'alphabet.</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <CustomAutocomplete
                    options={cities}
                    value={city}
                    onChange={(event, val) => {
                      setCity(val)
                      setCp(val.cp)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => option.City + ' ' + option.SubCity || ''}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        size='small'
                        label='Ville'
                        placeholder='Ville'
                        {...register('City', { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    value={cp}
                    fullWidth
                    label='Code postale'
                    {...register('cp', { required: true })}
                    placeholder='Code postale'
                    sx={{ position: 'relative' }}
                  />
                  {errors.cp && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                  {watch('cp') && (
                    <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>{watch('cp').length}/50</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Addresse'
                    {...register('adress', { required: true })}
                    placeholder='Addresse'
                    sx={{ position: 'relative' }}
                  />
                  {errors.adress && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                  {watch('adress') && (
                    <span style={{ position: 'absolute', right: 0, bottom: '-20px' }}>{watch('adress').length}/50</span>
                  )}
                </Grid>
                {/* Ajoutez les autres champs de saisie de la même manière */}
                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    Envoyer
                  </Button>{' '}
                  {/* Utilisez Button avec type='submit' */}
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
