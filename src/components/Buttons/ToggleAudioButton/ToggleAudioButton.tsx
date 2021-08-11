import React from 'react';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
// import MicIcon from '../../../icons/MicIcon';
// import MicOffIcon from '../../../icons/MicOffIcon';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function ToggleAudioButton(props: { disabled?: boolean; className?: string; fab?: boolean }) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { localTracks } = useVideoContext();
  const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

  if (props.fab)
    return (
      <Tooltip title={!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'} placement="top">
        <Fab
          className={props.className}
          onClick={toggleAudioEnabled}
          disabled={!hasAudioTrack || props.disabled}
          data-cy-audio-toggle
        >
          {isAudioEnabled ? <Mic /> : <MicOff />}
        </Fab>
      </Tooltip>
    );
  return (
    <Button
      className={props.className}
      onClick={toggleAudioEnabled}
      disabled={!hasAudioTrack || props.disabled}
      startIcon={isAudioEnabled ? <Mic /> : <MicOff />}
      data-cy-audio-toggle
    >
      {!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'}
    </Button>
  );
}
