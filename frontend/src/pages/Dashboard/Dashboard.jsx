import React, { useState, useEffect, useRef } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import ChartAdmin from "../../components/Chart/Chart";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dataDBSqlServer, setDataDBSqlServer] = useState([]);
  const [dataDBMySql, setDataDBMySql] = useState([]);
  const [dataMoogodb, setDataMoogodb] = useState([]);
  const data = dataDBMySql.filter((item) => item.IsShareholder === "Phải");
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
    const APIDB3 = "http://localhost:5000/api/shareholders/all";

    const getAPIDB1 = axios.get(APIDB1);
    const getAPIDB2 = axios.get(APIDB2);
    const getAPIDB3 = axios.get(APIDB3);

    axios.all([getAPIDB1, getAPIDB2, getAPIDB3]).then(
      axios.spread((...allData) => {
        setDataDBSqlServer(allData[0].data);
        setDataDBMySql(allData[1].data.data);
        setDataMoogodb(allData[2].data);
      })
    );
  };

  const handleAddDatabase = () => {
    toast.info("Đang thêm dử liệu !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    setTimeout(() => {
      toast.success("Thêm dử liệu lên moogodb thành công !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }, 3000);
    group.forEach(function (value) {
      axios
        .post("http://localhost:5000/api/shareholders/add", {
          ShareholderID: value.ShareholderID,
          Name: value.Name,
          NameShareholder: value.NameShareholder,
          IdentityCard: value.IdentityCard,
          TypeOfEmployee: value.TypeOfEmployee,
          Birthday: value.Birthday,
          Gender: value.Gender,
          Ethnic: value.Ethnic,
          IsShareholder: value.IsShareholder,
          DayOff: value.DayOff,
          Earnings: value.Earnings,
          PaidLastYear: value.PaidLastYear,
          PaidToCate: value.PaidToCate,
        })
        .then(function (response) {
          console.log("Insert successfully", value.ShareholderID);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const handleUpdateDatabase = () => {
    toast.info("Đang cập nhật !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    setTimeout(() => {
      toast.success("Cập nhật dử liệu lên moogodb thành công !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }, 3000);
    dataMoogodb.forEach(function (value) {
      group.forEach(function (value2) {
        if (value.ShareholderID == value2.ShareholderID) {
          if (
            value.Name != value2.Name ||
            value.NameShareholder != value2.NameShareholder ||
            value.IdentityCard != value2.IdentityCard ||
            value.Birthday != value2.Birthday ||
            value.Gender != value2.Gender ||
            value.Ethnic != value2.Ethnic ||
            value.TypeOfEmployee != value2.TypeOfEmployee ||
            value.IsShareholder != value2.IsShareholder ||
            value.DayOff != value2.DayOff ||
            value.Earnings != value2.Earnings ||
            value.PaidLastYear != value2.PaidLastYear ||
            value.PaidToCate != value2.PaidToCate
          ) {
            axios
              .put(`http://localhost:5000/api/shareholders/${value._id}`, {
                ShareholderID: value2.ShareholderID,
                Name: value2.Name,
                NameShareholder: value2.NameShareholder,
                IdentityCard: value2.IdentityCard,
                TypeOfEmployee: value2.TypeOfEmployee,
                Birthday: value2.Birthday,
                Gender: value2.Gender,
                Ethnic: value2.Ethnic,
                IsShareholder: value2.IsShareholder,
                DayOff: value2.DayOff,
                Earnings: value2.Earnings,
                PaidLastYear: value2.PaidLastYear,
                PaidToCate: value2.PaidToCate,
              })
              .then(function (response) {
                console.log("Insert successfully", value.ShareholderID);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      });
    });
  };

  useEffect(() => {
    dataDBSqlServer.forEach(function (value) {
      dataDBMySql.forEach(function (value2) {
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
                  {Math.floor(sumArray(sumEarnings) / dataDBMySql.length)}
                </p>
                <span>Trung bình cộng</span>
              </div>
              <div
                className="container_Dashboard_body_main_card addDB"
                onClick={handleAddDatabase}
              >
                <i className="bx bx-data"></i>
                <br />
                <span>Thêm vào database</span>
              </div>
              <div
                className="container_Dashboard_body_main_card updateDB"
                onClick={handleUpdateDatabase}
              >
                <i className="bx bx-data"></i>
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
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Dashboard;
