import React from "react";

import ExperiencesTable from "./ExperiencesTable";

const ExperiencesListPage = props => {
  const { data } = props;
  return <ExperiencesTable data={data} />;
};

export default ExperiencesListPage;
