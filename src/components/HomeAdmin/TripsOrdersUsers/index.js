import { useState } from "react";
import { ViewOrder } from "../ViewOrder";
import { ViewTrip } from "../ViewTrip";
import { ViewUser } from "../ViewUser";
import { Button } from "antd";
import { CreateTrip } from "../CreateTrip";
import { Col, Row } from "antd";
import "./style.css";


export function TripsOrdersUsers() {
  const [showTrips, setShowTrips] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  function handleTrip() {
    setShowTrips(true);
    setShowOrders(false);
    setShowUsers(false);
  }
  function handleOrders() {
    setShowTrips(false);
    setShowOrders(true);
    setShowUsers(false);
  }
  function handleUsers() {
    setShowTrips(false);
    setShowOrders(false);
    setShowUsers(true);
  }

  return (
    <>
      <div className="adminDivs">
        <Row justify="start">
          <Col>
            <Button onClick={handleTrip}>
              Trips
            </Button>
          </Col>
          <Col>
            <Button onClick={handleOrders}>
              Orders
            </Button>
          </Col>
          <Col>
            <Button onClick={handleUsers}>
              Users
            </Button>
          </Col>
          <Col span={100}>{showTrips && <CreateTrip />}</Col>
        </Row>
        {showTrips && <ViewTrip />}
        {showOrders && <ViewOrder />}
        {showUsers && <ViewUser />}
      </div>
    </>
  );
}
