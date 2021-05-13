import DateFnsUtils from "@date-io/date-fns";
import { CircularProgress, TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { SaveButtonBar } from "@saleor/components/SaveButtonBar";
import useUser from "@saleor/hooks/useUser";
import React, { useEffect } from "react";
import Dropzone from "react-dropzone/dist/index";

import Container from "../components/Container";
import Form from "../components/Form";
import PageHeader from "../components/PageHeader";
import { UserTypeOfIdentification } from "../types/globalTypes";
import { DropCertificates } from "./components/DropCertificates";
import { useUploadImage, useUserUpdate } from "./mutations";
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
const useStylesVendor = makeStyles(
  theme => ({
    datePicker: {
      margin: "auto 0",
      width: "36%"
    },
    datePickerContainer: {
      display: "grid",
      gridColumnEnd: "3",
      gridColumnStart: "1",
      gridTemplateColumns: "1fr"
    },
    dragActive: { background: "rgba(200,200,200,0.2)", cursor: "pointer" },
    dropAvatar: {
      background: theme.palette.grey[900],
      border: "1px solid black",
      borderRadius: "50%",
      bottom: "10px",
      color: "#a8a8a8",
      height: "130px",
      left: "10px",
      padding: "55px 0",
      position: "absolute",
      textAlign: "center",
      width: "130px",
      zIndex: 10
    },
    dropContainer: {
      gridColumnEnd: "3",
      gridColumnStart: "1",
      height: "100%",
      position: "relative",
      width: "100%"
    },
    dropzone: {
      "&:hover": {
        backgroundColor: "rgba(200,200,200,0.2)",
        cursor: "pointer"
      },
      border: "double black 1px",
      color: "#a8a8a8",
      height: "200px",
      padding: "90px",
      position: "relative",
      textAlign: "center",
      width: "100%"
    },
    helper: {
      color: "rgba(200, 200, 200, 0.5)",
      fontsize: "0.8rem",
      margin: "0.2rem"
    },
    label: {
      marginBottom: "1rem"
    },
    location: {
      columnGap: "1rem",
      display: "grid",
      gridColumnEnd: "3",
      gridColumnStart: "1",
      gridTemplateColumns: "3fr 3fr 2fr"
    },
    relative: {
      position: "relative"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "260px 1fr "
    },
    textarea: {
      gridColumnEnd: "3",
      gridColumnStart: "1",
      height: "100%",
      margin: "1rem auto",
      width: "100%"
    }
  }),
  { name: "CustomerCreateDetails" }
);

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

  const [useUploadImageFunc, statesImageUpload] = useUploadImage({});
  const [useUserUpdateFunc, stateUserUpdate] = useUserUpdate({});

  const perfilVendorData = vendor?.vendor;

  const [selectedBanner, setSelectedBanner] = React.useState<string>("");
  const [bannerFile, setBannerFile] = React.useState<any>("");

  const [selectedAvatar, setSelectedAvatar] = React.useState<string>("");
  const [avatarFile, setAvatarFile] = React.useState<any>("");

  const classes = useStyles(props);
  const classesVendor = useStylesVendor(selectedBanner);

  const handleOnDropBanner = file => {
    const imgurl = URL.createObjectURL(file[0]);
    setSelectedBanner(imgurl);
    setBannerFile(file[0]);
  };

  const handleOnDropAvatar = file => {
    const imgurl = URL.createObjectURL(file[0]);
    setSelectedAvatar(imgurl);
    setAvatarFile(file[0]);
  };

  const handleSubmit = data => {
    useUploadImageFunc({
      variables: { image: bannerFile, vendorID: user.vendorId }
    });

    useUserUpdateFunc({
      variables: {
        email: data.email,
        firstName: data.firstName,
        id: user.vendorId,
        identification: data.identification,
        lastName: data.lastName,
        phone: data.phone,
        typeOfIdentification: data.typeOfIdentification
      }
    });
  };
  let initialForm = {};
  useEffect(() => {
    initialForm = {
      city: perfilVendorData?.location?.city || "undefined",
      description: perfilVendorData?.description,
      email: user.email,
      firstName: user.firstName,
      foundingYear: perfilVendorData?.foundingYear || new Date(1900, 1, 1),
      id: user.id,
      identification: user.identification,
      lastName: user.lastName,
      mainImage: perfilVendorData && perfilVendorData.mainImage.url,
      phone: user.phone,
      postalCode: perfilVendorData && perfilVendorData.location?.postalCode,
      province: perfilVendorData && perfilVendorData.location?.province,
      typeOfIdentification: user.typeOfIdentification
    };
    setSelectedBanner(perfilVendorData?.mainImage.url);
  }, [perfilVendorData]);

  const loading = stateUserUpdate.loading; // Aca va el estado loading de la mutation cuando esta guardando

  // lista de ciudades provincias

  const [provincias, setProvincias] = React.useState([]);
  const [ciudades, setCiudades] = React.useState([]);

  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias?")
      .then(response => response.json())
      .then(data =>
        setProvincias(data.provincias.map(provincia => provincia.nombre))
      );
  }, []);

  const getCities = provincia => {
    provincia = provincia
      .split(" ")
      .join("-")
      .toLowerCase();

    fetch(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=1500`
    )
      .then(response => response.json())
      .then(data =>
        setCiudades(
          Array.from(
            new Set(
              data.localidades
                .map(localidad => localidad.localidad_censal.nombre)
                .sort()
            )
          )
        )
      );
  };

  return (
    <>
      <Container>
        <PageHeader title={"Datos de Perfil"} />
        {perfilVendorLoading ? (
          <CircularProgress />
        ) : (
          <Form initial={initialForm} onSubmit={handleSubmit}>
            {({ change, data, hasChanged, submit, reset }) => (
              <>
                <Card id="user-data">
                  <CardTitle title={"Tus datos de Usuario"} />

                  <CardContent>
                    <div className={classes.root}>
                      <TextField
                        disabled={false}
                        error={false}
                        name="firstName"
                        label="Nombre"
                        value={data.firstName}
                        onChange={change}
                      />
                      <TextField
                        disabled={false}
                        error={false}
                        name="lastName"
                        label="Apellido"
                        value={data.lastName}
                        onChange={change}
                      />
                      <TextField
                        disabled={false}
                        error={false}
                        name="email"
                        label="Email"
                        value={data.email}
                        onChange={change}
                      />
                      <TextField
                        disabled={false}
                        error={false}
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
                        error={false}
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
                    <div className={classesVendor.root}>
                      <div className={classesVendor.dropContainer}>
                        <InputLabel className={classesVendor.label}>
                          Imagen de Portada para tu Tienda
                        </InputLabel>
                        <div className={classesVendor.relative}>
                          <Dropzone onDrop={handleOnDropBanner}>
                            {({
                              isDragActive,
                              getInputProps,
                              getRootProps
                            }) => (
                              <div
                                {...getRootProps()}
                                className={`${classesVendor.dropzone} ${
                                  isDragActive ? classesVendor.dragActive : null
                                }`}
                                style={{
                                  background:
                                    selectedBanner !== ""
                                      ? `url(${selectedBanner}) center center no-repeat`
                                      : "inherit",
                                  backgroundSize:
                                    selectedBanner !== "" ? "cover" : null
                                }}
                              >
                                <input
                                  label="Imagen de Portada"
                                  {...getInputProps()}
                                  accept="image*/"
                                />
                                {selectedBanner ? null : "PORTADA"}
                              </div>
                            )}
                          </Dropzone>
                          <Dropzone
                            id="dropzoneavatar"
                            className={classesVendor.dropAvatar}
                            onDrop={handleOnDropAvatar}
                          >
                            {({
                              isDragActive,
                              getInputProps,
                              getRootProps
                            }) => (
                              <div
                                {...getRootProps()}
                                className={`${classesVendor.dropAvatar} ${
                                  isDragActive ? classesVendor.dragActive : null
                                }`}
                                style={{
                                  background:
                                    selectedAvatar !== ""
                                      ? `url(${selectedAvatar}) center center no-repeat`
                                      : undefined,
                                  backgroundSize:
                                    selectedAvatar !== "" ? "cover" : null,
                                  filter:
                                    selectedAvatar !== ""
                                      ? "opacity(1)"
                                      : "opacity(0.8)"
                                }}
                              >
                                <input
                                  label="Imagen de Avatar"
                                  {...getInputProps()}
                                  accept="image*/"
                                />

                                {selectedAvatar ? null : "AVATAR"}
                              </div>
                            )}
                          </Dropzone>
                        </div>

                        <div className={classesVendor.helper}>
                          El tamaño recomendado es de 970px x 250px
                        </div>
                      </div>
                      {user.userPermissions[0] ? null : (
                        <div
                          id="datePicker"
                          className={classesVendor.datePickerContainer}
                        >
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              className={classesVendor.datePicker}
                              id="foundingYearInput"
                              inputVariant="standard"
                              label="Año de Fundación"
                              name="foundingYear"
                              autoOk
                              variant="dialog"
                              views={["year"]}
                              value={data.foundingYear}
                              maxDate={new Date()}
                              onChange={date => {
                                change({
                                  target: {
                                    name: "foundingYear",
                                    value: new Date(date.getFullYear(), 0, 1)
                                  }
                                });
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      )}
                      <div id="ubicacion" className={classesVendor.location}>
                        <div>
                          <InputLabel id="provinceLabel">Provincia</InputLabel>
                          <TextField
                            select
                            id="provincia"
                            value={data.province}
                            name="province"
                            onChange={e => {
                              change(e);
                              getCities(e.target.value);
                              return;
                            }}
                            variant="standard"
                            fullWidth
                          >
                            {provincias.map((provincia, indx) => (
                              <MenuItem key={indx} value={provincia}>
                                {provincia}
                              </MenuItem>
                            ))}
                            <MenuItem value={"undefined"} disabled></MenuItem>
                          </TextField>
                        </div>
                        <div>
                          <InputLabel id="cityLabel">Ciudad</InputLabel>
                          <TextField
                            select
                            id="city"
                            value={data.city}
                            name="city"
                            onChange={change}
                            variant="standard"
                            fullWidth
                          >
                            {ciudades.map((ciudad, indx) => (
                              <MenuItem key={indx} value={ciudad}>
                                {ciudad}
                              </MenuItem>
                            ))}
                            <MenuItem value={"undefined"} disabled></MenuItem>
                          </TextField>
                        </div>
                        <div>
                          <InputLabel id="postalCodeLabel">C.P.:</InputLabel>
                          <TextField
                            id="postalCode"
                            value={data.postalCode}
                            name="postalCode"
                            onChange={change}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                      {user.userPermissions[0] ? null : (
                        <TextField
                          id="descripcion"
                          label="Descripcion"
                          name="description"
                          onChange={change}
                          multiline
                          className={classesVendor.textarea}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
                <CardSpacer />
                <Card id="services-data">
                  <CardTitle title={"Titulos/Certificados/Matriculas"} />
                  <CardContent>
                    <DropCertificates />
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
