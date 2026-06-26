"use client";

import React from "react";
import {
  Card,
  Typography,
  Tag,
  Button,
  Divider,
  Space,
} from "antd";
import {
  HistoryOutlined,
  RollbackOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const versions = [
  {
    id: 5,
    date: "Today",
    time: "11:45 AM",
    current: true,
  },
  {
    id: 4,
    date: "Today",
    time: "10:30 AM",
  },
  {
    id: 3,
    date: "Yesterday",
    time: "6:15 PM",
  },
  {
    id: 2,
    date: "Yesterday",
    time: "11:00 AM",
  },
  {
    id: 1,
    date: "2 Days Ago",
    time: "8:40 PM",
  },
];

const VersionHistoryDrawer = () => {
  return (
    <aside className="w-80 border-l bg-white h-[calc(100vh-120px)] sticky top-[120px] overflow-y-auto">
      <div className="p-5">

        <div className="flex items-center gap-2 mb-6">
          <HistoryOutlined className="text-lg text-blue-600" />
          <Title level={4} style={{ margin: 0 }}>
            Version History
          </Title>
        </div>

        <Space direction="vertical" size="middle" className="w-full">
          {versions.map((version) => (
            <Card
              key={version.id}
              hoverable
              size="small"
              className="transition-all"
            >
              <div className="flex justify-between items-center">

                <div>
                  <Text strong>
                    Version {version.id}
                  </Text>

                  <br />

                  <Text type="secondary">
                    {version.date}
                  </Text>

                  <br />

                  <Text type="secondary">
                    {version.time}
                  </Text>
                </div>

                {version.current && (
                  <Tag color="green">
                    Current
                  </Tag>
                )}
              </div>

              <Divider />

              <div className="flex gap-2">

                <Button
                  size="small"
                  icon={<EyeOutlined />}
                >
                  Preview
                </Button>

                <Button
                  type="primary"
                  size="small"
                  icon={<RollbackOutlined />}
                >
                  Restore
                </Button>

              </div>
            </Card>
          ))}
        </Space>

      </div>
    </aside>
  );
};

export default VersionHistoryDrawer;