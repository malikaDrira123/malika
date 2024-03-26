import React from "react";
import "./footer.css";

import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontSize: "16px",
};

const Footer = () => {
  const location = useLocation();

  // Function to check if the current page is the shop page
  const isShopPage = () => {
    return location.pathname === "/";
  };
  // Function to open Google Maps in a new tab
  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps?q=central+avenue+la+-+78170+Paris",
      "_blank"
    );
  };

  return (
    <footer className="footer">
      {/* Render the video only on the shop page */}
      {isShopPage() && (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/uXlWYZ022zU"
          title="Titre de la vidéo YouTube"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
     

      <section>
        <main id="containerFooter">
         
          <span id="webFooter">
            <h3> online store </h3>
            <p>
              {" "}
              <Link style={linkStyle} to="/sport">
                Sport
              </Link>
            </p>
            <p>
              {" "}
              <Link style={linkStyle} to="/beauty">
                Beauty & Health
              </Link>{" "}
            </p>
            <p>
              {" "}
              <Link style={linkStyle} to="/tech">
                High-Tech
              </Link>{" "}
            </p>
            <p>
              {" "}
              <Link style={linkStyle} to="/newCollection">
                New Collection
              </Link>{" "}
            </p>
          </span>

          <span id="webFooter">
            <h3> partners </h3>
            <p>
              {" "}
              <a href="https://www.zara.com/fr/">Zara</a>{" "}
            </p>
            <p>
              {" "}
              <a href="https://www.sephora.fr/?utm_source=google&utm_medium=cpc&utm_campaign=SephoraEUR_SR_FRA_BRA-BrandSephora_GEN_OTH_OGOING_EC_BREX_GTAD_CRD_FRA_EUR_NAPP_&utm_term=sephora&gad_source=1&gclid=CjwKCAiArfauBhApEiwAeoB7qPnGtB4m9DRGvaVhRurgPnhECQbHV8joceETCDJQcAmliPShBXQI0RoCq2YQAvD_BwE">
                SEPHORA
              </a>{" "}
            </p>
            <p>
              {" "}
              <a href="https://www.siliquarzt.com/high-tech">Siliquarzt</a>{" "}
            </p>
            <p>
              {" "}
              <a href="https://www.ct-accessories.fr/">Crossfit</a>
            </p>
            <p> + many more </p>
          </span>

        

          <span id="webFooter">
            <h3>Get in Touch</h3>
            <ul className="location_icon">
              <li>
              
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <p onClick={openGoogleMaps} aria-hidden="true"style={{ marginLeft: "0.5rem" }}>
                  78170 La Celle Saint Cloud , PARIS
                </p>
                
              </li>
              <li><p>
              <a href="#">
                
                  <FontAwesomeIcon
                  aria-hidden="true"
                    icon={faPhoneAlt}
                    
                  />
                  Phone : ( +06 35464823)
                
                </a></p>
              </li>
              
              
               <li> <p>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    
                  />
                  Email : malika.drira@gmail.com
                  </a>
                </p>
                
              </li>
            </ul>
          </span>
          
        </main>
      </section>

      <span className="footer-copyright">
        <article className="footer-icon">
          <Link style={linkStyle} to="/">
            <FontAwesomeIcon icon={faTwitter} className="twitter" />
          </Link>
          <Link style={linkStyle} to="/">
            <FontAwesomeIcon icon={faFacebook} className="facebook" />
          </Link>
          <Link style={linkStyle} to="/">
            <FontAwesomeIcon icon={faInstagram} className="instagram" />
          </Link>
          <Link style={linkStyle} to="/">
            <FontAwesomeIcon icon={faDribbble} className="dribbble" />
          </Link>
        </article>
        <hr />


        <p>copyright © Malika Shop- All Right Reserved</p>
      </span>
    </footer>
  );
};

export default Footer;
