import { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector  } from "../../services/hooks";
import { getData } from "../../services/actions/app-actions";
import ModalSwitch from "./modal-switch";
import { WS_ORDER_TAPE_CONNECTION_INIT } from "../../services/actions/order-tape-actions";
import { WS_ORDER_HISTORY_CONNECTION_INIT } from "../../services/actions/order-history-actions";

const App: FC = () => {
  const { authorized } = useSelector((store) => store.authorizationReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: WS_ORDER_TAPE_CONNECTION_INIT })
  }, [dispatch])

  useEffect(() => {
    authorized && dispatch({ type: WS_ORDER_HISTORY_CONNECTION_INIT })
  }, [authorized, dispatch])

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}

export default App;
