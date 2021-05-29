import { CardContent } from "@material-ui/core";
import { CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import Container from "@saleor/components/Container";
import { SaveButtonBar } from "@saleor/components/SaveButtonBar";
import useUser from "@saleor/hooks/useUser";
import React from "react";

import Form from "../../../../components/Form";
import PageHeader from "../../../../components/PageHeader";
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
    }
  }),
  { name: "Experiences" }
);

interface IProps {
  data: any;
}

const ExperiencesCreatePage: React.FC<IProps> = props => {
  const vendorServices = props.data.vendor.services.edges.map(
    edge => edge.node
  );
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

  return (
    <Container>
      <PageHeader title={"Ingresa aquí tus Experiences"} />
      <Form initial={initialForm}>
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
                <DataImages />
              </Card>
            </div>
            <SaveButtonBar
              onCancel={reset}
              onSave={submit}
              state={"default"}
              disabled={false}
            />
          </>
        )}
      </Form>
    </Container>
  );
};

export default ExperiencesCreatePage;
