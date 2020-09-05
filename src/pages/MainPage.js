import React, { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Route, Link } from "react-router-dom";
import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import Input from "../component/Input";

const styles = {
  wrapper: {
    flex: 1,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 50,
  },
  headerText: {
    textAlign: "center",
  },
  formWrapper: {
    flex: 1,
    justifyContent: "space-between",
    textAlign: "center",
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

const MainPage = () => {
  const [checked, setChecked] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputContact, setInputContact] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const adapter = new LocalStorage("db");

  const db = low(adapter);
  db.defaults({ contact: [] }).write();

  const checkBoxChanged = (event) => {
    setChecked(event.target.checked);
  };

  const onSave = () => {
    db.get("contact")
      .push({
        name: inputName,
        number: inputContact,
        whatsAppContactable: checked,
        email: inputEmail,
      })
      .write();
    setInputName("");
    setInputContact("");
    setInputEmail("");
  };

  const rp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  console.log(validated);
  const onValidate = () => {
    if (inputName.length < 1 && inputName === "") {
      alert("Please enter a valid name!");
      setValidated(false);
    }
    if (inputContact < 1 && inputContact === "") {
      alert("Please enter a valid contact number");
      setValidated(false);
    }
    if (!rp.test(inputEmail)) {
      alert("Please enter a valid email address");
      setValidated(false);
    }
    if (
      inputName.length > 1 &&
      inputContact.length > 1 &&
      rp.test(inputEmail)
    ) {
      setValidated(true);
      onSave();
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        <Container maxWidth="sm">
          <div>
            <div style={styles.headerWrapper}>
              <h1 style={styles.headerText}>
                <i class="far fa-address-book"></i>
                {"\n"}Welcome to the Phone Book
              </h1>
            </div>
            <div style={styles.formWrapper}>
              <FormControl>
                <Input
                  label="Name"
                  helperText="Name of the person that you just got to know!"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                />
                <Input
                  label="Contact Number"
                  helperText="E.g. +601812345XX"
                  value={inputContact}
                  contact
                  onChange={(e) => setInputContact(e.target.value)}
                />
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      color="secondary"
                      checked={checked}
                      onChange={checkBoxChanged}
                    />
                  }
                  label={<p>WhatsApp Contactable</p>}
                  labelPlacement="end"
                />
                <Input
                  label="Email"
                  helperText="E.g. 123@imail.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                />
                <Route>
                  <div style={styles.buttonWrapper}>
                    <Button
                      to={validated ? "/contact" : "/"}
                      component={Link}
                      onClick={() => onValidate()}
                      variant="outlined"
                      color="default"
                      size="large"
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </div>
                </Route>
              </FormControl>
            </div>
          </div>
        </Container>
      </div>
      <footer style={styles.footerWrapper}>By Amanda &hearts;</footer>
    </>
  );
};

export default MainPage;
