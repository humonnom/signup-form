"use client";

import React, { useState } from "react";

const SignupForm = () => {
  const [form, setForm] = useState({
    id: "",
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [idError, setIdError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;

    if (!form.id) {
      setIdError("값을 입력해주세요.");
      isValid = false;
    } else if (form.id.length < 5) {
      setIdError("최소 5자 이상 입력해주세요.");
      isValid = false;
    } else if (form.id.length > 15) {
      setIdError("최대 15자 이하로 입력해주세요.");
      isValid = false;
    } else {
      setIdError("");
    }

    if (!form.fullname) {
      setFullnameError("값을 입력해주세요.");
      isValid = false;
    } else {
      setFullnameError("");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setEmailError("이메일 형식에 맞게 입력해주세요.");
      isValid = false;
    } else {
      setEmailError(""); // Clear error message
    }

    const passwordRegex = /^[A-Za-z0-9]+$/;
    if (!form.password) {
      setPasswordError("값을 입력해주세요.");
      isValid = false;
    } else if (!passwordRegex.test(form.password)) {
      setPasswordError("영문과 숫자만 입력해주세요.");
      isValid = false;
    } else if (form.password.length < 8) {
      setPasswordError("최소 8자 이상 입력해주세요.");
      isValid = false;
    } else if (form.password.length > 20) {
      setPasswordError("최대 20자 이하로 입력해주세요.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!form.confirm_password) {
      setConfirmPasswordError("값을 입력해주세요.");
      isValid = false;
    } else if (form.confirm_password !== form.password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(form);
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-grey-lighter">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="id"
              placeholder="ID"
              value={form.id}
              onChange={handleChange}
            />
            {idError && <div className="text-red-500">{idError}</div>}

            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="fullname"
              placeholder="Full Name"
              value={form.fullname}
              onChange={handleChange}
            />
            {fullnameError && (
              <div className="text-red-500">{fullnameError}</div>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {emailError && <div className="text-red-500">{emailError}</div>}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {passwordError && (
              <div className="text-red-500">{passwordError}</div>
            )}

            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="confirm_password"
              placeholder="Confirm Password"
              value={form.confirm_password}
              onChange={handleChange}
            />
            {confirmPasswordError && (
              <div className="text-red-500">{confirmPasswordError}</div>
            )}
            <label htmlFor="submit"></label>
            <button
              type="submit"
              className="w-full py-3 my-1 text-center text-white bg-green-500 rounded hover:bg-green-800 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
