import React from "react";

import ExperiencesTable from "./ExperiencesTable";

const ExperiencesListPage = props => {
  const { data } = props;
  // console.log(data);
  return <ExperiencesTable data={data.vendor.pastExperiences} />;
};

export default ExperiencesListPage;
