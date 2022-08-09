import React, { useState } from "react";
import { api } from "../../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, DatePicker, Form, Input, Checkbox } from "antd";
import style from "./style.module.css";

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

  const handleOk = async (e) => {
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
    <div>
      {location.pathname === "/" && (
        <p
          type="primary"
          onClick={showModal}
          className={`${style.text} ${style.textSignUp}`}
          href
        >
          Sign Up
        </p>
      )}
      <Modal
        title="SIGN UP FORM"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Submit"
        bodyStyle={{ height: 650, paddingTop: 10 }}
      >
        <Form
          onSubmit={handleOk}
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 28,
          }}
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item label="What should we call you?" htmlFor="formName">
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
          >
            <Input.Password
              id="formConfirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Profile Picture" htmlFor="formImg">
            <Input
              style={{ height: 38 }}
              type="file"
              id="formImg"
              onChange={handleImage}
            />
          </Form.Item>
          <Form.Item label="What's your date of birth?">
            <DatePicker />
          </Form.Item>
          <Checkbox>Sign up for our newsletter</Checkbox>
        </Form>
      </Modal>
    </div>
  );
};
