// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'

const CardPayement = props => {
  // ** State

  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardContent>
            <Typography align='center' variant='h2' sx={{ mb: 2, color: 'text.primary ' }}>
              {props.title1}
            </Typography>
            <Typography variant='h1' align='center' sx={{ mb: 3.5, color: '#f07b00' }}>
              {props.val1} Dt
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <Typography align='center' variant='h2' sx={{ mb: 2, color: '#024b8e' }}>
              {props.title2}
            </Typography>
            <Typography align='center' variant='h1' sx={{ mb: 3.5, color: '#f07b00' }}>
              {props.val2} Dt
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardPayement
