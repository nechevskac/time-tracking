import React from "react";

import {
  Box,
  ClickAwayListener,
  Dialog,
  DialogContent as _DialogContent,
  DialogTitle,
  IconButton,
  Paper as _Paper,
  styled,
} from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const IconBtn = styled(IconButton)({
  "&:hover": {
    backgroundColor: "unset",
  },
});

const CloseIcon = styled(CancelRoundedIcon)({
  color: "#6500ea",
});

const DialogContent = styled(_DialogContent)({
  overflowX: "hidden",
});

const Paper = styled(_Paper)({
  width: "295px",
  height: "350px",
  padding: "20px 20px 0 20px",
});

type CustomModalProps = {
  isOpen: boolean;
  title: string;
  close: () => void;
  children: object;
};

const CustomModal = (props: CustomModalProps) => {
  const { isOpen, title, close, children } = props;

  return (
    <Dialog open={isOpen} PaperComponent={Paper}>
      <Box display="flex" justifyContent="space-between">
        <DialogTitle>{title}</DialogTitle>
        <IconBtn onClick={close}>
          <CloseIcon />
        </IconBtn>
      </Box>
      <ClickAwayListener onClickAway={close}>
        <DialogContent>
          {children}
        </DialogContent>
      </ClickAwayListener>
    </Dialog>
  );
};

export default CustomModal;
