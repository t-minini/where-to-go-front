import { api } from "../../../api/api";
import style from "./LoginModal.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Modal, Checkbox, Form, Input } from "antd";
import { AuthContext } from "../../../contexts/authContext";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export const LoginModal = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (e) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    e.preventDefault();
    try {
      const response = await api.post("/user/log-in", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      if (response.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <p type="primary" onClick={showModal} className={style.logInText}>
        Log In
      </p>
      <Modal
        title="LOG IN"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        closable={false}
        okText="Log In"
        okType="default"
        bodyStyle={{ height: 240, paddingTop: 10 }}
        width={400}
      >
        <div>
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            onSubmit={handleOk}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your e-mail!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="E-mail"
                id="formEmail"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                id="formPassword"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="forgot">
                Forgot password
              </a>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
