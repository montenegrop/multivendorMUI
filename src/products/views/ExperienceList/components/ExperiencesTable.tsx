import { Card, CardContent } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const headers = ["Imagen Principal", "Descripción Corta"];

const ExperiencesTable = props => {
  const { data } = props;
  const experiences = data.filter(dat => dat.descriptionShort !== "");
  // console.log(experiences);
  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(label => (
                  <TableCell key={label}>{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {experiences.map(exp => (
                <TableRow>
                  <TableCell>
                    <img
                      width="50"
                      height="50"
                      src={exp.pastExperienceImages.edges[0]?.node.url}
                    />
                  </TableCell>
                  <TableCell>{exp.descriptionShort}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ExperiencesTable;
