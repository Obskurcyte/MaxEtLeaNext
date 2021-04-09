import React, {useState} from 'react';
import Header from "../components/Header";
import "./ContactScreen.css";
import {Formik} from 'formik'
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";
import axios from 'axios';
import nodemailer from 'nodemailer';



const ContactScreen = props => {

  const { t, i18n } = useTranslation();

  const [success, setSuccess] = useState('')
  const initialValues = {
    nom: '',
    prenom: '',
    email: '',
    sujet: '',
    message: ''
  }
  return (
    <div>
      <Header />
      <div className="contact">
        <h1 className="contact-us">{t("Contact.1")}</h1>
      </div>
      <div className="contact-wrapper">
        <div className="contact-form">
          <Formik
            initialValues={initialValues}
            onSubmit={async values => {
              console.log(values)
              try {
                await axios.post("http://localhost:5000/send", {
                  nom: values.nom,
                  prenom: values.prenom,
                  email: values.email,
                  sujet: values.sujet,
                  message: values.message
                })
              } catch (err) {
                console.log(err)
              }
            }
            }
          >
            {props => (
              <div>
                {success}
                <div className="nomprenom">
                  <div className="nom">
                    <label>{t("Contact.2")}<span className="star"> *</span></label>
                    <input
                      type="text"
                      onChange={props.handleChange('nom')}
                      value={props.values.nom}/>
                  </div>
                  <div className="prenom">
                    <label>{t("Contact.3")}<span className="star"> *</span></label>
                    <input
                      type="text"
                      onChange={props.handleChange('prenom')}
                      value={props.values.prenom}/>
                  </div>
                </div>
                <div className="email input-container">
                  <label>{t("Contact.4")}<span className="star"> *</span></label>
                  <input
                    type="text"
                    onChange={props.handleChange('email')}
                    value={props.values.email}
                  />
                </div>
                <div className="sujet input-container">
                  <label>{t("Contact.5")}<span className="star"> *</span></label>
                  <input
                    type="text"
                    onChange={props.handleChange("sujet")}
                    value={props.values.sujet}
                  />
                </div>
                <div className="message input-container">
                  <label>{t("Contact.6")}<span className="star"> *</span></label>
                  <input
                    type="text-area"
                    onChange={props.handleChange('message')}
                    value={props.values.message}
                  />
                </div>
                <div className="container-send">
                  <button className="send" type="submit" onClick={props.handleSubmit}>{t("Contact.7")}</button>
                </div>
              </div>
            )}

          </Formik>
        </div>
      </div>
      <Footer />
    </div>


  )

};

export default ContactScreen;
