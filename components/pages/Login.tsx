"use client";

import React from 'react';
import { Form, Input, Button, Card, Typography, Alert, FormInstance } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Define strict TypeScript types for our UI props
interface LoginUIProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  loading: boolean;
  errorMsg: string;
}

export default function Login({ form, onFinish, loading, errorMsg }: LoginUIProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <Title level={3} style={{ marginBottom: 4 }}>Sign In</Title>
          <Text type="secondary">Enter your username and password to log in</Text>
        </div>

        {errorMsg && (
          <Alert message={errorMsg} type="error" showIcon className="mb-4" />
        )}

        <Form
          form={form} 
          name="login_form"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />} 
              placeholder="Password" 
              size="large"
            />
          </Form.Item>

          <Form.Item className="mt-6 mb-0">
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}