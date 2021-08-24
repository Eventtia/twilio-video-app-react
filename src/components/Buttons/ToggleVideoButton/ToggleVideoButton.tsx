import React, { useCallback, useRef } from 'react';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
// import VideoOffIcon from '../../../icons/VideoOffIcon';
// import VideoOnIcon from '../../../icons/VideoOnIcon';

import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';
import { useTranslation } from 'react-i18next';

export default function ToggleVideoButton(props: { disabled?: boolean; className?: string; fab?: boolean }) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const { hasVideoInputDevices } = useDevices();
  const { t } = useTranslation();

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  if (props.fab)
    return (
      <Tooltip
        title={(!hasVideoInputDevices ? t('noVideo') : isVideoEnabled ? t('stopVideo') : t('startVideo')) as string}
        placement="top"
      >
        <Fab className={props.className} onClick={toggleVideo} disabled={!hasVideoInputDevices || props.disabled}>
          {isVideoEnabled ? <Videocam /> : <VideocamOff />}
        </Fab>
      </Tooltip>
    );
  return (
    <Button
      className={props.className}
      onClick={toggleVideo}
      disabled={!hasVideoInputDevices || props.disabled}
      startIcon={isVideoEnabled ? <Videocam /> : <VideocamOff />}
    >
      {!hasVideoInputDevices ? t('noVideo') : isVideoEnabled ? t('stopVideo') : t('startVideo')}
    </Button>
  );
}
