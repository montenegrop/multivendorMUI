import React from "react";

import { vendorServiceContracts_vendor } from "../views/types/vendorServiceContracts";
import ActiveServicesTable from "./ActiveServicesTable";

const ExperiencesListPage = ({
  __typename,
  id,
  name,
  email,
  serviceContracts
}: vendorServiceContracts_vendor) => (
  <ActiveServicesTable propWhichIsArray={serviceContracts} />
);

export default ExperiencesListPage;
