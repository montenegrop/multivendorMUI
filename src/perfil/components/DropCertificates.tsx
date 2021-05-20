import { Card, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Dropzone from "react-dropzone/dist/index";

import { default as Edit } from "../../icons/Edit";
import { default as Plus } from "../../icons/Plus";
import { default as Trash } from "../../icons/Trash";

const useStyles = makeStyles(
  theme => ({
    edit: {
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      border: "solid #aaaaaa 1px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      height: "36px",
      justifyContent: "center",
      margin: "0 0rem",
      opacity: "0",
      width: "36px"
    },
    iconsContainer: {
      "&:hover": {
        "& $edit": {
          opacity: "1"
        },
        "& $trash": {
          opacity: "1"
        }
      },
      alignItems: "normal",
      display: "flex",
      height: "100%",
      justifyContent: "flex-end",
      padding: "0.5rem",
      width: "100%"
    },
    plus: {
      [theme.breakpoints.down("sm")]: {
        height: "60px",
        width: "60px"
      },
      alignItems: "center",
      backgroundColor: theme.palette.grey[600],
      border: "solid #aaaaaa 1px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      height: "100px",
      justifyContent: "center",
      width: "100px"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "repeat(5, 1fr)"
    },
    singleDrop: {
      alignItems: "center",
      background: "url()",
      backgroundSize: "contain",
      border: "solid black 1px",
      display: "flex",
      height: "200px",
      justifyContent: "center",
      textAlign: "center",
      width: "100%"
    },
    trash: {
      [theme.breakpoints.down("sm")]: {
        height: "60px",
        width: "60px"
      },
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      border: "solid #aaaaaa 1px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      height: "36px",
      justifyContent: "center",
      margin: "0 1rem",
      opacity: "0",
      width: "36px"
    },
    trashSize: {
      height: "50%",
      width: "50%"
    }
  }),
  { name: "CustomerCreateDetails" }
);

export const SingleCertificate = props => {
  const {
    url,
    isDragActive,
    setFile,
    setTitle,
    getInputProps,
    getRootProps,
    title,
    position,
    id
  } = props;
  const classes = useStyles(props);
  const [background, setBackground] = React.useState<string>(url);

  const handleFileChange = e => {
    const file = e.target.files[0];
    setBackground(URL.createObjectURL(file));
    setFile(position, file);
  };

  const handleChange = e => {
    setTitle(position, e.target.value, e.target.name);
  };

  const handleIconClick = e => {
    const getParentId = elem => {
      if (elem.id === "") {
        return getParentId(elem.parentNode);
      }
      return elem.id;
    };
    const id = getParentId(e.target);
    if (id === "trashIcon") {
      e.stopPropagation();
      setFile(position, "delete");
      setBackground("");
    }
    if (id === "editIcon") {
      return;
    }
    if (id === "iconsContainer") {
      e.stopPropagation();
    }
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
          variant="standard"
        />

        <div
          {...getRootProps}
          className={classes.singleDrop}
          style={{
            background: `url(${background}) no-repeat center center`,
            backgroundSize: background !== "" ? null : "contain"
          }}
        >
          {background !== "" ? (
            <div
              id="iconContainer"
              className={classes.iconsContainer}
              onClick={handleIconClick}
            >
              <div id="trashIcon" className={`${classes.trash} trashIcon`}>
                <Trash />
              </div>
              <div id="editIcon" className={`${classes.edit} editIcon`}>
                <Edit />
              </div>
            </div>
          ) : (
            <div className={classes.plus}>
              <Plus />
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
  const { certificates, setCertificates, triggerChange } = props;
  const classes = useStyles(props);

  const handleTitleChange = (position, value, name) => {
    triggerChange();
    const newCerts = [...certificates];
    const newCert = { ...newCerts.find(cert => cert.position === position) };
    newCert[name] = value;
    newCerts[newCerts.findIndex(cert => cert.position === position)] = newCert;
    setCertificates(newCerts);
  };

  const handleFileChange = (position, file) => {
    triggerChange();
    const newCerts = [...certificates];
    const newCert = { ...newCerts.find(cert => cert.position === position) };
    newCert.file = file;
    newCert.url = "";
    newCerts[newCerts.findIndex(cert => cert.position === position)] = newCert;
    setCertificates(newCerts);
  };

  return (
    <>
      <div className={classes.root}>
        {certificates?.map((certificate, indx) => (
          <Dropzone key={indx}>
            {({ isDragActive, getInputProps, getRootProps }) => (
              <SingleCertificate
                id={indx}
                position={certificate.position}
                title={certificates.title}
                url={certificate.url}
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
