import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({appProps}) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} />
      <AppliedRoute path="/signin" exact component={Signin} appProps={appProps}/>
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps}/>
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}

