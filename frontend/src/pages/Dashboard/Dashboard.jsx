import React, { useState, useEffect, useRef } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import ChartAdmin from "../../components/Chart/Chart";
import "./Dashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigation = useNavigate();
  const [dataDB1, setDataDB1] = useState([]);
  const [dataDB2, setDataDB2] = useState([]);
  const data = dataDB2.filter((item) => item.IsShareholder === "Phải");
  const sumEarnings = data.map((item) => item.Earnings);
  const sumDayOff = data.map((item) => item.DayOff);
  const array = useRef([]);
  const group = [];

  array.current.forEach((element) => {
    const o = (group[element.ShareholderID] = group[element.ShareholderID] || {
      ...element,
    });
    return o;
  });

  const sumArray = (array) => {
    let sum = 0;
    array.forEach(function (value) {
      sum += value;
    });
    return sum;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const APIDB1 = "http://localhost:8888/api/shareholder/all-shareholder";
    const APIDB2 = "http://localhost:8000/staff";

    const getAPIDB1 = axios.get(APIDB1);
    const getAPIDB2 = axios.get(APIDB2);

    axios.all([getAPIDB1, getAPIDB2]).then(
      axios.spread((...allData) => {
        setDataDB1(allData[0].data);
        setDataDB2(allData[1].data.data);
      })
    );
  };

  useEffect(() => {
    dataDB1.forEach(function (value) {
      dataDB2.forEach(function (value2) {
        if (value.ShareholderID == value2.ShareholderID) {
          let merged = { ...value, ...value2 };
          array.current.push(merged);
        }
      });
    });
  });

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
                <span>Tổng thu nhập </span>
              </div>
              <div className="container_Dashboard_body_main_card">
                <i className="bx bx-user-x"></i>
                <p>{sumArray(sumDayOff)}</p>
                <span>Tổng ngày nghĩ </span>
              </div>
              <div className="container_Dashboard_body_main_card">
                <i className="bx bx-money"></i>
                <p className="dollars">
                  {sumArray(sumEarnings) / dataDB2.length}
                </p>
                <span>Trung bình cộng</span>
              </div>
              <div className="container_Dashboard_body_main_card addDB">
                <i class="bx bx-data"></i>
                <br />
                <span>Thêm vào database</span>
              </div>
              <div className="container_Dashboard_body_main_card updateDB">
                <i class="bx bx-data"></i>
                <br />
                <span>Cập nhật database</span>
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
                {group.map((item) => (
                  <tr key={item._id}>
                    <td>{item.ShareholderID}</td>
                    <td>{item.Name}</td>
                    <td>{item.IdentityCard}</td>
                    <td>{item.Birthday}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Ethnic}</td>
                    <td>{item.TypeOfEmployee}</td>
                    <td>{item.IsShareholder}</td>
                    <td>{item.DayOff}</td>
                    <td>{item.Earnings}</td>
                    <td>{item.PaidLastYear}</td>
                    <td>{item.PaidToCate}</td>
                  </tr>
                ))}
              </table>
            </div>
            {/* <div className="container_Dashboard_body_main_chart">
              <ChartAdmin />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
