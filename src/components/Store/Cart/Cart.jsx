import React from "react";
import { Button } from "antd";
import { useCart } from "react-use-cart";
import style from "../Cart/Cart.module.css";
import { PaymentModal } from "../PaymentModal/index";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

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
        <p>Your Cart is Empty</p>
      </div>
    );
  return (
    <section className={style.cartContainer}>
      <table>
        <thead>
          <tr>
            <th>DESTINATION</th>
            <th className={style.thPrice}>PRICE </th>
            <th className={style.thQuant}>QUANT. </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td className={style.tdDestination}>{item.destination}</td>
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
            );
          })}
        </tbody>
        <tfoot>
          <tr className={style.totalTr}>
            <td>Total:</td>
            <td className={style.totals}>${cartTotal}</td>
            <td className={style.totals}>{totalItems}</td>
          </tr>
        </tfoot>
      </table>
      <div className={style.btnDiv}>
        <Button danger onClick={() => emptyCart()}>
          Clear Cart
        </Button>
        <PaymentModal />
      </div>
    </section>
  );
};
