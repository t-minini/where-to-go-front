import { api } from "../../../api/api";
import { useCart } from "react-use-cart";
import { useState, useEffect } from "react";
import TripDetails from "../TripDetails/TripDetails";
import style from "../TripsCards/TripsCards.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";

export function TripCard() {
  const { addItem } = useCart();
  const [clone, setClone] = useState([]);
  const [trips, setTrips] = useState([
    {
      tripImg: "",
      destination: "",
      description: "",
      price: "",
      category: "",
    },
  ]);

  useEffect(() => {
    async function fetchTrips() {
      const response = await api.get("/trip/all-trips");
      setTrips(response.data);
      setClone(response.data);
      console.log(response.data);
    }
    fetchTrips();
  }, []);

  let filteredCategory = [...clone];
  function handleCategory(category) {
    filteredCategory = filteredCategory.filter((currentCategory) => {
      return currentCategory.category === category;
    });
    setTrips(filteredCategory);
  }
  return (
    <section>
      <div className={style.categoriesDiv}>
        <span
          onClick={() => {
            setTrips(clone);
          }}
        >
          All Trips
        </span>
        <span
          onClick={() => {
            handleCategory("Adventure");
          }}
        >
          Adventure
        </span>
        <span
          onClick={() => {
            handleCategory("Romance");
          }}
        >
          Romance
        </span>
        <span
          onClick={() => {
            handleCategory("Culture");
          }}
        >
          Culture
        </span>
        <span
          onClick={() => {
            handleCategory("Nightlife");
          }}
        >
          Nightlife
        </span>
        <span
          onClick={() => {
            handleCategory("Relax");
          }}
        >
          Relax
        </span>
      </div>
      <div className={style.cardsDiv}>
        {trips.map((currentTrip) => {
          let item = {
            ...currentTrip,
            id: currentTrip._id,
            price: currentTrip.unitPrice,
          };

          return (
            <div className={style.card} key={currentTrip._id}>
              <img
                className={style.cardImg}
                src={currentTrip.tripImg}
                alt={currentTrip.destination}
              />
              <div className={style.infoCards}>
                <p>{currentTrip.destination}</p>
                <p>€{currentTrip.unitPrice}</p>
              </div>
              <div className={style.cardBtn}>
                <TripDetails trip={currentTrip} />
                <span onClick={() => addItem(item)}>
                  <ShoppingCartOutlined style={{ fontSize: 30 }} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
