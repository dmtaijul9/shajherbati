import React from "react";
import {
  LocationMarkerIcon,
  ClockIcon,
  CashIcon,
} from "@heroicons/react/outline";

const FaciCard = ({ icon, heading, subHeading }) => {
  return (
    <div className="flex flex-col items-center space-y-2 ">
      {icon === "shipping" && <LocationMarkerIcon width={30} height={30} />}
      {icon === "time" && <ClockIcon width={30} height={30} />}
      {icon === "payment" && <CashIcon width={30} height={30} />}
      <h1 className="text-lg font-bold ">{heading}</h1>
      <p className="font-light"> {subHeading} </p>
    </div>
  );
};

export default FaciCard;
