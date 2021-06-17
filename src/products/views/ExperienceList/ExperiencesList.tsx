import { CircularProgress } from "@material-ui/core";
import Container from "@saleor/components/Container";
import useUser from "@saleor/hooks/useUser";
import React from "react";

import ExperiencesListPage from "./components/ExperiencesListPage";
import { PastExperiencesListQuery } from "./queries";

const ExperiencesList: React.FC = () => {
  const { user } = useUser();
  return (
    <PastExperiencesListQuery variables={{ vendorId: user.vendorId }}>
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
            <ExperiencesListPage data={data} />
          </Container>
        );
      }}
    </PastExperiencesListQuery>
  );
};

export default ExperiencesList;
