import React, { useEffect, useState } from "react";
import Slot from "./Slot";

const timeDivision = 15; //minutes

const SlotPicker = ({ date, duration, setAlertData }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const url = "/api/v1/slots?date=" + String(date);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setSlots(res))
      .catch(() => console.log("error"));
  }, [date]);

  function generateTimeSlots(date) {
    const slots = [];

    const startTime = new Date(date);
    startTime.setUTCHours(0, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setUTCHours(23, 45, 0, 0);

    let currentTime = startTime;
    while (currentTime <= endTime) {
      slots.push(currentTime);
      currentTime = new Date(currentTime.getTime() + timeDivision * 60 * 1000);
    }

    return slots;
  }

  const bookSlot = (dateTime) => {
    console.log("bookSlot", dateTime, duration);
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch("/api/v1/slots", {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slot: {
          date_time: dateTime,
          duration: duration,
        },
      }),
    })
      .then((response) => response.json())
      .then((_data) => {
        const hoursMinutes = dateTime.split("T")[1].slice(0,5)
        setAlertData({message: `Success! You have booked a slot at ${date} ${hoursMinutes}`, success: true, open: true})
      })
      .catch((error) => {
         setAlertData({message: "Oops! Something went wrong", success: false, open: true})
         console.error("Error:", error)
      });
  };

  const filterSlots = (slot) => {
    const bookedSlots = slots.map((slot) => {
      return {
        id: slot.id,
        end: new Date(slot.end),
        start: new Date(slot.start),
      };
    });

    const shiftedSlotTime = slot.getTime() + duration * 60 * 1000;
    return !bookedSlots.find((bookedSlot) => {
      return (
        shiftedSlotTime > bookedSlot.start.getTime() &&
        slot.getTime() < bookedSlot.end.getTime()
      );
    });
  };

  return (
    <div className="col-sm-6">
      <div className="row overflow-auto" style={{ height: "20vh" }}>
        {generateTimeSlots(date)
          .filter(filterSlots)
          .map((slot) => {
            return (
              <Slot key={slot.toTimeString()} slot={slot} bookSlot={bookSlot} />
            );
          })}
      </div>
    </div>
  );
};

export default SlotPicker;