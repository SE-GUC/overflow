import React, { Component } from "react";
import { get, put, del } from "../services/axios";
import Container from "../components/profileContainer/Container.js";
import { Dimmer, Loader, Confirm } from "semantic-ui-react";
import decode from "jwt-decode";
import storageChanged from "storage-changed";
import { withRouter } from "react-router-dom";

export default class Members extends Component {
  state = {
    loading: true,
    error: false,
    partners: [],
    filteredPartners: [],
    fieldofWorkFilters: [],
    adminType: false,
    pendingCount: 0,
    deletedId: "",
    openConfirm: false
  };
  componentDidMount() {
    this.setToken();
    get("users/partners")
      .then(partners => {
        this.setData(partners, this.state.adminType);
        this.setState({ partners, loading: false });
      })
      .catch(error => this.setState({ error: true, loading: false }));

    //handling token change
    storageChanged("local", {
      eventName: "tokenChange"
    });
    window.addEventListener("tokenChange", this.setToken);
  }
  setToken = () => {
    const tokenCheck = localStorage.getItem("jwtToken");
    if (!tokenCheck) {
      this.setState({ adminType: false });
      this.setData(this.state.partners, false);
      return;
    }
    const decoded = decode(localStorage.getItem("jwtToken"));
    if (decoded.type === "admin") {
      this.setState({ adminType: true });
      this.setData(this.state.partners, true);
    }
  };

  componentWillUnmount() {
    window.removeEventListener("storage", this.setToken);
  }

  setData = (partners, adminType) => {
    if (partners.length === 0) return;
    let pendingCount = 0;
    const filteredPartners = [];
    const fieldofWorkFilters = [];
    partners.forEach(partner => {
      if (partner.userData.approved || adminType) {
        if (!partner.userData.approved) pendingCount++;
        filteredPartners.push(partner);
      }
      const { fieldOfWork } = partner.userData;
      if (fieldOfWork) {
        if (!fieldofWorkFilters.includes(fieldOfWork))
          fieldofWorkFilters.push(fieldOfWork);
      }
    });
    this.setState({ fieldofWorkFilters, filteredPartners, pendingCount });
  };
  setApproved = id => {
    const { filteredPartners, adminType } = this.state;
    const approvedPartner = filteredPartners.find(
      partner => partner._id === id
    );
    const { name, email } = approvedPartner;
    const {
      address,
      fax,
      phone,
      partners,
      members,
      projects
    } = approvedPartner.userData;
    approvedPartner.userData.approved = true;
    let { fieldOfWork, image } = approvedPartner.userData;
    if (!image) image = "N/A";
    if (!fieldOfWork) fieldOfWork = "N/A";
    const url = "users/partners/update/" + id;
    const data = {
      name,
      email,
      address,
      fax,
      phone,
      partners,
      members,
      projects,
      fieldOfWork,
      approved: true
    };
    put(url, data).then(this.setData(filteredPartners, true));
  };
  openConfirm = deletedId => {
    this.setState({ deletedId, openConfirm: true });
  };
  delete = () => {
    this.setState({ openConfirm: false });
    const { deletedId } = this.state;
    let { partners } = this.state;
    const partnerIndex = partners.findIndex(
      partner => partner._id === deletedId
    );
    partners.splice(partnerIndex, 1);
    this.setState({ partners });
    console.log(partners);
    this.setData(partners, true);
    const url = "users/delete/" + deletedId;
    del(url, {});
  };
  closeConfirm = () => {
    this.setState({ deletedId: "", openConfirm: false });
  };
  redirectProfile = (id, partner) => {
    this.props.history.push({
      pathname: "/Partner/" + id,
      state: { partner }
    });
  };

  render() {
    const {
      filteredPartners,
      loading,
      fieldofWorkFilters,
      adminType,
      pendingCount,
      openConfirm
    } = this.state;
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
        <Container
          redirect={this.redirectProfile}
          del={this.openConfirm}
          approve={this.setApproved}
          adminType={adminType}
          pendingCount={pendingCount}
          loading={loading}
          pageTitle="Partners"
          pageSubHeader="Our trusted partners"
          data={filteredPartners}
          filterTitles={["Field", "Approved"]}
          filterValues={[fieldofWorkFilters, ["Yes", "No"]]}
        />
        <Confirm
          open={openConfirm}
          onCancel={this.closeConfirm}
          onConfirm={this.delete}
        />
      </div>
    );
  }
}
