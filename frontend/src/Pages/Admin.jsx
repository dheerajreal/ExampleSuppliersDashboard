import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import ModalForm from "../Components/ModalForm";
import Navbar from "../Components/Navbar";
import url from "../Utils/url";

const Admin = () => {
  const refresh_token = localStorage.getItem("refresh_token");
  const history = useHistory();
  const businessName = localStorage.getItem("business_name");
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [ordering, setOrdering] = useState("-pk");
  const [editFormAccount, setEditFormAccount] = useState({});

  const pageNumberChange = (action) => {
    if (action === "increment" && nextPage) {
      setPage(page + 1);
    }
    if (action === "decrement" && previousPage) {
      setPage(page - 1);
    }
    setEditFormAccount({});
  };

  useEffect(() => {
    axios
      .get(url + "/myaccount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("is_supplier", data.data.is_supplier);
        localStorage.setItem("is_staff", data.data.is_staff);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("business_name", data.data.business_name);
        localStorage.setItem("business_address", data.data.business_address);
      })
      .then(() => {
        let is_staff = localStorage.getItem("is_staff");
        console.log(is_staff);
        is_staff = String(is_staff).toLowerCase() === "true";
        console.log(is_staff);

        if (!is_staff) {
          history.push("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  }, [history]);

  useEffect(() => {
    axios
      .get(
        url + `/accounts?page=${page}&ordering=${ordering}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((data) => {
        setAccounts(data.data.results);
        setNextPage(data.data.next);
        setPreviousPage(data.data.previous);
      });
  }, [search, page, ordering]);

  const arrow = (desc, column) => {
    return (
      <span
        onClick={(e) => setOrdering(`${desc && "-"}${column}`)}
        style={{ cursor: "pointer" }}
        key={`${desc && "-"}${column}`}
      >
        {!desc ? "⬆" : "⬇"}
      </span>
    );
  };
  // useEffect(() => {
  //   console.log(accounts);
  //   console.log(nextPage);
  //   console.log(previousPage);
  // }, [accounts, nextPage, previousPage]);

  if (!refresh_token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <Navbar />

        <div className="container">
          <h1>Hello, {businessName === "null" ? "Admin" : businessName} </h1>
          <h2> </h2>
        </div>
        <br />
        <br />
        <div className="container">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setEditFormAccount({});
              setSearch(e.target.value);
            }}
            type="search"
            className="form-control"
            placeholder="Search"
            required
          />
        </div>

        <br />
        <hr />
        <div className="container">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="row">
                  id {[arrow(false, "pk"), arrow(true, "pk")]}
                </th>
                <th>
                  Business Name
                  {[
                    arrow(false, "business_name"),
                    arrow(true, "business_name"),
                  ]}
                </th>
                <th>Email {[arrow(false, "email"), arrow(true, "email")]}</th>
                <th>
                  Address
                  {[
                    arrow(false, "business_address"),
                    arrow(true, "business_address"),
                  ]}
                </th>
                <th>
                  Type {[arrow(false, "is_staff"), arrow(true, "is_staff")]}
                </th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => {
                return (
                  <tr key={acc.pk}>
                    <th scope="row">{acc.pk}</th>
                    <td>{acc.business_name}</td>
                    <td>{acc.email}</td>
                    <td>{acc.business_address}</td>
                    <td>{acc.is_supplier ? "Supplier" : "Staff"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={(e) => {
                          // console.log(acc);
                          setEditFormAccount({
                            ...acc,
                            visible: true,
                          });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={(e) => {
                          let resp = window.confirm(
                            "Do you really want to delete this supplier"
                          );
                          if (resp === true) {
                            axios
                              .delete(url + `/accounts/${acc.pk}/`, {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "access_token"
                                  )}`,
                                },
                              })
                              .then((data) => {
                                console.log(data);
                                toast.dark("Deletion success");
                                setAccounts(
                                  accounts.filter((item) => item !== acc)
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                                toast.error("Failed to delete");
                              });
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {previousPage && (
            <button
              className="btn btn-sm"
              onClick={(e) => pageNumberChange("decrement")}
            >
              previous
            </button>
          )}
          {(previousPage || nextPage) && (
            <span
              style={{ cursor: "text", marginRight: 40, marginLeft: 40 }}
              className="text-muted"
            >
              current page: {page}
            </span>
          )}
          {nextPage && (
            <button
              className="btn btn-sm"
              onClick={(e) => pageNumberChange("increment")}
            >
              next
            </button>
          )}
        </div>
        <Footer />
        <ModalForm item={{ ...editFormAccount }} />
      </>
    );
  }
};

export default Admin;
