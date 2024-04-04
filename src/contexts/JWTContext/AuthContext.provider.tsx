/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "../../config/axios";
import AuthReducer from "./AuthContext.reducer";
import { Alert } from "@mui/material";
import { BACKEND_BASE_URL } from "@/config";
import { setSession } from "@/utils/jwt";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const AUTO_LOGOUT_TIME = 60000000; // 10 minutes in milliseconds

const illegalStateFunction = (...args: any) => {
  throw new Error("You must wrap your components in <AuthProvider />");
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {},
  signIn: illegalStateFunction,
  signOut: illegalStateFunction,
  signUp: illegalStateFunction,
  resetPassword: illegalStateFunction,
};

export const AuthContext = createContext(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let xml: any = searchParams.get("xml");
  const [token, setToken] = useState<any>("")

  const logoutTimer = useRef<NodeJS.Timeout | null>(null); // Define logoutTimer

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       // localStorage.getItem('login')
  //       if (localStorage.getItem("login")) {
  //         const info: any = JSON.parse(localStorage.getItem("login") || "");
  //         // const { token, data } = info
  //         dispatch({
  //           type: INITIALIZE,
  //           payload: {
  //             isInitialized: true,
  //             isAuthenticated: true,
  //             user: info,
  //           },
  //         });
  //         // Start the logout timer when user is authenticated
  //         startLogoutTimer();
  //       } else {
  //         dispatch({
  //           type: INITIALIZE,
  //           payload: {
  //             isInitialized: false,
  //             isAuthenticated: false,
  //             user: null,
  //           },
  //         });
  //       }
  //     } catch (err) {
  //       dispatch({
  //         type: INITIALIZE,
  //         payload: {
  //           isAuthenticated: false,
  //           user: null,
  //         },
  //       });
  //     }
  //   };

  //   initialize();
  // }, []);

  useEffect(() => {
    console.log("xml ==>", xml);
    
    const initialize = async () => {
      if (localStorage.getItem("login")) {
      const accessToken:any = window.localStorage.getItem("login");
      const user=JSON.parse(accessToken)
      setToken(user.token)
      // const info: any = JSON.parse(localStorage.getItem("accessToken") || "");
      console.log(user, "kkkkkkkkkkkkkkkkkkkkk");
      dispatch({
        type: INITIALIZE,
        payload: {
          isInitialized: true,
          user: user,
        },
      });
      if (pathname === "/") router.push("/dashboard");
    } else if (xml) {
      console.log("in")
      // signInAdmin();
    } 
    else {
      console.log("out")
      // signOut();
    }
  }
  initialize();
  }, []);

  const resetLogoutTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      startLogoutTimer();
    }
  };

  const signInEmployee = async (user_name: any, password: any, role: any) => {
    try {
      let endpoint = `${BACKEND_BASE_URL}/api/medical/LoginEmployee`;

      const response = await axios.post(
        endpoint,
        {
          email: user_name,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data;
      localStorage.setItem("login", JSON.stringify(user));
      dispatch({
        type: SIGN_IN,
        payload: {
          user: user,
          isAuthenticated: true,
        },
      });
      router.push("/dashboard");
      resetLogoutTimer();
      return user;
    } catch (err: any) {
      console.error("Error occurred:", err);
      if (err && err.error && !err.success) {
        return err;
      } else {
        return "An error occurred while signing in.";
      }
    }
  };

  // const signInAdmin = async (user_name: any, password: any, role: any) => {
  //   try {
  //     let endpoint = `${BACKEND_BASE_URL}/api/medical/loginAdmin`;

  //     const response = await axios.post(
  //       endpoint,
  //       {
  //         email: user_name,
  //         password: password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const user = response.data;
  //     localStorage.setItem("login", JSON.stringify(user));
  //     dispatch({
  //       type: SIGN_IN,
  //       payload: {
  //         user: user,
  //         isAuthenticated: true,
  //       },
  //     });
  //     router.push("/dashboard");
  //     resetLogoutTimer();
  //     return user;
  //   } catch (err: any) {
  //     console.error("Error occurred:", err);
  //     if (err && err.error && !err.success) {
  //       return err;
  //     } else {
  //       return "An error occurred while signing in.";
  //     }
  //   }
  // };

  const signInAdmin = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SSO_BASE_URL}/api/v1/user/session/${xml}`
      );
      
      if (response?.data?.data?.body?.status == false) {
        signOut();
        return;
      }

      const user:any=response.data

      localStorage.setItem("login", JSON.stringify(user));
      localStorage.setItem("xml", JSON.stringify(xml));

      dispatch({
        type: INITIALIZE,
          payload: {
            isInitialized: true,
            isAuthenticated: true,
            user: user,
          },
      });
      router.push("/dashboard");
    }
     catch (err: any) {
      console.log(err, "errrrrrrrrrrrrrr");
      signOut();
      dispatch({
        type: SIGN_IN,
        payload: {
          isAuthenticated: false,
          validationErrors: err.error,
        },
      });
      return err;
    }
  };

  // const signOut = () => {
  //   localStorage.removeItem("login");
  //   dispatch({ type: SIGN_OUT });

  //   router.push("/");
  // };

  const signOut = async () => {
    console.log("signout running")
    const rawData = localStorage.getItem("xml");
    let info;
    console.log(rawData,"raw")

    if (rawData) {
      try {
        info = JSON.parse(rawData);
        try {
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_SSO_BASE_URL}/api/v1/user/session/${info}`
          );
          router.push(`${process.env.NEXT_PUBLIC_SSO_URL}`);
          setSession(null);
          dispatch({ type: SIGN_OUT, isAuthenticated: false, user: {} });
          localStorage.clear();
        } catch (err: any) {
          console.log(err, "error");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle the error appropriately, such as displaying a message to the user or providing a default value for 'info'
      }
    } else {
      // Handle case where no data is present in localStorage
      router.push(`${process.env.NEXT_PUBLIC_SSO_URL}`);
      dispatch({ type: SIGN_OUT, isAuthenticated: false, user: {} });
      console.log("Signing out!!")
      localStorage.clear();
    }
  };

  const handleUserActivity = () => {
    resetLogoutTimer();
  };

  const startLogoutTimer = () => {
    logoutTimer.current = setTimeout(() => {
      signOut();
    }, AUTO_LOGOUT_TIME);
  };

  useEffect(() => {
    const onActivity = () => {
      handleUserActivity();
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);

    // Clear timeout and reset timer on initial load
    resetLogoutTimer();

    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          ...state,
          method: "jwt",
          signInAdmin,
          signOut,
        }),
        [state]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}
