import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public errors = {
    email: {
      pattern: 'Invalid Email'
    },
    emailRequired: {
      required: 'Email is required',
      pattern: 'Invalid Email'
    },
    phoneNumber: {
      pattern: 'Invalid phone number'
    },
    phoneNumberRequired: {
      required: 'Phone number is required',
      pattern: 'Invalid phone number'
    },
    mobileNumber: {
      pattern: 'Invalid mobile number',
      minlength: 'Please enter 10 digits',
      maxlength: 'Please enter 10 digits',
    },
    mobileNumberRequired: {
      required: 'Mobile number is required',
      pattern: 'Invalid mobile number',
      minlength: 'Invalid mobile number',
      maxlength: 'Invalid mobile number',
    },
    addressRequired: {
      required: 'Address is required'
    },
    date: {
      pattern: 'Please enter the date in the format DD/MM/YYYY',
      ngbDate: 'Please enter the date in the format DD/MM/YYYY'
    },
    dateRequired: {
      required: 'date is required',
      pattern: 'Please enter the date in the format DD/MM/YYYY',
      ngbDate: 'Please enter the date in the format DD/MM/YYYY'
    },
    password: {
      required: 'Password is required.'
    },
    username: {
      required: 'Username is required.'
    },
    userName: {
      required: 'username is required',
      minlength: 'username should have minimum 6 letters'
    },
    numeric: {
      pattern: 'Not a valid pattern'
    },
    numericRequired: {
      required: 'Value is required',
      pattern: 'Not a valid pattern'
    },
    firstName : {
      required: 'First Name is required',
    },
    lastName : {
      required: 'Last Name is required',
    },
    messageRequired: {
      required: 'Message is required'
    }
  };

  constructor() { }
}
