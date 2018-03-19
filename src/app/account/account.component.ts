import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  contactForm: FormGroup;
  @ViewChild('addEditContactModal') addEditContactModal;

  constructor(private _fb: FormBuilder, private _http: HttpClient, private router: Router) {
  }

  ContactList: any = [];
  SearchWord: string;
  openAddModal() {

    this.contactForm.reset();
    this.addEditContactModal.show();
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  openEditContat(contact) {
    let data = {
         lastName: contact.LastName,
      phoneNumber: contact.Mobile,
      firstName: contact.Name,
      Id: contact.Id,
    }

    this.contactForm.patchValue(data);
    this.addEditContactModal.show();
  }

  deleteContact(contact) {
    var token = localStorage.getItem('token');
       this._http.post('/api/user/removeContact', {Id: contact.Id, token: token }).subscribe((res: any) => {
    this.getContacts();
    }, (err) => {
      //TODO show error message
    });
    
  }

  addEditContact() {
    let data = this.contactForm.value;
    console.log('val', data);
    
    var token = localStorage.getItem('token');
    data.token = token;
    
    if (!data.Id) {
      this._http.post('/api/user/addContact', data).subscribe((res: any) => {
        this.addEditContactModal.hide();
    this.getContacts();
    }, (err) => {
      //TODO show error message
    });
    } else {
   this._http.post('/api/user/editContact', data).subscribe((res: any) => {
        this.addEditContactModal.hide();
    this.getContacts();
    }, (err) => {
      //TODO show error message
    });
    }
  }

  ngOnInit() {
    this.contactForm = this._fb.group({
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      Id: ['', []]
    });
  

  this.getContacts();
  }

  getContacts() {
    this.search('');
  }

  search(keyWord: string) {
    var token = localStorage.getItem('token');
      let data = {
        keyword: keyWord,
        token: token
      };
       this._http.post('/api/search', data).subscribe((res: any) => {
        this.ContactList = res.searchResult;
      }, (err) => {
        //TODO show error message
      });
  }


}
