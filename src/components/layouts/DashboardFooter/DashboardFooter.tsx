import React from "react";

const DashboardFooter: React.FC = () => {
  return (
    <footer className=" text-black p-4 flex justify-center items-center">
      <p>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  );
};

export default DashboardFooter;
