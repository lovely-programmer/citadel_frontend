import { useRef, useState, useEffect } from "react";
import IdleTimer from "react-idle-timer";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

function IdleTimerContainer() {
  const idleTimerRef = useRef(null);
  const dispatch = useDispatch();

  const onIdle = () => {
    console.log("user is idle");
    dispatch(logOut());
  };

  return (
    <IdleTimer
      ref={idleTimerRef}
      timeout={60 * 10000}
      onIdle={onIdle}
    ></IdleTimer>
  );
}

export default IdleTimerContainer;
