"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Modal,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  MoreOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { shareDocument } from "@/src/lib/api/document_share";
import { searchUsers } from "@/src/lib/api/user.api";

const { Text } = Typography;

interface EditorHeaderProps {
  documentId: string;
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
}

const menuItems = [
  {
    key: "1",
    label: "Rename Document",
  },
  {
    key: "2",
    label: "Delete",
    danger: true,
  },
];
interface UserOption {
  id: string;
  username: string;
  email: string;
  image?: string | null;
}
const EditorHeader = ({
  documentId,
  title,
  onTitleChange,
  onSave,
}: EditorHeaderProps) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [users, setUsers] = useState<UserOption[]>([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [permission, setPermission] = useState<"VIEW" | "EDIT">("VIEW");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!searchValue.trim()) {
        setUsers([]);
        return;
      }
      try {
        const response = await searchUsers(searchValue);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchValue]);
  const handleShare = async () => {
    try {
      setLoading(true);

      await shareDocument(documentId, { email: selectedEmail, permission, });

      message.success("Document shared successfully.");

      setPermission("VIEW");
      setIsShareOpen(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-4">
          <Button type="text" icon={<ArrowLeftOutlined />}>
            Dashboard
          </Button>

          <div>
            <Input
              variant="borderless"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-xl font-semibold"
            />

            <div className="flex items-center gap-4">
              <Button size="small" type="primary" onClick={onSave}>
                Save
              </Button>

              <Text type="secondary">Last edited 2 minutes ago</Text>
            </div>
          </div>
        </div>

        <Space size="middle">
          <Badge status="success" text="Synced" />

          <Avatar
            icon={<UserOutlined />}
            style={{
              background: "#1677ff",
            }}
          />

          <Button
            type="primary"
            icon={<ShareAltOutlined />}
            onClick={() => setIsShareOpen(true)}
          >
            Share
          </Button>

          <Dropdown menu={{ items: menuItems }}>
            <Button shape="circle" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      </header>

      <Modal
        title="Share Document"
        open={isShareOpen}
        onCancel={() => setIsShareOpen(false)}
        onOk={handleShare}
        confirmLoading={loading}
        okText="Share"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            showSearch
            placeholder="Search user by name or email"
            value={selectedEmail || undefined}
            filterOption={false}
            onSearch={setSearchValue}
            onChange={setSelectedEmail}
            style={{ width: "100%" }}
            options={users.map((user) => ({
              value: user.email,
              label: (
                <div className="flex flex-col">
                  {" "}
                  <span className="font-medium">{user.username}</span>{" "}
                  <span className="text-xs text-gray-500">
                    {" "}
                    {user.email}{" "}
                  </span>{" "}
                </div>
              ),
            }))}
          />

          <Select
            value={permission}
            onChange={(value) => setPermission(value)}
            options={[
              {
                label: "View",
                value: "VIEW",
              },
              {
                label: "Edit",
                value: "EDIT",
              },
            ]}
          />
        </Space>
      </Modal>
    </>
  );
};

export default EditorHeader;
