import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import "./AddUserDetail.scss";

const AddUserDetail = () => {
  return (
    <div>
      <div className="container_AddUserDetail">
        <div className="container_AddUserDetail_menu">
          <MenuAdmin />
        </div>
        <div className="container_AddUserDetail_body">
          <div className="container_AddUserDetail_body_search">
            <p>Thêm thông tin chi tiết cổ đông</p>
          </div>
          <div className="container_AddUserDetail_body_main"></div>
        </div>
      </div>
    </div>
  );
};

export default AddUserDetail;
