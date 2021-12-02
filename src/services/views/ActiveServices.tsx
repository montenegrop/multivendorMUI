import { CircularProgress, Container } from "@material-ui/core";
import useUser from "@saleor/hooks/useUser";
import React from "react";

import ActiveServicesPage from "../../services/components/ActiveServicesPage";
import { ActiveServicesListQuery } from "./queries";

const ActiveServices: React.FC = () => {
  const { user } = useUser();
  return (
    <ActiveServicesListQuery variables={{ vendorId: user.vendorId }}>
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
            <ActiveServicesPage data={data} />
          </Container>
        );
      }}
    </ActiveServicesListQuery>
  );
};

export default ActiveServices;
