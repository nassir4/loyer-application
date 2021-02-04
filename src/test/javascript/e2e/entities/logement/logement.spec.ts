import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LogementComponentsPage, LogementDeleteDialog, LogementUpdatePage } from './logement.page-object';

const expect = chai.expect;

describe('Logement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let logementComponentsPage: LogementComponentsPage;
  let logementUpdatePage: LogementUpdatePage;
  let logementDeleteDialog: LogementDeleteDialog;

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

    await promise.all([]);

    const selectedEtat = logementUpdatePage.getEtatInput();
    if (await selectedEtat.isSelected()) {
      await logementUpdatePage.getEtatInput().click();
      expect(await logementUpdatePage.getEtatInput().isSelected(), 'Expected etat not to be selected').to.be.false;
    } else {
      await logementUpdatePage.getEtatInput().click();
      expect(await logementUpdatePage.getEtatInput().isSelected(), 'Expected etat to be selected').to.be.true;
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
