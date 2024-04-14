import React, { useState, useEffect, forwardRef } from 'react'
import { useForm } from 'react-hook-form'

// Importations MUI
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { fetchData } from 'src/APIs/clientApis'

// Autre Import
import Marks from '../Marks' // Assurez-vous que Marks est correctement importé

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: theme.palette.grey[500],
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

const TableHeader = props => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [clients, setClients] = useState([])
  const [show, setShow] = useState(false)
  const [client, setClient] = useState(null)
  const [mark, setMark] = useState(null)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData()
        setClients(data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données clients:', error)
      }
    }

    fetchDataAsync()
  }, [])

  const handleClick = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
    setClient(null)
    setMark(null)
    reset()
  }

  const onSubmit = data => {
    setShow(false)
    setClient(null)
    setMark(null)
    reset()
    props.Addship(data)
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
            placeholder='Search Invoice'
            onChange={e => props.handleFilter(e.target.value)}
          />

          <Button sx={{ mb: 2 }} onClick={handleClick} variant='contained'>
            Ajouter Bateau
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
            px: { xs: 5, lg: 15 },
            py: { xs: 8, lg: 12.5 }
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <CustomCloseButton onClick={handleClose}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Ajouter Nouveau bateau
            </Typography>
          </Box>

          <Box sx={{ marginTop: '5%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nom'
                    {...register('name', { required: true })}
                    placeholder='Nom'
                    sx={{ position: 'relative' }}
                  />
                  {errors.name && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    rows={5}
                    multiline
                    fullWidth
                    label='Description'
                    placeholder='Description'
                    id='textarea-outlined-static'
                    {...register('description', { required: true })} // Ajout de la validation requise
                  />
                  {errors.description && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                </Grid>

                <Grid item xs={12}>
                  <CustomAutocomplete
                    options={Marks}
                    value={mark}
                    onChange={(event, val) => {
                      setMark(val)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => option.mark || ''}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        size='small'
                        label='Marque'
                        placeholder='Marque'
                        {...register('mark', { required: true })}
                      />
                    )}
                  />
                  {errors.mark && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                </Grid>

                <Grid item xs={12}>
                  <CustomAutocomplete
                    options={clients}
                    value={client}
                    onChange={(event, val) => {
                      setClient(val)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => option.Fname + ' ' + option.Lname || ''}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        size='small'
                        label='Client'
                        placeholder='Client'
                        {...register('client', { required: true })}
                      />
                    )}
                  />
                  {errors.client && <span style={{ color: 'red' }}>Ce champ est requis.</span>}
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    Envoyer
                  </Button>{' '}
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
