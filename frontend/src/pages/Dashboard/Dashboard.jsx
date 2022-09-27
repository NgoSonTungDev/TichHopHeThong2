import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import ChartAdmin from "../../components/Chart/Chart";
import "./Dashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigation = useNavigate();

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <div className="container_Dashboard">
        <div className="container_Dashboard_menu">
          <MenuAdmin />
        </div>
        <div className="container_Dashboard_body">
          <div className="container_Dashboard_body_search">
            <p>Trang chủ</p>
            {/* <div className="container_Dashboard_body_search_input">
              <input
                type="text"
                placeholder="Search . . ."
                onKeyDown={(e) => onPress_ENTER(e)}
              />{" "}
              <i class="bx bx-search-alt-2"></i>
            </div> */}
          </div>
          <div className="container_Dashboard_body_main">
            <div className="container_Dashboard_body_main_statistics">
              <div
                className="container_Dashboard_body_main_card"
                onClick={() => {
                  navigation("/account-management");
                }}
              >
                <i className="bx bxs-user-account"></i>
                <p>10</p>
                <span>Tài khoản</span>
              </div>
              <div
                className="container_Dashboard_body_main_card"
                onClick={() => {
                  navigation("/movie-management");
                }}
              >
                <i className="bx bx-folder"></i>
                <p>10</p>
                <span>Sản phẩm</span>
              </div>
              <div
                className="container_Dashboard_body_main_card"
                onClick={() => {
                  navigation("/order-management");

                }}
              >
                <i className="bx bxs-package"></i>
                <p>20</p>
                <span>Đơn Hàng</span>
              </div>
            </div>
            <div className="container_Dashboard_body_main_chart" >
              <ChartAdmin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
