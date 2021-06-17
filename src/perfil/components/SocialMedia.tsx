import { InputLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";

import Form from "../../components/Form";
import FacebookIcon from "../../icons/FacebookIcon";
import InstagramIcon from "../../icons/InstragramIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import { useSocialMediaUpdate } from "../mutations";

const useStyles = makeStyles(
  theme => ({
    column: {
      alignItems: "flex-end",
      display: "flex",
      width: "calc(23% - 1rem)"
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    svg: {
      "& svg": {
        "& path": {
          fill: theme.palette.primary.light
        },
        width: "36px"
      }
    },
    textfield: {
      margin: "0 0.5rem"
    }
  }),
  { name: "CustomerCreateDetails" }
);

const SocialMedia = props => {
  const classes = useStyles(props);
  const [socialMediaUpdateFunc, stateSocialMediaUpdate] = useSocialMediaUpdate(
    {}
  );

  const initialForm = {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: ""
  };

  const handleSubmit = data => {
    socialMediaUpdateFunc({
      variables: {
        FB: data.facebook,
        IG: data.instagram,
        TW: data.twitter
      }
    });
  };

  return (
    <Form formId="SocialMedia" initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, hasChanged, submit, reset, triggerChange }) => (
        <div className={`${classes.row}`}>
          {" "}
          <div className={`${classes.column}`}>
            <InputLabel className={`${classes.svg}`}>
              <FacebookIcon />
            </InputLabel>
            <TextField
              label="URL"
              name="facebook"
              className={classes.textfield}
              value={data.facebook}
              onChange={change}
            />
          </div>
          <div className={`${classes.column}`}>
            <InputLabel className={`${classes.svg}`}>
              <InstagramIcon />
            </InputLabel>
            <TextField
              label="URL"
              name="instagram"
              className={classes.textfield}
              value={data.instagram}
              onChange={change}
            />
          </div>
          <div className={`${classes.column}`}>
            <InputLabel className={`${classes.svg}`}>
              <YoutubeIcon />
            </InputLabel>
            <TextField
              label="URL"
              name="youtube"
              className={classes.textfield}
              value={data.youtube}
              onChange={change}
            />
          </div>
          <div className={`${classes.column}`}>
            <InputLabel className={`${classes.svg}`}>
              <TwitterIcon />
            </InputLabel>
            <TextField
              label="URL"
              name="twitter"
              className={classes.textfield}
              value={data.twitter}
              onChange={change}
            />
          </div>
        </div>
      )}
    </Form>
  );
};

export default SocialMedia;
