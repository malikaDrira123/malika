import React from 'react';
import { Link } from 'react-router-dom';
import "./hero.css";
import hand_icon from "../assets/hand_icon.png";
import arrow_icon from "../assets/arrow.png";
import hero_img from "../assets/hero_image.png";

const Hero = () => {
  return (
    <section className='hero'>
      <article className="hero-left">
        <article>
          <article className="hero-hand-icon">
            <p>New</p>
            <img src={hand_icon} alt="hand_icon" />
          </article>
          <p>Collection</p>
          <p>For all your world cup needs</p>
        </article>
            
        <article className="hero-latest-btn">
          <Link to="#NewCollections">
            <span> Latest collection</span>
            <img src={arrow_icon} alt="" />
          </Link>
        </article>
      </article>

      <article className="hero-right">
        <img src={hero_img} alt="hero-img" />
      </article>
    </section>
  );
}

export default Hero;
