import { useState } from "react";
import { api } from "../../../api/api";
import { Form, Input, Button, Modal } from "antd";

export function CreateTrip() {
  const [forma, setForma] = useState({
    destination: "",
    category: "Adventure",
    inStock: "",
    description: "",
    unitPrice: "",
    tripImg: "",
  });

  const [img, setImg] = useState("");

  function handleForma(e) {
    setForma({ ...forma, [e.target.name]: e.target.value });
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
    delete forma._id;
    const imgURL = await handleUpload();

    try {
      await api.post(`/trip/add-trip`, { ...forma, tripImg: imgURL });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;

  return (
    <div>
      <Button type="primary" size="default" onClick={showModal}>
        Create Trip
      </Button>
      <Modal
        title="CREATE TRIP"
        visible={visible}
        onOk={handleOk}
        closable={false}
        okText={"Save Changes"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={400}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Destination">
            <Input
              name="destination"
              placeholder="Destination"
              value={forma.destination}
              onChange={handleForma}
            />{" "}
          </Form.Item>

          <Form.Item label="Category">
            <select
              name="category"
              placeholder="Category"
              value={forma.category}
              onChange={handleForma}
            >
              <option value="Adventure">Adventure</option>
              <option value="Relax">Relax</option>
              <option value="Nightlife">Nightlife</option>
              <option value="Culture">Culture</option>
              <option value="Romance">Romance</option>
            </select>
          </Form.Item>
          <Form.Item label="Description">
            <Input
              name="description"
              placeholder="Description"
              value={forma.description}
              onChange={handleForma}
            />
          </Form.Item>
          <Form.Item label="In Stock">
            <Input
              name="inStock"
              placeholder="In Stock"
              value={forma.inStock}
              onChange={handleForma}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              name="unitPrice"
              placeholder="Price"
              value={forma.unitPrice}
              onChange={handleForma}
            />
          </Form.Item>
                    <Form.Item label="Trip Pic Here" htmlFor="formImg">
            <Input type="file" id="formImg" onChange={handleImage} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
