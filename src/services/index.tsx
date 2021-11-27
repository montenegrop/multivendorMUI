import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import ActiveServicesComponent from "./views/ActiveServices";

const ActiveServices: React.FC<RouteComponentProps<any>> = () => (
  <ActiveServicesComponent />
);

const Component = () => (
  <>
    <WindowTitle title="Titulo de Servicios" />
    <Switch>
      <Route path={"/activeServices"} component={ActiveServices} />
    </Switch>
  </>
);

export default Component;
