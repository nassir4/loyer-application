import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LogementComponentsPage, LogementDeleteDialog, LogementUpdatePage } from './logement.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Logement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let logementComponentsPage: LogementComponentsPage;
  let logementUpdatePage: LogementUpdatePage;
  let logementDeleteDialog: LogementDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Logements', async () => {
    await navBarPage.goToEntity('logement');
    logementComponentsPage = new LogementComponentsPage();
    await browser.wait(ec.visibilityOf(logementComponentsPage.title), 5000);
    expect(await logementComponentsPage.getTitle()).to.eq('loyerApp.logement.home.title');
    await browser.wait(ec.or(ec.visibilityOf(logementComponentsPage.entities), ec.visibilityOf(logementComponentsPage.noResult)), 1000);
  });

  it('should load create Logement page', async () => {
    await logementComponentsPage.clickOnCreateButton();
    logementUpdatePage = new LogementUpdatePage();
    expect(await logementUpdatePage.getPageTitle()).to.eq('loyerApp.logement.home.createOrEditLabel');
    await logementUpdatePage.cancel();
  });

  it('should create and save Logements', async () => {
    const nbButtonsBeforeCreate = await logementComponentsPage.countDeleteButtons();

    await logementComponentsPage.clickOnCreateButton();

    await promise.all([
      logementUpdatePage.setNbreChambeInput('5'),
      logementUpdatePage.setSufarceInput('5'),
      logementUpdatePage.setPhotoInput(absolutePath),
      logementUpdatePage.setLoyerInput('5'),
      logementUpdatePage.setDescriptionInput('description'),
      logementUpdatePage.setEtageInput('5'),
      logementUpdatePage.adresseSelectLastOption(),
    ]);

    expect(await logementUpdatePage.getNbreChambeInput()).to.eq('5', 'Expected nbreChambe value to be equals to 5');
    expect(await logementUpdatePage.getSufarceInput()).to.eq('5', 'Expected sufarce value to be equals to 5');
    expect(await logementUpdatePage.getPhotoInput()).to.endsWith(
      fileNameToUpload,
      'Expected Photo value to be end with ' + fileNameToUpload
    );
    expect(await logementUpdatePage.getLoyerInput()).to.eq('5', 'Expected loyer value to be equals to 5');
    expect(await logementUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await logementUpdatePage.getEtageInput()).to.eq('5', 'Expected etage value to be equals to 5');
    const selectedAscenceur = logementUpdatePage.getAscenceurInput();
    if (await selectedAscenceur.isSelected()) {
      await logementUpdatePage.getAscenceurInput().click();
      expect(await logementUpdatePage.getAscenceurInput().isSelected(), 'Expected ascenceur not to be selected').to.be.false;
    } else {
      await logementUpdatePage.getAscenceurInput().click();
      expect(await logementUpdatePage.getAscenceurInput().isSelected(), 'Expected ascenceur to be selected').to.be.true;
    }
    const selectedGarage = logementUpdatePage.getGarageInput();
    if (await selectedGarage.isSelected()) {
      await logementUpdatePage.getGarageInput().click();
      expect(await logementUpdatePage.getGarageInput().isSelected(), 'Expected garage not to be selected').to.be.false;
    } else {
      await logementUpdatePage.getGarageInput().click();
      expect(await logementUpdatePage.getGarageInput().isSelected(), 'Expected garage to be selected').to.be.true;
    }
    const selectedPiscine = logementUpdatePage.getPiscineInput();
    if (await selectedPiscine.isSelected()) {
      await logementUpdatePage.getPiscineInput().click();
      expect(await logementUpdatePage.getPiscineInput().isSelected(), 'Expected piscine not to be selected').to.be.false;
    } else {
      await logementUpdatePage.getPiscineInput().click();
      expect(await logementUpdatePage.getPiscineInput().isSelected(), 'Expected piscine to be selected').to.be.true;
    }
    const selectedGrenier = logementUpdatePage.getGrenierInput();
    if (await selectedGrenier.isSelected()) {
      await logementUpdatePage.getGrenierInput().click();
      expect(await logementUpdatePage.getGrenierInput().isSelected(), 'Expected grenier not to be selected').to.be.false;
    } else {
      await logementUpdatePage.getGrenierInput().click();
      expect(await logementUpdatePage.getGrenierInput().isSelected(), 'Expected grenier to be selected').to.be.true;
    }

    await logementUpdatePage.save();
    expect(await logementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await logementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Logement', async () => {
    const nbButtonsBeforeDelete = await logementComponentsPage.countDeleteButtons();
    await logementComponentsPage.clickOnLastDeleteButton();

    logementDeleteDialog = new LogementDeleteDialog();
    expect(await logementDeleteDialog.getDialogTitle()).to.eq('loyerApp.logement.delete.question');
    await logementDeleteDialog.clickOnConfirmButton();

    expect(await logementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
