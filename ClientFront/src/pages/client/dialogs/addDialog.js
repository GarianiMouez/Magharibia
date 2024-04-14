import React, { Fragment, useState } from 'react'
import { Dialog, DialogContent, Grid, Box, Typography, Button } from '@mui/material'
import cities from 'src/views/forms/form-wizard/data/index'

const AddDialog = ({ show, setShow }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [clientId, setClientId] = useState(null)
  const [campanyId, setCampanyId] = useState(null)
  const [cin, setCin] = useState()
  const [email, setEmail] = useState('')
  const [tlf, setTlf] = useState()
  const [adress, setAdress] = useState()
  const [city, setCity] = useState(null)
  const [cp, setCp] = useState()

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='md'
      scroll='body'
      onClose={() => setShow(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShow(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      ></DialogContent>
    </Dialog>
  )
}

export default AddDialog
