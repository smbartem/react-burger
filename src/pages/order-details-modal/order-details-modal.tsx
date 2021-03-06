import { FC } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";

export const OrderDetailsModal: FC = () => {
  const history = useHistory();

  return (
    <Modal
      title=""
      handleModalClose={() => {
        history.push("/");
      }}
    >
      <OrderDetails/>
    </Modal>
  );
};