import { Card, Button } from "antd";
import { api } from "../../../api/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../ViewTrip/ViewTrip.module.css";

// import { EditTripTwo } from "../EditTrip/EditTrip2";

export function ViewTrip() {
  const [trips, setTrips] = useState([
    {
      destination: "",
      category: "",
      description: "",
      inStock: "",
      unitPrice: "",
      tripImg: "",
    },
  ]);
  const { Meta } = Card;

  useEffect(() => {
    async function fetchTrips() {
      const response = await api.get("/trip/all-trips");
      setTrips(response.data);
    }
    fetchTrips();
  }, []);
  return (
    <section className={style.divTrips}>
      {trips.map((currentTrip) => {
        return (
          <div key={`${currentTrip._id}trips`}>
            <Card
              style={{
                width: 260,
                height: "max-content",
              }}
              cover={
                <img
                  style={{ height: 150 }}
                  src={currentTrip.tripImg}
                  alt={currentTrip.destination}
                />
              }
            >
              <Meta
                title={currentTrip.destination}
                // description={currentTrip.description}
                style={{ margin: "auto", marginBottom: "10px" }}
              />
              <Link to={`/admin/trip/${currentTrip._id}`}>
                <Button>Edit Trip</Button>
              </Link>
              {/* <EditTripTwo trip={currentTrip._id}/> */}
            </Card>
          </div>
        );
      })}
    </section>
  );
}
