import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./ChangeEmail.css";

export default function ChangeEmail(props) {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validatEmailForm() {
    return email.length > 0;
  }

  function validateConfirmForm() {
    return code.length > 0;
  }

  /*async function handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };*/

  async function handleUpdateClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: email });

      setCodeSent(true);

    } catch (e) {
      alert(e.message);
      setIsSendingCode(false);
    }
  };

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", code);

      props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      setIsConfirming(false);
    }
  };

  function renderUpdateForm() {
    return (
      <form onSubmit={handleUpdateClick}>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          text="Update Email"
          loadingText="Updating…"
          disabled={!validatEmailForm()}
          isLoading={isSendingCode}
        />
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmClick}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <HelpBlock>
            Please check your email ({email}) for the confirmation
            code.
          </HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          text="Confirm"
          loadingText="Confirm…"
          isLoading={isConfirming}
          disabled={!validateConfirmForm()}
        />
      </form>
    );
  }

    return (
      <div className="ChangeEmail">
        {!codeSent
          ? renderUpdateForm()
          : renderConfirmationForm()}
      </div>
    );

}
