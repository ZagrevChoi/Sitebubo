import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(
    private actionCtrl: ActionSheetController
  ) { }

  confirmDeletion(domainName): Promise<boolean> {
    return new Promise(async (resolve) => {
      const action = await this.actionCtrl.create({
        header: `All historical data for this domain will be deleted, are you sure you want to delete ${domainName}?`,
        buttons: [
          {
            text: 'Yes',
            icon: 'checkmark',
            handler: () => {
              resolve(true);
            }
          },
          {
            text: 'No',
            icon: 'close',
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      action.present();
    });
  }
}
