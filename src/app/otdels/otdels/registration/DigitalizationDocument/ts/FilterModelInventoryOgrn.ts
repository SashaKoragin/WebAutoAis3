import { SelectAndEditDataBase } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';

export class FilterModel {
  constructor(public select: SelectAndEditDataBase, public signalR: AuthIdentificationSignalR) {

  }

  //Вытащить фильтр
  public async selectFilter() {
    await this.select.selectVirtualFilter(this.signalR.autorization?.user.loginField);
    this.allVirtualFilter = this.select.select.VirtualFilter;
    this.filterDataBaseFirst = this.allVirtualFilter[0];
    await this.selectFilterToDataBase();
  }

  public async selectFilterToDataBase() {
    this.filterToServer = new VirtualFilterToServer();
    this.filterToServer.idFilterField = this.filterDataBaseFirst.IdFilter;
    this.filterToServer.nameFilterField = this.filterDataBaseFirst.NameFilter;
    this.filterToServer.loginUserField = this.filterDataBaseFirst.LoginUser;
    this.filterToServer.isHiddenWebField = this.filterDataBaseFirst.IsHiddenWeb;
  }

  public allVirtualFilter: VirtualFilter[] = [];

  public filterDataBaseFirst: VirtualFilter = this.allVirtualFilter[0];

  public filterToServer: VirtualFilterToServer;

}

export class VirtualFilter {
  public IdFilter: number;
  public NameFilter: string;
  public LoginUser: string;
  public IsHiddenWeb: boolean;
}

export class VirtualFilterToServer {
  public idFilterField: number;
  public nameFilterField: string;
  public loginUserField: string;
  public isHiddenWebField: boolean;
}
