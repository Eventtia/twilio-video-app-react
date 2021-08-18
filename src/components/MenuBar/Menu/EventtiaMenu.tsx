import React, { useState, useRef } from 'react';
import DeviceSelectionDialog from '../../DeviceSelectionDialog/DeviceSelectionDialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreIcon from '@material-ui/icons/MoreVert';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import SettingsIcon from '@material-ui/icons/Settings';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Button, styled, Theme, useMediaQuery, Menu as MenuContainer, MenuItem, Typography } from '@material-ui/core';

import { useAppState } from '../../../state';
import useIsRecording from '../../../hooks/useIsRecording/useIsRecording';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import FlipCameraIcon from '../../../icons/FlipCameraIcon';
import useFlipCameraToggle from '../../../hooks/useFlipCameraToggle/useFlipCameraToggle';
import useFullScreenToggle from '../../../hooks/useFullScreenToggle/useFullScreenToggle';
import AddGuestButton from '../../Buttons/AddGuestButton/AddGuestButton';

export const IconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '1.5em',
  marginRight: '0.3em',
});

export default function EventtiaMenu(props: { buttonClassName?: string; fab?: boolean }) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const { flipCameraDisabled, toggleFacingMode, flipCameraSupported } = useFlipCameraToggle();

  return (
    <>
      {props.fab ? (
        <Tooltip title="More" placement="top">
          <Fab
            ref={anchorRef}
            onClick={() => setMenuOpen(isOpen => !isOpen)}
            className={props.buttonClassName}
            data-cy-more-button
          >
            <MoreIcon />
          </Fab>
        </Tooltip>
      ) : (
        <Button
          onClick={() => setMenuOpen(isOpen => !isOpen)}
          ref={anchorRef}
          className={props.buttonClassName}
          data-cy-more-button
        >
          {isMobile ? (
            <MoreIcon />
          ) : (
            <>
              More
              <ExpandMoreIcon />
            </>
          )}
        </Button>
      )}
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(isOpen => !isOpen)}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: isMobile ? -55 : 'bottom',
          horizontal: 'center',
        }}
      >
        {isMobile && (
          <AddGuestButton
            menuItem
            icon={
              <IconContainer>
                <PersonAdd />
              </IconContainer>
            }
          />
        )}
        {flipCameraSupported && (
          <MenuItem disabled={flipCameraDisabled} onClick={toggleFacingMode}>
            <IconContainer>
              <FlipCameraIosIcon />
            </IconContainer>
            <Typography variant="body1">Flip Camera</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={toggleFullScreen}>
          <IconContainer>{isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}</IconContainer>
          <Typography variant="body1">{isFullScreen ? 'Exit full screen' : 'Full screen'}</Typography>
        </MenuItem>
        <MenuItem onClick={() => setSettingsOpen(true)}>
          <IconContainer>
            <SettingsIcon />
          </IconContainer>
          <Typography variant="body1">Audio and Video Settings</Typography>
        </MenuItem>
      </MenuContainer>
      <DeviceSelectionDialog
        open={settingsOpen}
        onClose={() => {
          setSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
    </>
  );
}