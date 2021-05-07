import React, {useState} from 'react';
import Header from "../components/Header";
import {Formik} from 'formik'
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";
import axios from "axios";

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
      <iframe 
        width="740" 
        height="705" 
        src="https://b31d5692.sibforms.com/serve/MUIEALeHloHr3oeQjJIdOnstS0X8NDMtM-xNZD3ttoNXRLBnsiFHQI_rp3gSIZ52m3iYdfobk4K6mdMVdnf9FLmpc4kKT-tlHrc658CrAAW1Jgq2Ve86sWuMviHukCkg3K6CzBlKVPi5uf0-nmIpPi8uv_l2qzUoAZqKl6CF_4DDDZZKTO60iZ95YOPEl4v0K6MWPCmD6xdWCUBK" 
        frameBorder="0" 
        scrolling="auto" 
        allowFullScreen 
        style={{display:"block", marginLeft: "auto", marginRight: "auto",maxWidth:"100%", marginBottom: "20px" }} >
      </iframe>
      <Footer />
    </div>


  )

};

export default ContactScreen;
