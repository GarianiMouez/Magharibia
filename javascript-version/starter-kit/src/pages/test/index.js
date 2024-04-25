import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { TextField, Button } from '@mui/material'

function Example() {
  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().email().required(),
        name: yup.string().required()
      }),
    []
  )

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {},
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  return (
    <form
      onSubmit={handleSubmit(data => {
        console.log(data)
      })}
    >
      <Controller
        name={'email'}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant='outlined'
            size='small'
            fullWidth
            label={'Email'}
            error={!!errors['email']}
            helperText={errors['email']?.message}
          />
        )}
      />
      <Controller
        name={'name'}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant='outlined'
            size='small'
            fullWidth
            label={'Name'}
            error={!!errors['name']}
            helperText={errors['name']?.message}
          />
        )}
      />
      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </form>
  )
}

export default Example
