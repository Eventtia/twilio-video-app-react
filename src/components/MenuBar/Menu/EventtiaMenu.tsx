import React, { useState, useRef } from 'react';
import DeviceSelectionDialog from '../../DeviceSelectionDialog/DeviceSelectionDialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreIcon from '@material-ui/icons/MoreVert';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import SettingsIcon from '@material-ui/icons/Settings';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import PersonAdd from '@material-ui/icons/PersonAdd';
import BackgroundIcon from '@material-ui/icons/Landscape';
import CollaborationViewIcon from '@material-ui/icons/AccountBox';
import GridViewIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Button, styled, Theme, useMediaQuery, Menu as MenuContainer, MenuItem, Typography } from '@material-ui/core';
import { isSupported as isBackgroundSelectionSupported } from '@twilio/video-processors';

import { useAppState } from '../../../state';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useFlipCameraToggle from '../../../hooks/useFlipCameraToggle/useFlipCameraToggle';
import useFullScreenToggle from '../../../hooks/useFullScreenToggle/useFullScreenToggle';
import AddGuestButton from '../../Buttons/AddGuestButton/AddGuestButton';
import { useTranslation } from 'react-i18next';
import fscreen from 'fscreen';
import { VideoRoomMonitor } from '@twilio/video-room-monitor';

export const IconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '1.5em',
  marginRight: '0.3em',
});

export default function EventtiaMenu(props: { buttonClassName?: string; fab?: boolean }) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  const { setIsGalleryViewActive, isGalleryViewActive } = useAppState();
  const { setIsBackgroundSelectionOpen } = useVideoContext();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const { flipCameraDisabled, toggleFacingMode, flipCameraSupported } = useFlipCameraToggle();

  return (
    <>
      {props.fab ? (
        <Tooltip title={t('more') as string} placement="top">
          <div>
            <Fab
              ref={anchorRef}
              onClick={() => setMenuOpen(isOpen => !isOpen)}
              className={props.buttonClassName}
              data-cy-more-button
            >
              <MoreIcon />
            </Fab>
          </div>
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
              {t('more')}
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
          vertical: /*isMobile ? -55 : */ 'bottom',
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
            <Typography variant="body1">{t('flipCamera')}</Typography>
          </MenuItem>
        )}
        {fscreen.fullscreenEnabled && (
          <MenuItem onClick={toggleFullScreen}>
            <IconContainer>{isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}</IconContainer>
            <Typography variant="body1">{isFullScreen ? t('exitFullScreen') : t('fullScreen')}</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => setSettingsOpen(true)}>
          <IconContainer>
            <SettingsIcon />
          </IconContainer>
          <Typography variant="body1">{t('audioVideoSettings')}</Typography>
        </MenuItem>
        {isBackgroundSelectionSupported && (
          <MenuItem
            onClick={() => {
              setIsBackgroundSelectionOpen(true);
              setMenuOpen(false);
            }}
          >
            <IconContainer>
              <BackgroundIcon />
            </IconContainer>
            <Typography variant="body1">{t('backgrounds')}</Typography>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            VideoRoomMonitor.toggleMonitor();
            setMenuOpen(false);
          }}
        >
          <IconContainer>
            <SearchIcon style={{ fill: '#707578', width: '0.9em' }} />
          </IconContainer>
          <Typography variant="body1">Room Monitor</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setIsGalleryViewActive(isGallery => !isGallery);
            setMenuOpen(false);
          }}
        >
          <IconContainer>
            {isGalleryViewActive ? (
              <CollaborationViewIcon style={{ fill: '#707578', width: '0.9em' }} />
            ) : (
              <GridViewIcon style={{ fill: '#707578', width: '0.9em' }} />
            )}
          </IconContainer>
          <Typography variant="body1">{isGalleryViewActive ? 'Speaker View' : 'Gallery View'}</Typography>
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
