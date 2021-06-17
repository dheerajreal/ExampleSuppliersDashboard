import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

const ModalForm = ({ item }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [pk, setPk] = useState("");

  useEffect(() => {
    // console.log(item);
    setName(item.business_name);
    setAddress(item.business_address);
    setEmail(item.email);
    setVisible(item.visible);
    setPk(item.pk);
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.checkValidity());
    e.target.className = "was-validated";
    if (e.target.checkValidity()) {
      let formdata = {
        email: email,
        business_name: name,
        business_address: address,
        pk: pk,
      };
      console.log(formdata);
      //   axios.post();
    }
  };
  return (
    <>
      <Modal
        show={visible}
      >
        <div className="mx-3">
          <form onSubmit={handleSubmit} noValidate className="needs-validation">
            <div className="row">
              <div className="col">
                <h3 className="mb-4 mt-4">Edit account</h3>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Email address</label>
                  <br />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  />
                  <div className="invalid-feedback">Please enter an email</div>
                </div>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Name</label>
                  <br />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Business Name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please Enter Business Name
                  </div>
                </div>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Address</label>
                  <br />
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Business Address"
                    required
                  />
                  <div className="invalid-feedback">
                    Please Enter Business Address
                  </div>
                </div>

                <br />

                <br />
              </div>
            </div>
            <button type="submit" className="mb-4 mt-4 btn btn-primary">
              Submit
            </button>
            <button
              onClick={(e) => {
                setVisible(false);
                setName("");
                setAddress("");
                setEmail("");
                setPk("");
              }}
              className="mb-4 mt-4 btn btn-primary"
              style={{ marginLeft: 30 }}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalForm;
