import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardSpacer } from "@saleor/components/CardSpacer";
import Form from "@saleor/components/Form";
import { SaveButtonBar } from "@saleor/components/SaveButtonBar";
import useNotifier from "@saleor/hooks/useNotifier";
import React from "react";

import { useCreateExperience, useUploadExperienceImage } from "../mutation";
import DataExperiences from "./DataExperiences";
import DataImages from "./DataImages";
import DataPrincipal from "./DataPrincipal";

interface MandatoryData {
  city: boolean;
  province: boolean;
  descriptionShort: boolean;
  imageZero: boolean;
  year: boolean;
  serviceId: boolean;
}

const initImages = ["0", "1", "2", "3", "4"].map(position => ({
  file: null,
  position
}));

export const ExpForm = props => {
  const notify = useNotifier();
  const {
    location,
    expId,
    classes,
    vendorServices,
    deleteExp,
    setHasChanges,
    hasChanges
  } = props;
  const [createExperience, stateCreateExperience] = useCreateExperience({
    onCompleted: data =>
      notify({
        autohide: 5,
        status: "success",
        text: "<h2>Exito</h2>",
        title: "Guardado con"
      })
    // onError: error => console.log(error)
  });
  const [uploadExperienceImage, stateImageUpload] = useUploadExperienceImage(
    {}
  );

  const [error, setError] = React.useState<MandatoryData>({
    city: false,
    descriptionShort: false,
    imageZero: false,
    province: false,
    serviceId: false,
    year: false
  });
  const [images, setImages] = React.useState<
    Array<{ file: any; position: string }>
  >(initImages);

  const initialForm = {
    city: location.city,
    descriptionLong: "",
    descriptionShort: "",
    expId,
    province: location.province,
    serviceId: "",
    year: new Date()
  };

  const validate = data => {
    const weHaveImageZero =
      images.find(image => image.position === "0").file === null;

    // error fields
    Object.keys(data).forEach(key =>
      setError(prev => ({ ...prev, [key]: data[key] === "" }))
    );

    setError(prev => ({
      ...prev,
      imageZero: weHaveImageZero
    }));
    return Object.values(error).includes(true);
  };

  const handleSubmit = data => {
    // realizar submit
    if (data) {
      createExperience({
        variables: {
          city: data.city,
          descriptionLong: data.descriptionLong,
          descriptionShort: data.descriptionShort,
          expId: data.expId,
          province: data.province,
          serviceId: data.serviceId,
          year: data.year.getFullYear() // esto necesita ser un number
        }
      }).then(data => {
        // console.log(data.data.pastExperienceCreate.pastExperience.id);
        // console.log(data);
        // deleteExp(data.data.pastExperienceCreate.pastExperience.id);
      });

      images.forEach(image => {
        if (image.file !== null) {
          if (image.file === "delete") {
            uploadExperienceImage({
              variables: {
                expId: data.expId,
                image: null,
                position: image.position
              }
            });
            return;
          }
          if (image.file?.type) {
            uploadExperienceImage({
              variables: {
                expId: data.expId,
                image: image.file,
                position: image.position
              }
            });
          }
        }
      });
    }
  };

  // React.useEffect(() => {}, [stateCreateExperience, stateImageUpload]);

  return (
    <div>
      <Form
        formId={expId}
        initial={initialForm}
        onSubmit={data => {
          if (!validate(data)) {
            handleSubmit(data);
          }
          setHasChanges(prev => ({ ...prev, [expId]: false }));
        }}
      >
        {({ change, data, hasChanged, triggerChange }) => {
          React.useEffect(() => {
            setHasChanges(prev => ({ ...prev, [expId]: hasChanged }));
          }, [hasChanged]);
          React.useEffect(() => {
            if (hasChanges[expId] === false) {
              triggerChange(false);
            }
          }, [hasChanges]);

          return (
            <>
              <Card className={classes.container}>
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
                    <DataExperiences
                      change={change}
                      data={data}
                      error={error}
                    />
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
                <Button
                  className={classes.deleteButton}
                  variant="outlined"
                  onClick={() => deleteExp(expId)}
                >
                  Borrar
                </Button>
              </Card>
              {/* <SaveButtonBar
              labels={{
                cancel: "Borrar"
              }}
              onCancel={reset}
              onSave={submit}
              state={"default"}
              disabled={!hasChanged}
            /> */}
            </>
          );
        }}
      </Form>
      <CardSpacer />
    </div>
  );
};
