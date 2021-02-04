import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PaiementComponentsPage, PaiementDeleteDialog, PaiementUpdatePage } from './paiement.page-object';

const expect = chai.expect;

describe('Paiement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paiementComponentsPage: PaiementComponentsPage;
  let paiementUpdatePage: PaiementUpdatePage;
  let paiementDeleteDialog: PaiementDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Paiements', async () => {
    await navBarPage.goToEntity('paiement');
    paiementComponentsPage = new PaiementComponentsPage();
    await browser.wait(ec.visibilityOf(paiementComponentsPage.title), 5000);
    expect(await paiementComponentsPage.getTitle()).to.eq('loyerApp.paiement.home.title');
    await browser.wait(ec.or(ec.visibilityOf(paiementComponentsPage.entities), ec.visibilityOf(paiementComponentsPage.noResult)), 1000);
  });

  it('should load create Paiement page', async () => {
    await paiementComponentsPage.clickOnCreateButton();
    paiementUpdatePage = new PaiementUpdatePage();
    expect(await paiementUpdatePage.getPageTitle()).to.eq('loyerApp.paiement.home.createOrEditLabel');
    await paiementUpdatePage.cancel();
  });

  it('should create and save Paiements', async () => {
    const nbButtonsBeforeCreate = await paiementComponentsPage.countDeleteButtons();

    await paiementComponentsPage.clickOnCreateButton();

    await promise.all([
      paiementUpdatePage.setLoyerInput('5'),
      paiementUpdatePage.setDateDebutInput('2000-12-31'),
      paiementUpdatePage.setDureeInput('5'),
      paiementUpdatePage.typePaiementSelectLastOption(),
      paiementUpdatePage.userSelectLastOption(),
      paiementUpdatePage.logementSelectLastOption(),
    ]);

    expect(await paiementUpdatePage.getLoyerInput()).to.eq('5', 'Expected loyer value to be equals to 5');
    expect(await paiementUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
    expect(await paiementUpdatePage.getDureeInput()).to.eq('5', 'Expected duree value to be equals to 5');

    await paiementUpdatePage.save();
    expect(await paiementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await paiementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Paiement', async () => {
    const nbButtonsBeforeDelete = await paiementComponentsPage.countDeleteButtons();
    await paiementComponentsPage.clickOnLastDeleteButton();

    paiementDeleteDialog = new PaiementDeleteDialog();
    expect(await paiementDeleteDialog.getDialogTitle()).to.eq('loyerApp.paiement.delete.question');
    await paiementDeleteDialog.clickOnConfirmButton();

    expect(await paiementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
