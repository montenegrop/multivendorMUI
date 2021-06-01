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
    error: {
      border: "1px solid red"
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
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "1fr 1fr"
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
    spanMe: {
      gridColumnStart: "span 4"
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

const position = ["0", "1", "2", "3", "4"];

interface IProps {
  images: Array<{ file: any; position: string }>;
  setImages: (images) => void;
  triggerChange: () => void;
  error: {
    imageZero: boolean;
  };
}

const DataImages: React.FC<IProps> = props => {
  const { images, setImages, triggerChange, error } = props;
  const classes = useStyles(props);

  const handleFileChange = (position, file) => {
    triggerChange();
    const newImages = [...images];
    const newImage = { ...newImages.find(img => img.position === position) };
    newImage.file = file;
    newImages[newImages.findIndex(img => img.position === position)] = newImage;
    setImages(newImages);
  };

  return (
    <CardContent className={classes.root}>
      {position.map((pos, indx) => (
        <Dropzone key={indx}>
          {({ getInputProps, getRootProps }) => (
            <SingleImage
              position={pos}
              classes={classes}
              error={error}
              getInputProps={getInputProps()}
              getRootProps={getRootProps()}
              setFile={handleFileChange}
              key={indx}
            />
          )}
        </Dropzone>
      ))}
    </CardContent>
  );
};

export default DataImages;

export const SingleImage = props => {
  const {
    position,
    classes,
    getRootProps,
    getInputProps,
    setFile,
    error
  } = props;

  const [background, setBackground] = React.useState("");

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

  const handleFileChange = e => {
    const file = e.target.files[0];
    setBackground("");
    setBackground(URL.createObjectURL(file));
    setFile(position, file);
  };

  return (
    <Card
      className={`${position === "0" ? classes.spanMe : null} ${
        position === "0" ? (error.imageZero ? classes.error : null) : null
      }`}
    >
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
          </>
        ) : (
          <div className={classes.plus}>
            <Plus />
            <p>{`${
              position === "0" ? "Subir Imagen Principal" : "Subir Imagen"
            } `}</p>
          </div>
        )}

        <input
          {...getInputProps}
          onChange={handleFileChange}
          accept="image/*"
          name="file"
          type="file"
        />
      </div>
    </Card>
  );
};
