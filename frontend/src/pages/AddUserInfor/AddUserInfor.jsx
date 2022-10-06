import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./AddUserInfor.scss";

const AddUserInfor = () => {
  const [data, setData] = useState([]);
  const [search, SetSearch] = useState("");
  const [ShareholderID, SetShareholderID] = useState(0);
  const [NameValue, SetNameValue] = useState("");
  const [IdentityCardValue, SetIdentityCardValue] = useState(0);
  const [BirthdayValue, SetBirthdayValue] = useState("");
  const [EthnicValue, SetEthnic] = useState("");
  const [GenderValue, SetGender] = useState("Nam");
  const [TypeOfEmployeeValue, SetTypeOfEmployeeValue] = useState("NVTTG");
  const [check, setCheck] = useState(1);

  const handleAddUserInformation = () => {
    var min = 100000;
    var max = 999999;
    var rand = Math.floor(min + Math.random() * (max - min));
    if (
      NameValue === "" ||
      IdentityCardValue === "" ||
      BirthdayValue === "" ||
      EthnicValue === ""
    ) {
      toast.warn("Vui lòng nhập đầy đủ thông tin !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      addSqlServer(rand);
    }
  };

  const addSqlServer = (rand) => {
    axios
      .post("http://localhost:8888/api/shareholder/add-shareholder", {
        ShareholderID: rand,
        NameShareholder: NameValue,
        IdentityCard: IdentityCardValue,
        Birthday: BirthdayValue,
        Gender: GenderValue,
        Ethnic: EthnicValue,
        TypeOfEmployee: TypeOfEmployeeValue,
      })
      .then(function (response) {
        toast.success("Thêm thông tin thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        addMysql(rand);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const addMysql = (rand) => {
    axios
      .post("http://localhost:8000/add", {
        ShareholderID: rand,
        Name: NameValue,
        IdentityCard: IdentityCardValue,
        IsShareholder: "",
        Earnings: 0,
        DayOff: 0,
        PaidLastYear: 0,
        PaidToCate: 0,
      })
      .then(function (response) {
        toast.success("Thêm thông tin chi tiết thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        SetNameValue("");
        SetIdentityCardValue("");
        SetBirthdayValue("");
        SetEthnic("");
        SetGender("");
        SetTypeOfEmployeeValue("");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const FindShareholder = () => {
    // const valueShareholder = data.find((item) => item.ShareholderID === search);
    const valueUser = data.find((item) => item.ShareholderID == search);
    if (!valueUser) {
      toast.error("Mã này không tồn tại !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      SetSearch("");
    } else {
      toast.success("Trích xuất thông tin thành công !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      SetSearch("");
      setCheck(2);
      SetShareholderID(valueUser.ShareholderID);
      SetNameValue(valueUser.NameShareholder);
      SetIdentityCardValue(valueUser.IdentityCard);
      SetBirthdayValue(valueUser.Birthday);
      SetEthnic(valueUser.Ethnic);
      SetGender(valueUser.Gender);
      SetTypeOfEmployeeValue(valueUser.TypeOfEmployee);
    }
  };

  const handleUpdateUserInformation = () => {
    axios
      .put(
        `http://localhost:8888/api/shareholder/update-shareholder/${ShareholderID}`,
        {
          NameShareholder: NameValue,
          IdentityCard: IdentityCardValue,
          Birthday: BirthdayValue,
          Gender: EthnicValue,
          Ethnic: GenderValue,
          TypeOfEmployee: TypeOfEmployeeValue,
        }
      )
      .then(function (response) {
        toast.success("Cập nhật thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        UpdateMysql();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };
  const UpdateMysql = () => {
    axios
      .put(`http://localhost:8000/update/${ShareholderID}`, {
        Name: NameValue,
        IdentityCard: IdentityCardValue,
        // IsShareholder: IsShareholder,
        // Earnings: EarningsValue,
        // DayOff: Dayoff,
        // PaidLastYear: PaidLastYearValue,
        // PaidToCate: PaidToCateValue,
      })
      .then(function (response) {
        toast.success("Cập nhật chi tiết thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setCheck(1);
        SetNameValue("");
        SetIdentityCardValue("");
        SetBirthdayValue("");
        SetEthnic("");
        SetGender("");
        SetTypeOfEmployeeValue("");
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
      .get("http://localhost:8888/api/shareholder/all-shareholder")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
              <input
                type="text"
                placeholder="Search . . ."
                value={search}
                onChange={(e) => {
                  SetSearch(e.target.value);
                }}
              />{" "}
              <i class="bx bx-search-alt-2" onClick={FindShareholder}></i>
            </div>
          </div>

          <div className="container_AddUserInfor_body_main">
            <div className="container_AddUserInfor_form_scroll">
              <div className="container_AddUserInfor_form">
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
                      min="1000"
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
                    <select
                      name=""
                      id=""
                      value={GenderValue}
                      onChange={(e) => SetGender(e.target.value)}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nu">Nữ</option>
                    </select>
                  </div>
                  <div class="form-control">
                    <label>Ethnic</label>
                    <input
                      type="text"
                      value={EthnicValue}
                      onChange={(e) => SetEthnic(e.target.value)}
                    />
                  </div>
                  <div class="form-control">
                    <label>TypeOfEmployee</label>
                    <select
                      name=""
                      id=""
                      value={TypeOfEmployeeValue}
                      onChange={(e) => SetTypeOfEmployeeValue(e.target.value)}
                    >
                      <option value="NVTTG">Nhân viên toàn thời gian</option>
                      <option value="NVBTT">Nhân viên bán thời gian</option>
                    </select>
                  </div>
                </form>
                {check === 1 && (
                  <button
                    className="submit_btn"
                    onClick={handleAddUserInformation}
                  >
                    Submit
                  </button>
                )}
                {check === 2 && (
                  <button
                    className="update_btn"
                    onClick={handleUpdateUserInformation}
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

export default AddUserInfor;
