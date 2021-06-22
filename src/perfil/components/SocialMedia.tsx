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
      flexWrap: "wrap",
      width: "calc(50% - 1rem)"
    },
    label: {
      width: "15%"
    },
    row: {
      "& p": {
        color: theme.palette.secondary.dark,
        fontSize: "0.7rem"
      },
      display: "flex",
      flexWrap: "wrap",
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
      margin: "0 0.5rem",
      width: "75%"
    }
  }),
  { name: "SocialMedia" }
);

const SocialMedia = props => {
  const { setHasChanges } = props;
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

  const message = {
    label: "Usuario"
  };

  const handleSubmit = data => {
    socialMediaUpdateFunc({
      variables: {
        FB: data.facebook,
        IG: data.instagram,
        TW: data.twitter
      }
    });
    console.log("socialMediaData");
  };

  return (
    <Form
      formId="socialMediaData"
      initial={initialForm}
      onSubmit={handleSubmit}
    >
      {({ change, data, hasChanged }) => {
        React.useEffect(() => {
          setHasChanges(prev => ({ ...prev, socialMediaData: hasChanged }));
        }, [hasChanged]);
        return (
          <div className={`${classes.row}`}>
            {" "}
            <div className={`${classes.column}`}>
              <InputLabel className={`${classes.svg}`}>
                <FacebookIcon />
              </InputLabel>
              <TextField
                label={message.label}
                name="facebook"
                className={classes.textfield}
                value={data.facebook}
                onChange={change}
              />
              <p>https://www.facebook.com/{data.facebook}</p>
            </div>
            <div className={`${classes.column}`}>
              <InputLabel className={`${classes.svg}`}>
                <InstagramIcon />
              </InputLabel>
              <TextField
                label={message.label}
                name="instagram"
                className={classes.textfield}
                value={data.instagram}
                onChange={change}
              />
              <p>https://www.instagram.com/{data.instagram}</p>
            </div>
            <div className={`${classes.column}`}>
              <InputLabel className={`${classes.svg}`}>
                <YoutubeIcon />
              </InputLabel>
              <TextField
                label={message.label}
                name="youtube"
                className={classes.textfield}
                value={data.youtube}
                onChange={change}
              />
              <p>https://www.youtube.com/{data.youtube}</p>
            </div>
            <div className={`${classes.column}`}>
              <InputLabel className={`${classes.svg}`}>
                <TwitterIcon />
              </InputLabel>
              <TextField
                label={message.label}
                name="twitter"
                className={classes.textfield}
                value={data.twitter}
                onChange={change}
              />
              <p>https://www.twitter.com/{data.twitter}</p>
            </div>
          </div>
        );
      }}
    </Form>
  );
};

export default SocialMedia;
