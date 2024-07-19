"use client";
import React, { ChangeEvent, useState } from "react";

type UseInputReturnType = [string, (e: ChangeEvent<HTMLInputElement>) => void];

function useInput(initialValue: string): UseInputReturnType {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return [inputValue, handleChange];
}

const emailReg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const pwReg = new RegExp("^[a-zA-Z0-9]{8,20}$");

const SignupForm: React.FC = () => {
  const [idValue, idValueHandler] = useInput("");
  const [nameValue, nameValueHandler] = useInput("");
  const [emailValue, emailValueHandler] = useInput("");
  const [pwValue, pwValueHandler] = useInput("");
  const [pwCheckValue, pwCheckValueHandler] = useInput("");

  const [idValidateText, setIdValidateText] = useState("");
  const [idValidate, setIdValidate] = useState(false);
  const [nameValidateText, setNameValidateText] = useState("");
  const [nameValidate, setNameValidate] = useState(false);
  const [emailValidateText, setEmailValidateText] = useState("");
  const [emailValidate, setEmailValidate] = useState(true);
  const [pwValidateText, setPwValidateText] = useState("");
  const [pwValidate, setPwValidate] = useState(false);
  const [pwCheckValidateText, setPwCheckValidateText] = useState("");
  const [pwCheckValidate, setPwCheckValidate] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //id 체크
    if (idValue.length < 5) {
      if (idValue.length === 0) {
        setIdValidateText("값을 입력해주세요.");
        setIdValidate(false);
      } else {
        setIdValidateText("최소 5자 이상 입력해주세요.");
        setIdValidate(false);
      }
    } else if (idValue.length > 15) {
      setIdValidateText("최대 15자 이하로 입력해주세요.");
      setIdValidate(false);
    } else {
      setIdValidateText("");
      setIdValidate(true);
    }

    //name 체크
    if (nameValue.length === 0) {
      setNameValidateText("값을 입력해주세요.");
      setNameValidate(false);
    } else {
      setNameValidateText("");
      setNameValidate(true);
    }

    //email 체크
    if (emailValue.length > 0 && !emailReg.test(emailValue)) {
      setEmailValidateText("이메일 형식에 맞게 입력해주세요.");
      setEmailValidate(false);
    } else {
      setEmailValidateText("");
      setEmailValidate(true);
    }

    //비밀번호 체크
    if (pwValue.length > 0 && !pwReg.test(pwValue)) {
      if (pwValue.length < 8) {
        setPwValidateText("최소 8자 이상 입력해주세요.");
        setPwValidate(false);
      } else if (pwValue.length > 20) {
        setPwValidateText("최대 20자 이하로 입력해주세요.");
        setPwValidate(false);
      } else {
        setPwValidateText("영문과 숫자만 입력해주세요.");
        setPwValidate(false);
      }
    } else if (pwValue.length === 0) {
      setPwValidateText("값을 입력해주세요.");
      setPwValidate(false);
    } else {
      setPwValidateText("");
      setPwValidate(true);
    }

    //비밀번호 확인 체크
    if (pwCheckValue.length > 0 && pwCheckValue !== pwValue) {
      setPwCheckValidateText("비밀번호가 일치하지 않습니다.");
      setPwCheckValidate(false);
    } else if (pwCheckValue.length === 0) {
      setPwCheckValidateText("값을 입력해주세요.");
      setPwCheckValidate(false);
    } else {
      setPwCheckValidateText("");
      setPwCheckValidate(true);
    }

    //로컬 스토리지에 저장
    if (
      idValidate &&
      nameValidate &&
      emailValidate &&
      pwValidate &&
      pwCheckValidate
    ) {
      const userData = {
        id: idValue,
        name: nameValue,
        email: emailValue,
        password: pwValue,
      };
      let user_arr = [];
      const existingUsers = localStorage.getItem("users");
      if (existingUsers) {
        user_arr = JSON.parse(existingUsers);
      }

      user_arr.push(userData);

      localStorage.setItem("users", JSON.stringify(user_arr));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 mx-auto w-[60%] mt-32"
    >
      <div className="flex items-center justify-between w-full">
        <label htmlFor="id">ID:</label>
        <input
          id="id"
          value={idValue}
          onChange={idValueHandler}
          placeholder="아이디를 입력해주세요"
          className="block w-64 h-8 ml-4 border-2 border-gray-400 rounded-[15px] indent-2"
        />
      </div>
      {idValidateText && <div>{idValidateText}</div>}
      <div className="flex items-center justify-between w-full">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={nameValue}
          onChange={nameValueHandler}
          placeholder="이름을 입력해주세요"
          className="block w-64 h-8 ml-4 border-2 border-gray-400 rounded-[15px] indent-2"
        />
      </div>
      {nameValidateText && <div>{nameValidateText}</div>}
      <div className="flex items-center justify-between w-full">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          value={emailValue}
          onChange={emailValueHandler}
          placeholder="이메일을 입력해주세요"
          className="block w-64 h-8 ml-4 border-2 border-gray-400 rounded-[15px] indent-2"
        />
      </div>
      {emailValidateText && <div>{emailValidateText}</div>}
      <div className="flex items-center justify-between w-full">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          value={pwValue}
          onChange={pwValueHandler}
          placeholder="비밀번호를 입력해주세요"
          className="block w-64 h-8 ml-4 border-2 border-gray-400 rounded-[15px] indent-2"
        />
      </div>
      {pwValidateText && <div>{pwValidateText}</div>}
      <div className="flex items-center justify-between w-full">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          value={pwCheckValue}
          onChange={pwCheckValueHandler}
          placeholder="한번 더 입력해주세요"
          className="block w-64 h-8 ml-4 border-2 border-gray-400 rounded-[15px] indent-2"
        />
      </div>
      {pwCheckValidateText && <div>{pwCheckValidateText}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
