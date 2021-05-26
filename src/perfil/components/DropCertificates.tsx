import { Card, makeStyles, TextField } from "@material-ui/core";
import { ThemeContext } from "@saleor/components/Theme";
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
      width: "36px",
      zIndex: 10
    },
    embedPdf: {
      position: "absolute"
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
    inputLabel: {
      color: theme.palette.primary.main,
      padding: "0.5rem"
    },
    plus: {
      [theme.breakpoints.down("sm")]: {
        height: "60px",
        width: "60px"
      },
      alignItems: "center",
      borderRadius: "50%",
      color: theme.palette.primary.main,
      cursor: "pointer",
      display: "flex",
      height: "100px",
      justifyContent: "center",
      width: "100px"
    },
    root: {
      [theme.breakpoints.down("md")]: {
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      },
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "repeat(5, 1fr)"
    },
    singleCert: {
      [theme.breakpoints.down("md")]: {
        maxWidth: "25%",
        minWidth: "200px"
      }
    },
    singleDrop: {
      alignItems: "center",
      display: "flex",
      height: "200px",
      justifyContent: "center",
      position: "relative",
      textAlign: "center",
      width: "100%"
    },
    titleField: {
      margin: "1rem 0",
      padding: "0 0.5rem"
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
      width: "36px",
      zIndex: 10
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
    className,
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

  const [type, setType] = React.useState<string>("");

  const handleFileChange = e => {
    const file = e.target.files[0];
    setBackground("");
    setBackground(URL.createObjectURL(file));
    setFile(position, file);
    setType(file.type);
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
      return;
    }
    if (id === "editIcon") {
      return;
    }
    if (id === "iconContainer") {
      e.stopPropagation();
    }
  };

  return (
    <>
      <Card className={className} key={id}>
        <div
          {...getRootProps}
          className={classes.singleDrop}
          style={{
            background: `url(${background}) center center / contain no-repeat`
          }}
        >
          {background !== "" ? (
            <>
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
              {type === "application/pdf" ? (
                <iframe
                  className={classes.embedPdf}
                  src={background}
                  width="100%"
                />
              ) : null}
            </>
          ) : (
            <div className={classes.plus}>
              <Plus />
            </div>
          )}
          <input
            {...getInputProps}
            onChange={handleFileChange}
            accept="image/*, application/pdf"
            name="file"
            type="file"
          />
        </div>
        <TextField
          multiline
          fullWidth
          value={title}
          label="Titulo"
          name="title"
          onChange={handleChange}
          variant="standard"
          className={classes.titleField}
          InputLabelProps={{
            classes: { root: classes.inputLabel }
          }}
        />
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
                className={classes.singleCert}
              />
            )}
          </Dropzone>
        ))}
      </div>
    </>
  );
};
