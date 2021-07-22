import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData } from "../../services/actions/app-actions";
import ModalSwitch from "./modal-switch";
import { WS_ORDER_TAPE_CONNECTION_INIT } from "../../services/actions/order-tape-actions";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_ORDER_TAPE_CONNECTION_INIT })
  }, [dispatch])

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}

export default App;
