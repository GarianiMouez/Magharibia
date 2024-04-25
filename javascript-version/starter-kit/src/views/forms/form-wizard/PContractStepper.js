// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import ReadTextField from 'src/@core/components/mui/readOnly'

import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CardPayement from 'src/views/forms/form-wizard/card'
import jsPDF from 'jspdf'

///
import { AddEcontract } from 'src/APIs/contratEntreprise'
import { AddPcontract } from 'src/APIs/contractPersonal'
// import pdfjs from 'pdfjs-dist/build/pdf'

// ******** field
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiStep from '@mui/material/Step'
import DatePicker from 'react-datepicker'
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Slider from '@mui/material/Slider'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    icon: 'tabler:home',
    title: 'Simulation',
    subtitle: 'Entrez vos coordonnées de simulation'
  },
  {
    icon: 'tabler:user',
    title: 'Offre',
    subtitle: "Entrez vos coordonnées de l'Offre"
  },
  {
    icon: 'tabler:link',
    title: 'Contrat',
    subtitle: 'Consultation du Contrat'
  }
]

//// data imort
import cities from 'src/views/forms/form-wizard/data/index'
import { convertDuration } from '../../../APIs/dateConvert'
import { set } from 'nprogress'
import axios from 'axios'
import { flexbox } from '@mui/system'
import { sendEmail } from 'src/APIs/sendEmail'
const paymentOptions = [
  { title: 'Annuelle', val: ' Annuelle' },
  { title: 'Semestrielle', val: 'Semestrielle' }
]
const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed + svg': {
    color: theme.palette.primary.main
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBottom: theme.spacing(6)
    }
  }
}))

const PContractStepper = () => {
  // ** States
  ///////////////////////////////SETp1
  const [minDate, setMinDate] = useState(null)
  const [maxDate, setMaxDate] = useState(null)
  const [duration, setDuration] = useState(convertDuration(minDate, maxDate))
  const [paimentType, setPaimentType] = useState('')
  const [coqu, setCoqu] = useState(0)
  const [motor, setMotor] = useState(0)

  //////////////////////////////////// sTEp2
  const [offerType, setOfferType] = useState('Personnel')
  ///// personal
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [clientId, setClientId] = useState(null)
  const [campanyId, setCampanyId] = useState(null)
  const [cin, setCin] = useState()
  const [email, setEmail] = useState('')
  const [tlf, setTlf] = useState()
  const [adress, setAdress] = useState()
  const [city, setCity] = useState(null)
  const [cp, setCp] = useState()
  const handlePDF = () => {
    if (offerType === 'Personnel') {
      handleDownloadClickPersonale()
    } else if (offerType === 'Morale') {
      handleDownloadClickEntreprise()
    }
    console.log('hello pdf')
  }

  /////// moral
  const [rne, setRne] = useState('')
  const [ename, setEname] = useState('')
  //// chosen client campany

  const [chosenClient, setChosenClient] = useState(null)
  const [chosenCampany, setChosenCampany] = useState(null)
  const [ship, setShip] = useState(null)

  ///
  const handleChoseClient = client => {
    setChosenClient(client)
    if (client) {
      const shipsPerClient = gloabalDataShip.filter(boat => boat.ownerId === client.id && boat.ownerType === 'person')
      setDataShip(shipsPerClient)

      setFirstName(client?.Fname)
      setLastName(client?.Lname)
      setCin(client?.cin)
      setEmail(client?.email)
      setTlf(client?.tlf)
      setCity(cities.find(el => (el.City + ' ' + el.SubCity).toLowerCase() == client?.City.toLowerCase()) ?? null)
      // setCity(cities[0])
      setCp(client?.cp)
      setAdress(client?.adress)
      setClientId(client?.id)
    } else {
      setFirstName('')
      setLastName('')
      setCin('')
      setEmail('')
      setTlf('')
      setCity(null)
      setCp('')
      setAdress('')
      setClientId(null)
    }
  }
  const handleChoseCampany = campany => {
    setChosenCampany(campany)
    if (campany) {
      const shipsPerClient = gloabalDataShip.filter(
        boat => boat.ownerId === campany.id && boat.ownerType === 'enterprise'
      )
      setDataShip(shipsPerClient)
      setEname(campany?.Ename)
      setRne(campany?.rne)
      setEmail(campany?.email)
      setTlf(campany?.tlf)
      setCity(cities.find(el => (el.City + ' ' + el.SubCity).toLowerCase() == campany?.City.toLowerCase()) ?? null)
      setCp(campany?.cp)
      setAdress(campany?.adress)
      setCampanyId(campany?.id)
    } else {
      setEname('')
      setRne('')

      setEmail('')
      setTlf('')
      setCity(null)
      setCp('')
      setAdress('')
      setCampanyId(null)
      setDuration(null)
      setShip('')
      setDataShip(gloabalDataShip)
    }
  }

  const [activeStep, setActiveStep] = useState(0)
  const [language, setLanguage] = useState([])

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  /////// data
  const [dataClient, setDataClient] = useState([])
  const [dataCampany, setDataCampany] = useState([])
  const [dataShip, setDataShip] = useState([])
  const [gloabalDataShip, setGloabalDataShip] = useState([])

  const getClient = async () => {
    try {
      const res = await axios.get('http://localhost:4500/client')
      const apiData = res.data
      return apiData
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données du client :", error)
      throw error
    }
  }
  const getCamny = async () => {
    try {
      const res = await axios.get('http://localhost:4500/campanies')
      const apiData = res.data
      return apiData
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données du client :", error)
      throw error
    }
  }
  const getship = async () => {
    try {
      const res = await axios.get('http://localhost:4500/ship')
      const apiData = res.data
      return apiData
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données du client :", error)
      throw error
    }
  }

  var SHIPSDATA = []

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDataClient = await getClient()
      const fetchedDataCampanies = await getCamny()
      const fetchedDataShip = await getship()

      setDataClient(fetchedDataClient)
      setDataCampany(fetchedDataCampanies)
      setDataShip(fetchedDataShip)
      setGloabalDataShip(fetchedDataShip)
    }
    fetchData()
  }, [])

  // ** Hooks & Var/
  const { settings } = useSettings()
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { direction } = settings

  //// test slider
  const displySlider = (x, y) => {
    setCoqu(y)
  }

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const areAllFieldsFilled = () => {
    switch (activeStep) {
      case 0:
        setDuration(convertDuration(minDate, maxDate))
        if (
          minDate === '' ||
          maxDate === '' ||
          coqu === '' ||
          motor === 0 ||
          paimentType === 0 ||
          minDate === '' ||
          maxDate === ''
        ) {
          return false
        } else if (minDate > maxDate) {
          toast.error('La date minimale doit être antérieure à la date maximale.')
          return false
        }
        return true
      case 1:
        if (offerType === 'Personnel') {
          if (ship === null) {
            toast.error('Il faut choisr un bateau')
          }
          return (
            firstName !== '' &&
            lastName !== '' &&
            cin !== '' &&
            email !== '' &&
            tlf !== '' &&
            adress !== '' &&
            city !== '' &&
            cp !== '' &&
            ship !== null
          )
        } else if (offerType === 'Morale') {
          return (
            rne !== '' &&
            ename !== '' &&
            email !== '' &&
            tlf !== '' &&
            adress !== '' &&
            city !== '' &&
            cp !== '' &&
            ship !== null
          )
        }
      case 2:
        return true
      default:
        return true
    }
  }

  const handleNext = async () => {
    if (areAllFieldsFilled()) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
      if (activeStep === steps.length - 1) {
        let data = {
          SDate: minDate,
          EDate: maxDate,
          Coqu: parseFloat(coqu),
          motor: parseFloat(motor),
          totalAmount: parseFloat(motor) + parseFloat(coqu) + 10,
          netAmount: parseFloat(motor) + parseFloat(coqu),
          ShipId: ship.id
        }
        if (offerType === 'Personnel') {
          data.ClientId = chosenClient.id
          await AddPcontract(data)
          let body = {
            senderEmail: 'mouezghariani2@gmail.com',
            recipientEmail: email,
            subject: 'Contrat Assurance',
            text: `Cher ${firstName}\n \n \n Nous sommes ravi de vous annocner que votre contrat d'assurance est traité \n\n Merci de votre conféance \n\n Cordiallement`
          }
          await sendEmail(body)
        }
        if (offerType === 'Morale') {
          data.CompanyId = chosenCampany.id

          AddEcontract(data)
          let body = {
            senderEmail: 'mouezghariani2@gmail.com',
            recipientEmail: email,
            subject: 'Contrat Assurance',
            text: `Cher(s) propriétaire(s) de ${ename},\n\n\n Nous sommes ravis de vous annoncer que votre contrat d'assurance a été traité.\n\n\nMerci de votre confiance.\n\n\nCordialement,`
          }
          await sendEmail(body)
        }
        toast.success('Formulaire soumis')
      }
    } else {
      toast.error('Veuillez remplir tous les champs obligatoires.')
    }
  }

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1)
  //   if (activeStep === steps.length - 1) {
  //     toast.success('Form Submitted')
  //   }
  // }

  const handleChangeRadio = event => {
    setOfferType(event.target.value)
    handleResetBeforeRadioButtonClick(event.target.value)
  }

  const handleReset = () => {
    setEmail('')
    setLastName('')
    setFirstName('')
    setCin()
    setTlf()
    setRne('')
    setEname('')
    setAdress('')
    setCity(null)
    setCp('')
    setPaimentType('')
    setMinDate()
    setMaxDate()
    setOfferType('Personnel')
    setActiveStep(0)
    setChosenCampany(null)
    setChosenClient(null)
    setCoqu(0)
    setMotor(0)
    setDataShip([])
  }
  const handleResetBeforeRadioButtonClick = type => {
    setEmail('')
    setLastName('')
    setFirstName('')
    setCin()
    setTlf()
    setRne('')
    setEname('')
    setAdress('')
    setCity(null)
    setCp('')
    setChosenCampany(null)
    setChosenClient(null)
    setShip(null)
    setOfferType(type)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <Grid item>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                  <DatePickerWrapper>
                    <div>
                      <DatePicker
                        id='min-date'
                        selected={minDate}
                        onChange={date => setMinDate(date)}
                        customInput={<CustomInput label='Effet Du' />}
                      />
                    </div>
                  </DatePickerWrapper>

                  <DatePickerWrapper>
                    <div>
                      <DatePicker
                        size='medium'
                        id='max-date'
                        selected={maxDate}
                        onChange={date => setMaxDate(date)}
                        customInput={<CustomInput label='Effet Au' />}
                      />
                    </div>
                  </DatePickerWrapper>
                </Box>
              </Grid>
              <Box sx={{ height: '16px' }} />
              <Grid item>
                <CustomAutocomplete
                  options={paymentOptions}
                  // value={paimentType}
                  onChange={(val, option) => {
                    setPaimentType(option.title)
                  }}
                  id='autocomplete-size-medium-multi'
                  getOptionLabel={option => option.title || ''}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      size='small'
                      label='Type de paymement'
                      placeholder='Type de paymement'
                    />
                  )}
                />
              </Grid>
              <Box sx={{ height: '16px' }} />
              <Grid item>
                <div>
                  <CustomTextField
                    fullWidth
                    label='Coqu'
                    placeholder='Leonard'
                    value={coqu}
                    onChange={e => setCoqu(e.target.value)}
                  />
                  <Slider
                    value={coqu}
                    min={0}
                    max={200}
                    valueLabelDisplay='auto'
                    aria-labelledby='controlled-slider'
                    onChange={(event, newcoqu) => displySlider(event, newcoqu)}
                  />
                </div>
              </Grid>
              <Grid item>
                <div>
                  <CustomTextField
                    fullWidth
                    label='Moteur'
                    placeholder='Leonard'
                    value={motor}
                    onChange={e => setMotor(e.target.value)}
                  />
                  <Slider
                    value={motor}
                    min={0}
                    max={200}
                    valueLabelDisplay='auto'
                    aria-labelledby='controlled-slider'
                    onChange={(event, newmotor) => setMotor(newmotor)}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  width: '80%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '10%'
                }}
              >
                <CardPayement
                  title1='Montant Net'
                  title2='Montant Total'
                  val1={parseInt(coqu) + parseInt(motor)}
                  val2={parseInt(coqu) + parseInt(motor) + 10}
                />
              </Box>
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                width: '100% !important',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid item>
                <RadioGroup
                  row
                  aria-label='position'
                  name='horizontal'
                  value={offerType}
                  onChange={handleChangeRadio}
                  sx={{ mt: 4 }}
                >
                  <FormControlLabel
                    value='Personnel'
                    label='Personnel'
                    labelPlacement='start'
                    sx={{ mr: 4 }}
                    control={<Radio />}
                  />
                  <FormControlLabel value='Morale' control={<Radio />} label='Morale' />
                </RadioGroup>
              </Grid>
            </Box>
            {offerType == 'Personnel' && (
              <>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    fullWidth
                    value={chosenClient}
                    options={dataClient}
                    onChange={(event, val) => {
                      handleChoseClient(val)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => option?.Fname + ' ' + option?.Lname + ' CIN: ' + option?.cin + ' ' || ''}
                    renderInput={params => (
                      <CustomTextField fullWidth {...params} size='small' label='Client' placeholder='Client' />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    key={chosenClient}
                    fullWidth
                    value={ship}
                    options={chosenClient ? dataShip : []}
                    onChange={(event, val) => {
                      setShip(val)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option =>
                      option.name ? 'Bateau: ' + option?.name : 'Sélectionnez un autre bateau'
                    }
                    renderInput={params => (
                      <ReadTextField fullWidth {...params} size='small' label='Bateau' placeholder='Bateau' />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Nom'
                    value={firstName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder='Nom'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Prénom'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder='Prénom'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='CIN'
                    value={cin}
                    onChange={e => setCin(e.target.value)}
                    placeholder='CIN'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='E-mail'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Numéro du Téléphone'
                    value={tlf}
                    onChange={e => setTlf(e.target.value)}
                    placeholder='Numéro de téléphone'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomAutocomplete
                    options={cities}
                    value={city}
                    isOptionEqualToValue={(option, value) => {
                      return (
                        option.City.toLowerCase() === value.City.toLowerCase() &&
                        option.SubCity.toLowerCase() === value.SubCity.toLowerCase()
                      )
                    }}
                    onChange={(event, val) => {
                      if (val) {
                        setCity(val)
                        setCp(val?.cp)
                      }
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => option.City + ' ' + option.SubCity || ''}
                    renderInput={params => (
                      <CustomTextField {...params} size='small' label='Ville' placeholder='Ville' />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Code postle'
                    value={cp}
                    onChange={e => setCp(e.target.value)}
                    placeholder='Code postale'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Adresse'
                    value={adress}
                    onChange={e => setAdress(e.target.value)}
                    placeholder='Adresse'
                  />
                </Grid>
              </>
            )}

            {offerType == 'Morale' && (
              <>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    fullWidth
                    value={chosenCampany}
                    options={dataCampany}
                    onChange={(event, val) => {
                      handleChoseCampany(val)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => 'Entreprise : ' + option?.Ename + '    RNE : ' + option?.rne || ''}
                    renderInput={params => (
                      <CustomTextField fullWidth {...params} size='small' label='Entreprise' placeholder='Entreprise' />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    key={chosenCampany}
                    fullWidth
                    value={ship}
                    options={chosenCampany ? dataShip : []}
                    onChange={(event, val) => {
                      setShip(val)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option =>
                      option.name ? 'Bateau: ' + option?.name : 'Sélectionnez un autre bateau'
                    }
                    renderInput={params => (
                      <ReadTextField fullWidth {...params} size='small' label='Bateau' placeholder='Bateau' />
                    )}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}></Grid> */}
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Matricule fiscale'
                    value={rne}
                    onChange={e => setRne(e.target.value)}
                    placeholder='Matricule fiscale'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Entreprise'
                    value={ename}
                    onChange={e => setEname(e.target.value)}
                    placeholder='Entreprise'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='E-mail'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Numéro du Téléphone'
                    value={tlf}
                    onChange={e => setTlf(e.target.value)}
                    placeholder='Numéro de téléphone'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    value={city}
                    options={cities}
                    isOptionEqualToValue={(option, value) => {
                      return (
                        option.City.toLowerCase() === value.City.toLowerCase() &&
                        option.SubCity.toLowerCase() === value.SubCity.toLowerCase()
                      )
                    }}
                    onChange={(event, val) => {
                      setCity(val)
                      setCp(val.cp)
                    }}
                    id='autocomplete-size-medium-multi'
                    getOptionLabel={option => option.City + ' ' + option.SubCity || ''}
                    renderInput={params => (
                      <CustomTextField {...params} size='small' label='Ville' placeholder='Ville' />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Code postle'
                    value={cp}
                    onChange={e => setCp(e.target.value)}
                    placeholder='Code postale'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Adresse'
                    value={adress}
                    onChange={e => setAdress(e.target.value)}
                    placeholder='Adresse'
                  />
                </Grid>
              </>
            )}
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            {offerType == 'Personnel' && (
              <>
                <Grid item xs={12} sm={6}>
                  <ReadTextField fullWidth label='Durée' value={duration} placeholder='Durée' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Coqu'
                    value={coqu}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Coqu'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Moteur'
                    value={motor}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Moteur'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField fullWidth label='Montant Net' value={coqu + motor} placeholder='Montant Net' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Montant Total'
                    value={coqu + motor + 10}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Montant Total'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Type de payement'
                    value={paimentType}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Type de payement'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Nom et Prénom'
                    value={firstName + ' ' + lastName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Nom et Prénom'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='CIN'
                    value={cin}
                    onChange={e => setCin(e.target.value)}
                    placeholder='CIN'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='E-mail'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Numéro du Téléphone'
                    value={tlf}
                    onChange={e => setTlf(e.target.value)}
                    placeholder='Numéro de téléphone'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Ville'
                    value={city?.City + ' ' + city.SubCity}
                    onChange={e => setAdress(e.target.value)}
                    placeholder='Ville'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Code postle'
                    value={cp}
                    onChange={e => setCp(e.target.value)}
                    placeholder='Code postale'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Adresse'
                    value={adress}
                    onChange={e => setAdress(e.target.value)}
                    placeholder='Adresse'
                  />
                </Grid>
              </>
            )}

            {offerType == 'Morale' && (
              <>
                <Grid item xs={12} sm={6}>
                  <ReadTextField fullWidth label='Durée' value={duration} placeholder='Durée' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Coqu'
                    value={coqu}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Coqu'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Moteur'
                    value={motor}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Moteur'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField fullWidth label='Montant Net' value={coqu + motor} placeholder='Montant Net' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Montant Total'
                    value={coqu + motor + 10}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Montant Total'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Type de payement'
                    value={paimentType}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='Type de payement'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Matricule fiscale'
                    value={rne}
                    onChange={e => setRne(e.target.value)}
                    placeholder='Matricule fiscale'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Entreprise'
                    value={ename}
                    onChange={e => setEname(e.target.value)}
                    placeholder='Entreprise'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='E-mail'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Numéro du Téléphone'
                    value={tlf}
                    onChange={e => setTlf(e.target.value)}
                    placeholder='Numéro de téléphone'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Ville'
                    value={city?.City + ', ' + city?.SubCity}
                    onChange={e => setAdress(e.target.value)}
                    placeholder='Ville'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Code postle'
                    value={cp}
                    onChange={e => setCp(e.target.value)}
                    placeholder='Code postale'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReadTextField
                    fullWidth
                    label='Adresse'
                    value={adress}
                    onChange={e => setAdress(e.target.value)}
                    placeholder='Adresse'
                  />
                </Grid>
              </>
            )}
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>Le contrat est créé ! </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Box sx={{ ml: 5, mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' onClick={handleReset}>
                Nouveau Contrat
              </Button>
            </Box>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' onClick={handlePDF}>
                Télécharger en Format PDF{' '}
              </Button>
            </Box>
          </Box>
        </>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='tonal' color='primary' disabled={activeStep === 0} onClick={handleBack}>
                Retour
              </Button>
              <Button variant='contained' onClick={handleNext} sx={{ '&:hover': { backgroundColor: '#FF9F43' } }}>
                {activeStep === steps.length - 1 ? 'Soumettre' : 'Suivant'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  const handleDownloadClickEntreprise = () => {
    const doc = new jsPDF()

    const imgWidth = 35
    const imgHeight = 10

    doc.addImage('/images/logo.png', 'PNG', 10, 10, imgWidth, imgHeight)

    const pageWidth = doc.internal.pageSize.getWidth()
    const dateWidth =
      (doc.getStringUnitWidth('Date: 01/01/2022') * doc.internal.getFontSize()) / doc.internal.scaleFactor
    const dateX = pageWidth - dateWidth - 10

    const currentDate = new Date().toLocaleDateString('fr-FR')
    doc.text(`Date: ${currentDate}`, dateX, 10)

    doc.setFont('times')

    doc.setTextColor(150)
    doc.text(`Nom de l\'Entreprise : ${ename}`, 20, 50)

    doc.setTextColor(0)
    doc.text(`Adresse : ${city.City} ${city.SubCity} - ${adress} ${cp}`, 20, 60)
    doc.text(`CIN :  ${rne}`, 20, 70)
    doc.text(`Numéro téléphone  :  ${tlf}`, 20, 80)
    doc.text(`Bateau  :  ${ship.name}`, 20, 90)
    doc.text(`Effet Au :  ${new Date(minDate).toLocaleDateString('en-GB')}`, 20, 100)
    doc.text(`Effet Du :   ${new Date(minDate).toLocaleDateString('en-GB')}`, 20, 110)
    doc.text(`Montant Net :  ${motor + coqu}`, 20, 120)
    doc.text(`Montant Total :  ${motor + coqu + 10}`, 20, 130)
    doc.text(`Mode de payement :  ${paimentType}`, 20, 140)

    doc.text('Signature du Entreprise', 20, doc.internal.pageSize.getHeight() - 20)
    doc.text('Signature de Maghrebia', pageWidth - 70, doc.internal.pageSize.getHeight() - 20)

    doc.save('Contrat.pdf')
  }
  const handleDownloadClickPersonale = () => {
    const doc = new jsPDF()

    const imgWidth = 35
    const imgHeight = 10

    doc.addImage('/images/logo.png', 'PNG', 10, 10, imgWidth, imgHeight)

    const pageWidth = doc.internal.pageSize.getWidth()
    const dateWidth =
      (doc.getStringUnitWidth('Date: 01/01/2022') * doc.internal.getFontSize()) / doc.internal.scaleFactor
    const dateX = pageWidth - dateWidth - 10

    const currentDate = new Date().toLocaleDateString('fr-FR')
    doc.text(`Date: ${currentDate}`, dateX, 10)

    doc.setFont('times')

    doc.setTextColor(150)
    doc.text('Nom et Prénom', 20, 50)
    doc.setTextColor(0)
    doc.text(`${lastName} ${firstName}`, 60, 50)
    doc.setTextColor(0)
    doc.text(`Adresse : ${city.City} ${city.SubCity} ${adress} ${cp}`, 20, 60)
    doc.text(`CIN :  ${cin}`, 20, 70)
    doc.text(`Numéro téléphone  :  ${tlf}`, 20, 80)
    doc.text(`Bateau  :  ${ship.name}`, 20, 90)
    doc.text(`Effet Au :  ${new Date(minDate).toLocaleDateString('en-GB')}`, 20, 100)
    doc.text(`Effet Du :   ${new Date(minDate).toLocaleDateString('en-GB')}`, 20, 110)
    doc.text(`Montant Net :  ${motor + coqu}`, 20, 120)
    doc.text(`Montant Total :  ${motor + coqu + 10}`, 20, 130)
    doc.text(`Mode de payement :  ${paimentType}`, 20, 140)

    doc.text('Signature du client', 20, doc.internal.pageSize.getHeight() - 20)
    doc.text('Signature de Maghrebia', pageWidth - 70, doc.internal.pageSize.getHeight() - 20)

    doc.save('Contrat.pdf')
  }
  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={
              !smallScreen ? <Icon icon={direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'} /> : null
            }
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <RenderAvatar
                        variant='rounded'
                        {...(activeStep >= index && { skin: 'light' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                          ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                        }}
                      >
                        <Icon icon={step.icon} />
                      </RenderAvatar>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get('http://localhost:4500/ship')
    const apiData = res.data
    console.log(apiData)
    return {
      props: {
        apiData
      }
    }
  } catch (error) {
    console.error('Error fetching API data:', error)
    return {
      props: {
        apiData: []
      }
    }
  }
}

export default PContractStepper
