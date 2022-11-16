/* eslint-disable no-unused-vars */
import { useState } from "react";
import { api } from "../../../api/api";
import style from "./AddNewTrip.module.css";
import { Button, Modal, Form, Input, Select } from "antd";

export function AddNewTrip() {
  const [form, setForm] = useState({
    destination: "",
    category: "Adventure",
    inStock: "",
    description: "",
    unitPrice: "",
    tripImg: "",
  });

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

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

  const handleOk = async (e) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);

    e.preventDefault();
    delete form._id;
    const imgURL = await handleUpload();

    try {
      await api.post("/trip/add-trip", { ...form, tripImg: imgURL });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setForm({
      destination: "",
      category: "",
      inStock: "",
      description: "",
      unitPrice: "",
      tripImg: "",
    });
  };

  const [componentSize, setComponentSize] = useState("default");

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <>
      <Button type="primary" size="default" onClick={showModal}>
        Add New Trip
      </Button>
      <Modal
        title="Add New Trip"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Add Trip"
        closable={false}
        bodyStyle={{ height: 410, paddingTop: 10 }}
        width={500}
      >
        <Form
          onSubmit={handleOk}
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
        >
          <Form.Item label="Destination" style={{ marginBottom: 5 }}>
            <Input
              name="destination"
              placeholder="Destination"
              value={form.destination}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            style={{ marginBottom: 5 }}
            onChange={handleChange}
          >
            <Select
              id="selectCategory"
              name="category"
              type="text"
              placeholder="Category"
              value={form.category}
            >
              <Select.Option value="Adventure">Adventure</Select.Option>
              <Select.Option value="Relax">Relax</Select.Option>
              <Select.Option value="Nightlife">Nightlife</Select.Option>
              <Select.Option value="Culture">Culture</Select.Option>
              <Select.Option value="Romance">Romance</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Description" style={{ marginBottom: 5 }}>
            <Input.TextArea
              showCount
              maxLength={300}
              autoSize={{ minRows: 3 }}
              name="description"
              label="Description"
              style={{ marginBottom: 5 }}
              value={form.description}
              onChange={handleChange}
            />
          </Form.Item>
          <div className={style.priceStock}>
            <Form.Item label="In Stock" style={{ marginBottom: 5 }}>
              <Input
                name="inStock"
                placeholder="In Stock"
                value={form.inStock}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Unit Price" style={{ marginBottom: 5 }}>
              <Input
                name="unitPrice"
                placeholder="Price"
                value={form.unitPrice}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Upload Image"
            htmlFor="formImg"
            style={{ marginBottom: 5 }}
          >
            <Input type="file" id="formImg" onChange={handleImage} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}