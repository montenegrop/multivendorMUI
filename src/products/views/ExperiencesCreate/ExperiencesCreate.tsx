import { CircularProgress } from "@material-ui/core";
import Container from "@saleor/components/Container";
import useUser from "@saleor/hooks/useUser";
import React from "react";

import ExperiencesCreatePage from "./components/ExperiencesCreatePage";
import { VendorDataQuery } from "./queries";

const ExperiencesCreate: React.FC = () => {
  const { user } = useUser();

  return (
    <VendorDataQuery variables={{ id: user.vendorId }}>
      {({ data, loading }) => {
        if (loading) {
          return (
            <Container>
              <CircularProgress />
            </Container>
          );
        }
        return (
          <>
            <ExperiencesCreatePage data={data} />
          </>
        );
      }}
    </VendorDataQuery>
  );
};

export default ExperiencesCreate;
