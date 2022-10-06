import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import "./AddUserInfor.scss";

const AddUserInfor = () => {
  return (
    <div>
      <div className="container_AddUserInfor">
        <div className="container_AddUserInfor_menu">
          <MenuAdmin />
        </div>
        <div className="container_AddUserInfor_body">
          <div className="container_AddUserInfor_body_search">
            <p>Thêm thông tin cổ đông</p>
          </div>
          <div className="container_AddUserInfor_body_main"></div>
        </div>
      </div>
    </div>
  );
};

export default AddUserInfor;
