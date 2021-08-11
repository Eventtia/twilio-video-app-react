import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import { isMobile } from '../../utils';
import Menu from './Menu/EventtiaMenu';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useIsUserActive from '../../hooks/useIsUserActive/useIsUserActive';
import { Typography, Grid, Hidden } from '@material-ui/core';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton';
import AddGuestButton from '../Buttons/AddGuestButton/AddGuestButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translateY(20px)',
      transition: 'opacity 1.2s, transform 1.2s, visibility 0s 1.2s',
      opacity: 0,
      visibility: 'hidden',
      background: 'rgba(0, 0, 0, 0.5)',
      '&.showControls, &:hover': {
        transition: 'opacity 0.6s, transform 0.6s, visibility 0s',
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(0px)',
      },
      bottom: 0,
      left: 0,
      right: 0,
      // height: `${theme.footerHeight}px`,
      position: 'fixed',
      display: 'flex',
      padding: '1em 1.43em',
      zIndex: 10,
      [theme.breakpoints.down('sm')]: {
        // height: `${theme.mobileFooterHeight}px`,
        padding: '1em 0',
      },
    },
    screenShareBanner: {
      position: 'fixed',
      zIndex: 8,
      bottom: `${theme.footerHeight}px`,
      left: 0,
      right: 0,
      height: '104px',
      background: 'rgba(0, 0, 0, 0.5)',
      '& h6': {
        color: 'white',
      },
      '& button': {
        background: 'white',
        color: theme.brand,
        border: `2px solid ${theme.brand}`,
        margin: '0 2em',
        '&:hover': {
          color: '#600101',
          border: `2px solid #600101`,
          background: '#FFE9E7',
        },
      },
    },
    hideMobile: {
      display: 'initial',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    fab: {
      margin: '0 1em',
      width: '3.5em',
      height: '3.5em',
    },
  })
);

export default function EventtiaMenuBar() {
  const classes = useStyles();
  const { isSharingScreen, toggleScreenShare } = useVideoContext();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const { room } = useVideoContext();
  const isUserActive = useIsUserActive();
  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const showControls = isUserActive || smallScreen;

  return (
    <footer className={clsx(classes.container, { showControls })}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item>
          <Grid container justify="center">
            <ToggleAudioButton disabled={isReconnecting} fab className={classes.fab} />
            <ToggleVideoButton disabled={isReconnecting} fab className={classes.fab} />
            {/*!isSharingScreen && */ !isMobile && (
              <ToggleScreenShareButton disabled={isReconnecting} fab className={classes.fab} />
            )}
            {!smallScreen && <AddGuestButton fab className={classes.fab} />}
            <EndCallButton fab className={classes.fab} />
          </Grid>
        </Grid>
        {/* <Hidden smDown> */}
        <Grid style={{ flex: 1 }}>
          <Grid container justify="flex-end">
            <Menu fab buttonClassName={classes.fab} />
          </Grid>
        </Grid>
        {/* </Hidden> */}
      </Grid>
    </footer>
  );
}
