import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Container from "@saleor/components/Container";
import React from "react";

import PageHeader from "../../../../components/PageHeader";
import {
  useCreateEmptyExperience,
  useCreateExperience,
  useUploadExperienceImage
} from "../mutation";
import { ExpForm } from "./ExpForm";

const useStyles = makeStyles(
  theme => ({
    bar: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "16px 16px 0 0",
      bottom: "0px",
      boxShadow: theme.shadows[15],
      display: "flex",
      justifyContent: "space-between",
      padding: "0.8rem",
      position: "sticky",
      zIndex: 2000
    },
    container: {
      backgroundColor: theme.palette.grey[200],
      padding: "0.5rem"
    },
    deleteButton: {
      backgroundColor: theme.palette.secondary.contrastText,
      margin: "1rem"
    },
    disabled: {
      "& span": {
        color: theme.palette.grey[200]
      },
      backgroundColor: theme.palette.grey[300],
      borderColor: theme.palette.grey[200],
      color: theme.palette.grey[200]
    },
    root: {
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRow: "1fr 1fr"
      },
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr"
    },
    rootLeft: {
      display: "grid",
      gridTemplateRows: "1fr 1fr"
    }
  }),
  { name: "Experiences" }
);

interface IProps {
  data: any;
}

const ExperiencesCreatePage: React.FC<IProps> = props => {
  const [createEmptyExperience, stateEmptyExp] = useCreateEmptyExperience({});

  const [expIds, setExpIds] = React.useState([]);
  const [hasChanges, setHasChanges] = React.useState([]);

  const handleCreateExp = () => {
    createEmptyExperience({}).then(response => {
      const id = response.data.pastExperienceCreate.pastExperience.id;
      setExpIds(expIds.concat(id));
    });
  };

  const deleteExp = expId => {
    const newExpIds = expIds.filter(thisExpId => thisExpId !== expId);
    setExpIds(newExpIds);
  };

  const handleBulkSubmit = () => {
    expIds.forEach(expId => {
      const form = document.getElementById(`${expId}`) as HTMLFormElement;
      form.requestSubmit();
    });
  };

  const vendorServices = props.data.vendor.services.edges.map(
    edge => edge.node
  );
  const location = props.data.vendor.location;
  const classes = useStyles(props);

  React.useEffect(() => {
    // console.log()
  }, []);

  return (
    <Container>
      <PageHeader title={"Ingresa aquí tus Experiences"} />

      {expIds.map(expId => (
        <ExpForm
          location={location}
          expId={expId}
          key={expId}
          classes={classes}
          vendorServices={vendorServices}
          deleteExp={deleteExp}
          setHasChanges={setHasChanges}
          hasChanges={hasChanges}
        />
      ))}
      <div className={classes.bar}>
        {stateEmptyExp.loading ? (
          <CircularProgress />
        ) : (
          <Button color="primary" variant="outlined" onClick={handleCreateExp}>
            Sumar Experiencia
          </Button>
        )}
        {expIds.length > 0 ? (
          <Button
            disabled={Object.values(hasChanges).includes(true) ? false : true}
            variant="outlined"
            onClick={handleBulkSubmit}
            classes={{ disabled: classes.disabled }}
          >
            Guardar experiencias
          </Button>
        ) : null}
      </div>
    </Container>
  );
};

export default ExperiencesCreatePage;
