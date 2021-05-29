import {
  CardContent,
  CircularProgress,
  InputLabel,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import { FormChange } from "@saleor/hooks/useForm";
import React from "react";

const useStyles = makeStyles(
  {
    long: {
      gridRowStart: "span 4"
    },
    root: {
      display: "grid",
      gridColumnEnd: "2",
      gridColumnStart: "1"
    },
    short: {
      gridRowStart: "span 2"
    }
  },
  { name: "DataExperiences" }
);

interface IProps {
  data: any;
  change: FormChange;
}

const DataExperiences: React.FC<IProps> = props => {
  const { change, data } = props;

  const limitShort = 90;
  const limitLong = 240;

  const classes = useStyles(props);

  return (
    <CardContent id="data-experiencias" className={classes.root}>
      <InputLabel id="descriptionShort">Descripción Corta</InputLabel>
      <TextField
        multiline
        rowsMax={3}
        inputProps={{
          maxLength: limitShort
        }}
        variant="outlined"
        className={classes.short}
        placeholder={`Descripción en ${limitShort} caracteres`}
        onChange={change}
        name="descriptionShort"
      />
      <CardSpacer />
      <InputLabel id="descriptionLong">Descripción Larga</InputLabel>
      <TextField
        multiline
        rowsMax={8}
        inputProps={{
          maxLength: limitLong
        }}
        variant="outlined"
        className={classes.long}
        placeholder={`Descripción en ${limitLong} caracteres`}
        onChange={change}
        name="descriptionLong"
      />
    </CardContent>
  );
};

export default DataExperiences;
