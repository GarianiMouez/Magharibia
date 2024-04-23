// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
const renderStats = (x, y, z, t, v, u) => {
  const data = [
    {
      color: 'primary',
      stats: x,
      title: 'Individus',
      icon: 'tabler:users'
    },
    {
      color: 'primary',
      stats: y,
      title: 'Entreprises',
      icon: 'tabler:home-2'
    },
    {
      stats: z,
      color: 'primary',
      title: 'Bateaux',
      icon: 'tabler:ship'
    },
    {
      stats: t,
      color: 'primary',
      title: 'Contrats traités',
      icon: 'tabler:file'
    },
    {
      stats: v,
      color: 'primary',
      title: 'Montants Nets',
      icon: 'tabler:currency-dollar'
    },
    {
      stats: u,
      color: 'primary',
      title: 'Montants Totals',
      icon: 'tabler:currency-dollar'
    }
  ]
  return data.map((sale, index) => (
    <Grid item lg={2} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant='h5'>{sale.stats}</Typography>
          <Typography variant='body2'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const EcommerceStatistics = props => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title='Statistics'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            {/* Updated 1 month ago */}
          </Typography>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {renderStats(props.stat1, props.stat2, props.stat3, props.stat4, props.stat5, props.stat6)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceStatistics
