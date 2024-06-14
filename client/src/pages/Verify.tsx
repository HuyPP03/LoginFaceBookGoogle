import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      navigate("/login");
    } else {
      setToken(token);
      console.log("Token:", token);
    }
  }, [location, navigate]);

  return <div>Verify</div>;
};

export default Verify;
