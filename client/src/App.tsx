import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      // Xóa token từ URL để bảo mật
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Kiểm tra xem token có tồn tại trong localStorage hay không
      const storedToken = localStorage.getItem("jwt");
      if (!storedToken) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập hoặc hiển thị thông báo
        navigate("/login"); // Giả sử bạn có một trang đăng nhập tại '/login'
      }
    }
  }, [location, navigate]);

  return <div className="App">App</div>;
}

export default App;
