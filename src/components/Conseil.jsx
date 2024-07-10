import React from 'react';

function Conseil() {
  return (
    <section className="Conseil section" id="Conseil">
      <div className="Conseil_container">
        <div className="section-header">
          <h3 className="title" data-title="Conseil pour">Les Diabétique</h3>
        </div>
        <div className="diabete_grid" style={{top: '10%'}}>
          <div className="diabete_card">
            <div className="card_desc">
              <h3 className="Conseil_text">Fruits et légumes :</h3>
              <p className="text">Les fibres, les antioxydants des fruits et légumes peuvent vous aider à gérer votre maladie. Assurez-vous que vos repas vous apportent 3 à 4 portions de légumes et 2 à 3 portions de fruits chaque jour.</p>
            </div>
          </div>
          <div className="diabete_card">
            <div className="card_desc">
              <h3>Sucre :</h3>
              <p className="text">Il ne faut pas supprimer le sucre de son alimentation. En revanche, il faut éviter les boissons ou les aliments très sucrés comme les sodas, les desserts du commerce, le miel ou la confiture tous les jours… Mais une pâtisserie, de temps en temps, n’est pas contre-indiquée, si elle est prise à la fin du repas et non entre les repas.</p>
            </div>
          </div>
          <div className="diabete_card">
            <div className="card_desc">
              <h3>L’activité physique :</h3>
              <p className="text">Il est conseillé aux personnes atteintes de diabète de type II de faire 30 minutes d’activité d’intensité modérée – marche rapide, vélo, natation, danse, yoga, pilate… – chaque jour.</p>
            </div>
          </div>
          <div className="diabete_card">
            <div className="card_desc">
              <h3>Sel : </h3>
              <p className="text">En limitant votre consommation de sel, vous pouvez mieux contrôler votre tension artérielle.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Conseil;
