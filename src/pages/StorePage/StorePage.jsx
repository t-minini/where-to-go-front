import { CartProvider } from "react-use-cart";
import style from "../StorePage/StorePage.module.css";
import { Cart } from "../../components/Store/Cart/Cart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { TripsCards } from "../../components/Store/TripsCards/TripsCards";

export function StorePage() {
  return (
    <section className={style.containerStore}>
      <CartProvider>
        <div className={style.cardsContainer}>
          <TripsCards />
        </div>
        <div className={style.cart}>
          <h1>
            Shopping Cart <ShoppingCartOutlined />
          </h1>
          <Cart />
        </div>
      </CartProvider>
    </section>
  );
}
