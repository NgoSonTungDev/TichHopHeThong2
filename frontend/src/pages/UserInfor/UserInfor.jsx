import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import "./UserInfor.scss";
import axios from "axios";

const UserInfor = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/shareholders/all")
      .then(function (response) {
        setData(response.data);
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
      <div className="container_UserInfor">
        <div className="container_UserInfor_menu">
          <MenuAdmin />
        </div>
        <div className="container_UserInfor_body">
          <div className="container_UserInfor_body_search">
            <p>thông tin cá nhân ({data.length})</p>
            <div className="container_UserInfor_body_search_input">
              <input type="text" placeholder="Search . . ." />{" "}
              <i class="bx bx-search-alt-2"></i>
            </div>
          </div>
          <div className="container_UserInfor_body_main">
            <div className="container_UserInfor_body_main_table">
              <table>
                <tr>
                  <th>mã nhân viên</th>
                  <th>họ tên</th>
                  <th>cmnd</th>
                  <th>ngày sinh</th>
                  <th>giới tính</th>
                  <th>dân tộc</th>
                  <th>loại nhân viên</th>
                </tr>
                {data.map((item) => (
                  <tr>
                    <td>{item.ShareholderID}</td>
                    <td>{item.Name}</td>
                    <td>{item.IdentityCard}</td>
                    <td>{item.Birthday}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Ethnic}</td>
                    <td>{item.TypeOfEmployee}</td>
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

export default UserInfor;
