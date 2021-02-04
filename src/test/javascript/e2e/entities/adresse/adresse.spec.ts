import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdresseComponentsPage, AdresseDeleteDialog, AdresseUpdatePage } from './adresse.page-object';

const expect = chai.expect;

describe('Adresse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adresseComponentsPage: AdresseComponentsPage;
  let adresseUpdatePage: AdresseUpdatePage;
  let adresseDeleteDialog: AdresseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Adresses', async () => {
    await navBarPage.goToEntity('adresse');
    adresseComponentsPage = new AdresseComponentsPage();
    await browser.wait(ec.visibilityOf(adresseComponentsPage.title), 5000);
    expect(await adresseComponentsPage.getTitle()).to.eq('loyerApp.adresse.home.title');
    await browser.wait(ec.or(ec.visibilityOf(adresseComponentsPage.entities), ec.visibilityOf(adresseComponentsPage.noResult)), 1000);
  });

  it('should load create Adresse page', async () => {
    await adresseComponentsPage.clickOnCreateButton();
    adresseUpdatePage = new AdresseUpdatePage();
    expect(await adresseUpdatePage.getPageTitle()).to.eq('loyerApp.adresse.home.createOrEditLabel');
    await adresseUpdatePage.cancel();
  });

  it('should create and save Adresses', async () => {
    const nbButtonsBeforeCreate = await adresseComponentsPage.countDeleteButtons();

    await adresseComponentsPage.clickOnCreateButton();

    await promise.all([
      adresseUpdatePage.setRegionInput('region'),
      adresseUpdatePage.setDepartementInput('departement'),
      adresseUpdatePage.setCommuneInput('commune'),
    ]);

    expect(await adresseUpdatePage.getRegionInput()).to.eq('region', 'Expected Region value to be equals to region');
    expect(await adresseUpdatePage.getDepartementInput()).to.eq('departement', 'Expected Departement value to be equals to departement');
    expect(await adresseUpdatePage.getCommuneInput()).to.eq('commune', 'Expected Commune value to be equals to commune');

    await adresseUpdatePage.save();
    expect(await adresseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adresseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Adresse', async () => {
    const nbButtonsBeforeDelete = await adresseComponentsPage.countDeleteButtons();
    await adresseComponentsPage.clickOnLastDeleteButton();

    adresseDeleteDialog = new AdresseDeleteDialog();
    expect(await adresseDeleteDialog.getDialogTitle()).to.eq('loyerApp.adresse.delete.question');
    await adresseDeleteDialog.clickOnConfirmButton();

    expect(await adresseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
