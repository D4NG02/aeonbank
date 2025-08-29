"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import Form from "../components/Form";
import encrypt from "../utils/encrypt";
import { useStateProvider } from "../utils/Reducer/StateProvider";
import { reducerCases } from "../utils/Reducer/Constant";

type LoginType = { success: boolean; message: string };

const LoginForm = () => {
  const { dispatch } = useStateProvider();
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [secureWord, setSecureWord] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<LoginType>({
    success: false,
    message: "Not login",
  });
  const [step, setStep] = useState<"username" | "secure" | "submit">(
    "username",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSecureWord(null);

    try {
      const response = await fetch("/api/user/get-secure-word");

      if (!response.ok) {
        throw new Error("Failed to fetch secure word");
      }

      const data = await response.json();
      if (data) {
        setSecureWord(data);
        setStep("secure");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSecureWord("Error fetching word.");
    }
  }

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLogin({ success: false, message: "Login..." });

    try {
      const hashPassword = await encrypt(inputData.password);
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ ...inputData, password: hashPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch secure word");
      }

      const data: { success: boolean; message: string } = await response.json();
      if (data) {
        setIsLogin(data);
        dispatch({
          type: reducerCases.SET_LOGIN,
          payload: data,
        });

        setTimeout(() => {
          redirect("showcase");
        }, 3000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSecureWord("Error fetching word.");
    }
  }

  return (
    <>
      {/* Submit username */}
      {step == "username" ? (
        <Form onSubmit={onSubmit}>
          <Form.Input
            type="text"
            name="username"
            value={inputData.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputData((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
          />

          <Form.Button type="submit" color="primary">
            Submit
          </Form.Button>
        </Form>
      ) : (
        <></>
      )}

      {/* Pop password input */}
      {step == "secure" ? (
        <Form>
          <span className="w-full">Your secure work: {secureWord}</span>

          <Form.Input
            type="text"
            name="username"
            value={inputData.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputData((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
          />

          <Form.Button
            type="button"
            color="primary"
            onClick={() => setStep("submit")}
          >
            Next
          </Form.Button>
        </Form>
      ) : (
        <></>
      )}

      {/* Login */}
      {step == "submit" ? (
        <Form onSubmit={onLogin}>
          <span className="w-full">Your secure work: {secureWord}</span>
          {isLogin.success ? (
            <span className="mr-auto px-2 py-1 rounded-lg bg-green-300">
              {isLogin.message}
            </span>
          ) : (
            <></>
          )}

          <Form.Input
            type="text"
            name="username"
            value={inputData.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputData((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
          />
          <Form.Input
            type="password"
            name="password"
            value={inputData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputData((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />

          <Form.Button type="submit" color="primary">
            {isLogin.message.includes("Login...") ? "Login..." : "Login"}
          </Form.Button>
        </Form>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginForm;
