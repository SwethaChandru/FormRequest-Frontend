import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthServiceService} from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  departmentList:Array<any>=[];
  depId:string
  form: FormGroup;

  constructor(private authService:AuthServiceService,private router:Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'name':new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'email':new FormControl(null,{validators:[Validators.required]}),
      'password':new FormControl(null,{validators:[Validators.required]}),
      'dept':new FormControl(null,{validators:[Validators.required]}),
    });
    this.authService.getdept().subscribe((res:any)=>{
      console.log(res);
      this.departmentList=res;
    })
  }


  onSignUpForm()
  {
    console.log(this.form);
    if(this.form.invalid)
    {
      return;
    }
    let newUser={
      email:this.form.value.email,
      password:this.form.value.password,
      name:this.form.value.name,
      department:this.form.value.dept
    }
    console.log(this.depId);
    console.log(newUser);
    this.authService.addUser(newUser)
        .subscribe((items:any)=>{
          if(items.success)
          {
            this.router.navigate(['/login']);
          }
        },err=>{
          alert(err.error.message);
          window.location.reload();
        })
  }
  
}
