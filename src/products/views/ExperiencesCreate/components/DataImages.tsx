import { Card, CardContent, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Dropzone from "react-dropzone";

import { default as Edit } from "../../../../icons/Edit";
import { default as Plus } from "../../../../icons/Plus";
import { default as Trash } from "../../../../icons/Trash";

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
      flexWrap: "wrap",
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
      textAlign: "center"
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

const DataImages: React.FC = props => {
  const [background, setBackground] = React.useState("");
  const [type, setType] = React.useState<string>("");
  const classes = useStyles(props);

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
      // setFile(position, "delete");
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

  const handleFileChange = e => {
    const file = e.target.files[0];
    setBackground("");
    setBackground(URL.createObjectURL(file));
    // setFile(position, file);
    setType(file.type);
  };

  return (
    <CardContent>
      <Dropzone>
        {({ isDragActive, getInputProps, getRootProps }) => (
          <Card>
            <div
              {...getRootProps}
              style={{
                background: `url(${background}) center center / contain no-repeat`
              }}
            >
              {background !== "" ? (
                <>
                  <div id="iconContainer" onClick={handleIconClick}>
                    <div
                      id="trashIcon"
                      className={`${classes.trash} trashIcon`}
                    >
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
                  <p>Subir Archivo</p>
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
          </Card>
        )}
      </Dropzone>
    </CardContent>
  );
};

export default DataImages;
