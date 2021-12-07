import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextareaAutosize
} from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import useUser from "@saleor/hooks/useUser";
import React from "react";

import ActiveServicesPage from "../../services/components/ActiveServicesPage";
import { ActiveServicesListQuery } from "./queries";

const ActiveServices = () => {
  const { user } = useUser();
  return (
    <ActiveServicesListQuery variables={{ vendorId: "VmVuZG9yOjE=" }}>
      {({ data, loading }) => {
        // primer modal:
        const [concretada, setConcretada] = React.useState(true);
        const [etapa, setEtapa] = React.useState(0);
        const experienciaConcretada = () => {
          setConcretada(true);
          setEtapa(1);
        };
        const experienciaNoConcretada = () => {
          setConcretada(false);
          setEtapa(1);
        };
        // segundo modal:

        const initialNoConcretada = {
          razon_1: false,
          razon_2: false,
          razon_3: false,
          razon_4: false
        };
        const [razonNoConcretada, setRazonNoConcretada] = React.useState(
          initialNoConcretada
        );

        const handleCheckboxChange = event => {
          setRazonNoConcretada({
            ...initialNoConcretada,
            [event.target.value]: event.target.checked
          });
        };

        if (loading) {
          return (
            <Container>
              <CircularProgress />
            </Container>
          );
        }

        return (
          // <Container>
          //   <ActiveServicesPage
          //     __typename={data.vendor.__typename}
          //     id={data.vendor.id}
          //     name={data.vendor.name}
          //     email={data.vendor.email}
          //     serviceContracts={data.vendor.serviceContracts}
          //   />
          // </Container>

          // primer modal:

          <>
            <Dialog open={etapa === 0} maxWidth="sm" fullWidth>
              <DialogTitle>¿Se pudo concretar la experiencia ?</DialogTitle>
              <DialogContent>
                <Button onClick={experienciaConcretada}>Si</Button>
                <Button onClick={experienciaNoConcretada}>No</Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEtapa(-1)} data-test="cancel">
                  cerrar
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={!concretada && etapa === 1} maxWidth="sm" fullWidth>
              <DialogTitle>
                Comentamos el o los motivos por lo cual no se pudo concretar la
                experiencia
              </DialogTitle>
              <DialogContent>
                <FormGroup>
                  <FormControlLabel
                    checked={razonNoConcretada.razon_1}
                    onChange={handleCheckboxChange}
                    control={<Checkbox />}
                    label="Label"
                    value="razon_1"
                  />
                  <FormControlLabel
                    checked={razonNoConcretada.razon_2}
                    onChange={handleCheckboxChange}
                    control={<Checkbox />}
                    label="Disabled"
                    value="razon_2"
                  />
                  <FormControlLabel
                    checked={razonNoConcretada.razon_3}
                    onChange={handleCheckboxChange}
                    control={<Checkbox />}
                    label="Disabled"
                    value="razon_3"
                  />
                  <Grid container direction={"row"}>
                    <FormControlLabel
                      checked={razonNoConcretada.razon_4}
                      onChange={handleCheckboxChange}
                      control={<Checkbox />}
                      label="Otro"
                      value="razon_4"
                    />
                    <TextareaAutosize
                      minRows={3}
                      style={{ width: 200, height: 42 }}
                    />
                  </Grid>
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEtapa(-1)} data-test="cancel">
                  cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      }}
    </ActiveServicesListQuery>
  );
};

export default ActiveServices;
