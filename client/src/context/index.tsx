import { createContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  data: {
    id: string;
    name: string;
    email: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: true, error: null }, () => {}]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

  const fetchUser = async () => {
    const { data: response } = await axios.get(
      "http://localhost:8001/api/auth/me"
    );

    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
        },
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.errors.Length) {
      setUser({
        data: null,
        loading: false,
        error: response.errors[0].msg,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
