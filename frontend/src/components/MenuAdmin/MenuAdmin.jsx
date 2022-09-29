import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuAdmin.scss";

const MenuAdmin = () => {
  const navigation = useNavigate();
  const [check, setCheck] = useState(1);
  var name = localStorage.getItem("name");

  return (
    <div>
      <div className="container_menu_admin">
        <div className="container_menu_admin_intro">
          <div className="container_menu_admin_intro_img">
            <img
              src="https://images.pexels.com/photos/13161994/pexels-photo-13161994.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
          </div>
          <div className="container_menu_admin_intro_text">
            <p>{name}</p>
            <i>admin</i>
          </div>
        </div>
        <div className="container_menu_admin_navbar">
          <li
            className={`option_menu_admin  ${
              check === 1 && "acctiveMenuAdmin"
            }`}
            onClick={() => {
              setCheck(1);
              navigation("/admin-dashboard");
            }}
          >
            <i className="bx bx-home"></i> <span>Trang Chủ</span>
          </li>
          <li
            className={`option_menu_admin  ${
              check === 2 && "acctiveMenuAdmin"
            }`}
            onClick={() => {
              setCheck(2);
              navigation("/user-information");
            }}
          >
            <i class="bx bx-user-circle"></i> <span>Thông tin cá nhân</span>
          </li>
          <li
            className={`option_menu_admin  ${
              check === 3 && "acctiveMenuAdmin"
            }`}
            onClick={() => {
              setCheck(3);
              navigation("/user-detail");
            }}
          >
            <i class="bx bxs-user-badge"></i> <span>Thông tin chi tiết</span>
          </li>

          <li
            className="option_menu_admin"
            onClick={() => {
              navigation("/");
              localStorage.clear();
            }}
          >
            <i className="bx bx-log-out"></i> <span>Đăng xuất</span>
          </li>
        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;
