import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CallEnd from '@material-ui/icons/CallEnd';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: theme.brand,
      color: 'white',
      '&:hover': {
        background: '#600101',
      },
    },
  })
);

export default function EndCallButton(props: { className?: string; fab?: boolean }) {
  const classes = useStyles();
  const { room } = useVideoContext();
  const { t } = useTranslation();

  if (props.fab)
    return (
      <Tooltip title={t('disconnect') as string} placement="top">
        <Fab className={clsx(classes.button, props.className)} onClick={() => room!.disconnect()} data-cy-disconnect>
          <CallEnd />
        </Fab>
      </Tooltip>
    );
  return (
    <Button onClick={() => room!.disconnect()} className={clsx(classes.button, props.className)} data-cy-disconnect>
      {t('disconnect')}
    </Button>
  );
}
