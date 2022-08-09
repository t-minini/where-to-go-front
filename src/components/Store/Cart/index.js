import React from "react";
import { useCart } from "react-use-cart";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { PaymentModal } from "../PaymentModal/index";
import style from "../Cart/style.module.css";

export const Cart = () => {
  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  if (isEmpty)
    return (
      <div className={style.emptyCart}>
        <h3>Your Cart is Empty</h3>
      </div>
    );
  return (
    <>
      <section>
        <div>
          <div>
            <table>
              <tr className={style.tableTr}>
                <th className={style.thDest}>Destination </th>
                <th className={style.thPrice}>Price </th>
                <th className={style.thQuant}>Quantity </th>
              </tr>
              <tbody>
                {items.map((item, index) => {
                  return (
                    <>
                      <tr key={index} className={style.tableTd}>
                        <td className={style.tdDestination}>
                          {item.destination}
                        </td>
                        <td className={style.tdPrice}>${item.price}</td>
                        <td className={style.tdQuantity}>{item.quantity}</td>
                        <td>
                          <div className={style.btns}>
                            <span
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            >
                              {<MinusCircleOutlined />}
                            </span>
                            <span
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                            >
                              {<PlusCircleOutlined />}
                            </span>
                            <span onClick={() => removeItem(item.id)}>
                              {<DeleteOutlined />}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div >
            <div className={style.totals}>
              <h3>Total of items:</h3>
              <h3>{totalItems}</h3>
            </div>
            <div className={style.totals}>
              <h3>Total Price:</h3>
              <h3>${cartTotal}</h3>
            </div>
          </div>
          <div className={style.btnDiv}>
            <Button danger onClick={() => emptyCart()}>
              Clear Cart
            </Button>
            <PaymentModal />
          </div>
        </div>
      </section>
    </>
  );
};
