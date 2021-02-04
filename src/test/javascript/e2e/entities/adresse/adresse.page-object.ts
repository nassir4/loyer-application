import { element, by, ElementFinder } from 'protractor';

export class AdresseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adresse div table .btn-danger'));
  title = element.all(by.css('jhi-adresse div h2#page-heading span')).first();
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

export class AdresseUpdatePage {
  pageTitle = element(by.id('jhi-adresse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  regionInput = element(by.id('field_region'));
  departementInput = element(by.id('field_departement'));
  communeInput = element(by.id('field_commune'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRegionInput(region: string): Promise<void> {
    await this.regionInput.sendKeys(region);
  }

  async getRegionInput(): Promise<string> {
    return await this.regionInput.getAttribute('value');
  }

  async setDepartementInput(departement: string): Promise<void> {
    await this.departementInput.sendKeys(departement);
  }

  async getDepartementInput(): Promise<string> {
    return await this.departementInput.getAttribute('value');
  }

  async setCommuneInput(commune: string): Promise<void> {
    await this.communeInput.sendKeys(commune);
  }

  async getCommuneInput(): Promise<string> {
    return await this.communeInput.getAttribute('value');
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

export class AdresseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adresse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adresse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
