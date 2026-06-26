"use client";

import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Space,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  CloudSyncOutlined,
  UserOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const menuItems = [
  {
    key: "1",
    label: "Rename Document",
  },
  {
    key: "2",
    label: "Share",
  },
  {
    key: "3",
    label: "Delete",
    danger: true,
  },
];

const EditorHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="flex items-center"
        >
          Dashboard
        </Button>

        <div>
          <Title level={4} style={{ margin: 0 }}>
            Project Requirements
          </Title>

          <Text type="secondary">
            Last edited 2 minutes ago
          </Text>
        </div>
      </div>

      {/* Right Section */}
      <Space size="large">
        {/* Sync Status */}
        <Badge status="success" text="Synced" />

        {/* Avatar */}
        <Avatar
          size={38}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1677ff" }}
        />

        {/* Menu */}
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button
            shape="circle"
            icon={<MoreOutlined />}
          />
        </Dropdown>
      </Space>
    </header>
  );
};

export default EditorHeader;