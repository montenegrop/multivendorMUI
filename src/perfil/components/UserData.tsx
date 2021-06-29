import { InputLabel, TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { UserTypeOfIdentification } from "@saleor/types/globalTypes";
import React from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

import Form from "../../components/Form";
import useNotifier from "../../hooks/useNotifier";
import { useUserUpdate } from "../mutations";

const errorMessage = "Este campo es obligatorio";

interface MandatoryData {
  email: boolean;
  firstName: boolean;
  identification: boolean;
  lastName: boolean;
  phone: boolean;
  typeOfIdentification: boolean;
  cellphone: boolean;
}

const UserTypeOfIdentificationArray: string[] = Object.values(
  UserTypeOfIdentification
);

interface IProps {
  user: any;
  classes: any;
  setHasChanges: Dispatch<SetStateAction<any>>;
  hasChanges: any;
}

const UserData: React.FC<IProps> = props => {
  const { user, classes, setHasChanges, hasChanges } = props;
  const [useUserUpdateFunc, stateUserUpdate] = useUserUpdate({});
  const [error, setError] = React.useState<MandatoryData>({
    email: false,
    firstName: false,
    identification: false,
    lastName: false,
    phone: false,
    typeOfIdentification: false,
    cellphone: false
  });
  const notify = useNotifier();

  const initialForm = {
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    identification: user.identification,
    lastName: user.lastName,
    phone: user.phone,
    typeOfIdentification: user.typeOfIdentification,
    cellphone: user.cellphone
  };

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
          typeOfIdentification: data.typeOfIdentification,
          cellphone: data.cellphone.trim()
        }
      })
        .then(data => {
          // console.log(data);
          if (data.data.accountUpdate.accountErrors.length > 0) {
            notify({
              status: "error",
              text: `Hubo un error: ${data.data.accountUpdate.accountErrors[0]?.message}`
            });
            return;
          }
          notify({
            status: "success",
            text: "Guardado con Exito"
          });
        })
        .catch(error => {
          notify({
            status: "error",
            text: "Hubo un error"
          });
        });
    }
  };

  return (
    <Form formId="userData" initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, hasChanged, triggerChange }) => {
        React.useEffect(() => {
          setHasChanges(prev => ({ ...prev, userData: hasChanged }));
        }, [hasChanged]);
        React.useEffect(() => {
          if (hasChanges.userData === false) {
            triggerChange(false);
          }
        }, [hasChanges]);
        return (
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
                    label="Teléfono"
                    value={data.phone}
                    onChange={change}
                  />
                  <TextField
                    disabled={false}
                    error={error?.cellphone}
                    helperText={error.cellphone ? errorMessage : ""}
                    name="cellphone"
                    label="Celular"
                    value={data.cellphone}
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
                        ? UserTypeOfIdentificationArray.map((type, indx) => (
                            <MenuItem
                              value={type}
                              key={indx}
                              disabled={type === "EMPTY"}
                            >
                              {type}
                            </MenuItem>
                          ))
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
          </>
        );
      }}
    </Form>
  );
};

export default UserData;
