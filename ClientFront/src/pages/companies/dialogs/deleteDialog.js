import React from 'react'
import { Dialog, DialogContent, Box, Typography, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

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

const DeleteDialog = ({ open, onClose, onConfirm, selectedId, Transition }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='sm'
      scroll='body'
      onClose={onClose}
      TransitionComponent={Transition}
      onBackdropClick={onClose}
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
        <CustomCloseButton onClick={onClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            Voulez vous supprimer cette Entreprise ?
          </Typography>
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
        >
          <Box>
            <Button variant='contained' onClick={onClose}>
              Annuler
            </Button>
          </Box>
          <Box>
            <Button variant='contained' onClick={() => onConfirm(selectedId)}>
              Supprimer
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
