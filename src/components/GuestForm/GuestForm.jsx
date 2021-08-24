import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useAppState } from '../../state';
import useQuery from '../../hooks/useQuery/useQuery';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#555555',
    backgroundColor: theme.palette.common.white,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
  titleDialog: {
    fontSize: 16,
    marginBottom: theme.spacing(2),
  },
  textField: {
    borderRadius: 5,
    border: 'solid 1px #919191',
    '& div input:first-child': {
      color: '#555555',
    },
  },
  joinButton: {
    marginTop: '2em',
    backgroundColor: '#22D2B9',
    color: '#FFF',
    width: '100%',
    borderRadius: 12,
    '&$disabled': {
      backgroundColor: '#eee',
      color: '#ccc',
    },
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#0D9392',
    },
  },
  disabled: {},
}));

// const defaultHost = 'http://localhost:3002';
// const defaultHost = 'https://connect.eventtia.com';
const defaultHost = 'https://dev.eventtia.com';
const eventtiaHost = process.env.REACT_APP_EVENTTIA_HOST || defaultHost;

const GuestForm = ({ setToken }) => {
  const { eventUri, conference, meeting } = useParams();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const { setError } = useAppState();
  const { forceMeeting } = useQuery();
  const { t } = useTranslation();

  const classes = useStyles();

  const requestToken = event => {
    if (!!event) event.preventDefault();
    if (!(fullName && company)) return;
    setLoading(true);
    const tokenUrl = `${eventtiaHost}/en/api/v3/events/${eventUri}/business_conferences/${conference}/business_conference_meetings/${meeting}/twilio/guest-token`;
    fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guest: {
          full_name: fullName,
          company: company,
        },
        increase_exp: forceMeeting && 'true',
      }),
    })
      .then(res => res.json())
      .then(({ token, message }) => {
        setLoading(false);
        if (!!token) setToken(token);
        else if (message) {
          setButtonDisabled(true);
          setError({ message });
          const now = new Date();
          // TODO: check whether this is still valid
          const startDate = new Date(message.replace('Meeting start date: ', ''));
          if (now < startDate) {
            setTimeout(function() {
              requestToken();
            }, startDate - now);
          }
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={requestToken} className={classes.root}>
      <Typography variant="subtitle2" className={classes.titleDialog}>
        {t('joinMeeting')}
      </Typography>
      <Typography variant="body2">{t('guestFieldsInfo')}</Typography>
      <Typography variant="caption">{t('fullName')}</Typography>
      <TextField
        id="full_name"
        variant="outlined"
        color="primary"
        value={fullName}
        onChange={({ target: { value } }) => setFullName(value)}
        className={classes.textField}
        margin="dense"
        fullWidth
      />
      <Typography variant="caption">{t('company')}</Typography>
      <TextField
        id="company"
        variant="outlined"
        color="primary"
        value={company}
        onChange={({ target: { value } }) => setCompany(value)}
        className={classes.textField}
        margin="dense"
        fullWidth
      />
      <Button
        variant="contained"
        onClick={requestToken}
        disabled={buttonDisabled || loading || !(fullName && company)}
        type="submit"
        classes={{
          root: classes.joinButton,
          disabled: classes.disabled,
        }}
        fullWidth
      >
        {t('clickToJoin')}
      </Button>
    </form>
  );
};

export default GuestForm;
