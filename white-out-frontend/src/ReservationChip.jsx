import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const AccordionSummary = styled((props) => (

  <MuiAccordionSummary
    expandIcon={<Checkbox {...label} />}
    {...props}
  />
))(({ theme }) => ({

  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function ReservationChip(props) {

  const { bed_id, bed_name } = props.bed;
  const { guests } = props;

  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const prepGuests = (bed_id, spot_id) => (event) => {

    const bed_user = event.target.value;
    const new_guests = guests;

    props.setGuests({
        ...new_guests,
        [bed_id]: {
          ...new_guests[bed_id],
          [spot_id]: bed_user
        }
      });

  }

  return (
    <div key={bed_id}>
      <Accordion expanded={expanded === bed_id} onChange={handleChange(bed_id)}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{bed_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <TextField id="outlined-basic" label="Guest #1" variant="outlined" value={guests && guests[bed_id] && guests[bed_id]["spot_1"] ? guests[bed_id]["spot_1"] : ""} onChange={prepGuests(bed_id, "spot_1")} />
          <TextField id="outlined-basic" label="Guest #1" variant="outlined" value={guests && guests[bed_id] && guests[bed_id]["spot_2"] ? guests[bed_id]["spot_2"] : ""} onChange={prepGuests(bed_id, "spot_2")} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
