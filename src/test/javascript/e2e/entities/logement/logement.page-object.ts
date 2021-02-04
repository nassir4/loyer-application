import { element, by, ElementFinder } from 'protractor';

export class LogementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-logement div table .btn-danger'));
  title = element.all(by.css('jhi-logement div h2#page-heading span')).first();
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

export class LogementUpdatePage {
  pageTitle = element(by.id('jhi-logement-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nbreChambeInput = element(by.id('field_nbreChambe'));
  sufarceInput = element(by.id('field_sufarce'));
  photoInput = element(by.id('file_photo'));
  loyerInput = element(by.id('field_loyer'));
  descriptionInput = element(by.id('field_description'));
  etageInput = element(by.id('field_etage'));
  ascenceurInput = element(by.id('field_ascenceur'));
  garageInput = element(by.id('field_garage'));
  piscineInput = element(by.id('field_piscine'));
  grenierInput = element(by.id('field_grenier'));

  adresseSelect = element(by.id('field_adresse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNbreChambeInput(nbreChambe: string): Promise<void> {
    await this.nbreChambeInput.sendKeys(nbreChambe);
  }

  async getNbreChambeInput(): Promise<string> {
    return await this.nbreChambeInput.getAttribute('value');
  }

  async setSufarceInput(sufarce: string): Promise<void> {
    await this.sufarceInput.sendKeys(sufarce);
  }

  async getSufarceInput(): Promise<string> {
    return await this.sufarceInput.getAttribute('value');
  }

  async setPhotoInput(photo: string): Promise<void> {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput(): Promise<string> {
    return await this.photoInput.getAttribute('value');
  }

  async setLoyerInput(loyer: string): Promise<void> {
    await this.loyerInput.sendKeys(loyer);
  }

  async getLoyerInput(): Promise<string> {
    return await this.loyerInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setEtageInput(etage: string): Promise<void> {
    await this.etageInput.sendKeys(etage);
  }

  async getEtageInput(): Promise<string> {
    return await this.etageInput.getAttribute('value');
  }

  getAscenceurInput(): ElementFinder {
    return this.ascenceurInput;
  }

  getGarageInput(): ElementFinder {
    return this.garageInput;
  }

  getPiscineInput(): ElementFinder {
    return this.piscineInput;
  }

  getGrenierInput(): ElementFinder {
    return this.grenierInput;
  }

  async adresseSelectLastOption(): Promise<void> {
    await this.adresseSelect.all(by.tagName('option')).last().click();
  }

  async adresseSelectOption(option: string): Promise<void> {
    await this.adresseSelect.sendKeys(option);
  }

  getAdresseSelect(): ElementFinder {
    return this.adresseSelect;
  }

  async getAdresseSelectedOption(): Promise<string> {
    return await this.adresseSelect.element(by.css('option:checked')).getText();
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

export class LogementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-logement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-logement'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
