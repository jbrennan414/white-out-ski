import { Link } from "react-router-dom";
import React, { useState, useEffect, forwardRef } from "react";
import { useParams } from "react-router-dom";
import ReservationChip from "./ReservationChip";
import "./Day.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
  Button,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";

import { getDayOfWeek, getMonth, getDate, getYear } from "./utils";

import axios from "axios";
import { beds } from "./utils";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Day(props) {
  let { day } = useParams();

  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(day);
  const [shouldDisplayError, setShouldDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [guests, setGuests] = useState({});

  const handleClose = () => {
    setShouldDisplayError(false);
  };

  function bookStay() {
    setPageIsLoading(true);

    const pathSegments = window.location.pathname.split('/');

    axios.post(`https://c096t62awd.execute-api.us-west-2.amazonaws.com/prod/`, {
        reservation_date: pathSegments[2],
        guests: JSON.stringify(guests)
    })
    .then((response) => {
      setPageIsLoading(false);
    })
    .catch((error) => {
      setPageIsLoading(false);
      setShouldDisplayError(true);
      setErrorMessage("There was an error booking your stay. Please try again later.");
    })

  }

  useEffect(() => {
    axios
      .get(`https://c096t62awd.execute-api.us-west-2.amazonaws.com/prod/?date=${selectedDate}`)
      .then((response) => {

        if (response.data.length === 0) {
          setPageIsLoading(false);
          setGuests({});
          return;
        }

        const guests = JSON.parse(response.data[0].guests)
        setGuests(guests);

      })
      .catch((error) => {
        console.log("ERRRRRRROR", error);
        setPageIsLoading(false);
      });
  }, []);

  const pathSegments = window.location.pathname.split('/');

  return (
    <div>
      {pageIsLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div 
            id="header-line" 
            style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            <Link
              state={{ 
              month: selectedDate.substring(4, 6), 
              year: selectedDate.substring(0, 4) }}
              to={`/calendar`}
            >
              <NavigateBeforeIcon />
            </Link>
            <p>{`${getDayOfWeek(selectedDate)} ${getMonth(
              selectedDate
            )} ${getDate(selectedDate)}, ${getYear(selectedDate)}`}</p>
          </div>

          {beds.map((bed, i) => {
            return (
              <ReservationChip key={i} bed={bed} selectedDate={pathSegments[2]} guests={guests} setGuests={setGuests} />
            );
          })}

          <Button
            variant="contained"
            disabled={false}
            onClick={() => {
              bookStay();
            }}
          >
            Reserve
          </Button>
        </div>
      )}

      <Snackbar
        open={shouldDisplayError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
