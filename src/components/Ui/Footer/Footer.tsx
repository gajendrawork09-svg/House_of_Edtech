"use client";

import React from "react";
import { GithubOutlined, HeartFilled } from "@ant-design/icons";
import { Typography } from "antd";

const { Text, Link } = Typography;

const Footer = () => {
  return (
    <footer className="border-t bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-sm text-gray-500 md:flex-row">
        <Text type="secondary">
          Built with <HeartFilled className="mx-1 text-red-500" /> by{" "}
          <strong>Gajendra....</strong>
        </Text>

        <Link
          href="https://github.com/gajendrawork09-svg/house_of_edtech_socket"
          target="_blank"
          className="flex items-center gap-2"
        >
          <GithubOutlined />
          GitHub Repository
        </Link>
      </div>
    </footer>
  );
};

export default Footer;