import { Button, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React, { Dispatch, SetStateAction } from "react";

import Form from "../../components/Form";
import useNotifier from "../../hooks/useNotifier";
import { useUpdateServices } from "../mutations";

const useStyles = makeStyles(
  theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    label: {
      textTransform: "capitalize"
    },
    root: {
      minWidth: "200px",
      width: "30%"
    }
  }),
  { name: "CustomerCreateDetails" }
);
interface Service {
  node: { id: string; name: string; checked?: boolean };
}
export interface ChangeEvent<TData = any> {
  target: {
    name: string;
    value: TData;
  };
}

interface IProps {
  data?: any;
  perfilVendorData: any;
  user: any;
  setHasChanges: Dispatch<SetStateAction<any>>;
  baseServices: Service[];
}

export const ServicesCheckboxes: React.FC<IProps> = props => {
  const { perfilVendorData, user, baseServices, setHasChanges } = props;

  const [updateServices, stateUpdateServices] = useUpdateServices({});

  const [localBaseServices, setLocalBaseServices] = React.useState([]);
  const classes = useStyles(props);
  const notify = useNotifier();

  const [vendorServices, setVendorServices] = React.useState<string[]>([]);

  React.useEffect(() => {
    const servicesIdArray = perfilVendorData.services.edges.map(
      service => service.node.id
    );
    setVendorServices(servicesIdArray);
  }, []);

  React.useEffect(() => {
    const checkboxesState = baseServices.map(service => {
      service.node.checked = false;

      vendorServices.map(vendorService => {
        if (vendorService === service.node.id) {
          service.node.checked = true;
          return;
        }
      });
      return service.node;
    });
    setLocalBaseServices(checkboxesState);
  }, [vendorServices]);

  const initialForm = {
    id: user?.id,
    services:
      perfilVendorData &&
      perfilVendorData.services.edges.map(service => service.node.id)
  };

  const handleChange = (event, change) => {
    if (vendorServices.includes(event.target.id)) {
      const newServices = vendorServices.filter(id => id !== event.target.id);
      setVendorServices(newServices);
      change({ target: { name: "services", value: vendorServices } });
      return;
    }
    if (vendorServices.length === 5) {
      notify({
        status: "info",
        text: "El máximo de servicios que puedes ofrecer es 5"
      });
      return;
    }
    setVendorServices(vendorServices.concat(event.target.id));
    change({ target: { name: "services", value: vendorServices } });
  };

  const handleSubmit = () => {
    updateServices({
      variables: {
        services: vendorServices
      }
    });
  };

  return (
    <Form formId="serviceData" onSubmit={handleSubmit} initial={initialForm}>
      {({ change, hasChanged }) => {
        React.useEffect(() => {
          setHasChanges(prev => ({ ...prev, serviceData: hasChanged }));
        }, [hasChanged]);
        return (
          <div className={classes.container}>
            {localBaseServices?.sort().map((service, indx) => (
              <FormControlLabel
                key={indx}
                control={
                  <Checkbox
                    checked={service.checked}
                    onChange={event => handleChange(event, change)}
                    id={service.id}
                    name={service.name}
                    color="secondary"
                  />
                }
                label={service.name}
                classes={{ label: classes.label, root: classes.root }}
              />
            ))}
          </div>
        );
      }}
    </Form>
  );
};
