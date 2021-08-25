import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import useQuery from '../../../hooks/useQuery/useQuery';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 360,
    backgroundColor: 'white',
    padding: theme.spacing(3),
    position: 'fixed',
    bottom: theme.spacing(8),
    borderRadius: 10,
    color: '#555555',
    zIndex: 1,
    margin: '0 2em',
  },
  titleDialog: {
    fontSize: 16,
    marginBottom: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(2, 0),
    opacity: 0.33,
    border: 'solid 1px #919191',
    borderRadius: 5,
    '& div input:first-child': {
      color: '#555555',
    },
  },
  buttonCopy: {
    backgroundColor: '#22D2B9',
    color: '#FFF',
    width: '100%',
    borderRadius: 12,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#0D9392',
    },
  },
}));

const INPUT_ID = 'guest-link';

const AddGuestDialog = ({ onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = window.location;
  const { locale = 'en' } = useQuery();
  const guestLink = `${location.protocol}//${location.host}${location.pathname}?locale=${locale}`;
  const copyLink = () => {
    const copyText = document.getElementById(INPUT_ID);
    copyText.disabled = false;
    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(copyText);
    selection.removeAllRanges();
    selection.addRange(range);
    copyText.focus();
    copyText.select();
    document.execCommand('copy');
    copyText.disabled = true;
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Fade in>
        <Paper className={classes.root}>
          <Typography variant="subtitle2" className={classes.titleDialog}>
            {t('addGuest')}
          </Typography>
          <Typography variant="body2">{t('inviteGuestInfo')}</Typography>
          <TextField
            disabled
            fullWidth
            id={INPUT_ID}
            defaultValue={guestLink}
            variant="outlined"
            className={classes.textField}
            size="small"
          />
          <Button onClick={copyLink} className={classes.buttonCopy} size="small" variant="contained">
            {t('copyInvitation')}
          </Button>
        </Paper>
      </Fade>
    </ClickAwayListener>
  );
};

export default AddGuestDialog;
