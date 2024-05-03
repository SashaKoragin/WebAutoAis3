import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DirectoryDocument, InfoDocument } from '../../../../../../Api/RequestService/modelAutomation';
export class ModelValidation {


  //Валидация наименование документов из справочника
  public validationDirectoryDocument(control: AbstractControl): ValidationErrors {
    var nameDocumentDataBase = control.value as DirectoryDocument;
    return (nameDocumentDataBase == undefined || nameDocumentDataBase.NameDocumentDataBase) == undefined ? { 'error': true } : null
  };

  //Валидация документов пользовательское описание
  public validationInfoDocument(control: AbstractControl): ValidationErrors {
    var nameDocumentDataBase = control.value as InfoDocument;
    return (nameDocumentDataBase == undefined || nameDocumentDataBase.NameDocumentInfo) == undefined ? { 'error': true } : null
  };

  ///Валидационная модель проверки Групп
  public getRowValidatorModel: FormGroup[] = [
    ///Валидация пользователя
    new FormGroup({
      'NumberOgrn': new FormControl(null, [Validators.min(1000000000000), Validators.max(9999999999999), Validators.required])
    }),
    new FormGroup({
      'NumberOgrnGrn': new FormControl(null, [Validators.min(1000000000000), Validators.max(9999999999999), Validators.required]),
      'NameDocument': new FormControl(null, [Validators.required])
    }),
    new FormGroup({
      'NameDocumentDataBase': new FormControl({ value: new DirectoryDocument() }, [Validators.required, this.validationDirectoryDocument]),
      'NameDocumentInfo': new FormControl({ value: new InfoDocument() }, [Validators.required, this.validationInfoDocument]),
      'CountPage': new FormControl(null, [Validators.min(1), Validators.max(999), Validators.required]),
    }),

  ];
}
