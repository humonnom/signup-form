"use client";
import React, { useRef, useState } from "react";

const SignupForm: React.FC = () => {
  const initialValue = {
    id: "",
    name: "",
    email: "",
    pwd: "",
    pwdConfirm: "",
  };
  const [errorMessage, setErrorMessage] = useState<{
    [key: string]: string | undefined;
  }>(initialValue);
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const pwdConfirmRef = useRef<HTMLInputElement>(null);

  const transInputValueToErrorMsg = (
    key: string,
    value: string,
    validate?: {
      required?: boolean;
      min?: number;
      max?: number;
    }
  ) => {
    let errorMsg = value;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    let pwdRegex = /^[A-Za-z0-9]*$/;

    if (validate?.required && value === "") {
      return (errorMsg = "값을 입력해주세요");
    } else if (value.length < validate?.min!) {
      return (errorMsg = `최소 ${validate?.min}자 이상 입력해주세요.`);
    } else if (value.length > validate?.max!) {
      return (errorMsg = `최대 ${validate?.max}자 이하로 입력해주세요`);
    } else if (key === "email" && !emailRegex.test(value)) {
      return (errorMsg = "이메일 형식에 맞게 입력해주세요.");
    } else if (key === "confirmPassword" && key !== pwdRef.current?.value) {
      return (errorMsg = "비밀번호가 일치하지 않습니다.");
    } else if (key === "password" && !pwdRegex.test(value)) {
      return (errorMsg = "영문과 숫자만 입력해주세요.");
    }

    return errorMsg ? errorMsg : "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage({
      id: transInputValueToErrorMsg("id", idRef.current?.value!),
      email: transInputValueToErrorMsg("email", emailRef.current?.value!),
      name: transInputValueToErrorMsg("name", nameRef.current?.value!),
      pwd: transInputValueToErrorMsg("password", pwdRef.current?.value!),
      pwdConfirm: transInputValueToErrorMsg(
        "confirmPassword",
        pwdConfirmRef.current?.value!
      ),
    });

    console.log("id: " + idRef.current?.value);
    console.log("name: " + emailRef.current?.value);
    console.log("email: " + pwdRef.current?.value);
    console.log("pwd: " + nameRef.current?.value);
    console.log("pwdConfirm: " + pwdRef.current?.value);
  };
  const showErrorMessage = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <label htmlFor="id">ID:</label>
        <input id="id" type="text" ref={idRef} />
        <p className="text-red-500">{errorMessage?.id}</p>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" ref={nameRef} />
        <p className="text-red-500">{errorMessage?.name}</p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" ref={emailRef} />
        <p className="text-red-500">{errorMessage?.email}</p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref={pwdRef} />
        <p className="text-red-500">{errorMessage?.pwd}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" ref={pwdConfirmRef} />
        <p className="text-red-500">{errorMessage?.pwdConfirm}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
