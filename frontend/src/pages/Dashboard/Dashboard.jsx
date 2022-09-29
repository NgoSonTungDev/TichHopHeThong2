import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import ChartAdmin from "../../components/Chart/Chart";
import "./Dashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigate();

  const fetchData = () => {
    const APIDB1 = "http://localhost:5000/api/shareholders/all";
    const APIDB2 = "http://localhost:8000/staff";

    const getAPIDB1 = axios.get(APIDB1);
    const getAPIDB2 = axios.get(APIDB2);

    axios.all([getAPIDB1, getAPIDB2]).then(
      axios.spread((...allData) => {
        console.log(allData);
      })
    );
  };

  useEffect(() => {
    fetchData();
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
              <div className="container_Dashboard_body_main_card">
                <i className="bx bxs-user-account"></i>
                <p>10</p>
                <span>Tài khoản</span>
              </div>
              <div className="container_Dashboard_body_main_card">
                <i className="bx bx-folder"></i>
                <p>10</p>
                <span>Sản phẩm</span>
              </div>
              <div className="container_Dashboard_body_main_card">
                <i className="bx bxs-package"></i>
                <p>20</p>
                <span>Đơn Hàng</span>
              </div>
            </div>
            <div className="container_Dashboard_body_main_table">
              <table>
                <tr>
                  <th>mã nhân viên</th>
                  <th>họ tên</th>
                  <th>cmnd</th>
                  <th>ngày sinh</th>
                  <th>giới tính</th>
                  <th>dân tộc</th>
                  <th>loại nhân viên</th>
                  <th>cổ đông</th>
                  <th>ngày nghĩ</th>
                  <th>lương</th>
                  <th>trả vào năm ngoái</th>
                  <th>thanh toán cho đến nay</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
              </table>
            </div>
            <div className="container_Dashboard_body_main_chart">
              <ChartAdmin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
