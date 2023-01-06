import React from "react";

export default function Calendar({date, setDate, duration, setDuration, setOpen}){
  console.log("calendar")
  console.log({date: date.split("T")[0]})
  return (
    <div className="col-sm-6">
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          className="form-control"
          id="duration"
          aria-describedby="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Choose a date</label>
        <input type="date" 
          className="form-control" 
          id="date"
          value={date.split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
           />
      </div>
      <button type="submit" className="btn btn-primary mt-2" onClick={() => setOpen(true)}>
        Check Availability
      </button>
    </div>
  );
}
