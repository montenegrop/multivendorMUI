import { TextField } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { KeyboardDatePicker } from "@material-ui/pickers";
import CardTitle from "@saleor/components/CardTitle";
import Date from "@saleor/components/Date";
import useUser from "@saleor/hooks/useUser";
import React from "react";

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

const Perfil: React.FC = props => {
  const user = useUser();
  // console.log(user);

  const classes = useStyles(props);
  return (
    <>
      <Container>
        <PageHeader title={"Datos de Perfil"} />

        <Card>
          <CardTitle title={"Tus datos de Usuario"} />

          <CardContent>
            <div className={classes.root}>
              <TextField
                disabled={false}
                error={false}
                name="firstName"
                label="Nombre"
                value={user.user.firstName}
                onChange={() => null}
              />
              <TextField
                disabled={false}
                error={false}
                name="lastName"
                label="Apellido"
                value={user.user.lastName}
                onChange={() => null}
              />
              <TextField
                disabled={false}
                error={false}
                name="email"
                label="Email"
                value={user.user.email}
                onChange={() => null}
              />
              <TextField
                disabled={false}
                error={false}
                name="phone"
                label="Telefono"
                value={user.user.phone}
                onChange={() => null}
              />
              <TextField
                disabled={false}
                error={false}
                name="identification"
                label="Número de Identificacion"
                value={user.user.identification}
                onChange={() => null}
              />
              <div>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user.user.typeOfIdentification}
                  onChange={() => null}
                  fullWidth
                >
                  <MenuItem value={"dni"}>DNI</MenuItem>
                  <MenuItem value={"passport"}>PASAPORTE</MenuItem>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardTitle title={"Lo que va a ver tu Cliente"} />
          <CardContent>
            <div className={classes.root}></div>
          </CardContent>
        </Card>
        <Card>
          <CardTitle title={"Los servicios que ofreces"} />
          <CardContent>
            <div className={classes.root}></div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Perfil;
