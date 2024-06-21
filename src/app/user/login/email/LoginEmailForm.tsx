"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { AuthDispatchContext } from "@/app/components/providers/AuthProvider";
import { login } from "@/lib/restApiHandlers";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  KeyboardEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import LoadingSvg from "@/../public/svg/loading-spinner.svg";

type Props = {
  containerClassName?: string;
};

export default function LoginEmailForm({ containerClassName }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const authDispatch = useContext(AuthDispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeValidation, setActiveValidation] = useState(false);
  const [clientErrors, setClientErrors] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = performValidation({
      email,
      password,
      setErrors: setClientErrors,
    });
    if (!errors.email && !errors.password) {
      setLoading(true);
      const response = await login({ email, password });
      setLoading(false);
      
      if (response.error) {
        setServerError(response.message);
      } else {
        authDispatch({
          type: "SAVE_AUTH",
          payload: {
            user: response.user,
            accessToken: response.tokenInfo.accessToken,
            refreshToken: response.tokenInfo.refreshToken,
          },
        });
        router.push(returnUrl || "/");
      }
    }

    setActiveValidation(true);
  };

  useEffect(() => {
    setServerError("");
    if (activeValidation) {
      performValidation({
        email,
        password,
        setErrors: setClientErrors,
      });
    }
  }, [activeValidation, email, password]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className={classNames("flex flex-col", containerClassName)}>
      <div className="mb-4 space-y-1">
        <p>Email</p>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="someone@example.com"
          error={Boolean(clientErrors.email || serverError)}
        />
        {clientErrors.email && (
          <p className="text-coral font-bold">{clientErrors.email}</p>
        )}
      </div>
      <div className="mb-6 space-y-1">
        <p>Password</p>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          error={Boolean(clientErrors.password || serverError)}
        />
        {clientErrors.password && (
          <p className="text-coral font-bold">{clientErrors.password}</p>
        )}
      </div>
      {serverError && (
        <p className="text-coral font-bold mb-4">{serverError}</p>
      )}
      <Button
        content={
          loading ? (
            <div className="w-6 h-6">
              <LoadingSvg />
            </div>
          ) : (
            "Sign In"
          )
        }
        variant="primary"
        onClick={(e) => loading || handleSubmit(e)}
        fullWidth
      />
    </div>
  );
}

const performValidation = ({
  email,
  password,
  setErrors,
}: {
  email: string;
  password: string;
  setErrors: Dispatch<SetStateAction<any>>;
}) => {
  const errors = {
    email: validate.email(email),
    password: validate.password(password),
  };
  setErrors(errors);
  return errors;
};

const validate = {
  email(val: string) {
    if (!val) return "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.toLowerCase()))
      return "Invalid email format";
    else return "";
  },
  password(val: string) {
    if (!val) return "Password is required";
    else if (val.length < 6) return "Password must be at least 6 characters";
    else return "";
  },
};
