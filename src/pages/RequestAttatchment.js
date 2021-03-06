import * as React from 'react';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Stepper,
  Step,
  Stack,
  StepLabel,
  Button,
  Card,
  Container,
  Typography,
  Paper
} from '@mui/material';

// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import SnackBar from '../components/SnackBar';
import { AuthContext } from '../utils/ContextProvider';
import ApiRoot from '../Test/APiRoot';
import CardAttatchment from '../components/CardAttatchment';
// import AuthSocial from '../components/authentication/AuthSocial';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10)
  }
}));
const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  paddingTop: 10,
  position: 'fixed',
  height: 600,
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 720,
  width: 720,
  marginLeft: '40%',
  marginRight: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  juastifyContent: 'spaceBetween',
  gap: 20,
  padding: theme.spacing(2, 0)
}));

const SpanStyled = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700
}));

const DescSpan = styled('span')(({ theme }) => ({
  ...theme.typography.h4
}));

// ----------------------------------------------------------------------

export default function RequestAttachment() {
  React.useEffect(async () => {
    try {
      const url = `${ApiRoot}/Service/GetAttachmentsService`;
      const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${User.token}`
        }
      };
      const response = await fetch(url, options);
      if (response.ok && response.status === 200) {
        const result = await response.json();
        setServices([...result.value.inScopeServices]);
        setRequests([...result.value.requests]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [0]);
  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const [Message, setMessage] = React.useState('');
  const [Services, setServices] = React.useState([]);
  const [Requests, setRequests] = React.useState([]);
  const [Images, setImages] = React.useState([
    'https://image.freepik.com/free-vector/flat-hand-drawn-patient-taking-medical-examination_52683-57828.jpg',
    'https://image.freepik.com/free-vector/person-with-cold-concept-illustration_114360-1594.jpg',
    'https://image.freepik.com/free-vector/group-doctors-standing-hospital-building-team-practitioners-ambulance-car_74855-14034.jpg'
  ]);

  //  --------------end form

  return (
    <RootStyle title="???????????????? ???????????? | ????????????">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            <SpanStyled> {' ???????????????? ???????? ????????????????,'}</SpanStyled>
            <br />
            <DescSpan> {'  ?????????? ?????????? ?????????????? ???????????? ?????? ?????????? ???????? '}</DescSpan>
          </Typography>
          <img alt="register" src={Images[activeStep]} />
        </SectionStyle>
      </MHidden>

      <Paper
        style={{
          overflowY: 'scroll',
          padding: 15,
          display: 'flex',
          flexDirection: 'culomn',
          juastifyContent: 'center',
          gap: 10,
          width: '100%',
          maxHeight: '85vh',
          maxWidth: '100%'
        }}
      >
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              ???????????????? ????????????
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              ???????? ?????????????? ?????? ?????? ???????????? ????????????
            </Typography>
          </Box>

          {Services.map((item, index) => (
            <CardAttatchment
              removeServices={(id) => {
                setServices([...Services.filter((x) => x.id !== id)]);
              }}
              Service={item}
              key={index}
              isRequested={Requests.filter((x) => x.serviceId === item.id).length > 0}
            />
          ))}
        </ContentStyle>
      </Paper>
      <SnackBar message={Message} />
    </RootStyle>
  );
}
