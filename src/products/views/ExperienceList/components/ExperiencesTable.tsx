import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    colImages: {
      width: "15%"
    },
    descriptionShort: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    imgSize: {
      height: "auto",
      maxHeight: "60px",
      maxWidth: "110px",
      objectFit: "contain",
      width: "100%"
    }
  }),
  { name: "ExperiencesTable" }
);

const headers = ["Imagen Principal", "Descripción Corta"];

const ExperiencesTable = props => {
  const { data } = props;
  const experiences = data.filter(dat => dat.descriptionShort !== "");
  const classes = useStyles({ props });
  // console.log(experiences);
  return (
    <Card>
      <CardContent>
        <ResponsiveTable>
          <TableHead
            selected={0}
            colSpan={3}
            disabled={true}
            items={experiences}
          >
            {headers.map(head => (
              <TableCellHeader
                key={head}
                className={`${head === headers[0] ? classes.colImages : null}`}
              >
                {head}
              </TableCellHeader>
            ))}
          </TableHead>
          <TableBody>
            {experiences.map(exp => (
              <TableRow key={exp.descriptionShort}>
                <TableCell padding="checkbox">
                  <Checkbox disableClickPropagation></Checkbox>
                </TableCell>
                <TableCell>
                  <img
                    className={classes.imgSize}
                    src={exp.pastExperienceImages.edges[0]?.node.url}
                  />
                </TableCell>
                <TableCell className={classes.descriptionShort}>
                  {exp.descriptionShort}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ResponsiveTable>
      </CardContent>
    </Card>
  );
};

export default ExperiencesTable;
