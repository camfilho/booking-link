import React from "react";

export function HomeContainer({children, alertOpen, alert}) {
  return (
    <div className="vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">The 123 Warehouse - Pick a Slot</h1>
          <p className="lead">
           Check the availability of our warehouse and book a slot.
          </p>
          <hr className="my-4" />
          <div className="row">{children}</div>
        </div>
      </div>
    </div>
  );
}