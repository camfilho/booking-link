import React from "react";

const Slot = ({ slot, bookSlot }) => {
  return (
    <div
      onClick={(_e) => bookSlot(slot.toISOString(), duration)}
      key={String(slot)}
      className="col-sm-3 btn btn-light btn-sm m-1"
    >
      {String(slot.getUTCHours()).padStart(2, "0")}:
      {String(slot.getUTCMinutes()).padStart(2, "0")}
      <br />
    </div>
  );
};

export default Slot;