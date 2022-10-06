import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import "./AddUserInfor.scss";

const AddUserInfor = () => {
  const [ShareholderIDValue, SetShareholderIDValue] = useState(0);
  const [NameValue, SetNameValue] = useState("");
  const [IdentityCardValue, SetIdentityCardValue] = useState(0);
  const [BirthdayValue, SetBirthdayValue] = useState("");
  const [EthnicValue, SetEthnic] = useState("");
  const [TypeOfEmployeeValue, SetTypeOfEmployeeValue] = useState("");

  return (
    <div>
      <div className="container_AddUserInfor">
        <div className="container_AddUserInfor_menu">
          <MenuAdmin />
        </div>
        <div className="container_AddUserInfor_body">
          <div className="container_AddUserInfor_body_search">
            <p>thông tin cổ đông</p>
            <div className="container_AddUserInfor_body_search_input">
              <input type="text" placeholder="Search . . ." />{" "}
              <i class="bx bx-search-alt-2"></i>
            </div>
          </div>

          <div className="container_AddUserInfor_body_main">
            <div className="container_AddUserInfor_form_scroll">
              <div className="container_AddUserInfor_form">
                <form id="form" class="form">
                  <div class="form-control">
                    <label>ShareholderID</label>
                    <input
                      type="number"
                      value={ShareholderIDValue}
                      onChange={(e) => SetShareholderIDValue(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>Name</label>
                    <input
                      type="text"
                      value={NameValue}
                      onChange={(e) => SetNameValue(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>IdentityCard</label>
                    <input
                      type="number"
                      value={IdentityCardValue}
                      onChange={(e) => SetIdentityCardValue(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>Birthday</label>
                    <input
                      type="Date"
                      value={BirthdayValue}
                      onChange={(e) => SetBirthdayValue(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>Gender</label>
                    <select name="" id="">
                      <option value="">Nam</option>
                      <option value="">Nữ</option>
                    </select>
                  </div>
                  <div class="form-control">
                    <label>Ethnic</label>
                    <input
                      type="number"
                      value={EthnicValue}
                      onChange={(e) => SetEthnic(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>TypeOfEmployee</label>
                    <input
                      type="number"
                      value={TypeOfEmployeeValue}
                      onChange={(e) => SetTypeOfEmployeeValue(e.target.value)}
                    />
                  </div>
                  <div class="btn_yes">
                    <button>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserInfor;
