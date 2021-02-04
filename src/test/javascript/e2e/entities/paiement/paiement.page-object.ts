import { element, by, ElementFinder } from 'protractor';

export class PaiementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-paiement div table .btn-danger'));
  title = element.all(by.css('jhi-paiement div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PaiementUpdatePage {
  pageTitle = element(by.id('jhi-paiement-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  loyerInput = element(by.id('field_loyer'));
  dateDebutInput = element(by.id('field_dateDebut'));
  dureeInput = element(by.id('field_duree'));

  userSelect = element(by.id('field_user'));
  logementSelect = element(by.id('field_logement'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLoyerInput(loyer: string): Promise<void> {
    await this.loyerInput.sendKeys(loyer);
  }

  async getLoyerInput(): Promise<string> {
    return await this.loyerInput.getAttribute('value');
  }

  async setDateDebutInput(dateDebut: string): Promise<void> {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput(): Promise<string> {
    return await this.dateDebutInput.getAttribute('value');
  }

  async setDureeInput(duree: string): Promise<void> {
    await this.dureeInput.sendKeys(duree);
  }

  async getDureeInput(): Promise<string> {
    return await this.dureeInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async logementSelectLastOption(): Promise<void> {
    await this.logementSelect.all(by.tagName('option')).last().click();
  }

  async logementSelectOption(option: string): Promise<void> {
    await this.logementSelect.sendKeys(option);
  }

  getLogementSelect(): ElementFinder {
    return this.logementSelect;
  }

  async getLogementSelectedOption(): Promise<string> {
    return await this.logementSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PaiementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-paiement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-paiement'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
