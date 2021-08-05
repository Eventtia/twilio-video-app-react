import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog';
import SettingsIcon from '../../../../icons/SettingsIcon';

export default function SettingsMenu({ className }: { className?: string }) {
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDeviceSettingsOpen(true)} startIcon={<SettingsIcon />} className={className}>
        Audio and Video Settings
      </Button>
      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
        }}
      />
    </>
  );
}
