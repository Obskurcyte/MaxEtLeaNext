import React, {useState} from 'react';
import Header from "../components/Header";
import {Formik} from 'formik';
import {useTranslation} from "react-i18next";
import axios from 'axios';
import Footer from "../components/Footer";

const Avis = () => {
    const { t, i18n } = useTranslation();
    const [avisDonne, setAvisDonne] = useState(false);
    const [success, setSuccess] = useState('');
    const [avis, setAvis] = useState('')

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
            {!avisDonne ?
                <div className="page-supercontainer">
                    <div className="contact">
                        <h1 className="contact-us">Formulaire Avis</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={async values => {
                            console.log(values)
                            try {
                                await axios.post("/api/avis", {
                                    nom: values.nom,
                                    prenom: values.prenom,
                                    email: values.email,
                                    sujet: values.sujet,
                                    avis: avis,
                                    message: values.message
                                }).then(() => setAvisDonne(true))
                            } catch (err) {
                                console.log(err)
                            }
                        }
                        }
                    >
                        {props => (
                            <div className="contact-container rating">
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

                                <div className="input-container avis">
                                    <label>Votre avis<span className="star"> *</span></label>
                                    <div className="bonhomme-container">
                                        <input
                                            type="radio"
                                            id="wpforms-5987-field_1_1"
                                            name="wpforms[fields][1]"
                                            value="Pas content"
                                            required=""
                                            onClick={() => {
                                               setAvis('Bon')
                                            }}
                                        />
                                        <input
                                            type="radio"
                                            id="wpforms-5987-field_1_2"
                                            name="wpforms[fields][1]"
                                            value="Moyen content"
                                            required=""
                                            onClick={() => {
                                                setAvis('Moyen')
                                            }}
                                        />
                                        <input
                                            type="radio"
                                            id="wpforms-5987-field_1_3"
                                            name="wpforms[fields][1]"
                                            value="Content"
                                            required=""
                                            className="wpforms-valid"
                                            onClick={() => {
                                                setAvis('Mauvais')
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="message input-container">
                                    <label>Details</label>
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
                </div> :

                <div className="avis-donne-container">
                    <h1>Merci d'avoir donné votre avis</h1>
                </div>
            }

            <Footer />
        </div>
    )}

export default Avis;