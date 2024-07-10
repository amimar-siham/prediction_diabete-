import React from 'react';
import img2 from '../static/images/img2.png';
import img6 from '../static/images/img6.png';
import img4 from '../static/images/img4.png';

function Service() {
  return (
    <section className="service" id="service">
      <div className="service_container">
        <div className="section-header">
          <h3 className="title" data-title="pour plus">Informations</h3>
          <p className="text">
            Aimeriez-vous obtenir de plus amples renseignements sur le diabète?
          </p>
        </div>
      </div>
      <div className="cards_service">
        <div className="container_s">
          <div className="card">
            <div className="imgBx">
              <img src={img2} style={{width: '150px'}} alt="Définition et types" />
            </div>
            <div className="contentBx">
              <h2>Définition et types</h2>
              <a href="#diabete section">Voir plus</a>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src={img6} style={{width: '130px'}} alt="Les Symptômes" />
            </div>
            <div className="contentBx">
              <h2>Les Symptômes</h2>
              <a href="#Symptomes">Voir plus</a>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src={img4} style={{width: '270px'}} alt="conseils alimentaires" />
            </div>
            <div className="contentBx">
              <h2>conseils alimentaires</h2>
              <a href="#Conseil">Voir plus</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
