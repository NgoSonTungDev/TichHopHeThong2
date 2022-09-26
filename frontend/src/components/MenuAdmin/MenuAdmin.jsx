import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuAdmin.scss";

const MenuAdmin = () => {
  const navigation = useNavigate();
  const [check, setCheck] = useState(1);

  const handleAcctive = (e) => {
    setCheck(e);
  };

  return (
    <div>
      <div className="container_menu_admin">
        <div className="container_menu_admin_intro">
          <div className="container_menu_admin_intro_img">
            <img
              src="https://scontent.fdad3-4.fna.fbcdn.net/v/t1.15752-9/307387297_1139238373678346_6367312610972623543_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=tbXeh8OMFQUAX_mMjT7&_nc_ht=scontent.fdad3-4.fna&oh=03_AVKWa7kGw5nnct3dxWES6JDLy-eMdoNzzEhHKTWFMhmSdQ&oe=634E3724"
              alt=""
            />
          </div>
          <div className="container_menu_admin_intro_text">
            <p>Mỹ Hương</p>
            <i>admin</i>
          </div>
        </div>
        <div className="container_menu_admin_navbar">
          <li
            className={`option_menu_admin  ${
              check === 1 && "acctiveMenuAdmin"
            }`}
            onClick={() => {
              handleAcctive(1);
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
              handleAcctive(2);
              // navigation("/movie-management");
            }}
          >
            <i class='bx bxs-data'></i> <span>Database 1</span>
          </li>
          <li
            className={`option_menu_admin  ${
              check === 3 && "acctiveMenuAdmin"
            }`}
            onClick={() => {
              handleAcctive(3);
              // navigation("/account-management");
            }}
          >
            <i class='bx bxs-data'></i> <span>Database 2</span>
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