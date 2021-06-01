import React from "react";
import { CustomAppBar } from "../../AppBar/appbar";

interface IProfileProps {
  closeFunction: () => boolean;
}

export const ProfileModal: React.FC<IProfileProps> = ({ closeFunction }) => {
  return <CustomAppBar variant="Profile" closeFunction={closeFunction} />;
};
