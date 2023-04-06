import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@mui/material";

const DateTime = ({getDate, title}) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <DatePicker
        selected={startDate}
        onChange={(date) => {
            setStartDate(date)
            getDate(date)
        }}
        showTimeSelect
        timeFormat="HH:mm"
        className="timer"
        injectTimes={[
            setHours(setMinutes(new Date(), 1), 0),
            setHours(setMinutes(new Date(), 5), 12),
            setHours(setMinutes(new Date(), 59), 23),
        ]}
        dateFormat="MMMM d, yyyy h:mm aa"
        />
    </div>
  );
};

export default DateTime;