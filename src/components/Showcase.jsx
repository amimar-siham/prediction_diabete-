import React from 'react';
import Person from '../static/images/image3d.png';
const Showcase = () => (
  <div className="showcase-area" id="#home">
    <div className="container">
      <div className="left">
        <div className="big-title">
          <h1>Par <span> un Test de Diabete</span></h1>
          <h1>Assumez que votre santé est au top!</h1>
        </div>
        <p className="text">
          prenez soin de votre corps et il prendra soin de vous decouvrir votre resultat par une simple clique
        </p>
        <div className="cta">
          <a href="/test" className="btn_two">Tester<i className="ri-service-line button__icon"></i></a>
        </div>
      </div>
      <div className="right">
        <img src={Person} alt="Person Image" className="person" />
      </div>
    </div>
  </div>
);

export default Showcase;
