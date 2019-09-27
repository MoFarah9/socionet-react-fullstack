import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";

import { editUserDetails } from "../../redux/actions/userActions";
import EditProfileDialog from "./EditProfileDialog";
import IconButton from "../common/IconButton";

const EditDetails = ({ editUserDetails, credentials }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton tip="Edit Details" onClick={handleOpen} className="edit-btn">
        <EditIcon color="primary" />
      </IconButton>
      <EditProfileDialog
        open={open}
        credentials={credentials}
        editUserDetails={editUserDetails}
        handleClose={handleClose}
      />
    </>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(EditDetails);
