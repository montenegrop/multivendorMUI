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
    root: {
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

      {expIds.map((expId, indx) => (
        <ExpForm
          location={location}
          expId={expId}
          key={indx}
          classes={classes}
          vendorServices={vendorServices}
        />
      ))}
      {stateEmptyExp.loading ? (
        <CircularProgress />
      ) : (
        <Button variant="outlined" onClick={handleCreateExp}>
          Suma Experiencia
        </Button>
      )}
      {expIds.length > 0 ? (
        <Button variant="outlined" onClick={handleBulkSubmit}>
          Guardar experiencias
        </Button>
      ) : null}
    </Container>
  );
};

export default ExperiencesCreatePage;
