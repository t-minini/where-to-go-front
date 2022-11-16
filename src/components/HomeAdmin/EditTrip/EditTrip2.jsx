import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../../api/api";
import { Form, Input, Button, Modal } from "antd";
import style from "./EditTrip.module.css";

// import { Button, Modal, Form, Input, Select } from "antd";

export function EditTripTwo(trip) {
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
    setConfirmLoading(true);
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

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    <>
      <Button type="primary" size="default" onClick={showModal}>
        Edit Trip
      </Button>
      <Modal
        title="Edit Trip"
        visible={visible}
        onOk={handleUpdate}
        confirmLoading={confirmLoading}
        onCancel={deleteTrip}
        okText="Save Changes"
        cancelText="Delete"
        // closable={true}
        bodyStyle={{ height: 410, paddingTop: 10 }}
        width={500}
      >
        <Form style={{ width: "450px" }}>
          <Form.Item label="Destination">
            <Input
              name="destination"
              placeholder="Destination"
              value={trip.destination}
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

            <Button onClick={handleUpdate}>Save Changes</Button>

            <Button onClick={deleteTrip}>Delete Trip</Button>
          </div>
        </Form>
      </Modal>

      {/* <div className={style.card}>
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

              <Button onClick={handleUpdate}>Save Changes</Button>

              <Button onClick={deleteTrip}>Delete Trip</Button>
            </div>
          </Form>
        </Card>
      </div> */}
    </>
  );
}
