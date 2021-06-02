import DateFnsUtils from "@date-io/date-fns";
import { CardContent } from "@material-ui/core";
import { CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import Container from "@saleor/components/Container";
import { FormChange } from "@saleor/hooks/useForm";
import React from "react";

import PickPlace from "./PickPlace";
const useStyles = makeStyles(
  theme => ({
    location: {
      display: "grid",
      gridColumnEnd: "3",
      gridColumnStart: "1"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "DataPrincipal" }
);

interface IProps {
  vendorServices: [{ id: string; name: string }];
  year: number;
  data: any;
  location: { city: string; province: string };
  change: FormChange;
  error: {
    serviceId: boolean;
    city: boolean;
    province: boolean;
    year: boolean;
  };
}

export const DataPrincipal: React.FC<IProps> = props => {
  const { vendorServices, year, data, change, location, error } = props;

  const classes = useStyles(props);
  // console.log(vendorServices);

  return (
    <div id="data-principal">
      <CardContent className={classes.root}>
        <div id="datePicker">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              id="year"
              inputVariant="standard"
              label="Año"
              name="year"
              error={error.year}
              helperText={error.year ? "Indique el año de realización" : null}
              onChange={date => {
                change({
                  target: {
                    name: "year",
                    value: date
                  }
                });
              }}
              value={data.year}
              autoOk
              views={["year"]}
              variant="dialog"
              maxDate={new Date()}
              InputLabelProps={{
                shrink: true
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Autocomplete
          options={vendorServices.map(service => service)}
          getOptionLabel={option => option.name}
          onChange={(event, newValue: any) => {
            change({ target: { name: "serviceId", value: newValue.id } });
          }}
          renderInput={params => (
            <TextField
              error={error.serviceId}
              {...params}
              label="Servicio"
              variant="standard"
            />
          )}
        />
        <PickPlace
          error={error}
          data={data}
          change={change}
          className={classes.location}
          noCP
        />
      </CardContent>
    </div>
  );
};

export default DataPrincipal;
