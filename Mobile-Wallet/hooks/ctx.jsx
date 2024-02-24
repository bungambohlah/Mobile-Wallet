import React from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props) {
  const [[isOnboardLoading, isOnboard], setIsOnboard] = useStorageState("isOnboard");

  return (
    <AuthContext.Provider
      value={{
        isOnboard,
        isOnboardLoading,
        setIsOnboard,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
