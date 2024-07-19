"use client";
import React from "react";
import { useState } from "react";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<{
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({
    id: null,
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    useState(setFormData({ ...formData, [e.target.name]: e.target.value }));

  const validationForm = () => {
    setError({
      id: null,
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    });

    if (!formData.id) {
      setError({ ...error, id: "ID를 입력하세요." });
    }
    if (!formData.name) {
      setError({ ...error, name: "이름을 입력하세요." });
    }
    if (!formData.email) {
      setError({ ...error, email: "이메일을 입력하세요." });
    }
    if (!formData.password) {
      setError({ ...error, password: "비밀번호를 입력하세요." });
    }
    if (!formData.confirmPassword) {
      setError({ ...error, confirmPassword: "비밀번호 확인을 입력하세요." });
    }
    if (formData.password !== formData.confirmPassword) {
      setError({ ...error, confirmPassword: "비밀번호가 일치하지 않습니다." });
    }

    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationForm()) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input onChange={handleChange} id="id" value={formData.id} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input onChange={handleChange} id="name" value={formData.id} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input onChange={handleChange} id="email" value={formData.email} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          onChange={handleChange}
          id="password"
          value={formData.password}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input onChange={handleChange} id="confirmPassword">
          {error.confirmPassword && error.confirmPassword}
        </input>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
