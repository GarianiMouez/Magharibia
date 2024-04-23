import React from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Card, CardContent } from '@mui/material'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const AnalyticsBarChart = ({ dataSeries }) => {
  const theme = useTheme()

  const optionsBar = {
    chart: {
      sparkline: { enabled: false },
      type: 'bar'
    },
    title: {
      text: "Tanches d'Age",
      align: 'left'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        endingShape: 'rounded'
      }
    },
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: theme.palette.divider
    },
    xaxis: {
      categories: ['18-25', '25-30', '30-40', '40-plus'],
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <ReactApexcharts type='bar' height={220} options={optionsBar} series={dataSeries} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default AnalyticsBarChart
