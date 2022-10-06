import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./AddUserDetail.scss";

const AddUserDetail = () => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [search, SetSearch] = useState("");
  const [birthday, Setbirthday] = useState("");
  const [Gender, SetGender] = useState("");
  const [Ethnic, SetEthnic] = useState("");
  const [Type, SetType] = useState("");
  const [ShareholderID, SetShareholderID] = useState(0);
  const [NameValue, SetNameValue] = useState("");
  const [IdentityCardValue, SetIdentityCardValue] = useState(0);
  const [IsShareholder, SetIsShareholder] = useState("Phải");
  const [Dayoff, SetDayoff] = useState(0);
  const [EarningsValue, SetEarningsValue] = useState(0);
  const [PaidLastYearValue, SetPaidLastYearValue] = useState(0);
  const [PaidToCateValue, SetPaidToCateValue] = useState(0);
  const [check, setcheck] = useState(1);

  const handleAddUserDetail = () => {
    var min = 100000;
    var max = 999999;
    var rand = Math.floor(min + Math.random() * (max - min));
    if (
      NameValue === "" ||
      IdentityCardValue === "" ||
      EarningsValue === "" ||
      PaidLastYearValue === "" ||
      PaidToCateValue === "" ||
      Dayoff === ""
    ) {
      toast.warn("Vui lòng nhập đầy đủ thông tin !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      addMysql(rand);
    }
  };

  const addMysql = (rand) => {
    axios
      .post("http://localhost:8000/add", {
        ShareholderID: rand,
        Name: NameValue,
        IdentityCard: IdentityCardValue,
        IsShareholder: IsShareholder,
        Earnings: EarningsValue,
        DayOff: Dayoff,
        PaidLastYear: PaidLastYearValue,
        PaidToCate: PaidToCateValue,
      })
      .then(function (response) {
        toast.success("Thêm thông tin chi tiết thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        addSqlServer(rand);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const addSqlServer = (rand) => {
    axios
      .post("http://localhost:8888/api/shareholder/add-shareholder", {
        ShareholderID: rand,
        NameShareholder: NameValue,
        IdentityCard: IdentityCardValue,
        Birthday: "",
        Gender: "",
        Ethnic: "",
        TypeOfEmployee: "",
      })
      .then(function (response) {
        toast.success("Thêm thông tin thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        SetNameValue("");
        SetIdentityCardValue("");
        SetEarningsValue("");
        SetDayoff("");
        SetPaidLastYearValue("");
        SetPaidToCateValue("");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const FindShareholder = () => {
    const valueShareholder = data.find((item) => item.ShareholderID === search);
    const valueUser = dataUser.find((item) => item.ShareholderID == search);
    if (!valueShareholder) {
      toast.error("Mã này không tồn tại !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      SetSearch("");
    } else {
      toast.success("Trích xuất thông tin thành công !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      SetSearch("");
      setcheck(2);
      Setbirthday(valueUser.Birthday);
      SetGender(valueUser.Gender);
      SetEthnic(valueUser.Ethnic);
      SetType(valueUser.TypeOfEmployee);
      SetShareholderID(valueShareholder.ShareholderID);
      SetNameValue(valueShareholder.Name);
      SetIdentityCardValue(valueShareholder.IdentityCard);
      SetIsShareholder(valueShareholder.IsShareholder);
      SetEarningsValue(valueShareholder.Earnings);
      SetDayoff(valueShareholder.DayOff);
      SetPaidLastYearValue(valueShareholder.PaidLastYear);
      SetPaidToCateValue(valueShareholder.PaidToCate);
    }
  };

  const handleUpdateUserDetail = () => {
    axios
      .put(`http://localhost:8000/update/${ShareholderID}`, {
        Name: NameValue,
        IdentityCard: IdentityCardValue,
        IsShareholder: IsShareholder,
        Earnings: EarningsValue,
        DayOff: Dayoff,
        PaidLastYear: PaidLastYearValue,
        PaidToCate: PaidToCateValue,
      })
      .then(function (response) {
        toast.success("Cập nhật chi tiết thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        UpdateSqlServer();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const UpdateSqlServer = () => {
    axios
      .put(
        `http://localhost:8888/api/shareholder/update-shareholder/${ShareholderID}`,
        {
          NameShareholder: NameValue,
          IdentityCard: IdentityCardValue,
          Birthday: birthday,
          Gender: Gender,
          Ethnic: Ethnic,
          TypeOfEmployee: Type,
        }
      )
      .then(function (response) {
        toast.success("Cập nhật thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setcheck(1);
        SetNameValue("");
        SetIdentityCardValue("");
        SetEarningsValue("");
        SetDayoff("");
        SetPaidLastYearValue("");
        SetPaidToCateValue("");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/staff")
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:8888/api/shareholder/all-shareholder")
      .then(function (response) {
        setDataUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
              <input
                type="number"
                placeholder="Search . . ."
                value={search}
                onChange={(e) => {
                  SetSearch(e.target.value);
                }}
              />{" "}
              <i class="bx bx-search-alt-2" onClick={FindShareholder}></i>
            </div>
          </div>
          <div className="container_AddUserDetail_body_main">
            <div className="container_AddUserDetail_form_scroll">
              <div className="container_AddUserDetail_form">
                <form id="form" class="form">
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
                    <select
                      name=""
                      id=""
                      value={IsShareholder}
                      onChange={(e) => {
                        SetIsShareholder(e.target.value);
                      }}
                    >
                      <option value="Phải">Phải</option>
                      <option value="Không">Không</option>
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
                    <label>DayOff</label>
                    <input
                      min="0"
                      max="10"
                      type="number"
                      value={Dayoff}
                      onChange={(e) => SetDayoff(e.target.value)}
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
                </form>
                {check === 1 && (
                  <button className="submit_btn" onClick={handleAddUserDetail}>
                    Submit
                  </button>
                )}
                {check === 2 && (
                  <button
                    className="update_btn"
                    onClick={handleUpdateUserDetail}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default AddUserDetail;
