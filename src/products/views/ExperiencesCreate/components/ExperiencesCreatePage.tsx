import { CardContent } from "@material-ui/core";
import { CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import Container from "@saleor/components/Container";
import { SaveButtonBar } from "@saleor/components/SaveButtonBar";
import React from "react";

import Form from "../../../../components/Form";
import PageHeader from "../../../../components/PageHeader";
import { useCreateExperience } from "../mutation";
import DataExperiences from "./DataExperiences";
import DataImages from "./DataImages";
import DataPrincipal from "./DataPrincipal";

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

const initImages = ["0", "1", "2", "3", "4"].map(position => ({
  file: "",
  position
}));

const ExperiencesCreatePage: React.FC<IProps> = props => {
  const [createExperience, stateCreateExperience] = useCreateExperience({});
  const vendorServices = props.data.vendor.services.edges.map(
    edge => edge.node
  );

  const [images, setImages] = React.useState(initImages);

  const location = props.data.vendor.location;

  const classes = useStyles(props);

  const initialForm = {
    city: location.city,
    descriptionLong: "",
    descriptionShort: "",
    province: location.province,
    serviceId: "",
    year: new Date().getFullYear()
  };

  const handleSubmit = data => {
    // validar data obligatoria
    // console.log(data);
    // realizar submit
    if (data) {
      createExperience({
        variables: {
          city: data.city,
          descriptionLong: data.descriptionLong,
          descriptionShort: data.descriptionShort,
          province: data.province,
          serviceId: data.serviceId,
          year: data.year
        }
      });
    }
  };

  React.useEffect(() => {
    // console.log()
  }, [stateCreateExperience]);

  return (
    <Container>
      <PageHeader title={"Ingresa aquí tus Experiences"} />
      <Form initial={initialForm} onSubmit={handleSubmit}>
        {({ change, data, hasChanged, submit, reset, triggerChange }) => (
          <>
            <div className={classes.root}>
              <Card>
                <DataPrincipal
                  vendorServices={vendorServices}
                  year={data.year}
                  change={change}
                  data={data}
                  location={location}
                />

                <DataExperiences change={change} data={data} />
              </Card>
              <Card>
                <DataImages
                  images={images}
                  setImages={setImages}
                  triggerChange={triggerChange}
                />
              </Card>
            </div>
            <SaveButtonBar
              onCancel={reset}
              onSave={submit}
              state={"default"}
              disabled={!hasChanged}
            />
          </>
        )}
      </Form>
    </Container>
  );
};

export default ExperiencesCreatePage;
