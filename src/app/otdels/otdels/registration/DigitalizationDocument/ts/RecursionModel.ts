
import { DocumentInventories, GrnInventories, OrganizationOgrnInventory } from '../../../../../../Api/RequestService/modelAutomation';


export class TreeAllModel {
  public UserLoginModel: string;
  public OrganizationOgrnInventory: OrganizationOgrnInventory;
  public GrnInventories: GrnInventories;
  public DocumentInventories: DocumentInventories[]
  public TreeAllModel: TreeAllModel[];
}

export class ModelAllTree {
  expandable: boolean;
  model: TreeAllModel;
  level: number;
}

export class Recursion {

  public TreeAllModel: TreeAllModel[] = [];

  public methodModelOgrn(organizationOgrnInventory: OrganizationOgrnInventory[]) {
    var i;
    this.TreeAllModel = [];
    if (organizationOgrnInventory === undefined) {
      return;
    }
    for (const nameOgrn of organizationOgrnInventory) {
      i = 0;
      var use = new TreeAllModel();
      use.UserLoginModel = nameOgrn.UserLogin;
      use.OrganizationOgrnInventory = nameOgrn;
      use.TreeAllModel = [];
      use.GrnInventories = null;
      use.DocumentInventories = null;
      if (nameOgrn.GrnInventories != null || typeof nameOgrn.GrnInventories != 'undefined') {
        for (const grnInventory of nameOgrn.GrnInventories) {
          var treeModel = new TreeAllModel();
          treeModel.UserLoginModel = nameOgrn.UserLogin;
          treeModel.GrnInventories = grnInventory;
          treeModel.DocumentInventories = [];
          treeModel.OrganizationOgrnInventory = null;
          treeModel.TreeAllModel = null;
          use.TreeAllModel.push(treeModel);
          if (grnInventory.DocumentInventories != null || typeof grnInventory.DocumentInventories != 'undefined') {
            for (const model of grnInventory.DocumentInventories.sort((n1, n2) => n1.IdDocument - n2.IdDocument)) {
              use.TreeAllModel[i].DocumentInventories.push(model);
            }
          }
          i++
        }
      }
      if (use.TreeAllModel) {
        use.OrganizationOgrnInventory.GrnInventories = null;
        this.TreeAllModel.push(use);
      }
    }
  }

}
