import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Settings } from '../../models/settings';
import { TranslateService } from '@ngx-translate/core';
import { PasswordValidation } from '../../validators/password-match-validator';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material';
import { DatabaseService } from '../../providers/database.service';
import { SharedService } from '../../providers/shared.service';


@Component({
  selector: 'app-first-run',
  templateUrl: './first-run.component.html',
  styleUrls: ['./first-run.component.scss']
})
export class FirstRunComponent implements OnInit {
  appSettingsForm: FormGroup;
  userForm: FormGroup;
  isOptional = false;
  saveInProgress = false;
  dir = document.getElementsByTagName('body')[0].getAttribute('dir');

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private databse: DatabaseService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.appSettingsForm = this.formBuilder.group({
      appName: ['Inventory Manager v2', Validators.required],
      lang: [this.databse.getSettings().lang, Validators.required]
    });
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required, PasswordValidation.MatchPassword]
    });
  }

  setup() {
    this.saveInProgress = true;
    setTimeout(() => {
      return  this.router.navigate(['/']);
    }, 3000);
  }

  addUser(value) {
    this.databse.setData('user', {name: value.name, password: value.password});
  }

  langChange($event: MatRadioChange) {
    this.translate.setDefaultLang($event.value);
  }

  appNameChange($event) {
    this.databse.changeValue('settings', 'appName', $event.target.value);
  }

  getDir() {
    return this.sharedService.getDir();
  }
}
