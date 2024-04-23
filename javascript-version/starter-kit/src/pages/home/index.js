import React from 'react'
import { Box, CardContent } from '@mui/material'
const imageBG = '/port.png'
import { useAuth } from 'src/hooks/useAuth'

const useStyles = {
  root: {
    background: 'linear-gradient(to right, #f38e1e, #ebb075)',
    backgroundImage: `url(${imageBG})`,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  welcome: {
    fontSize: '120px',
    fontWeight: 'bold'
  },
  company: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.5)'
  }
}
const Home = () => {
  const { user } = useAuth()
  console.log(user)
  const classes = useStyles
  return (
    <Box sx={classes.root}>
      <CardContent>
        <span
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}
        >
          Bienvenue {user.lastName}
        </span>
        <br />
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          Chez Magheribia Assurance
        </span>
      </CardContent>
    </Box>
  )
}

export default Home
