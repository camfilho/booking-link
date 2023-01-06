import React from "react";
import Slot from "./Slot";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const timeDivision = 15; //minutes

const SlotPicker = ({ date, duration, setAlertData }) => {
  const queryClient = useQueryClient();

  const getSlots = () => fetch("/api/v1/slots?date=" + String(date)).then((res) => res.json())
  const { isLoading, error, data } = useQuery({ queryKey: [`querySlots${String(date)}`], queryFn: getSlots })

  const mutation = useMutation({
    mutationFn: (dateTime) => {
      const token = document.querySelector('meta[name="csrf-token"]').content;

      return fetch("/api/v1/slots", {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slot: {
            date_time: dateTime,
            duration: duration,
          },
        }),
      }).then(response => response.json())
    },
    onSuccess: (data) => {
      console.log({data})
      queryClient.invalidateQueries()
      setAlertData({
        message: {endDate: `${data.end.slice(0,10)} ${data.end.slice(11,16)}`, startDate: `${data.start.slice(0,10)} ${data.start.slice(11,16)}`},
        success: true,
        open: true,
      });
    },
    onError: (error) => {
      setAlertData({
        message: {error: error.message},
        success: false,
        open: true,
      });
      console.error(error.message);
    },
  });

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
      <div className="row overflow-auto" style={{ height: "20vh" }}>
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