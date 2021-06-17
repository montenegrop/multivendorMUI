import { InputLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import React from "react";

interface IProps {
  data: any;
  change: any;
  className: any;
  noCP?: boolean;
  error: {
    city: boolean;
    province: boolean;
  };
}

const useStyles = makeStyles(
  theme => ({
    root: (props: IProps) => ({
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: props.noCP ? " 1fr 1fr" : "1fr 1fr 1fr"
    })
  }),
  { name: "Location" }
);

const PickPlace: React.FC<IProps> = props => {
  const { data, change, className, noCP, error } = props;

  const classes = useStyles(props);

  const [provincias, setProvincias] = React.useState([]);
  const [ciudades, setCiudades] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [coordinates, setCoordinates] = React.useState({ lat: "", lon: "" });

  React.useEffect(() => {
    setLoading(true);
    fetch("https://apis.datos.gob.ar/georef/api/provincias?")
      .then(response => response.json())
      .then(result => {
        setProvincias(
          result.provincias.map(provincia => provincia.nombre).sort()
        );
        if (data.province === "") {
          setLoading(false);
        }
        if (data.province !== "") {
          getCities(data.province);
        }
      });
  }, []);

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

  return (
    <div id="ubicacion" className={`${className} ${classes.root}`}>
      <div>
        <InputLabel id="provinceLabel">Provincia</InputLabel>

        <Autocomplete
          value={data.province}
          onChange={(event: any, newValue: string | null) => {
            change({ target: { name: "province", value: newValue } });
            getCities(newValue);
          }}
          filterOptions={filterOptions}
          options={provincias}
          renderInput={params => (
            <TextField
              {...params}
              error={error.city}
              helperText={error.city ? "Debe elegir ciudad" : null}
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
            <TextField
              error={error.province}
              helperText={error.province ? "Debe Elegir Provincia" : null}
              {...params}
              name="city"
              variant="standard"
            />
          )}
        />
      </div>
      {noCP ? null : (
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
      )}
    </div>
  );
};

export default PickPlace;
