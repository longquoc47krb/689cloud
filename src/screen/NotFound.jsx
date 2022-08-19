import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className='text-center '>
      <h1 className='text-[10rem] font-bold mb-0'>404</h1>
      <p className='text-2xl font-bold'> Page Not Found</p>
      <div className='text-xl'>
        <span className='mr-1'>Return home, click</span>
        <Link to='/dashboard'>
          <p>Home</p>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
