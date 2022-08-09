import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../../api/api";
import { Form, Card, Input, Button } from "antd";
import style from "./style.module.css";

import { NavBar } from "../../../components/HomePage/navBar";

export function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    category: "",
    inStock: "",
    description: "",
    unitPrice: "",
    tripImg: "",
  });

  const [img, setImg] = useState("");

  useEffect(() => {
    async function fetchId() {
      const response = await api.get(`/trip/one-trip/${id}`);
      setForm(response.data);
    }
    fetchId();
  }, [id]);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    delete form._id;
    try {
      const imgURL = await handleUpload();

      await api.patch(`/trip/edit-trip/${id}`, { ...form, tripImg: imgURL });
    } catch (err) {
      console.log(err);
    }
    navigate("/admin");
  }
  async function deleteTrip() {
    await api.delete(`/trip/delete-trip/${id}`);
    navigate("/admin");
  }

  return (
    <>
      <NavBar />
      {/* <Card style={{ borderRadius: 50, width: "600px" }} > */}
      <div className={style.card}>
        <Card style={{ width: "550px" }}>
          <Form style={{ width: "500px" }}>
            <Form.Item label="Destination">
              <Input
                name="destination"
                placeholder="Destination"
                value={form.destination}
                onChange={handleForm}
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleForm}
              />
            </Form.Item>
            <Form.Item label="In Stock">
              <Input
                name="inStock"
                placeholder="In Stock"
                value={form.inStock}
                onChange={handleForm}
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                name="unitPrice"
                placeholder="Price"
                value={form.unitPrice}
                onChange={handleForm}
              />
            </Form.Item>
            <Form.Item label="Category">
              <select
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleForm}
              >
                <option value="Adventure">Adventure</option>
                <option value="Relax">Relax</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Culture">Culture</option>
                <option value="Romance">Romance</option>
              </select>
            </Form.Item>
            <Form.Item label="Trip Pic Here" htmlFor="formImg">
              <Input type="file" id="formImg" onChange={handleImage} />
            </Form.Item>
            <div className={style.btns}>
              <Link to="/admin">
                <Button>Back</Button>
              </Link>

              <Button onClick={handleUpdate}>Add Changes</Button>

              <Button onClick={deleteTrip}>Delete Trip</Button>
            </div>
          </Form>
        </Card>
      </div>

      {/* <Divider></Divider> */}
      {/* </Card> */}
      {/* <Card style={{ borderRadius: 50, width: "300px" }}>
        <img
          src={form.tripImg}
          alt={form.destination}
          style={{ width: "250px", height: "250px" }}
        />
        <p>Destination: {form.destination}</p>
        <p>Description: {form.description}</p>
        <p>Category: {form.category}</p>
        <p>In Stock: {form.inStock}</p>
        <p>Unit Price: {form.unitPrice}</p>
      </Card> */}
    </>
  );
}
