import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import "./UserDetail.scss";
import axios from "axios";

const UserDetail = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/staff")
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container_UserDetail">
        <div className="container_UserDetail_menu">
          <MenuAdmin />
        </div>
        <div className="container_UserDetail_body">
          <div className="container_UserDetail_body_search">
            <p>thông tin chi tiết ({data.length})</p>
            <div className="container_UserDetail_body_search_input">
              <input type="text" placeholder="Search . . ." />{" "}
              <i class="bx bx-search-alt-2"></i>
            </div>
          </div>
          <div className="container_UserDetail_body_main">
            <div className="container_UserDetail_body_main_table">
              <table>
                <tr>
                  <th>mã nhân viên</th>
                  <th>họ tên</th>
                  <th>cmnd</th>
                  <th>cổ đông</th>
                  <th>ngày nghĩ</th>
                  <th>lương</th>
                  <th>trả vào năm ngoái</th>
                  <th>thanh toán cho đến nay</th>
                </tr>
                {data.map((item) => (
                  <tr>
                    <td>{item.ShareholderID}</td>
                    <td>{item.Name}</td>
                    <td>{item.IdentityCard}</td>
                    <td>{item.IsShareholder}</td>
                    <td>{item.Earnings}</td>
                    <td>{item.DayOff}</td>
                    <td>{item.PaidLastYear}</td>
                    <td>{item.PaidToCate}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
