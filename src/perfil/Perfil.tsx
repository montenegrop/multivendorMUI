import { CircularProgress, TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { SaveButtonBar } from "@saleor/components/SaveButtonBar";
import useUser from "@saleor/hooks/useUser";
import React, { useEffect } from "react";

import Container from "../components/Container";
import Form from "../components/Form";
import PageHeader from "../components/PageHeader";
import { UserTypeOfIdentification } from "../types/globalTypes";
import { DropCertificates } from "./components/DropCertificates";
import { VendorData } from "./components/VendorData";
import { useUserUpdate, useVendorUpdate } from "./mutations";
import { usePerfilVendorData } from "./queries";

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "CustomerCreateDetails" }
);

interface Certificate {
  file?: any;
  url?: string;
  title?: string;
}
interface MandatoryData {
  email: boolean;
  firstName: boolean;
  identification: boolean;
  lastName: boolean;
  phone: boolean;
  typeOfIdentification: boolean;
}
const errorMessage = "Este campo es obligatorio";

const initCert = {
  file: "",
  title: "",
  url: ""
};

const Perfil: React.FC = props => {
  const UserTypeOfIdentificationArray: string[] = Object.values(
    UserTypeOfIdentification
  );

  const { user } = useUser();
  const { data: vendor, loading: perfilVendorLoading } = usePerfilVendorData({
    variables: {
      id: user.vendorId
    }
  });

  const [useVendorUpdateFunc, statesVendorUpdate] = useVendorUpdate({});
  const [useUserUpdateFunc, stateUserUpdate] = useUserUpdate({});

  const perfilVendorData = vendor?.vendor;

  const [selectedBanner, setSelectedBanner] = React.useState<string>("");
  const [bannerFile, setBannerFile] = React.useState<any>("");

  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const [coordinates, setCoordinates] = React.useState({ lon: "", lat: "" });

  const [selectedAvatar, setSelectedAvatar] = React.useState<string>("");
  const [avatarFile, setAvatarFile] = React.useState<any>("");

  const classes = useStyles(props);

  const [error, setError] = React.useState<MandatoryData>({
    email: false,
    firstName: false,
    identification: false,
    lastName: false,
    phone: false,
    typeOfIdentification: false
  });

  const handleSubmit = data => {
    // error fields
    Object.keys(data).forEach(key =>
      setError(prev => ({ ...prev, [key]: data[key] === "" }))
    );

    // check mandatory data
    const mandatoryDataIsFilled = !Object.values(error).includes(true);

    if (mandatoryDataIsFilled) {
      useUserUpdateFunc({
        variables: {
          email: data.email.trim(),
          firstName: data.firstName.trim(),
          id: user.id,
          identification: data.identification.trim(),
          lastName: data.lastName.trim(),
          phone: data.phone.trim(),
          typeOfIdentification: data.typeOfIdentification
        }
      });
      if (bannerFile !== "") {
        useVendorUpdateFunc({
          variables: { mainImage: bannerFile, vendorID: user.vendorId }
        });
      }
      useVendorUpdateFunc({
        variables: {
          city: data.city,
          lat: coordinates.lat,
          lon: coordinates.lon,
          postalCode: data.postalCode,
          province: data.province
        }
      });
    }
    return;
  };

  const initialForm = {
    city: perfilVendorData?.location?.city,
    description: perfilVendorData?.description,
    email: user.email,
    firstName: user.firstName,
    foundingYear: perfilVendorData?.foundingYear,
    id: user.id,
    identification: user.identification,
    lastName: user.lastName,
    mainImage: perfilVendorData && perfilVendorData.mainImage?.url,
    phone: user.phone,
    postalCode: perfilVendorData && perfilVendorData.location?.postalCode,
    province: perfilVendorData && perfilVendorData.location?.province,
    typeOfIdentification: user.typeOfIdentification
  };

  useEffect(() => {
    if (vendor) {
      setSelectedBanner(perfilVendorData.mainImage?.url || "");
      setCertificates(perfilVendorData.images);
    }
  }, [vendor, stateUserUpdate]);

  const loading = stateUserUpdate.loading || statesVendorUpdate.loading; // Aca va el estado loading de la mutation cuando esta guardando

  return (
    <>
      <Container>
        <PageHeader title={"Datos de Perfil"} />
        {perfilVendorLoading ? (
          <CircularProgress />
        ) : (
          <Form initial={initialForm} onSubmit={handleSubmit}>
            {({ change, data, hasChanged, submit, reset, triggerChange }) => (
              <>
                <Card id="user-data">
                  <CardTitle title={"Tus datos de Usuario"} />

                  <CardContent>
                    <div className={classes.root}>
                      <TextField
                        disabled={false}
                        error={error?.firstName}
                        helperText={error.firstName ? errorMessage : ""}
                        name="firstName"
                        label="Nombre"
                        value={data.firstName}
                        onChange={change}
                      />
                      <TextField
                        disabled={false}
                        error={error?.lastName}
                        helperText={error.lastName ? errorMessage : ""}
                        name="lastName"
                        label="Apellido"
                        value={data.lastName}
                        onChange={change}
                      />
                      <TextField
                        disabled={false}
                        error={error?.email}
                        helperText={error.email ? errorMessage : ""}
                        name="email"
                        label="Email"
                        value={data.email}
                        onChange={change}
                      />
                      <TextField
                        disabled={false}
                        error={error?.phone}
                        helperText={error.phone ? errorMessage : ""}
                        name="phone"
                        label="Telefono"
                        value={data.phone}
                        onChange={change}
                      />
                      <div>
                        <InputLabel id="typeofIdLabel">
                          Tipo de Documento
                        </InputLabel>
                        <TextField
                          select
                          id="typeofIdSelect"
                          value={data.typeOfIdentification}
                          name="typeOfIdentification"
                          onChange={change}
                          variant="standard"
                          fullWidth
                          error={error.typeOfIdentification}
                          helperText={
                            error.typeOfIdentification ? errorMessage : ""
                          }
                        >
                          {UserTypeOfIdentificationArray.length > 0
                            ? UserTypeOfIdentificationArray.map(
                                (type, indx) => (
                                  <MenuItem
                                    value={type}
                                    key={indx}
                                    disabled={type === "EMPTY"}
                                  >
                                    {type}
                                  </MenuItem>
                                )
                              )
                            : null}
                        </TextField>
                      </div>
                      <TextField
                        disabled={false}
                        error={error.identification}
                        helperText={error.identification ? errorMessage : ""}
                        name="identification"
                        label="Número de Documento"
                        value={data.identification}
                        onChange={change}
                      />
                    </div>
                  </CardContent>
                </Card>
                <CardSpacer />
                <Card id="vendor-data">
                  <CardTitle title={"Lo que va a ver tu Cliente"} />
                  <CardContent>
                    <VendorData
                      setSelectedBanner={setSelectedBanner}
                      setSelectedAvatar={setSelectedAvatar}
                      setAvatarFile={setAvatarFile}
                      setBannerFile={setBannerFile}
                      setCoordinates={setCoordinates}
                      selectedBanner={selectedBanner}
                      selectedAvatar={selectedAvatar}
                      triggerChange={triggerChange}
                      change={change}
                      data={data}
                      user={user}
                    />
                  </CardContent>
                </Card>
                <CardSpacer />
                <Card id="services-data">
                  <CardTitle title={"Titulos/Certificados/Matriculas"} />
                  <CardContent>
                    <DropCertificates
                      certificates={certificates}
                      setCertificates={setCertificates}
                    />
                  </CardContent>
                </Card>
                <SaveButtonBar
                  onCancel={reset}
                  onSave={submit}
                  state={"default"}
                  disabled={loading || !handleSubmit || !hasChanged}
                />
              </>
            )}
          </Form>
        )}
      </Container>
    </>
  );
};

export default Perfil;
