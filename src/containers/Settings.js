import React, { useState } from "react";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import { Row, Form, FormGroup } from 'reactstrap';
import config from "../config";
import "./Settings.css";

export default function Settings(props) {
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      alert(error);
      return;
    }
  
    setIsLoading(true);
  
    try {
      await billUser({
        storage,
        source: token.id
      });
  
      alert("Your card has been charged successfully!");
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  
  return (
    <div className="Settings">
      <Form>
        <Row>

        <FormGroup>
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
          </FormGroup>

          <FormGroup>
            <StripeProvider apiKey={config.stripe.PUBLIC_STRIPE_KEY}>
              <Elements>
                <BillingForm
                  isLoading={isLoading}
                  onSubmit={handleFormSubmit}
                />
              </Elements>
            </StripeProvider>
          </FormGroup>

        </Row>
      </Form>
    </div>
  );

}

