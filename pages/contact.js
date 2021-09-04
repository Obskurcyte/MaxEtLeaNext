import React, {useState} from 'react';
import Header from "../components/Header";
import {Formik} from 'formik'
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";
import axios from "axios";
import Head from "next/head";

const ContactScreen = props => {

  const { t, i18n } = useTranslation();

  const [success, setSuccess] = useState('');
  const [avisDonne, setAvisDonne] = useState(false);

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
          {!avisDonne ?
            <div>
                <div className="contact">
                    <h1 className="contact-us">{t("Contact.1")}</h1>
                </div>
                <div className="contact-form-container">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={async values => {
                            try {
                                setAvisDonne(true)
                                const response = await axios.post("/api/contact", {
                                    nom: values.nom,
                                    prenom: values.prenom,
                                    email: values.email,
                                    sujet: values.sujet,
                                    message: values.message
                                })
                                console.log(response)
                            } catch (err) {
                                console.log(err)
                            }
                        }
                        }
                    >
                        {props => (
                            <div className="contact-container rating form-contact">
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

                                <div className="email input-container">
                                    <label>{t("Contact.5")}<span className="star"> *</span></label>
                                    <input
                                        type="text"
                                        onChange={props.handleChange('sujet')}
                                        value={props.values.sujet}
                                    />
                                </div>
                                <div className="message input-container">
                                    <label>{t("Contact.6")}<span className="star"> *</span></label>
                                    <textarea
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
            </div> :
              <div className="avis-donne-container">
                  <h1>Merci de nous avoir contacté</h1>
              </div>
          }

      </div>
      <Footer />
    </div>


  )

};

export default ContactScreen;
