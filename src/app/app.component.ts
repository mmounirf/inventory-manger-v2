import { Component, OnInit, OnChanges } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService, DefaultLangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Settings } from './models/settings';
import { DatabaseService } from './providers/database.service';
import { SharedService } from './providers/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    public database: DatabaseService,
    private router: Router,
    public electronService: ElectronService,
    private translate: TranslateService,
    private sharedServices: SharedService
  ) {


    // console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      // console.log('Mode electron');
      // console.log('Electron ipcRenderer', electronService.ipcRenderer);
      // console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      // console.log('Mode web');
    }


    // this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
    //   if (event.lang === 'ar') {
    //     document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl');
    //     this.settings.lang = 'ar';
    //     this.dir = 'rtl';
    //   } else {
    //     document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr');
    //     this.settings.lang = 'en';
    //     this.dir = 'ltr';
    //   }
    // });

    if (!this.database.getData('settings') || !this.database.getData('user')) {
      this.database.setData('settings', new Settings);
      this.database.setData('products', []);
      this.router.navigate(['first-run']);
    }
    this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
      this.sharedServices.defaultLangChanged();
    });

    this.translate.setDefaultLang(this.database.getSettings().lang);

  }

  getSettings() {
    return this.database.getSettings();
  }

  getUser() {
    return this.database.getUser();
  }
}
