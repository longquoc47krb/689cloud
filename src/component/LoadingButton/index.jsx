import React from "react";
import Loading from "../Loading";

function LoadingButton(props) {
  const { loading, text, loadingText } = props;
  return (
    <div>
      <button
        type='submit'
        className='w-full bg-[#325aa8] p-3 text-white flex justify-center items-center text-xl font-bold'
        disabled={loading}>
        {loading && <Loading />}
        {loading && <span>{loadingText}</span>}
        {!loading && <span>{text}</span>}
      </button>
    </div>
  );
}

export default LoadingButton;
