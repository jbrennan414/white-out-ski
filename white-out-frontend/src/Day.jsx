import { Link } from "react-router-dom";
import React, { useState, useEffect, forwardRef } from "react";
import { useParams } from "react-router-dom";
import "./Day.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
  Button,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";

import { getDayOfWeek, getMonth, getDate, getYear } from "./utils";

import axios from "axios";
import { lessees, isPastDate } from "./utils";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Day(props) {
  let { day } = useParams();

  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(day);
  const [reservations, setReservations] = useState(lessees);
  const [shouldDisplayError, setShouldDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClose = () => {
    setShouldDisplayError(false);
  };

  function bookStay() {
    const pathSegments = window.location.pathname.split('/');

    axios.post(`https://c096t62awd.execute-api.us-west-2.amazonaws.com/prod/`, {
        reservation_date: pathSegments[2],
        bed_id: "double_2",
        user_name: "WhiteOut Test"
      })
      .then((response) => {
        console.log("that worked", response);
      })

  }

  useEffect(() => {
    axios
      .get(`https://hil0sv4jl3.execute-api.us-west-2.amazonaws.com/prod/?date=${selectedDate}`)
      .then((response) => {

        setReservations(response.data.reservations);

        setPageIsLoading(false);
        setSelectedDate(selectedDate);
      })
      .catch((error) => {
        console.log("ERRRRRRROR", error);
        setPageIsLoading(false);
      });
  }, []);

  let spotsRemaining = 9;

  const lessees_emails = lessees.map((item) => item.user_email);

  lessees.forEach((item) => {
    const index = reservations.findIndex((reservation) => reservation.user_email === item.user_email);

    if (reservations[index]?.is_in === true) {
      spotsRemaining--;
    }

    if (index === -1) {
      spotsRemaining--;
    }
    
  })

  const guests = reservations.filter((item) => !lessees_emails.includes(item.user_email) && item.is_in).length;

  spotsRemaining = spotsRemaining - guests;

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

          <div className="reservation-container">
            {/* {renderRezzies()} */}
            {/* {renderGuests()} */}
          </div>

          {true ? (
            <Button
              variant="contained"
              disabled={spotsRemaining === 0}
              onClick={() => {
                bookStay();
              }}
            >
              {`${spotsRemaining > 0 ? `Room for ${spotsRemaining} ${spotsRemaining === 1 ? `guest` :`guests` }` : `No spots left`}`}
            </Button>
          ) : (
            <Button variant="contained">
              {`Sign in to book`}
            </Button>
          )}
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
