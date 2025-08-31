"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { motion as M } from "motion/react";
import { redirect } from "next/navigation";
import Form from "../components/Form";
import encrypt from "../utils/encrypt";
import { useStateProvider } from "../utils/Reducer/StateProvider";
import { reducerCases } from "../utils/Reducer/Constant";
import Button from "../components/Button";

type LoginType = { success: boolean; message: string, token: string };

const LoginForm = () => {
  const { dispatch } = useStateProvider();
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [secureWord, setSecureWord] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<LoginType>({
    success: false,
    message: "Not login",
    token: "Not login",
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
    setIsLogin({ success: false, message: "Login...", token: "" });

    try {
      const hashPassword = await encrypt(inputData.password);
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ ...inputData, password: hashPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data: { success: boolean; message: string, token: string } = await response.json();
      if (data.success) {
        console.log(data)
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
      console.error("Login error:", error);
    }
  }

  return (
    <>
      {/* Submit username */}
      {step.includes("username") ? (
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

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      ) : (
        <></>
      )}

      {/* Pop password input */}
      {step.includes("secure") ? (
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

          <Button
            type="button"
            variant="contained"
            onClick={() => setStep("submit")}
          >
            Next
          </Button>
        </Form>
      ) : (
        <></>
      )}

      {/* Login */}
      {step.includes("submit") ? (
        <>
          <p className="mb-0.5">Your secure work: {secureWord}</p>
          {isLogin.success ? (
            <div className="mb-3">
              <p>{isLogin.message}</p>
              <M.p
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="border-b-2 border-green-300"
              />
            </div>
          ) : (
            <></>
          )}
          <Form onSubmit={onLogin}>
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

            <Button type="submit" variant="contained">
              {isLogin.message.includes("Login...") ? "Login..." : "Login"}
            </Button>
          </Form>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginForm;
