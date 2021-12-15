import { Card, CardContent, Hidden } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

import { vendorServiceContracts_vendor_serviceContracts } from "../views/types/vendorServiceContracts";

const useStyles = makeStyles(
  {
    table: {
      minWidth: 650
    },
    message: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "250px",
      display: "block",
      overflow: "hidden"
    },
    stage: {
      color: "blue"
    }
  },
  { name: "ActiveServicesTable" }
);

function createData(id, datetime, address, city, service, message, state) {
  return { id, datetime, address, city, service, message, state };
}

interface Props {
  propWhichIsArray: Array<{
    __typename: "ServiceContract";
    id: string | null;
    firstName: string | null;
    fullName: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    datetime: string | null;
    service: string | null;
    message: string | null;
  }>;
}

const ActiveServicesTable = ({ propWhichIsArray }) => {
  const classes = useStyles();

  const rows = propWhichIsArray.map(contract =>
    createData(
      contract.id,
      contract.datetime,
      contract.address,
      contract.city,
      contract.service,
      contract.message,
      contract.stage
    )
  );

  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Id trabajo</TableCell>
                <TableCell align="right">Fecha y Hora</TableCell>
                <TableCell align="right">Dirección</TableCell>
                <TableCell align="right">Localidad</TableCell>
                <TableCell align="right">Servicio</TableCell>
                <TableCell align="right">Titulo</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.datetime}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.service}</TableCell>
                  <TableCell className={classes.message} align="right">
                    {row.message}
                  </TableCell>
                  <TableCell className={classes.stage} align="right">
                    {row.stage}
                    <Link
                      underline="hover"
                      color="inherit"
                      href="/getting-started/installation/"
                    >
                      link
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ActiveServicesTable;
