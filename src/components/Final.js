import React from "react";
import { ReactComponent as WhaleImage } from "../assets/svg/donatuz-whale.svg";

const Final = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="relative aspect-square max-w-[500px] mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <WhaleImage className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-16 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="whitespace-normal lg:whitespace-nowrap">
              Welcome to Donatuz Early
            </span>
            <br />
            Adopter Community
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Final;
