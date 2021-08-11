import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import PersonAdd from '@material-ui/icons/PersonAdd';

import AddGuestDialog from './AddGuestDialog';

export default function AddGuestButton(props: {
  className?: string;
  fab?: boolean;
  menuItem?: boolean;
  icon?: React.ReactNode;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {props.fab ? (
        <Tooltip title="Add guest" placement="top">
          <div>
            <Fab className={props.className} onClick={() => setDialogOpen(true)}>
              <PersonAdd />
            </Fab>
          </div>
        </Tooltip>
      ) : (
        <MenuItem onClick={() => setDialogOpen(true)}>
          {props.icon}
          <Typography variant="body1">Add guest</Typography>
        </MenuItem>
      )}
      {dialogOpen && <AddGuestDialog onClose={() => setDialogOpen(false)} />}
    </>
  );
}
