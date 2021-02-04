import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'adresse',
        loadChildren: () => import('./adresse/adresse.module').then(m => m.LoyerAdresseModule),
      },
      {
        path: 'logement',
        loadChildren: () => import('./logement/logement.module').then(m => m.LoyerLogementModule),
      },
      {
        path: 'paiement',
        loadChildren: () => import('./paiement/paiement.module').then(m => m.LoyerPaiementModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class LoyerEntityModule {}
