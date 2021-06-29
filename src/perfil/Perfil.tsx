import { CircularProgress, TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import { CardSpacer } from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { SaveButtonBar } from "@saleor/components/SaveButtonBar";
import useUser from "@saleor/hooks/useUser";
import React, { useEffect } from "react";

import Container from "../components/Container";
import Form from "../components/Form";
import PageHeader from "../components/PageHeader";
import useNotifier from "../hooks/useNotifier";
import { UserTypeOfIdentification } from "../types/globalTypes";
import { DropCertificates } from "./components/DropCertificates";
import { ServicesCheckboxes } from "./components/ServicesCheckboxes";
import SocialMedia from "./components/SocialMedia";
import UserData from "./components/UserData";
import { VendorData } from "./components/VendorData";
import { useUpdateServices, useVendorServiceImage } from "./mutations";
import { useBaseServices, usePerfilVendorData } from "./queries";

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
  position: string | number;
}

const errorMessage = "Este campo es obligatorio";

const initCert: Certificate[] = ["1", "2", "3", "4", "5"].map(pos => ({
  file: "",
  position: pos,
  title: "",
  url: ""
}));

interface Service {
  node: { id: string; name: string; checked?: boolean };
}
const baseServicesMockup: Service[] = [
  { node: { id: "1", name: "plomero" } },
  { node: { id: "2", name: "electricista" } },
  { node: { id: "3", name: "gasista" } }
];

const Perfil: React.FC = props => {
  const UserTypeOfIdentificationArray: string[] = Object.values(
    UserTypeOfIdentification
  );

  // queries
  const { user } = useUser();
  const { data: vendor, loading: perfilVendorLoading } = usePerfilVendorData({
    variables: {
      id: user.vendorId
    }
  });
  const { data: baseServices, loading: baseServicesLoading } = useBaseServices(
    {}
  );

  // mutations
  const [
    useServiceImageUpdateFunc,
    stateServiceImageUpdate
  ] = useVendorServiceImage({});

  const perfilVendorData = vendor?.vendor;

  const [certificates, setCertificates] = React.useState<Certificate[]>(
    initCert
  );

  const classes = useStyles(props);

  const [hasChanges, setHasChanges] = React.useState({
    certificateData: false,
    locationData: false,
    servicesData: false,
    socialMediaData: false,
    userData: false,
    vendorData: false
  });

  const handleSubmit = data => {
    certificates.forEach(certificate => {
      if (certificate.file && certificate.file !== "") {
        useServiceImageUpdateFunc({
          variables: {
            position: certificate.position,
            serviceImage: certificate.file === "delete" ? "" : certificate.file,
            title: certificate.title,
            vendorId: user.vendorId
          }
        });
      }
    });

    return;
  };

  const handleReset = (reset, data, initialForm) => {
    reset();

    return;
  };

  const initialForm = {
    id: user.id,
    services:
      perfilVendorData &&
      perfilVendorData.services.edges.map(service => service.node.id)
  };

  useEffect(() => {
    if (vendor) {
      const newCerts = [...certificates];
      perfilVendorData.serviceImages.forEach(cert => {
        newCerts[
          newCerts.findIndex(
            certi => cert.position.toString() === certi.position
          )
        ] = cert;
      });
      setCertificates(newCerts);
    }
  }, [vendor]);
  const notify = useNotifier();
  const handleBulkSubmit = () => {
    notify({
      status: "info",
      text: "Guardando ...."
    });
    Object.keys(hasChanges).forEach(data => {
      if (hasChanges[data] === true) {
        const form = document.getElementById(
          data.toString()
        ) as HTMLFormElement;
        form.requestSubmit();
      }
    });
    const form = document.getElementById("certificateData") as HTMLFormElement;
    form.requestSubmit();
    setHasChanges({
      certificateData: false,
      locationData: false,
      servicesData: false,
      socialMediaData: false,
      userData: false,
      vendorData: false
    });
  };

  // #corregir: clases de checkbox
  const [is24Hours, setIs24Hours] = React.useState(false);
  const is24HoursChange = event => {
    setIs24Hours(event.target.is24Hours);
    // setHasChanges(prev => ({ ...prev, vendorData: true }));
  };

  return (
    <>
      <Container>
        <PageHeader title={"Datos de Perfil"} />
        {perfilVendorLoading || baseServicesLoading ? (
          <CircularProgress />
        ) : (
          <>
            <UserData
              classes={classes}
              user={user}
              setHasChanges={setHasChanges}
              hasChanges={hasChanges}
            />
            <CardSpacer />
            <Card id="vendor-data">
              <CardTitle title={"Lo que va a ver tu Cliente"} />
              <CardContent>
                <VendorData
                  hasChanges={hasChanges}
                  setHasChanges={setHasChanges}
                  perfilVendorData={perfilVendorData}
                  user={user}
                  vendor={vendor}
                />
              </CardContent>
            </Card>
            <CardSpacer />
            <Card id="baseServices">
              <CardTitle title={"Servicios a Prestar"} />
              <div className={"flex"}>
                <p>Responde 24 horas</p>
                <Checkbox
                  checked={is24Hours}
                  onChange={is24HoursChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <CardContent>
                <ServicesCheckboxes
                  perfilVendorData={perfilVendorData}
                  user={user}
                  setHasChanges={setHasChanges}
                  baseServices={
                    // baseServicesMockup ||
                    baseServices.baseProducts.edges
                  }
                />
              </CardContent>
            </Card>
            <Form
              formId="certificateData"
              initial={initialForm}
              onSubmit={handleSubmit}
            >
              {({ change, data, hasChanged, submit, reset, triggerChange }) => {
                //  #corregir: cambio en titulos no funciona
                React.useEffect(() => {
                  setHasChanges(prev => ({
                    ...prev,
                    certificateData: hasChanged
                  }));
                }, [hasChanged]);
                return (
                  <>
                    <CardSpacer />
                    <Card id="services-data">
                      <CardTitle title={"Titulos/Certificados/Matriculas"} />
                      <CardContent>
                        <DropCertificates
                          certificates={certificates}
                          setCertificates={setCertificates}
                          triggerChange={triggerChange}
                        />
                      </CardContent>
                    </Card>
                  </>
                );
              }}
            </Form>
            <CardSpacer />
            <Card>
              <CardTitle title="Redes Sociales" />
              <CardContent>
                <SocialMedia
                  setHasChanges={setHasChanges}
                  socialMedia={perfilVendorData.socialMedia}
                />
              </CardContent>
            </Card>
          </>
        )}

        <SaveButtonBar
          onCancel={() => null}
          onSave={handleBulkSubmit}
          labels={{ save: "guardar-corregir" }}
          state={"default"}
          disabled={!handleSubmit || !Object.values(hasChanges).includes(true)}
        />
      </Container>
    </>
  );
};

export default Perfil;
