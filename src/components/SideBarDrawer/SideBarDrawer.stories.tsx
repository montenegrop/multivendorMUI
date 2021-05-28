import { staffMember } from "@saleor/staff/fixtures";
import Decorator from "@saleor/storybook/Decorator";
import { storiesOf } from "@storybook/react";
import { config } from "@test/intl";
import React from "react";
import { createIntl } from "react-intl";

import createMenuStructure from "../AppLayout/menuStructure";
import SideBarDrawer from "./SideBarDrawer";

const intl = createIntl(config);
const user = {
  __typename: staffMember.__typename,
  avatar: {
    __typename: staffMember.avatar.__typename,
    url: staffMember.avatar.url
  },
  email: staffMember.email,
  firstName: "Adam Evan",
  id: staffMember.id,
  isStaff: true,
  lastName: "Newton",
  note: null,
  phone: "+5493416966099",
  identification: "34121333",
  typeOfIdentification: null,
  vendorId: "AvsdsaD=",
  userPermissions: staffMember.userPermissions
};

storiesOf("Generics / Mobile Side Menu", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <SideBarDrawer
      location="/"
      menuItems={createMenuStructure(intl)}
      onMenuItemClick={() => undefined}
      renderConfigure={true}
      user={user}
    />
  ));
