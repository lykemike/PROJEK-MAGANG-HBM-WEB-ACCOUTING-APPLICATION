import React from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import {
  Button,
  Table,
  DropdownButton,
  Card,
  Form,
  Row,
  Col,
  FormGroup,
  Dropdown,
} from "react-bootstrap";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const cashlink = () => {
  return (
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem>Dashboard</MenuItem>
        <SubMenu title="Components">
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default cashlink;
