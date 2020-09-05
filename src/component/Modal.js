import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const Modal = ({
  open,
  onClose,
  title,
  content,
  onPressYes,
  onPressCancel,
  yesText,
  cancelText,
  component,
  to,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onPressCancel} color="primary">
            {cancelText}
          </Button>
          <Button
            onClick={onPressYes}
            component={component}
            to={to}
            color="primary"
            autoFocus
          >
            {yesText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
