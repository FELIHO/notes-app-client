import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";

export default function Settings(props) {

  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
        <LoaderButton
          block
          bsSize="large"
          text="Change Email"
        />
      </LinkContainer>
      <LinkContainer to="/settings/password">
        <LoaderButton
          block
          bsSize="large"
          text="Change Password"
        />
      </LinkContainer>
    </div>
  );
  
}
