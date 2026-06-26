"use client";

import React, { useState } from 'react';
import { Form, message } from 'antd';
import Login from '@/components/pages/Login';


export default function LoginPage() {
  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (values: any) => {
    setLoading(true);
    setErrorMsg('');
    
    try {
      console.log('Sending API Request with:', values);
      message.loading({ content: 'Signing in...', key: 'login' });
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success({ content: 'Login successful!', key: 'login', duration: 2 });
      
      // Example: Resetting form fields on success if needed
      // form.resetFields();
      
    } catch (err) {
      message.error({ content: 'Login failed. Please try again.', key: 'login', duration: 2 });
      setErrorMsg('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Login
      form={form}
      onFinish={handleLoginSubmit}
      loading={loading}
      errorMsg={errorMsg}
    />
  );
}