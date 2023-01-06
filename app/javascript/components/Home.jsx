import React from "react";
import Calendar from "./Calendar";
import SlotPicker from "./SlotPicker";
import { HomeContainer } from './HomeContainer';
import Message from "./Message";

export default () => {
  const [date, setDate] = React.useState(new Date().toISOString());
  const [duration, setDuration] = React.useState(30);
  
  const [alertData, setAlertData] = React.useState({message: "", success: false, open: false});

  const {message, success, open} = alertData;
  return (
    <HomeContainer>
      {open && <Message message={message} success={success} setAlertData={setAlertData} />}
      <Calendar
        date={date}
        setDate={setDate}
        duration={duration}
        setDuration={setDuration}
      />
      <SlotPicker
        date={date}
        duration={duration}
        setAlertData={setAlertData}
      />
    </HomeContainer>
  );
}