import React from "react";

const CheckoutWizard = ({ activeStep = 0 }) => {
  const steps = [
    "User Login",
    "Shipping Address",
    "Shipping Method",
    "Create Percel",
  ];
  return (
    <div className="flex flex-wrap mt-3 mb-5">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center ${
            index <= activeStep
              ? "border-red-700 text-red-700"
              : "border-gray-400 text-gray-400"
          }`}
        >
          {" "}
          {step}{" "}
        </div>
      ))}
    </div>
  );
};

export default CheckoutWizard;
