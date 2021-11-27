import { CircularProgress, Container } from "@material-ui/core";
import React from "react";

import ActiveServicesPage from "../../services/components/ActiveServicesPage";
import { ActiveServicesListQuery } from "./queries";

const ActiveServices: React.FC = () => (
  <ActiveServicesListQuery variables={{ vendorId: "uservendorId" }}>
    {({ data, loading }) => {
      if (loading) {
        return (
          <Container>
            <CircularProgress />
          </Container>
        );
      }

      return (
        <Container>
          <ActiveServicesPage data="data de la query" />
        </Container>
      );
    }}
  </ActiveServicesListQuery>
);

export default ActiveServices;
