import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import ChartAdmin from "../../components/Chart/Chart";
import "./Dashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dataDB1, setDataDB1] = useState([]);
  const [dataDB2, setDataDB2] = useState([]);
  const navigation = useNavigate();
  const data = dataDB2.filter((item) => item.IsShareholder === "Cổ Đông");
  const sumEarnings = data.map((item) => item.Earnings);
  const sumDayOff = data.map((item) => item.DayOff);

  const sumArray = (array) => {
    let sum = 0;
    array.forEach(function (value) {
      sum += value;
    });
    return sum;
  };

  const fetchData = () => {
    const APIDB1 = "http://localhost:5000/api/shareholders/all";
    const APIDB2 = "http://localhost:8000/staff";

    const getAPIDB1 = axios.get(APIDB1);
    const getAPIDB2 = axios.get(APIDB2);

    axios.all([getAPIDB1, getAPIDB2]).then(
      axios.spread((...allData) => {
        // console.log("database1", allData[0].data);
        // console.log("database2",allData[1].data.data);
        setDataDB1(allData[0].data);
        setDataDB2(allData[1].data.data);
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
          </div>
          <div className="container_Dashboard_body_main">
            <div className="container_Dashboard_body_main_statistics">
              <div className="container_Dashboard_body_main_card">
                <i className="bx bx-money-withdraw"></i>
                <p className="dollars">{sumArray(sumEarnings)}</p>
                <span>Tổng thu nhập của các cổ đông</span>
              </div>
              <div className="container_Dashboard_body_main_card">
                <i className="bx bx-user-x"></i>
                <p>{sumArray(sumDayOff)}</p>
                <span>Tổng ngày nghĩ của các cổ đông</span>
              </div>
              <div className="container_Dashboard_body_main_card">
                <i className="bx bx-money"></i>
                <p className="dollars">{sumArray(sumEarnings) / dataDB2.length}</p>
                <span>Trung bình lợi ích</span>
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
                {dataDB1.map((item) => (
                  <tr>
                    <td>{item.ShareholderID}</td>
                    <td>{item.Name}</td>
                    <td>{item.IdentityCard}</td>
                    <td>{item.Birthday}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Ethnic}</td>
                    <td>{item.TypeOfEmployee}</td>
                    <td>NULL</td>
                    <td>NULL</td>
                    <td>NULL</td>
                    <td>NULL</td>
                    <td>NULL</td>
                  </tr>
                ))}
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
