import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup } from '@angular/forms';
import {AuthServiceService} from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private authservice:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'email':new FormControl(null,{validators:[Validators.required]}),
      'password':new FormControl(null,{validators:[Validators.required]})
    })
  }

  onLoginForm()
  {
    if(this.form.invalid)
    {
      return;
    }
    let newUser={
      email:this.form.value.email,
      password:this.form.value.password,
    }
    this.authservice.login(newUser).subscribe((res:any)=>{
      console.log(res);
      let token=res.token;
      let id=res.id;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('id',JSON.stringify(id));
      this.authservice.authStatusListener.next(true);
      this.router.navigate(['/']);
    },err=>{
      alert(err.error.message);
    })
    
  }

}
