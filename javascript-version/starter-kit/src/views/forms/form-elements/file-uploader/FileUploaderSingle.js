import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { useDropzone } from 'react-dropzone'

const FileUploaderSingle = ({ register, onImageUpload }) => {
  const [file, setFile] = useState(null)

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      // Récupérer le premier fichier
      const selectedFile = acceptedFiles[0]
      console.log('accepted file hild', acceptedFiles)
      setFile(selectedFile)
      // Appeler la fonction onImageUpload avec le fichier sélectionné
      onImageUpload(selectedFile)
    }
  })

  return (
    <Box {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px'
          }}
        >
          <Box
            sx={{
              mb: 8.75,
              width: 48,
              height: 48,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
            }}
          >
            <Icon icon='tabler:upload' fontSize='1.75rem' />
          </Box>
          <Typography variant='h4' sx={{ mb: 2.5 }}>
            Déposez les fichiers ici ou cliquez pour les télécharger.
          </Typography>
        </Box>

        <Box sx={{ width: '10px' }} />
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {file ? (
            <img
              alt={file.name}
              className='single-file-image'
              src={URL.createObjectURL(file)}
              style={{ width: '100px', height: '100px' }}
            />
          ) : (
            <img
              alt='default-img'
              className='single-file-image'
              src='/images/avatars/1.png'
              style={{ width: '150px', height: '150px', borderRadius: '8px' }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default FileUploaderSingle
