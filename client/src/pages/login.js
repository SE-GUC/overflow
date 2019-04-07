import React, { Component } from "react";
import * as axios from "../services/axios.js";
import {
  Form,
  Grid,
  Header,
  Input,
  Button,
  Divider,
  Dropdown,
  Message,
  Container,
  Icon
}
from "semantic-ui-react";
import "../styling/login.css";
class login extends React.Component {
 render(){
     return{
        <div className="login">
        <h1>Login </h1>
        </div>
     };
 }
}
export default login;