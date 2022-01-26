import {
  Box,
  IconButton,
  Toolbar,
  AppBar,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { IModalProps, ITabPanel } from "../../../utils/interfaces";
import { MainForm } from "./Forms/login.signup";

function TabPanel(props: ITabPanel) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const LoginModal: React.FC<IModalProps> = ({ closeFunction }) => {
  const [value, setValue] = React.useState(0);
  const user = useSelector((state: State) => state.UserReducer.exist);

  if (user) {
    closeFunction();
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            maxWidth="900px"
            margin="auto"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              centered
            >
              <Tab label="Login" />
              <Tab label="SignUp" />
            </Tabs>
            <IconButton
              edge="end"
              color="secondary"
              onClick={closeFunction}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        width="100%"
        marginTop={2}
        maxWidth="900px"
        marginLeft="auto"
        marginRight="auto"
      >
        <Paper elevation={0}>
          <TabPanel value={value} index={0}>
            <MainForm variant="login" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MainForm variant="signup" />
          </TabPanel>
        </Paper>
      </Box>
    </>
  );
};
