import React from "react";

export default function Succes({message, success, setAlertData}) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAlertData({open: false})
    }, 3000);
    return () => clearTimeout(timer);
  })

  return (
    <div className={`alert alert-${success ? 'success' : 'warning'}` } role="alert">
      {message || "Success!"}
    </div>
  );
}