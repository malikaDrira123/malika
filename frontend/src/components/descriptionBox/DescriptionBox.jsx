import React from "react";
import "./descriptionBox.css";

const DescriptionBox = () => {
  return (
    <section className="descriptionBox">
      <span className="descriptionBox-navigator">
        <span className="description-nav-box">Description</span>
        <span className="description-nav-box fade"> Reviews (125)</span>
      </span>
      <span className="descriptionBox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          aspernatur placeat, est hic rem quod! Consequuntur voluptate nam optio
          explicabo, nesciunt aliquid ea similique corporis ullam aspernatur id
          ex temporibus!
        </p>
      </span>
    </section>
  );
};

export default DescriptionBox;
