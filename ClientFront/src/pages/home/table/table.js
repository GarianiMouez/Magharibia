// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { deleteFunction, fetchData, AddFunction, updateFunction, getByid } from 'src/APIs/clientApis'
import TableHeader from './tableHeader'
import axios from 'axios'

import cities from 'src/views/forms/form-wizard/data/index'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Fade from '@mui/material/Fade'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** renders client column

/* eslint-enable */
const Table = ({ columns, filteredRows, handleFilter, value }) => {
  ///****DATA*****////

  // ** State

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

  // ** Hooks

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DatePickerWrapper>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <TableHeader value={value} handleFilter={handleFilter} />
                  <DataGrid
                    autoHeight
                    pagination
                    rowHeight={62}
                    rows={filteredRows}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 15, 25]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onRowSelectionModelChange={rows => setSelectedRows(rows)}
                  />
                </Card>
              </Grid>
            </Grid>
          </DatePickerWrapper>
        </Grid>
      </Grid>
    </>
  )
}

export default Table
