"use client";
import React, { useEffect, useState } from "react";

interface IUserInput {
  id: string;
  name: string;
  email?: string;
  password: string;
  confirmPassword: string;
}

interface IError {
  att: string;
  msg: string;
}

const SignupForm: React.FC = () => {
  const [userInput, setUserInput] = useState<IUserInput>({
    id: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [isActive, setIsActive] = useState(false);

  const validateAndSetError = () => {
    const { id, name, email, password, confirmPassword } = userInput;
    const emailCheck = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const pwCheck = new RegExp("/^[0-9a-zA-Z]+$/");
    let isOkay = true;

    if (id.length < 5 || id.length > 15) {
      setError({
        att: "id",
        msg: "ID는 5자 이상 15자 이하로 입력해주세요.",
      });
      isOkay = false;
    } else {
      deleteError("id");
    }
    if (name.length === 0) {
      setError({
        att: "name",
        msg: "이름을 입력해주세요.",
      });
      isOkay = false;
    } else {
      deleteError("name");
    }
    if (email && emailCheck.test(email) === false) {
      setError({
        att: "email",
        msg: "이메일 형식에 맞게 입력해주세요.",
      });
      isOkay = false;
    } else {
      deleteError("email");
    }
    if (
      password.length < 8 ||
      (password.length > 20 && pwCheck.test(password) === false)
    ) {
      setError({
        att: "password",
        msg: "비밀번호는 8자 이상 20자 이하의 숫자, 영어 대소문자로 입력해주세요.",
      });
      isOkay = false;
    } else {
      deleteError("password");
    }

    if (password !== confirmPassword) {
      setError({
        att: "confirmPassword",
        msg: "비밀번호가 일치하지 않습니다.",
      });
      isOkay = false;
    } else {
      deleteError("confirmPassword");
    }

    return isOkay;
  };

  const setError = (error: IError) => {
    console.log("setErr", error.att);
    const el = document.getElementById(error.att);
    if (el) {
      if (el.classList.contains(`err-${error.att}`)) return;
      el.classList.add(`err-${error.att}`);
      el.classList.add("border-red-600");
      const errEl = document.createElement("div");
      errEl.className = "text-red-600 text-sm";
      errEl.textContent = error.msg;
      el.parentElement?.appendChild(errEl);
    }
  };

  const deleteError = (att: string) => {
    console.log("delErr", att);
    const el = document.getElementById(att);
    if (el) {
      if (el.classList.contains(`err-${att}`)) {
        el.classList.remove(`err-${att}`);
        el.classList.remove("border-red-600");
        el.parentElement?.removeChild(el.parentElement.lastChild!);
      }
    }
  };

  const saveToLocalStorage = () => {
    const users = localStorage.getItem("users");
    if (users) {
      const usersArr = JSON.parse(users);
      usersArr.push(userInput);
      localStorage.setItem("users", JSON.stringify(usersArr));
      return;
    } else {
      localStorage.setItem("users", JSON.stringify([userInput]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive) {
      return;
    }
    if (validateAndSetError()) {
      saveToLocalStorage();
      alert("회원가입이 완료되었습니다.");
      window.location.reload();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUserInput = {
      ...userInput,
      [e.target.id]: e.target.value,
    };
    setUserInput(updatedUserInput);
  };

  useEffect(() => {
    const { email, ...others } = userInput;
    setIsActive(Object.values(others).every((val) => val.length > 0));
  }, [userInput]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center max-w-[800px] gap-6 p-10 border border-gray-300 rounded-lg"
    >
      <div className="flex flex-col justify-between items-start">
        <label htmlFor="id" className="font-semibold mb-2">
          ID<span className="text-red-600">*</span>
        </label>
        <input
          id="id"
          onChange={handleInput}
          className="border border-gray-300 rounded-lg p-2 w-96 focus:border-blue-600"
        />
      </div>
      <div className="flex flex-col justify-between items-start">
        <label htmlFor="name" className="font-semibold mb-2">
          Name<span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          onChange={handleInput}
          className="border border-gray-300 rounded-lg p-2 w-96 focus:border-blue-600"
        />
      </div>
      <div className="flex flex-col justify-between items-start">
        <label htmlFor="email" className="font-semibold mb-2">
          Email
        </label>
        <input
          id="email"
          onChange={handleInput}
          className="border border-gray-300 rounded-lg p-2 w-96 focus:border-blue-600"
        />
      </div>
      <div className="flex flex-col justify-between items-start">
        <label htmlFor="password" className="font-semibold mb-2">
          Password<span className="text-red-600">*</span>
        </label>
        <input
          id="password"
          type="password"
          onChange={handleInput}
          className="border border-gray-300 rounded-lg p-2 w-96 focus:border-blue-600"
        />
      </div>
      <div className="flex flex-col justify-between items-start">
        <label htmlFor="confirmPassword" className="font-semibold mb-2">
          Confirm Password<span className="text-red-600">*</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          onChange={handleInput}
          className="border border-gray-300 rounded-lg p-2 w-96 focus:border-blue-600"
        />
      </div>
      <button
        type="submit"
        className={`text-white font-bold px-5 py-3 rounded-xl ${
          isActive ? "bg-blue-600" : "bg-gray-300"
        } ${isActive ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
