import axios from "axios";

import React from 'react';
import "./contact.css"

import 'react-big-calendar/lib/css/react-big-calendar.css';


// Définition du composant Contact en tant que classe étendant React.Component
class Contact extends React.Component {
    // Constructeur du composant
  constructor(props) {
    super(props);
     // Initialisation du state avec les champs du formulaire et leurs valeurs par défaut
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      company: "",
      message: "",
      
    };

    // Binding des fonctions de gestion des changements
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubjectChange = this.onSubjectChange.bind(this);
    this.onCompanyChange = this.onCompanyChange.bind(this);
    this.onMsgChange = this.onMsgChange.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.resetForm = this.resetForm.bind(this);
   
  }
  // Fonction pour gérer les changements dans le champ "firstName"
  onFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }
 // Fonction pour gérer les changements dans le champ "lastName"
  onLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }
  // Fonction pour gérer les changements dans le champ "company"
  onCompanyChange(event) {
    this.setState({ company: event.target.value });
  }
 // Fonction pour gérer les changements dans le champ "email"
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
 // Fonction pour gérer les changements dans le champ "subject"
  onSubjectChange(event) {
    this.setState({ subject: event.target.value });
  }
// Fonction pour gérer les changements dans le champ "message"
  onMsgChange(event) {
    this.setState({ message: event.target.value });
  }
// Fonction pour soumettre le formulaire de contact
  submitEmail(e) {
    // Empêcher le comportement par défaut du formulaire
    e.preventDefault();
     // Destructuring pour extraire les champs du state
    const { firstName, lastName, company, subject, email } = this.state;
 // Vérification de la longueur minimale des champs
    if (firstName.length < 3) {
      alert("La longueur minimale autorisée pour le prénom est de 3 caractères.");
      return;
    }
  
    if (lastName.length < 3) {
      alert("La longueur minimale autorisée pour le nom de famille est de 3 caractères.");
      return;
    }
  
    if (company.length < 3) {
      alert("La longueur minimale autorisée pour le nom de l'entreprise est de 3 caractères.");
      return;
    }
  
    if (subject.length < 10) {
      alert("La longueur minimale autorisée pour le sujet est de 10 caractères.");
      return;
    }
      // Vérification de la validité de l'adresse e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Adresse e-mail invalide.");
        return;
      }
       // Appel à l'API pour envoyer le formulaire
    axios
      .post("http://localhost:9000/send", this.state)
      .then((response) => {
        if (response.data.status === "success") {
          alert("Message Sent.");
          this.resetForm();
        } else if (response.data.status === "fail") {
          alert("Message failed to send.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du formulaire:", error);
        alert("Une erreur s'est produite lors de l'envoi du formulaire.");
      });
  }
  // Fonction pour réinitialiser le formulaire
  resetForm() {
    this.setState({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      subject: "",
      message: "",
    });
  }
 // Fonction de rendu du composant
  render() {

    return (
      <main className="container">
        <>
          <>
          <section className="contact-container">
              <h1 className="title-contact">CONTACT</h1>

              <hr />

              <article className="divider-contact" />
              <form
                id="contact-form"
                onSubmit={this.submitEmail}
                method="POST"
                action="/send"
              >
                <article className="form-group">
                  <>
                    <article className="col-md-8">
                     
                      <input
                        name="firstName"
                        placeholder="First Name"
                        id="firstName"
                        type="text"
                        className="form-control"
                        required
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                      />
                    </article>
                    <article className="col-md-8">
                      
                      <input
                        name="lastName"
                        placeholder="Last Name"
                        id="lastName"
                        type="text"
                        className="form-control"
                        required
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                      />
                    </article>
                    <article className="col-md-8">
                      
                      <input
                        name="Société"
                        placeholder="Company"
                        id="company"
                        type="text"
                        className="form-control"
                        required
                        value={this.state.company}
                        onChange={this.onCompanyChange}
                      />
                    </article>
                    <article className="col-md-8">
                      
                      <input
                        name="Email"
                        placeholder="E-MAIL"
                        id="email"
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        required
                        value={this.state.email}
                        onChange={this.onEmailChange}
                      />
                    </article>
                    <article className="col-md-8">
                     
                      <input
                        name="subject"
                        placeholder="Subject"
                        id="subject"
                        type="text"
                        className="form-control"
                        required
                        value={this.state.subject}
                        onChange={this.onSubjectChange}
                      />
                    </article>
                  </>

                  <article className="col-md-8">
                  
                  <textarea
                    placeholder=" Message"
                    id="message"
                    className="form-control"
                    rows="6"
                    required
                    value={this.state.message}
                    onChange={this.onMsgChange}
                  />
                  </article>
                </article>
                <>
                </>
                <article className="form-group-submit">
                  <label htmlFor="text" className="text-link">
                    
                  </label>
                  <section className="contact-agree">
              <input type="checkbox" name='' id=''/>
              <p>By continuing , i agree to the term of use & privacy policy</p>
           </section>

                  <button type="submit" className="primary-btn submit">
                  submit
                  </button>
                </article>
              </form>
            </section>
          </>
        </>
      </main>
    );
  }
}

export default Contact;











  































