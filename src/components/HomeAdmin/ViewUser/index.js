import { useState, useEffect } from "react";
import { api } from "../../../api/api";
import { Button, Space, Table } from "antd";

export function ViewUser() {
  const [users, setUsers] = useState([
    {
      name: "",
      surname: "",
    },
  ]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get("/user/all-users");
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  async function deleteUser(id) {
    await api.delete(`/user/delete-user/${id}`);
    window.location.reload();
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => deleteUser(record._id)}>
            Delete
          </Button>{" "}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey={(record) => {
          return `${record._id}users`;
        }}
        columns={columns}
        dataSource={users}
      />
    </>
  );
}
