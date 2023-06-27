import { FormControl, MenuItem, Typography, Select, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../../../state';

const MAX_PARTICIPANT_OPTIONS = [6, 12, 24];

export default function MaxGalleryViewParticipants() {
  const { maxGalleryViewParticipants, setMaxGalleryViewParticipants } = useAppState();
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        {t('maxGalleryViewParticipants')}
      </Typography>
      <Grid container alignItems="center" justifyContent="space-between">
        <div className="inputSelect">
          <FormControl fullWidth>
            <Select
              onChange={e => setMaxGalleryViewParticipants(parseInt(e.target.value as string))}
              value={maxGalleryViewParticipants}
              variant="outlined"
            >
              {MAX_PARTICIPANT_OPTIONS.map(option => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grid>
    </div>
  );
}
