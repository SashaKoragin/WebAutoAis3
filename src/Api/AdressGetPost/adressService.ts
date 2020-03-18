export const ServerHost:string = 'I7751-W40204180';  //localhost
//export const ServerHost:string = '10.177.173.103';
export const ServerPort:string = '8050';
//К примеру новая структура

export class AdressService{
  public identificationUser = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Identification`;

  public selectparametr = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateSqlSelect`;
  public selectxml = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Select`;
  public donloadFileOkp2 = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileTaxJournal`;
}
