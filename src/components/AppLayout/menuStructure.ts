import appsIcon from "@assets/images/menu-apps-icon.svg";
import catalogIcon from "@assets/images/menu-catalog-icon.svg";
import customerIcon from "@assets/images/menu-customers-icon.svg";
import discountsIcon from "@assets/images/menu-discounts-icon.svg";
import homeIcon from "@assets/images/menu-home-icon.svg";
import ordersIcon from "@assets/images/menu-orders-icon.svg";
import translationIcon from "@assets/images/menu-translation-icon.svg";
import { commonMessages, sectionNames } from "@saleor/intl";
import { IntlShape } from "react-intl";

import { appsListPath } from "../../apps/urls";
import { categoryListUrl } from "../../categories/urls";
import { collectionListUrl } from "../../collections/urls";
import { customerListUrl } from "../../customers/urls";
import { saleListUrl, voucherListUrl } from "../../discounts/urls";
import { orderDraftListUrl, orderListUrl } from "../../orders/urls";
import { productListUrl } from "../../products/urls";
import { languageListUrl } from "../../translations/urls";
import { PermissionEnum } from "../../types/globalTypes";

export interface IMenuItem {
  ariaLabel: string;
  children?: IMenuItem[];
  icon?: any;
  label: string;
  permission?: PermissionEnum;
  testingContextId: string;
  url?: string;
}

function createMenuStructure(intl: IntlShape): IMenuItem[] {
  return [
    {
      ariaLabel: "home",
      icon: homeIcon,
      label: intl.formatMessage(sectionNames.home),
      testingContextId: "home",
      url: "/"
    },
    {
      ariaLabel: "perfil",
      icon: customerIcon,
      label: intl.formatMessage(sectionNames.perfil),
      permission: PermissionEnum.MANAGE_USERS,
      testingContextId: "perfil",
      url: "/perfil"
    },
    {
      ariaLabel: "experiencies",
      icon: customerIcon,
      label: intl.formatMessage(sectionNames.experiences),
      permission: PermissionEnum.MANAGE_USERS,
      testingContextId: "experiencies",
      url: "/experiences"
    },
    {
      ariaLabel: "experiencesList",
      icon: customerIcon,
      label: intl.formatMessage(sectionNames.experienceList),
      permission: PermissionEnum.MANAGE_USERS,
      testingContextId: "experiencesList",
      url: "/experiencesList"
    },
    {
      ariaLabel: "products",
      icon: catalogIcon,
      label: intl.formatMessage(sectionNames.products),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      testingContextId: "products",
      url: "/productsManager/"
    },
    {
      ariaLabel: "productsList",
      icon: catalogIcon,
      label: intl.formatMessage(sectionNames.productsList),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      testingContextId: "products",
      url: productListUrl()
    },
    {
      ariaLabel: "categories",
      icon: catalogIcon,
      label: intl.formatMessage(sectionNames.categories),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      testingContextId: "categories",
      url: categoryListUrl()
    },
    {
      ariaLabel: "activeServices",
      icon: catalogIcon,
      label: intl.formatMessage(sectionNames.activeServices),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      testingContextId: "servicios",
      url: "/activeServices"
    },
    {
      ariaLabel: "collections",
      icon: catalogIcon,
      label: intl.formatMessage(sectionNames.collections),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      testingContextId: "collections",
      url: collectionListUrl()
    },

    {
      ariaLabel: "orders",
      children: [
        {
          ariaLabel: "orders",
          label: intl.formatMessage(sectionNames.orders),
          permission: PermissionEnum.MANAGE_ORDERS,
          testingContextId: "orders",
          url: orderListUrl()
        },
        {
          ariaLabel: "order drafts",
          label: intl.formatMessage(commonMessages.drafts),
          permission: PermissionEnum.MANAGE_ORDERS,
          testingContextId: "order drafts",
          url: orderDraftListUrl()
        }
      ],
      icon: ordersIcon,
      label: intl.formatMessage(sectionNames.orders),
      permission: PermissionEnum.MANAGE_ORDERS,
      testingContextId: "orders"
    },
    {
      ariaLabel: "customers",
      icon: customerIcon,
      label: intl.formatMessage(sectionNames.customers),
      permission: PermissionEnum.MANAGE_USERS,
      testingContextId: "customers",
      url: customerListUrl()
    },

    {
      ariaLabel: "discounts",
      children: [
        {
          ariaLabel: "sales",
          label: intl.formatMessage(sectionNames.sales),
          testingContextId: "sales",
          url: saleListUrl()
        },
        {
          ariaLabel: "vouchers",
          label: intl.formatMessage(sectionNames.vouchers),
          testingContextId: "vouchers",
          url: voucherListUrl()
        }
      ],
      icon: discountsIcon,
      label: intl.formatMessage(commonMessages.discounts),
      permission: PermissionEnum.MANAGE_DISCOUNTS,
      testingContextId: "discounts"
    },
    {
      ariaLabel: "apps",
      icon: appsIcon,
      label: intl.formatMessage(sectionNames.apps),
      permission: PermissionEnum.MANAGE_APPS,
      testingContextId: "apps",
      url: appsListPath
    },
    {
      ariaLabel: "translations",
      icon: translationIcon,
      label: intl.formatMessage(sectionNames.translations),
      permission: PermissionEnum.MANAGE_TRANSLATIONS,
      testingContextId: "translations",
      url: languageListUrl
    }
  ];
}

export default createMenuStructure;
