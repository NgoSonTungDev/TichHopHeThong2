import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import "./AddUserDetail.scss";

const AddUserDetail = () => {
  const [ShareholderIDValue, SetShareholderIDValue] = useState(0);
  const [NameValue, SetNameValue] = useState("");
  const [IdentityCardValue, SetIdentityCardValue] = useState(0);
  const [EarningsValue, SetEarningsValue] = useState(0);
  const [PaidLastYearValue, SetPaidLastYearValue] = useState(0);
  const [PaidToCateValue, SetPaidToCateValue] = useState(0);

  return (
    <div>
      <div className="container_AddUserDetail">
        <div className="container_AddUserDetail_menu">
          <MenuAdmin />
        </div>
        <div className="container_AddUserDetail_body">
          <div className="container_AddUserDetail_body_search">
            <p>thông tin chi tiết cổ đông</p>
            <div className="container_AddUserDetail_body_search_input">
              <input type="text" placeholder="Search . . ." />{" "}
              <i class="bx bx-search-alt-2"></i>
            </div>
          </div>
          <div className="container_AddUserDetail_body_main">
            <div className="container_AddUserDetail_form_scroll">
              <div className="container_AddUserDetail_form">
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
                    <label>IsShareholder</label>
                    <select name="" id="">
                      <option value="">Phải</option>
                      <option value="">Không</option>
                    </select>
                  </div>
                  <div class="form-control">
                    <label>Earnings</label>
                    <input
                      type="number"
                      value={EarningsValue}
                      onChange={(e) => SetEarningsValue(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>PaidLastYear</label>
                    <input
                      type="number"
                      value={PaidLastYearValue}
                      onChange={(e) => SetPaidLastYearValue(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>PaidToCate</label>
                    <input
                      type="number"
                      value={PaidToCateValue}
                      onChange={(e) => SetPaidToCateValue(e.target.value)}
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

export default AddUserDetail;
