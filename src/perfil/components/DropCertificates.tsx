import { Card, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Dropzone from "react-dropzone/dist/index";

import { default as Icon } from "../../icons/Plus";

const useStyles = makeStyles(
  theme => ({
    plus: {
      backgroundColor: theme.palette.grey[600],
      border: "solid #aaaaaa 1px",
      borderRadius: "50%",
      height: "100px",
      padding: "38% 0",
      width: "100px"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "repeat(5, 1fr)"
    },
    singleDrop: {
      background: "url()",
      backgroundSize: "contain",
      border: "solid black 1px",
      borderRadius: "16px",
      height: "200px",
      padding: "24%",
      textAlign: "center",
      width: "100%"
    }
  }),
  { name: "CustomerCreateDetails" }
);
interface Certificate {
  file: any;
  title: string;
}

const initCert = {
  file: "",
  title: ""
};

export const SingleCertificate = props => {
  const {
    isDragActive,
    setFile,
    getInputProps,
    getRootProps,
    title,
    setTitle,
    id
  } = props;
  const classes = useStyles(props);
  const [background, setBackground] = React.useState<string>("");

  const handleFileChange = e => {
    const file = e.target.files[0];
    setBackground(URL.createObjectURL(file));
    setFile(id, file);
  };

  const handleChange = e => {
    setTitle(id, e.target.value, e.target.name);
  };

  return (
    <>
      <Card key={id}>
        <TextField
          fullWidth
          value={title}
          label="Titulo"
          name="title"
          onChange={handleChange}
        />
        <div
          {...getRootProps}
          className={classes.singleDrop}
          style={{
            background: `url(${background}) no-repeat center center`,
            backgroundSize: background !== "" ? null : "contain"
          }}
        >
          {background !== "" ? null : (
            <div className={classes.plus}>
              <Icon />
            </div>
          )}
          <input
            {...getInputProps}
            onChange={handleFileChange}
            accept="image*/"
            name="file"
            type="file"
          />
        </div>
      </Card>
    </>
  );
};

export const DropCertificates = props => {
  const classes = useStyles(props);
  const [certificates, setCertificates] = React.useState<Certificate[]>([
    initCert,
    initCert,
    initCert,
    initCert,
    initCert
  ]);
  const handleTitleChange = (id, value, name) => {
    const newCerts = [...certificates];
    const newCert = { ...newCerts[id] };
    newCert[name] = value;
    newCerts[id] = newCert;
    setCertificates(newCerts);
  };

  const handleFileChange = (id, file) => {
    const newCerts = [...certificates];
    const newCert = { ...newCerts[id] };
    newCert.file = file;
    newCerts[id] = newCert;
    setCertificates(newCerts);
  };

  return (
    <>
      <div className={classes.root}>
        {certificates.map((certificate, indx) => (
          <Dropzone key={indx}>
            {({ isDragActive, getInputProps, getRootProps }) => (
              <SingleCertificate
                id={indx}
                title={certificates[indx].title}
                setFile={handleFileChange}
                setTitle={handleTitleChange}
                isDragActive={isDragActive}
                getInputProps={getInputProps()}
                getRootProps={getRootProps()}
              />
            )}
          </Dropzone>
        ))}
      </div>
    </>
  );
};
