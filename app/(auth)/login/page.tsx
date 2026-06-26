"use client";

import React, { useState } from "react";
import { Form, message } from "antd";
import Login from "@/components/pages/Login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};
export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorMsg("");

    try {
      message.loading({
        content: "Signing in...",
        key: "login",
      });

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMsg("Invalid email or password.");

        message.error({
          content: "Login failed",
          key: "login",
        });

        return;
      }

      message.success({
        content: "Login successful!",
        key: "login",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      message.error({
        content: "Something went wrong",
        key: "login",
      });
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
