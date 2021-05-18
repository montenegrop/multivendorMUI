import DateFnsUtils from "@date-io/date-fns";
import { InputLabel, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import Dropzone from "react-dropzone";

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

export const VendorData = props => {
  const {
    setSelectedBanner,
    setSelectedAvatar,
    setAvatarFile,
    setBannerFile,
    setCoordinates,
    selectedBanner,
    selectedAvatar,
    triggerChange,
    change,
    data,
    user
  } = props;

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

  React.useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias?")
      .then(response => response.json())
      .then(data =>
        setProvincias(data.provincias.map(provincia => provincia.nombre).sort())
      );

    if (data.province !== "") {
      getCities(data.province);
    }
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

  const getCoordinates = ciudad => {
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

  return (
    <div className={classesVendor.root}>
      <div className={classesVendor.dropContainer}>
        <InputLabel className={classesVendor.label}>
          Imagen de Portada para tu Tienda
        </InputLabel>
        <div className={classesVendor.relative}>
          <Dropzone
            onDrop={e => {
              handleOnDropBanner(e);
              triggerChange();
              return;
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
                      ? `url(${selectedBanner}) center center no-repeat`
                      : "inherit",
                  backgroundSize: selectedBanner !== "" ? "cover" : null
                }}
              >
                <input {...getInputProps()} accept="image*/" name="mainImage" />
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
                    selectedAvatar !== ""
                      ? `url(${selectedAvatar}) center center no-repeat`
                      : undefined,
                  backgroundSize: selectedAvatar !== "" ? "cover" : null,
                  filter: selectedAvatar !== "" ? "opacity(1)" : "opacity(0.8)"
                }}
              >
                <input {...getInputProps()} accept="image*/" />

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
        <div id="datePicker" className={classesVendor.datePickerContainer}>
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
            variant="standard"
            fullWidth
            onChange={e => {
              getCoordinates(e.target.value);
              change(e);
              return;
            }}
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
  );
};
