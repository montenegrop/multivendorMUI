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
  const { setHasChanges, socialMedia } = props;
  const classes = useStyles(props);
  const [socialMediaUpdateFunc, stateSocialMediaUpdate] = useSocialMediaUpdate(
    {}
  );

  const initialForm = {
    FB: socialMedia.find(social => social.code === "FB").userString,
    IG: socialMedia.find(social => social.code === "IG").userString,
    LK: "",
    TW: socialMedia.find(social => social.code === "TW").userString,
    YT: ""
  };

  const message = {
    label: "Usuario"
  };

  const handleSubmit = data => {
    // console.log(data);
    Object.keys(data).forEach(social => {
      //  console.log(social);
      //  console.log(data[social]);
      if (
        data[social] &&
        data[social] !== "" &&
        data[social] !== initialForm[social]
      ) {
        socialMediaUpdateFunc({
          variables: {
            code: social,
            userString: data[social]
          }
        });
      }
    });
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
                name="FB"
                className={classes.textfield}
                value={data.FB}
                onChange={change}
              />
              <p>https://www.facebook.com/{data.FB}</p>
            </div>
            <div className={`${classes.column}`}>
              <InputLabel className={`${classes.svg}`}>
                <InstagramIcon />
              </InputLabel>
              <TextField
                label={message.label}
                name="IG"
                className={classes.textfield}
                value={data.IG}
                onChange={change}
              />
              <p>https://www.instagram.com/{data.IG}</p>
            </div>
            <div className={`${classes.column}`}>
              <InputLabel className={`${classes.svg}`}>
                <YoutubeIcon />
              </InputLabel>
              <TextField
                label={message.label}
                name="YT"
                className={classes.textfield}
                value={data.YT}
                onChange={change}
              />
              <p>https://www.youtube.com/{data.YT}</p>
            </div>
            <div className={`${classes.column}`}>
              <InputLabel className={`${classes.svg}`}>
                <TwitterIcon />
              </InputLabel>
              <TextField
                label={message.label}
                name="TW"
                className={classes.textfield}
                value={data.TW}
                onChange={change}
              />
              <p>https://www.twitter.com/{data.TW}</p>
            </div>
          </div>
        );
      }}
    </Form>
  );
};

export default SocialMedia;
