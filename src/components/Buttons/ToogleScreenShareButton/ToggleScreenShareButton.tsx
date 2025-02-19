import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import ScreenShareIcon from '../../../icons/ScreenShareIcon';
import Tooltip from '@material-ui/core/Tooltip';

import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useTranslation } from 'react-i18next';

export const SCREEN_SHARE_TEXT = 'Share Screen';
export const STOP_SCREEN_SHARE_TEXT = 'Stop Sharing Screen';
export const SHARE_IN_PROGRESS_TEXT = 'Cannot share screen when another user is sharing';
export const SHARE_NOT_SUPPORTED_TEXT = 'Screen sharing is not supported with this browser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      '&[disabled]': {
        color: '#bbb',
        '& svg *': {
          fill: '#bbb',
        },
      },
    },
  })
);

export default function ToggleScreenShareButton(props: { disabled?: boolean; className?: string; fab?: boolean }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const screenShareParticipant = useScreenShareParticipant();
  const { toggleScreenShare, isSharingScreen, room } = useVideoContext();
  const disableScreenShareButton = Boolean(screenShareParticipant) && screenShareParticipant !== room?.localParticipant;
  const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  const isDisabled = props.disabled || disableScreenShareButton || !isScreenShareSupported;

  let tooltipMessage = '';

  if (disableScreenShareButton) {
    tooltipMessage = t('anotherSharingScreen');
  }

  if (!isScreenShareSupported) {
    tooltipMessage = t('screenShareNotSupported');
  }

  if (props.fab)
    return (
      <Tooltip
        title={(tooltipMessage || (isSharingScreen ? t('stopSharingScreen') : t('shareScreen'))) as string}
        placement="top"
        PopperProps={{ disablePortal: true }}
        style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
      >
        <div>
          {/* The div element is needed because a disabled button will not emit hover events and we want to display
            a tooltip when screen sharing is disabled */}
          <Fab className={props.className} onClick={toggleScreenShare} disabled={isDisabled} data-cy-share-screen>
            {isSharingScreen ? <StopScreenShare /> : <ScreenShare />}
          </Fab>
        </div>
      </Tooltip>
    );
  return (
    <Tooltip
      title={tooltipMessage}
      placement="top"
      PopperProps={{ disablePortal: true }}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
    >
      <span>
        {/* The span element is needed because a disabled button will not emit hover events and we want to display
          a tooltip when screen sharing is disabled */}
        <Button
          className={classes.button}
          onClick={toggleScreenShare}
          disabled={isDisabled}
          startIcon={<ScreenShareIcon />}
          data-cy-share-screen
        >
          {t('shareScreen')}
        </Button>
      </span>
    </Tooltip>
  );
}
