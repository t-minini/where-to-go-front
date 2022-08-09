import { useState, useEffect } from "react";
import { api } from "../../../api/api";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

export function ViewOrder() {
  const navigate = useNavigate();

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

  console.log(orders);

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get("/order/all-orders");
      setOrders(response.data);
    }
    fetchOrders();
  }, []);

  async function deleteOrder(id) {
    await api.delete(`/order/delete-order/${id}`);
    navigate("/admin");
  }

  return (
    <div className={style.oderDiv}>
      <div >
        {orders.map((currentOrder) => {
          return (
            <div key={`${currentOrder._id}orders`}>
              <Card title={`Order Number: ${currentOrder._id}`}>
                <p>Customer: {currentOrder.customerId.name}</p>
                {currentOrder.trips.map((currentTrip) => {
                  return (
                    <div key={`${currentTrip._id}trips`}>
                      <Card
                        type="inner"
                        title="Trip Details"
                        extra={`Date of Purchase: ${currentOrder.dateCreated.substring(
                          0,
                          10
                        )}`}
                      >
                        <p>Trip's Quantity: {currentTrip.quantity}</p>
                        <p>Trip Price: ${currentTrip.unitPrice}</p>
                        <p>Total Price: ${currentOrder.orderTotal}</p>
                      </Card>
                    </div>
                  );
                })}
                <Button
                  type="primary"
                  onClick={() => deleteOrder(currentOrder._id)}
                >
                  Delete
                </Button>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
