import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import useUser from "@saleor/hooks/useUser";
import React from "react";
import Dropzone from "react-dropzone/dist/index";

import Container from "../components/Container";
import Form from "../components/Form";
import PageHeader from "../components/PageHeader";

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
    dragActive: { background: "rgba(200,200,200,0.2)", cursor: "pointer" },
    dropContainer: {
      height: "100%",
      width: "100%",
      gridColumnStart: "1",
      gridColumnEnd: "3"
    },
    dropzone: {
      border: "double black 1px",
      height: "calc(100% - 3rem)",
      "&:hover": {
        backgroundColor: "rgba(200,200,200,0.2)",
        cursor: "pointer"
      },
      width: "100%"
    },
    label: {
      marginBottom: "1rem"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 3fr 2fr"
    },
    textarea: {
      height: "100%",
      margin: "1rem auto",
      width: "100%"
    }
  }),
  { name: "CustomerCreateDetails" }
);

const Perfil: React.FC = props => {
  const { user } = useUser();
  const initialForm = {
    email: user.email,
    firstName: user.firstName,
    foundingYear: null,
    id: user.id,
    identification: user.identification,
    lastName: user.lastName,
    phone: user.phone,
    typeOfIdentification: user.typeOfIdentification
  };

  const classes = useStyles(props);

  const [selectedBanner, setSelectedBanner] = React.useState<string>("");
  const classesVendor = useStylesVendor(selectedBanner);
  const handleOnDrop = file => {
    const imgurl = URL.createObjectURL(file[0]);
    setSelectedBanner(imgurl);
  };

  return (
    <>
      <Container>
        <PageHeader title={"Datos de Perfil"} />
        <Form initial={initialForm}>
          {({ change, data }) => (
            // console.log(data);
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
                    <TextField
                      disabled={false}
                      error={false}
                      name="identification"
                      label="Número de Identificacion"
                      value={data.identification}
                      onChange={change}
                    />
                    <div>
                      <InputLabel id="typeofIdLabel">Tipo</InputLabel>
                      <TextField
                        select
                        id="typeofIdSelect"
                        value={data.typeOfIdentification}
                        name="typeOfIdentification"
                        onChange={change}
                        variant="standard"
                        fullWidth
                      >
                        <MenuItem value={"EMPTY"} disabled></MenuItem>
                        <MenuItem value={"dni"}>DNI</MenuItem>
                        <MenuItem value={"passport"}>PASAPORTE</MenuItem>
                      </TextField>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <CardSpacer />
              <Card id="vendor-data">
                <CardTitle title={"Lo que va a ver tu Cliente"} />
                <CardContent>
                  <div className={classesVendor.root}>
                    <TextField
                      id="foundingYearInput"
                      variant="standard"
                      label="Fecha de Inicio de Actividades"
                      name="foundingYear"
                      type="date"
                      helperText="¿Cuando empezaste a trabajar?"
                      onChange={change}
                      defaultValue=""
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <div className={classesVendor.dropContainer}>
                      <InputLabel className={classesVendor.label}>
                        Imagen de Portada para tu Tienda
                      </InputLabel>
                      <Dropzone onDrop={handleOnDrop}>
                        {({ isDragActive, getInputProps, getRootProps }) => (
                          <div
                            {...getRootProps()}
                            className={`${classesVendor.dropzone} ${
                              isDragActive ? classesVendor.dragActive : null
                            }`}
                            style={{
                              background:
                                selectedBanner !== ""
                                  ? `url(${selectedBanner}) center center no-repeat`
                                  : "inherit"
                            }}
                          >
                            <input
                              label="Imagen de Portada"
                              {...getInputProps()}
                              accept="image*/"
                            />
                          </div>
                        )}
                      </Dropzone>
                      <TextField
                        label="Descripcion"
                        multiline
                        className={classesVendor.textarea}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <CardSpacer />
              <Card id="services-data">
                <CardTitle title={"Los servicios que ofreces"} />
                <CardContent>
                  <div className={classes.root}></div>
                </CardContent>
              </Card>
            </>
          )}
        </Form>
      </Container>
    </>
  );
};

export default Perfil;
