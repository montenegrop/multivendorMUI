import { Button, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

import useNotifier from "../../hooks/useNotifier";

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
  change: (event: ChangeEvent, cb?: () => void) => void;
  triggerChange: () => void;
  setVendorServices: (array: string[]) => void;
  vendorServices: string[];
  baseServices: Service[];
}

export const ServicesCheckboxes: React.FC<IProps> = props => {
  const {
    data,
    change,
    triggerChange,
    setVendorServices,
    vendorServices,
    baseServices
  } = props;

  const [localBaseServices, setLocalBaseServices] = React.useState([]);
  const classes = useStyles(props);
  const notify = useNotifier();

  React.useEffect(() => {
    // checkboxes state
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className={classes.container}>
      {localBaseServices?.sort().map((service, indx) => (
        <FormControlLabel
          key={indx}
          control={
            <Checkbox
              checked={service.checked}
              onChange={handleChange}
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
};
