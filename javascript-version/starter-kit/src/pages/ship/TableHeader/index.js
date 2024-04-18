import React, { useState, useEffect, forwardRef } from 'react'
import { useForm } from 'react-hook-form'

// Importations MUI
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import CustomAvatar from 'src/@core/components/mui/avatar'

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
import { GetCampanies, getCampanies } from 'src/APIs/campaniesApis'

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
  const [campany, setCampany] = useState([])
  const [descision, setDescision] = useState(false)
  const [show, setShow] = useState(false)
  const [client, setClient] = useState(null)
  const [campanies, setCampanies] = useState(null)
  const [mark, setMark] = useState(null)
  const [ownerType, setOwnerType] = useState('person')

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData()
        const entreprise = await getCampanies()
        setClients(data)
        setCampanies(entreprise)
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
    setMark(null)
    setClient(null)
    setCampany(null)
    setDescision(false)
    reset()
  }

  const onSubmit = data => {
    data.ownerType = ownerType
    delete data.client
    data.ownerId = ownerType === 'person' ? client.id : campany.id

    setShow(false)
    setClient(null)
    setCampany(null)
    setMark(null)
    setDescision(false)
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
            placeholder='Recherche ...'
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

          {descision ? (
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
                    {ownerType === 'person' ? (
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
                    ) : (
                      <CustomAutocomplete
                        options={campanies}
                        value={campany}
                        onChange={(event, val) => {
                          setCampany(val)
                        }}
                        id='autocomplete-size-medium-multi'
                        getOptionLabel={option => option.Ename + ' ' + option.rne || ''}
                        renderInput={params => (
                          <CustomTextField
                            {...params}
                            size='small'
                            label='Entreprise'
                            placeholder='Entreprise'
                            {...register('client', { required: true })}
                          />
                        )}
                      />
                    )}
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
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mb: 10, mt: 10 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: 'rgba(255, 165, 0, 0.5)',
                    padding: '10px',
                    borderRadius: '5px',
                    marginRight: '10px',
                    textAlign: 'center',
                    width: '100px',
                    transition: 'background-color 0.3s',
                    ':hover': {
                      backgroundColor: 'rgba(255, 175, 0, 0.7)'
                    }
                  }}
                  onClick={() => {
                    setDescision(true)
                    setOwnerType('person')
                  }}
                >
                  <Icon
                    icon={'tabler:user'}
                    fontSize={'50px'}
                    style={{ color: 'darkorange', display: 'inline-block' }}
                  />
                </Box>
                <Box sx={{ position: 'relative', top: '10px' }}>Pour Personne Physique</Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: 'rgba(255, 165, 0, 0.5)',
                    padding: '10px',
                    borderRadius: '5px',
                    marginLeft: '10px',
                    textAlign: 'center',
                    width: '100px',
                    transition: 'background-color 0.3s',
                    ':hover': {
                      backgroundColor: 'rgba(255, 175, 0, 0.7)'
                    }
                  }}
                  onClick={() => {
                    setDescision(true)
                    setOwnerType('enterprise')
                  }}
                >
                  <Icon
                    icon={'tabler:home'}
                    fontSize={'50px'}
                    style={{ color: 'darkorange', display: 'inline-block' }}
                  />
                </Box>
                <Box sx={{ position: 'relative', top: '10px' }}>Pour Entreprise</Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
