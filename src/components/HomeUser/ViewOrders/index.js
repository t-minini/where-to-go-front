import { useState, useEffect } from "react";
import { api } from "../../../api/api";
import style from "./style.module.css";
import { Button } from "antd";

export function ViewOrders() {
  const [orders, setOrders] = useState([
    {
      customerId: "",
      dateCreated: "",
      orderTotal: "",
      trips: [
        {
          trip: "",
          quantity: "",
          unitPrice: "",
        },
      ],
    },
  ]);
  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get("/order/all-orders-user");
      setOrders(response.data);
    }

    fetchOrders();
  }, []);

  return (
    <>
      <div className={style.h1Container}>
        <h1>My Orders</h1>
      </div>
      <div className={style.myOrders}>
        {orders.map((currentOrder) => {
          return (
            <div className={style.orderCard}>
              <p>Order Number</p>
              <p className={style.id}>{currentOrder.customerId}</p>
              <p>Order Total </p>
              <p className={style.total}>${currentOrder.orderTotal}</p>
              <Button className={style.btn} shape="round" size="default">
                Details
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
