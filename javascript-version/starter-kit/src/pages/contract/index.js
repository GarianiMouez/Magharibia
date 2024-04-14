// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports

import PContractStepper from 'src/views/forms/form-wizard/PContractStepper'

const FormWizard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Créer un Contrat</Typography>
      </Grid>
      <Grid item xs={12}>
        <PContractStepper />
      </Grid>
    </Grid>
  )
}

export default FormWizard
