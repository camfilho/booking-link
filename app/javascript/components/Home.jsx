import React from "react";
import Calendar from "./Calendar";
import SlotPicker from "./SlotPicker";
import { HomeContainer } from "./HomeContainer";
import Message from "./Message";

export default () => {
  const [alertData, setAlertData] = React.useState({
    message: "",
    success: false,
    open: false,
  });

  const [slotPickerData, setSlotPickerData] = React.useState({
    date: new Date().toISOString().slice(0, 10),
    duration: 30,
  });

  const { date, duration } = slotPickerData;
  const { message, success, open } = alertData;
  return (
    <HomeContainer>
      {open ? (
        <Message
          message={message}
          success={success}
          setAlertData={setAlertData}
          setSlotPickerData={setSlotPickerData}
          slotPickerData={slotPickerData}
        />
      ) : (
        <>
          <Calendar setSlotPickerData={setSlotPickerData} />
          <SlotPicker
            date={date}
            duration={duration}
            setAlertData={setAlertData}
          />
        </>
      )}
    </HomeContainer>
  );
};
