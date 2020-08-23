import { Component, OnInit } from '@angular/core';
import {FormServiceService} from '../../form-service.service';
import {AuthServiceService} from '../../auth-service.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
 

  constructor(private formservice:FormServiceService,private authservice:AuthServiceService,
    public router:ActivatedRoute) { }

  Usermessage:Array<any>=[];
  notiMessage:Array<any>=[];
  dept:string;
  id:string;
  paramName:string;
  rejectFlag:boolean=false;
  notiflag:boolean=false;
  approvestatus:Boolean=false;
  rejectstatus:boolean=false;
  requeststatus:Boolean=false;


  ngOnInit(): void {
    console.log("enter view function")
    let id=localStorage.getItem('id');
    this.id=JSON.parse(id);
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('name'))
      {
        this.paramName=paramMap.get('name');
      }
      console.log(this.paramName);
      if(this.paramName === "request")
      {
        this.rejectFlag=false;
        this.requeststatus=true;this.approvestatus=false;this.rejectstatus=false;
        this.notiflag=false;
        this.notiMessage=[];
        this.authservice.getuserById(JSON.parse(id)).subscribe((res:any)=>{
          this.dept=res[0].department;
          this.formservice.getmessage(this.dept).subscribe((res:any)=>{
            console.log(res);
            this.Usermessage=res;
          })
        })
      } 
      if(this.paramName === "approve")
      {
        this.Usermessage=[];
        this.notiflag=false;
        this.notiMessage=[];
        this.requeststatus=false;this.approvestatus=true;this.rejectstatus=false;
        this.formservice.getapprovemsg(this.id).subscribe((res:any)=>{
          console.log(res);
          this.Usermessage=res;
          this.rejectFlag=true;
        })
      }
      if(this.paramName === "reject")
      {
        console.log("enter reject function")
        this.Usermessage=[];
        this.requeststatus=false;this.approvestatus=false;this.rejectstatus=true;
        this.notiflag=false;
        this.notiMessage=[];
        this.formservice.getrejectmsg(this.id).subscribe((res:any)=>{
          console.log(res);
          this.Usermessage=res;
          this.rejectFlag=true;
        })
      }
      if(this.paramName === "notification")
      {
        this.Usermessage=[];
        this.requeststatus=false;this.approvestatus=false;this.rejectstatus=false;
        console.log(this.id);
        this.rejectFlag=false;
        this.formservice.getnoti(this.id).subscribe((res:any)=>{
          console.log(res);
          this.notiflag=true;
          for(let i =0;i<res.length;i++)
          {
            this.formservice.getnotiByid(res[i].requestId).subscribe((res:any)=>{
              console.log(res);
              this.notiMessage.push(res[0])
              console.log(this.notiMessage);
            })
          }
        })
      }
    })
  }

  

  reject(id,mail)
  {
    console.log(id);
    let details={
      id:id,
      status:"reject"
    }
    this.formservice.statuschange(details).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    })
    this.authservice.getuserbyEmail(mail).subscribe((res:any)=>{
      console.log(res);
      console.log(res[0]._id);
      let detail={
        userid:res[0]._id,
        reqid:id
      }
      this.formservice.postnoti(detail).subscribe((res:any)=>{
        console.log(res);
      })
    })
    
  }
  approve(id,mail)
  {
    console.log(id);
    let details={
      id:id,
      status:"approve"
    }
    this.formservice.statuschange(details).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    })
    this.authservice.getuserbyEmail(mail).subscribe((res:any)=>{
      console.log(res);
      console.log(res[0]._id);
      let detail={
        userid:res[0]._id,
        reqid:id
      }
      this.formservice.postnoti(detail).subscribe((res:any)=>{
        console.log(res);
      })
    })
  }

}
