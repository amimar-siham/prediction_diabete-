import React from 'react'
import '../css/style.css';
import Person from '../static/images/flat.png'
import first from '../static/images/fig1.png'
import imag1 from '../static/images/fig2.png'
import imag2 from '../static/images/fig3.png'
import imag3 from '../static/images/fig4.png'
import imag4 from '../static/images/fig5.png'
import imag5 from '../static/images/fig6.png'
import imag6 from '../static/images/fig7.png'
import imag7 from '../static/images/fig8.png'
import imag8 from '../static/images/fig9.png'
function Analyse() {
  return (
    <div className="big-wrapper light">
      <div className="showcase-area" id="home">
        <div className="container">
          <div className="left">
            <div className="big-title_diag">
              <h1>
                Découvrir à partir de la base des données <span>Les graphes suivantes</span>
              </h1>
              <h1>Pour une analyse explicative</h1>
            </div>
            <p className="text">
              Vous trouvez dans cette page des plots avec un commentaire explicatif, ainsi qu'une capture du tableau de bord.
            </p>
          </div>

          <div className="right">
            <img src={Person} alt="Person Image" className="person" />
          </div>
        </div>
      </div>

      <section className="symptomes" id="Symptomes">
        <div className="section-header">
          <h3 className="title" data-title="présentation de">la base des données</h3>
        </div>
        <div className="tab_container">
          <img src={first} alt="Figure 1" />
        </div>
      </section>

      <section className="all_diagram section">
        <section className="diagram section" style={{ padding: '2rem 0' }}>
          <div className="section-header" style={{ padding: '2rem' }}>
            <h3 className="title" data-title="présentation des">Diagrammes</h3>
          </div>
          <div className="diagram_container">
            <div className="diagram_info">
              <img className="graph" src={imag1} alt="Figure 2" />
              <p className="diagram_text">
                • Cette figure représente le nombre global des diabétiques et non diabétiques selon l'attribut « Outcome » par rapport à la base de données.
                Comme il est montré, le nombre des non diabétiques est plus élevé (presque 500 personnes) par rapport au nombre des patients diabétiques.
              </p>
            </div>

            <div className="diagram_info">
              <img className="graph" src={imag2}alt="Figure 3" />
              <p className="diagram_text">
                • Ce graphe représente l'attribut « Age » en fonction de la fréquence totale pour les patients diabétiques et non diabétique.
                A titre d'interprétation, On observe facilement qu'on a 25 personnes qui sont diabétiques et âgées de 20 à 30 ans, d'autre part, les non diabétiques de même âge sont plus de 175 personnes.
              </p>
            </div>
          </div>
        </section>

        <section className="diagram section" style={{ padding: '3rem 0' }}>
          <div className="diagram_container">
            <div className="diagram_info">
              <img className="graph" src={imag3} alt="Figure 4" />
              <p className="diagram_text">
                • Ce graphe représente l'attribut « Glucose » en fonction de la fréquence totale pour les patients diabétiques et non diabétique.
                Pour ce plot, on observe qu'on a 120 personnes non diabétiques ont un glucose qui varie entre 80 et 100, alors que le nombre des diabétiques est supérieur à 40 personnes qui ont un glucose entre 125 et 200.
              </p>
            </div>

            <div className="diagram_info">
              <img className="graph" src={imag4} alt="Figure 5" style={{ width: '550px' }} />
              <p className="diagram_text">
                • Ce graphe représente l'attribut « Fonction généalogique du diabète » en fonction de la fréquence totale pour les patients diabétiques et non diabétique.
                Pour ce cas, on remarque que la fonction généalogique représente un facteur important chez 70 personnes qui sont attaquées par le diabète d'un pourcentage de 5%.
              </p>
            </div>
          </div>
        </section>

        <section className="diagram section" style={{ padding: '3rem 0' }}>
          <div className="diagram_container">
            <div className="diagram_info">
              <img className="graph" src={imag5} alt="Figure 6" />
              <p className="diagram_text">
                • Ce graphe représente l'attribut « BloodPressure » ou « Tension » en fonction de la fréquence totale pour les patients diabétiques et non diabétique.
                On peut voir clairement par ce graphe que les personnes diabétiques ont une tension qui varie entre 60 et 100, mais pour le cas des non diabétiques, leur tension est variée de 60 à 80.
              </p>
            </div>

            <div className="diagram_info">
              <img className="graph" src={imag6} alt="Figure 7" />
              <p className="diagram_text">
                • Ce graphe représente l'attribut « Insulin » en fonction de la fréquence totale pour les patients diabétiques et non diabétique.
                Cette figure montre que les diabétiques sont divisés en deux groupes, le premier concerne les personnes qui ne prennent pas d'insuline (« prédiabète ») et le deuxième présente les patients diabétiques avec une dose d'insuline de 20 à 400 unités.
              </p>
            </div>
          </div>
        </section>

        <section className="diagram section" style={{ padding: '3rem 0' }}>
          <div className="diagram_container">
            <div className="diagram_info">
              <img className="graph" src={imag7} alt="Figure 8" />
              <p className="diagram_text">
                • Ce graphe représente la relation entre les variables et la matrice de corrélation où chaque cellule est remplie en couleur en fonction du coefficient de corrélation de la paire qu'elle représente.
                Cette figure montre que « Age », « Glucose » et « BMI » sont des caractéristiques importantes pour le diagnostic de la maladie de diabète et qui sont fortement non corrélées les uns aux autres.
              </p>
            </div>

            <div className="diagram_info">
              <img className="graph" src={imag8} alt="Figure 9" style={{ width: '580px' }} />
              <p className="diagram_text">
                • Ce graphe représente la distribution des patients diabétiques et non diabétiques en fonction du glucose et de la tension.
                On remarque qu'on peut constater que plus le taux de glucose est élevé, plus l'enregistrement est associé à un diabète (résultat = 1, points rouges), tandis que plus il est bas, plus il est associé à l'absence du diabète (résultat = 0, points bleus).
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}
export default Analyse;
