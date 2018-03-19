import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isSuccessRegistration = false;

  constructor(private _fb: FormBuilder, private _http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.registrationForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      secretQuestionAnswer: ['', [Validators.required]],
    });
  }

  registration() {
    let data = this.registrationForm.value;
    this._http.post('/api/registration', data).subscribe((res: any) => {
      this.isSuccessRegistration = true;
      this.registrationForm.reset();
      
    }, (err) => {
      //TODO show error message
    });
  }
}
