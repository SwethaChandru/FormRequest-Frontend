import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userIsAuth=localStorage.getItem('token')!=null?true:false;
  private authListenerSubs:Subscription;

  constructor(private authService:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    console.log("entered headers on init function");
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuth=isAuthenticated;
    });
    console.log(this.userIsAuth);
  }

  reject()
  {
    this.router.navigate(['/view/reject']);
  }

  approve()
  {
    this.router.navigate(['/view/approve']);
  }

  req()
  {
    this.router.navigate(['/view/request']);
  }

  noti()
  {
    this.router.navigate(['/view/notification']);
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
    this.authService.authStatusListener.next(false);
  }

  ngOnDestroy():void{

    this.authListenerSubs.unsubscribe();
  }

}
