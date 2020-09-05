import React, { useState } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import Modal from "../component/Modal";

const styles = {
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 50,
  },
  headerText: {
    textAlign: "center",
  },
  tableWrapper: {
    flex: 1,
    marginTop: 50,
  },
  buttonWrapper: {
    flex: 1,
    textAlign: "center",
    marginBottom: "45%",
    marginTop: "20%",
  },
  footerWrapper: {
    flex: 1,
    textAlign: "center",
    alignItems: "flex-end",
    marginTop: "50%",
  },
};

const headers = [
  { id: 0, title: "Contact Name" },
  { id: 1, title: "Contact Number" },
  { id: 2, title: "WhatsApp Contactable" },
  { id: 3, title: "Email Address" },
];

const ContactList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isVisible, setIsVisible] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const adapter = new LocalStorage("db");
  const db = low(adapter);
  const retrievedData = db.get("contact").map().value();

  console.log(db);

  const onDeleteAll = () => {
    localStorage.clear();
  };

  return (
    <div style={styles.wrapper}>
      <Container maxWidth="sm">
        <Route>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="default"
            size="large"
          >
            Back
          </Button>
        </Route>
        <div style={styles.headerWrapper}>
          <h1 style={styles.headerText}>Who are you looking for?</h1>
        </div>
        <div>
          <TableContainer component={Paper} style={styles.tableWrapper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell align="center">{header.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {retrievedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <TableRow>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.number}</TableCell>
                      <TableCell align="center">
                        {data.whatsAppContactable === true ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="center">{data.email}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 100]}
            component="div"
            count={retrievedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
        <Route>
          <div style={styles.buttonWrapper}>
            <Button
              onClick={() => setIsVisible(true)}
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete All
            </Button>
          </div>
          <Modal
            open={isVisible}
            close={!isVisible}
            title="Do you want to delete all contacts?"
            yesText="Yes"
            cancelText="Cancel"
            onPressYes={() => onDeleteAll()}
            onPressCancel={() => setIsVisible(false)}
            to="/"
            component={Link}
          />
        </Route>
      </Container>
      <footer style={styles.footerWrapper}>By Amanda &hearts;</footer>
    </div>
  );
};

export default ContactList;
