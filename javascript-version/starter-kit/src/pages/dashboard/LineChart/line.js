import React, { useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Card, CardContent } from '@mui/material'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
// import Select from 'src/@core/theme/overrides/select'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const AnalyticsLineChart = ({ dataSeries, year, dataSetChange, title }) => {
  const theme = useTheme()
  const months = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Jun', 'Jull', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
  const [selectedYear, setSelectedYear] = useState(year[0])

  const optionsLine = {
    chart: {
      sparkline: { enabled: false }
    },
    title: {
      text: title,
      align: 'left'
    },

    stroke: { curve: 'smooth', width: 2 },
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    markers: { size: 0 },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: theme.palette.divider
    },
    xaxis: {
      categories: months,
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

  const handleChange = e => {
    setSelectedYear(e.target.value)
    dataSetChange(e.target.value)
  }

  return (
    <Card>
      <CardHeader
        subheader=''
        action={
          <Select labelId='demo-select-small-label' id='demo-select-small' value={selectedYear} onChange={handleChange}>
            {year.map((yearOption, index) => (
              <MenuItem key={index} value={yearOption}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <ReactApexcharts type='line' height={325} options={optionsLine} series={dataSeries} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default AnalyticsLineChart
