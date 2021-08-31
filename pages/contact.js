import React, {useState} from 'react';
import Header from "../components/Header";
import {Formik} from 'formik'
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";
import axios from "axios";
import Head from "next/head";

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
      <Head>
        <title>Max And Lea - Contact</title>
      </Head>
      <Header />
      <div className="page-supercontainer">
        <div className="contact">
          <h1 className="contact-us">{t("Contact.1")}</h1>
        </div>
        <div className="contact-form-container">
        <iframe 
        width="540" 
        height="785" 
        src="https://b31d5692.sibforms.com/serve/MUIEAGfa8jbmh8CmjZAXZ-wJ0wdyNRxDzcNr7oStVQ-5JMx3DnOqSfKNYZF-Q2HFH5MZkZFL_1E2_JnpVwFUJREeKXB9cp14fUmENgzvyHjLhaDgC5PFMJg1fNhgQfFBk9OzQyZYahV9m4dzpMAtzq_YpDnETyLFw_a_lh7qECfDb5aqT1JjFqGGAgB5YcXdVda9IpU4qI_VWxSB" 
        frameborder="0" 
        scrolling="auto" 
        allowfullscreen 
        style={{display:"block", marginLeft: "auto", marginRight: "auto",maxWidth:"100%", marginBottom: "20px" }} >
        </iframe>
        </div>
      </div>
      <Footer />
    </div>


  )

};

export default ContactScreen;
