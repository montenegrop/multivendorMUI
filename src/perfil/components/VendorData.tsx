import DateFnsUtils from "@date-io/date-fns";
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Form from "@saleor/components/Form";
import React from "react";
import Dropzone from "react-dropzone";

import useNotifier from "../../hooks/useNotifier";
import {
  useVendorAvatarImage,
  useVendorMainImage,
  useVendorUpdate
} from "../mutations";

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
      cursor: "pointer",
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

interface Certificate {
  file?: any;
  url?: string;
  title?: string;
  position: string | number;
}
const initCert: Certificate[] = ["1", "2", "3", "4", "5"].map(pos => ({
  file: "",
  position: pos,
  title: "",
  url: ""
}));

export const VendorData = props => {
  const { hasChanges, setHasChanges, perfilVendorData, user, vendor } = props;

  const [useVendorUpdateFunc, statesVendorUpdate] = useVendorUpdate({});
  const [useMainImageUpdateFunc, stateMainImageUpadte] = useVendorMainImage({});
  const [useAvatarUpdateFunc, stateAvatarUpdate] = useVendorAvatarImage({});

  const [selectedBanner, setSelectedBanner] = React.useState<string>("");
  const [bannerFile, setBannerFile] = React.useState<any>("");

  const [coordinates, setCoordinates] = React.useState({
    lat: perfilVendorData.location.lat,
    lon: perfilVendorData.location.lon
  });

  const [selectedAvatar, setSelectedAvatar] = React.useState<string>("");
  const [avatarFile, setAvatarFile] = React.useState<any>("");

  const classesVendor = useStylesVendor(selectedBanner);

  const handleOnDropBanner = file => {
    const imgurl = URL.createObjectURL(file[0]);
    setSelectedBanner(() => imgurl);
    setBannerFile(file[0]);
    return;
  };

  const handleOnDropAvatar = file => {
    const imgurl = URL.createObjectURL(file[0]);
    setSelectedAvatar(() => imgurl);
    setAvatarFile(file[0]);
    return;
  };

  const [provincias, setProvincias] = React.useState([]);
  const [ciudades, setCiudades] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const mountedRef = React.useRef(true);
  const notify = useNotifier();

  const initialFormVendor = {
    mainImage: perfilVendorData && perfilVendorData.mainImage?.url
  };

  const initialFormLocation = {
    city: perfilVendorData && perfilVendorData.location?.city,
    id: user.id,
    postalCode: perfilVendorData && perfilVendorData.location?.postalCode,
    province: perfilVendorData && perfilVendorData.location?.province
  };

  React.useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  React.useEffect(() => {
    setLoading(true);
    fetch("https://apis.datos.gob.ar/georef/api/provincias?")
      .then(response => response.json())
      .then(result => {
        setProvincias(
          result.provincias.map(provincia => provincia.nombre).sort()
        );
        setLoading(false);
        if (initialFormLocation.province === "") {
          setLoading(false);
        }
        if (
          initialFormLocation.province &&
          initialFormLocation.province !== ""
        ) {
          setLoading(true);
          getCities(initialFormLocation.province);
          return;
        }
      });
  }, []);

  React.useEffect(() => {
    setSelectedBanner(perfilVendorData.mainImage?.url);
    setSelectedAvatar(perfilVendorData.avatarImage?.url);
  }, [vendor]);

  const getCities = provincia => {
    if (!provincia) {
      return;
    }
    provincia = provincia
      .split(" ")
      .join("-")
      .toLowerCase();

    fetch(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=1500`
    )
      .then(response => response.json())
      .then(data => {
        setCiudades(
          Array.from(
            new Set(
              data.localidades
                .map(localidad => localidad.localidad_censal.nombre)
                .sort()
            )
          )
        );
        setLoading(false);
      });
  };

  const getCoordinates = ciudad => {
    if (!ciudad) {
      return;
    }
    ciudad = ciudad
      .split(" ")
      .join("-")
      .toLowerCase();

    fetch(
      `http://apis.datos.gob.ar/georef/api/localidades-censales?nombre=${ciudad}&campos=nombre,centroide`
    )
      .then(response => response.json())
      .then(data => {
        setCoordinates({
          lat: data.localidades_censales[0].centroide.lat,
          lon: data.localidades_censales[0].centroide.lon
        });
        // console.log(data, ciudad);
        return;
      });
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option.toString()
  });

  const handleVendorSubmit = data => {
    if (bannerFile !== "") {
      useMainImageUpdateFunc({
        variables: {
          mainImage: bannerFile,
          vendorId: user.vendorId
        }
      }).then(data => {
        if (data.data.vendorImageCreateOrUpdate.vendor.mainImage.url) {
          notify({
            status: "success",
            text: "Guardado con Exito"
          });
          return;
        }
        notify({
          status: "error",
          text: `Hubo un error al subir el Banner`
        });
      });
    }
    if (avatarFile !== "") {
      useAvatarUpdateFunc({
        variables: {
          image: avatarFile,
          vendorId: user.vendorId
        }
      }).then(data => {
        if (data.data.vendorImageCreateOrUpdate.imageUrl) {
          notify({
            status: "success",
            text: "Guardado con Exito"
          });
          return;
        }
        notify({
          status: "error",
          text: `Hubo un error al subir el Avatar`
        });
      });
      // .catch(error => console.log(error));
    }
  };

  const handleLocationSubmit = data => {
    useVendorUpdateFunc({
      variables: {
        city: data.city,
        lat: coordinates.lat,
        lon: coordinates.lon,
        postalCode: data.postalCode,
        province: data.province
      }
    }).then(data => {
      if (data.data.vendorLocationCreateOrUpdate.vendorLocation.lon) {
        notify({
          status: "success",
          text: "Guardado con Exito"
        });
        return;
      }
      notify({
        status: "error",
        text: `Hubo un error al cambiar tu locacion`
      });
    });
    // .catch(error => console.log(error));
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={classesVendor.root}>
          <Form
            formId="vendorData"
            initial={initialFormVendor}
            onSubmit={handleVendorSubmit}
          >
            {({ change, data, hasChanged, triggerChange }) => {
              React.useEffect(() => {
                setHasChanges(prev => ({ ...prev, vendorData: hasChanged }));
              }, [hasChanged]);
              React.useEffect(() => {
                if (hasChanges.vendorData === false) {
                  triggerChange(false);
                }
              }, [hasChanges]);
              return (
                <>
                  <div id="vendor-data" className={classesVendor.dropContainer}>
                    <InputLabel className={classesVendor.label}>
                      Imagen de Portada para tu Tienda
                    </InputLabel>
                    <div className={classesVendor.relative}>
                      <Dropzone
                        onDrop={e => {
                          handleOnDropBanner(e);
                          triggerChange();
                        }}
                      >
                        {({ isDragActive, getInputProps, getRootProps }) => (
                          <div
                            {...getRootProps()}
                            className={`${classesVendor.dropzone} ${
                              isDragActive ? classesVendor.dragActive : null
                            }`}
                            style={{
                              background:
                                selectedBanner !== ""
                                  ? `url(${selectedBanner}) center center / cover no-repeat`
                                  : "inherit",
                              backgroundSize:
                                selectedBanner !== "" ? "cover" : null
                            }}
                          >
                            <input
                              {...getInputProps()}
                              accept="image/png, image/gif, image/jpeg, image/jpg"
                              name="mainImage"
                            />
                            {selectedBanner ? null : "PORTADA"}
                          </div>
                        )}
                      </Dropzone>
                      <Dropzone
                        onDrop={e => {
                          handleOnDropAvatar(e);
                          triggerChange();
                        }}
                      >
                        {({ isDragActive, getInputProps, getRootProps }) => (
                          <div
                            {...getRootProps()}
                            className={`${classesVendor.dropAvatar} ${
                              isDragActive ? classesVendor.dragActive : null
                            }`}
                            style={{
                              background:
                                selectedAvatar !== "" && selectedAvatar
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
                              {...getInputProps()}
                              accept="image/png, image/gif, image/jpeg, image/jpg"
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
                </>
              );
            }}
          </Form>
          <Form
            formId="locationData"
            initial={initialFormLocation}
            onSubmit={handleLocationSubmit}
          >
            {({ change, data, hasChanged, triggerChange }) => {
              React.useEffect(() => {
                setHasChanges(prev => ({ ...prev, locationData: hasChanged }));
              }, [hasChanged]);
              React.useEffect(() => {
                if (hasChanges.locationData === false) {
                  triggerChange(false);
                }
              }, [hasChanges]);
              return (
                <div id="ubicacion" className={classesVendor.location}>
                  <div>
                    <InputLabel id="provinceLabel">Provincia</InputLabel>

                    <Autocomplete
                      value={data.province}
                      onChange={(event: any, newValue: string | null) => {
                        change({
                          target: { name: "province", value: newValue }
                        });
                        getCities(newValue);
                        // console.log(data);
                      }}
                      filterOptions={filterOptions}
                      options={provincias}
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="province"
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password" // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <InputLabel id="cityLabel">Ciudad</InputLabel>

                    <Autocomplete
                      noOptionsText="Seleccione una Provincia"
                      options={ciudades && ciudades}
                      value={data.city}
                      fullWidth
                      onChange={(event: any, newValue: string | null) => {
                        getCoordinates(newValue);
                        change({ target: { name: "city", value: newValue } });
                      }}
                      renderInput={params => (
                        <TextField {...params} name="city" variant="standard" />
                      )}
                    />
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
              );
            }}
          </Form>
        </div>
      )}
    </>
  );
};
