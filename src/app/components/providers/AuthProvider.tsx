"use client";

import { User } from "@/lib/definitions";
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  Reducer,
  ReducerAction,
  createContext,
  useEffect,
  useReducer,
} from "react";

const clearedAuth: AuthType = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const AuthContext = createContext(clearedAuth);
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(
  () => {}
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [auth, dispatch] = useReducer(authReducer, clearedAuth);

  useEffect(() => {
    const persistedAuth = retrieveAuth();
    if (persistedAuth.user)
      dispatch({ type: "SAVE_AUTH", payload: persistedAuth });
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

const authReducer = (auth: AuthType, action: AuthAction) => {
  switch (action.type) {
    case "SAVE_AUTH": {
      storeAuth(action.payload);
      return action.payload;
    }
    case "SAVE_USER": {
      const newAuth: AuthType = { ...auth, user: action.payload };
      storeAuth(newAuth);
      return newAuth;
    }
    case "CLEAR_AUTH": {
      localStorage.removeItem("auth");
      return clearedAuth;
    }
  }
};

export function retrieveAuth() {
  const auth =
    (JSON.parse(localStorage.getItem("auth") || "null") as AuthType) ||
    clearedAuth;
  return auth;
}

export function storeAuth(auth: AuthType) {
  localStorage.setItem("auth", JSON.stringify(auth));
}

export type AuthType = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthAction =
  | {
      type: "SAVE_AUTH";
      payload: AuthType;
    }
  | {
      type: "SAVE_USER";
      payload: User;
    }
  | {
      type: "CLEAR_AUTH";
    };
