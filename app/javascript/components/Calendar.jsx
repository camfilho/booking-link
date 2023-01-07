import React from "react";

export default function Calendar({ setSlotPickerData }) {
  const [formData, setFormData] = React.useState({
    duration: 30,
    date: new Date().toISOString().slice(0, 10),
  });

  return (
    <div className="col-sm-6">
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          max={1440}
          className="form-control"
          id="duration"
          aria-describedby="duration"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Choose a date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-2"
        onClick={() => {
          setSlotPickerData(formData);
        }}
      >
        Check Availability
      </button>
    </div>
  );
}
