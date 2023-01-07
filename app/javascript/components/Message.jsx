import React from "react";

export default function Succes({
  message,
  success,
  setAlertData,
  setSlotPickerData,
  slotPickerData,
}) {
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setAlertData({ open: false });
      }, 6000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="col-md-6 offset-md-3">
      {success ? (
        <div className="alert alert-primary text-center">
          <h4 className="alert-heading">Success!</h4>
          <p>Your slot has been successfully booked.</p>
          <hr />
          <p className="mb-0">Start date/hour: {message.startDate}</p>
          <p>End date/hour: {message.endDate}</p>
          <button
            type="button"
            className="btn btn-sm btn-close"
            data-bs-theme="dark"
            style={{ position: "absolute", top: 0, right: 0 }}
            aria-label="Close"
            onClick={() => setAlertData({ open: false })}
          ></button>
        </div>
      ) : (
        <div className="alert alert-danger text-center">
          <h4 className="alert-heading">Ooops!</h4>
          <p>We weren't able to process your request</p>
          <hr />
          <p className="mb-0">Check the slot again.</p>
          {Object.keys(message.error).map((key) => (
            <p key={key}>
              {key}: {message.error[key]}
            </p>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-close"
            data-bs-theme="dark"
            style={{ position: "absolute", top: 0, right: 0 }}
            aria-label="Close"
            onClick={() => {
              setSlotPickerData({
                date:
                  slotPickerData.date || new Date().toISOString().slice(0, 10),
                duration: 30,
              });
              setAlertData({ open: false });
            }}
          ></button>
        </div>
      )}
    </div>
  );
}
