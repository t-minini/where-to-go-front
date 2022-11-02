import { CartProvider } from "react-use-cart";
import style from "../StorePage/StorePage.module.css";
import { Cart } from "../../components/Store/Cart/Cart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { TripCard } from "../../components/Store/TripsCards/TripsCards";

export function StorePage() {
  return (
    <section className={style.containerStore}>
      <CartProvider>
        <div className={style.cardsContainer}>
          <TripCard />
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
