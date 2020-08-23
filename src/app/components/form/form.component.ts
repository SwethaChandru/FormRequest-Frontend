import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FormServiceService} from '../../form-service.service';
import {AuthServiceService} from '../../auth-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private formservice:FormServiceService,private authService:AuthServiceService) { }

  departmentList:Array<any>=[];
  userlist:Array<any>=[];
  from:string;

  ngOnInit(): void {
    this.form=new FormGroup({
      'message':new FormControl(null,{validators:[Validators.required]}),
      'dept':new FormControl(null,{validators:[Validators.required]}),
      'user':new FormControl(null,{validators:[Validators.required]}),

    });
    this.authService.getdept().subscribe((res:any)=>{
      console.log(res);
      this.departmentList=res;
    })
    let id=localStorage.getItem('id');
    this.authService.getuserById(JSON.parse(id)).subscribe((res:any)=>{
      console.log(res);
      this.from=res[0].email;
      for(let i=0;i<this.departmentList.length;i++)
      {
        if(res[0].department===this.departmentList[i].deptName)
        {
          this.departmentList.splice(i, 1)
        }
      }
    })
  }

   store(ob)
  {
    console.log(ob.value);
    this.authService.getuserByDept(ob.value).subscribe((res:any)=>{
      console.log(res);
      this.userlist=res;
    })
  }

  onForm()
  {
    if(this.form.invalid)
    {
      return
    }
    const newform={
      fromMail:this.from,
	    toemail:this.form.value.user,
      message:this.form.value.message
    }
    console.log(newform);
    this.formservice.addmessage(newform).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    },err=>{
      alert(err.error.message);
    })
  }
}
