import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  constructor(private _fb: FormBuilder, private _http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.authForm = this._fb.group({
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    let data = this.authForm.value;
    this._http.post('/api/auth/authenticate', data).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/account']);
    }, (err) => {
      //TODO show error message
    });
  }
}
