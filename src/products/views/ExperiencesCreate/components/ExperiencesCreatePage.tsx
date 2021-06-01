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
import { useCreateExperience, useUploadExperienceImage } from "../mutation";
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

interface MandatoryData {
  city: boolean;
  province: boolean;
  descriptionShort: boolean;
  descriptionLong: boolean;
  imageZero: boolean;
  year: boolean;
  serviceId: boolean;
}

const initImages = ["0", "1", "2", "3", "4"].map(position => ({
  file: null,
  position
}));

const ExperiencesCreatePage: React.FC<IProps> = props => {
  const [createExperience, stateCreateExperience] = useCreateExperience({});
  const [uploadExperienceImage, stateImageUpload] = useUploadExperienceImage(
    {}
  );

  const vendorServices = props.data.vendor.services.edges.map(
    edge => edge.node
  );

  const [images, setImages] = React.useState<
    Array<{ file: any; position: string }>
  >(initImages);

  const [error, setError] = React.useState<MandatoryData>({
    city: false,
    descriptionLong: false,
    descriptionShort: false,
    imageZero: false,
    province: false,
    serviceId: false,
    year: false
  });

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

  const weHaveImageZero = images =>
    images.find(image => image.position === "0").file !== null;

  const handleSubmit = data => {
    // validar data obligatoria
    // error fields
    Object.keys(data).forEach(key =>
      setError(prev => ({ ...prev, [key]: data[key] === "" }))
    );

    setError(prev => ({
      ...prev,
      imageZero: !weHaveImageZero(images)
    }));

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
      images.forEach(image => {
        if (image.file !== null) {
          if (image.file === "delete") {
            uploadExperienceImage({
              variables: {
                file: null,
                position: image.position
              }
            });
            return;
          }
          if (image.file?.type) {
            uploadExperienceImage({
              variables: {
                file: image.file,
                position: image.position
              }
            });
          }
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
                  error={error}
                />
                <DataExperiences change={change} data={data} error={error} />
              </Card>
              <Card>
                <DataImages
                  images={images}
                  setImages={setImages}
                  triggerChange={triggerChange}
                  error={error}
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
