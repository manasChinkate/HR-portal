import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./constants";
import {
  setauthority,
  setName,
  setEmail,
  setCompany,
  setUserId,
  setCompanyId,
} from "../app/authSlice";

type ProtectedChild = {
  children: ReactNode;
};

const RefreshToken = ({ children }: ProtectedChild) => {
  const navigate = useNavigate();
  const authority = localStorage.getItem("authority");
  const dispatch = useDispatch();

  const checking = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/refresh`);

      if (res.status === 200) {
        dispatch(setauthority(res.data.Checked.authority));
        dispatch(setName(res.data.Checked.username));
        dispatch(setCompany(res.data.Checked.companyName));
        dispatch(setEmail(res.data.Checked.email));
        dispatch(setUserId(res.data.Checked.userId));
        dispatch(setCompanyId(res.data.Checked.companyId));
      } else {
        navigate("/session-out");
      }
    } catch (error) {
      console.error("Error checking authority:", error);
      navigate("/session-out");
    }
  };

  useEffect(() => {
    checking();
  }, [children]);

  return <>{children}</>;
};

export default RefreshToken;
