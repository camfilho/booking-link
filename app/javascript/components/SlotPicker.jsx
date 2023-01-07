import React from "react";
import Slot from "./Slot";

import useReactQuerySubscription from "./hooks/useReactQuerySubscription";
import useGetSlots from "./hooks/useGetSlots";
import usePostSlot from "./hooks/usePostSlot";

const timeDivision = 15; //minutes

const SlotPicker = ({ date, duration, setAlertData }) => {
  useReactQuerySubscription();
  const { isLoading, isError, data } = useGetSlots({
    date,
    duration,
    setAlertData,
  });
  const mutation = usePostSlot({ setAlertData, duration });

  const bookedSlots = data?.map((slot) => {
    return {
      id: slot.id,
      end: new Date(slot.end),
      start: new Date(slot.start),
    };
  });

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

  if (isLoading) return "Loading...";
  if (isError) return "Error!";

  const filterSlots = (slot) => {
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
      <div className="row overflow-auto" style={{ maxHeight: "20vh" }}>
        {generateTimeSlots(date)
          .filter(filterSlots)
          .map((slot) => {
            return (
              <Slot key={slot.toTimeString()} slot={slot} mutation={mutation} />
            );
          })}
      </div>
    </div>
  );
};

export default SlotPicker;
