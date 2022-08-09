import { useState } from "react";
import { ViewOrder } from "../../components/HomeAdmin/ViewOrder";
import { ViewTrip } from "../../components/HomeAdmin/ViewTrip";
import { ViewUser } from "../../components/HomeAdmin/ViewUser";
import { NavBar } from "../../components/HomePage/navBar";
import { Button } from "antd";
import { ContactUs } from "../../components/HomePage/contactUs";
import { CreateTrip } from "../../components/HomeAdmin/CreateTrip";
import { Col, Row } from "antd";
import "./style.css";


export function HomeAdmin() {
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
      <NavBar />
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
      <ContactUs />
    </>
  );
}
