import React from 'react';
import image from '../static/images/image.png';
import '../css/style.css';
import { useState, useEffect } from 'react';
function DiabetesSection() {
  const [mlPlayed, setMlPlayed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!mlPlayed && hasReached(document.querySelector('.milestones'))) {
        setMlPlayed(true);
        mlCounters();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mlPlayed]);

  const mlCounters = () => {
    document.querySelectorAll('.number span').forEach((ctr) => {
      let target = +ctr.dataset.target;
      setTimeout(() => {
        updateCount(ctr, target);
      }, 400);
    });
  };

  const hasReached = (el) => {
    let topPosition = el.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + el.offsetHeight;
  };

  const updateCount = (num, maxNum) => {
    let currentNum = +num.innerText;
    if (currentNum < maxNum) {
      num.innerText = currentNum + 1;
      setTimeout(() => {
        updateCount(num, maxNum);
      }, 12);
    }
  };

  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  const showSlides = (n) => {
    let slides = document.getElementsByClassName('box-heading');
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slides.length);
    } else {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      slides[slideIndex - 1].style.display = 'block';
      dots[slideIndex - 1].className += ' active';
    }
  };

  return (
    <section className="diabete section" id="diabete-section">
      <div className="diabete_container">
        <div className="diabete_info">
          <h1 className="heading">Qu'est ce que le Diabète & Quelques causes</h1>
          <p className="diabete_text">
            Le Diabète est une maladie chronique qui apparaît lorsque le pancréas ne produit pas suffisamment d'insuline ou que l'organisme n'utilise pas correctement l'insuline qu'il produit. L'insuline est une hormone qui régule la concentration de sucre dans le sang. Il y a 3 types de diabète.
          </p>
          <div className="milestones">
            <div className="ml">
              <h2 className="number"><span data-target="425">0</span>m+</h2>
              <h5>au monde</h5>
            </div>
            <div className="ml">
              <h2 className="number"><span data-target="2">0</span>m+</h2>
              <h5>au Maroc</h5>
            </div>
          </div>
        </div>

        <div className="diabete_grid">
          <div className="diabete_card">
            <div className="card_desc">
              <h3>Diabète Type 1</h3>
              <p className="text">Une maladie auto-immune qui apparaît généralement en bas âge (avant 30 ans) et qui se caractérise par une absence quasi-totale de production d'insuline.</p>
            </div>
          </div>
          <div className="diabete_card">
            <div className="card_desc">
              <h3>Diabète Type 2</h3>
              <p className="text">Due à la production insuffisante d'insuline ou à cause de l'hormone qui ne fait pas bien son travail ou les cellules présentent une résistance à l'insuline.</p>
            </div>
          </div>
          <div className="diabete_card">
            <div className="card_desc">
              <h3>Diabète gestationnel</h3>
              <p className="text">Chez certaines femmes, le pancréas ne parvient pas à sécréter suffisamment d'insuline pour contrebalancer l'effet de ces hormones, ce qui entraîne donc une hyperglycémie, puis un diabète.</p>
            </div>
          </div>
          <div className="diabete_card">
            <div className="card_desc">
              <h3>Prédiabète</h3>
              <p className="text">Se manifeste par un taux de glucose sanguin plus élevé que la normale, mais inférieur au taux permettant de poser un diagnostic de diabète.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="symptomes" id="symptomes">
        <div className="section-header">
          <h3 className="title" data-title="les symptômes">du diabète</h3>
          <p className="text">Les premiers symptômes du diabète peuvent être soudains</p>
        </div>
        <div className="symp_container">
          <div className="symp_box">
            <div className="box-heading">
              <h1 className="heading_box">Diabète Type 1</h1>
              <div className="box-desc">
                <p className="text">
                  Les symptômes du diabète de type 1 sont généralement brutaux et passent difficilement inaperçus. Il s'agit par exemple : d'un besoin fréquent d'uriner et d'urines abondantes (polyurie), d'une majoration de la soif (polydipsie), d'un appétit excessif qui s'accompagne d'une perte de poids, de l'apparition d'un trouble de la vision, d'une fatigue importante.
                </p>
                <img src={image} alt="Diabète Type 1" />
              </div>
            </div>
            <div className="box-heading">
              <h1 className="heading_box">Diabète Type 2</h1>
              <div className="box-desc">
                <p className="text">
                  Dans un contexte de diabète de type 2, le diagnostic est souvent fait par hasard, car ce type de diabète évolue silencieusement sur plusieurs années. Voici quelques symptômes pouvant évoquer ce type de diabète : avoir souvent envie d'uriner; être amené à boire fréquemment; remarquer que la cicatrisation d'une plaie prend plus de temps que d'habitude; la fatigue; avoir la vision trouble; la survenue récurrente d'infections.
                </p>
                <img src={image} alt="Diabète Type 2" />
              </div>
            </div>
            <div className="dot-container">
              <span className="dot" onClick={() => currentSlide(1)}></span>
              <span className="dot" onClick={() => currentSlide(2)}></span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}


export default DiabetesSection;
