import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import { RestApiService } from '../../rest-api.service';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignupFailedDialogComponent } from 'src/app/signup-failed-dialog/signup-failed-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  name = '';
  email = '';
  password = '';
  password1 = '';
  date='';
  hide = true;
  hidea = true;
  constructor( private _snackBar: MatSnackBar,private dialog: MatDialog,private router: Router,
    private data: DataService,
    private rest: RestApiService,private _location: Location) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  
 

  back() {
    this._location.back();
  }

  validate() {
    let EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (this.name) {
      if (this.email && EMAIL_REGEXP.test(this.email)) {
        if (this.password && this.password.length >= 6) {
          if (this.password1 && this.password1.length >= 6) {
            if (this.password === this.password1) {
              if(this.date){

              
              return true;
            }else{
              this.dialog.open(SignupFailedDialogComponent);
              this._snackBar.open("Birthday not entered", null, {
                duration: 2000,
              });
            }
            } else {
              this.dialog.open(SignupFailedDialogComponent);
              this._snackBar.open("Password not matched", null, {
                duration: 2000,
              });
            }
          } else {
            this.dialog.open(SignupFailedDialogComponent);
            this._snackBar.open("Confirm Password not entered or less than 6 character", null, {
              duration: 2000,
            });
          }
        } else {
          this.dialog.open(SignupFailedDialogComponent);
          this._snackBar.open("Password not entered or less than 6 character", null, {
            duration: 2000,
          });
        }
      } else {
        this.dialog.open(SignupFailedDialogComponent);
        this._snackBar.open("Email not entered or email is invalid", null, {
          duration: 2000,
        });
      }
    } else {
      this.dialog.open(SignupFailedDialogComponent);
      this._snackBar.open("Name not entered", null, {
        duration: 2000,
      });
    }
  }

  async onSubmit(form: NgForm) {
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'http://localhost:4000/api/accounts/signup',
          {
            name: form.value.name,
            email: form.value.email,
            password: form.value.password,
           date:form.value.date,
          },
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successful!');
          this._snackBar.open("Register Success", null, {
            duration: 2000,
          });
          this.router.navigate(['/home']);
        } else {
          this.dialog.open(SignupFailedDialogComponent);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
