import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { api } from "../../../api/api";

export function EditUser({ update, setUpdate }) {
  const [forms, setForms] = useState({
    name: "",
  });
  const [img, setImg] = useState("");

  function handleForms(e) {
    setForms({ ...forms, [e.target.name]: e.target.value });
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
    delete forms._id;
    const imgURL = await handleUpload();

    try {
      await api.patch(`/user/update-user`, { ...forms, proImg: imgURL });
      setUpdate(!update);
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
    <>
      <Button shape="round" size="default" onClick={showModal}>
        Edit Details
      </Button>
      <Modal
        title="EDIT DETAILS"
        visible={visible}
        onOk={handleOk}
        closable={false}
        okText={"Save Changes"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          {
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{
                layout: formLayout,
              }}
              onValuesChange={onFormLayoutChange}
            >
              <Form.Item label="User">
                <Input
                  type="text"
                  name="name"
                  value={forms.name}
                  onChange={handleForms}
                  placeholder="type your name"
                />
              </Form.Item>
              <Form.Item label="Profile Picture" htmlFor="formImg">
                <Input
                  style={{ height: 35 }}
                  type="file"
                  id="formImg"
                  onChange={handleImage}
                />
              </Form.Item>
            </Form>
          }
        </div>
      </Modal>
    </>
  );
}
