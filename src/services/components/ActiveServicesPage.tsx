import React from "react";

import ActiveServicesTable from "./ActiveServicesTable";

const ExperiencesListPage = props => {
  const { data } = props;
  return <ActiveServicesTable data={data} />;
};

export default ExperiencesListPage;
