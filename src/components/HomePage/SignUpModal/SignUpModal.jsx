import { api } from "../../../api/api";
import React, { useState } from "react";
import style from "./SignUpModal.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, DatePicker, Form, Input, Checkbox } from "antd";

export const SignUpModal = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [componentSize, setComponentSize] = useState("default"); // SIGN UP ANTD
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const showModal = () => {
    setVisible(true);
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleSubmit = async (e) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    e.preventDefault();
    try {
      if (
        form.email !== form.confirmEmail ||
        form.password !== form.confirmPassword
      ) {
        return;
      }
      const imgURL = await handleUpload();

      await api.post("/user/sign-up", { ...form, proImg: imgURL });
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setForm({
      name: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    });
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [img, setImg] = useState("");

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

  return (
    <section>
      {location.pathname === "/" && (
        <span onClick={showModal} className={style.signUpBtn}>
          Sign up here!
        </span>
      )}
      <Modal
        title="SIGN UP FORM"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Submit"
        bodyStyle={{ height: 570, paddingTop: 10 }}
        okType="default"
        width={400}
      >
        <Form
          onSubmit={handleSubmit}
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            label="What should we call you?"
            htmlFor="formName"
            style={{ marginBottom: 10 }}
          >
            <Input
              id="formName"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="What is your email?"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              id="formEmail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="confirmEmail"
            label="Confirm your email"
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
              ({ getFieldValue }) => ({
                validator(_, valueEmail) {
                  if (!valueEmail || getFieldValue("email") === valueEmail) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The two emails that you entered do not match!")
                  );
                },
              }),
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              id="formConfirmEmail"
              name="confirmEmail"
              type="email"
              value={form.confirmEmail}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Create a password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              id="formPassword"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              id="formConfirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Profile Picture"
            htmlFor="formImg"
            style={{ marginBottom: 10 }}
          >
            <Input
              style={{ height: 38 }}
              type="file"
              id="formImg"
              onChange={handleImage}
            />
          </Form.Item>
          <Form.Item
            label="What's your date of birth?"
            style={{ marginBottom: 20 }}
          >
            <DatePicker />
          </Form.Item>
          <Checkbox>Sign up for our newsletter</Checkbox>
        </Form>
      </Modal>
    </section>
  );
};
