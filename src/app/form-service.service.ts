import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private http:HttpClient) { }

  public authStatusListener=new Subject<string>();

  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }

  addmessage(form)
  {
    return this.http.post("http://localhost:3000/form", form);
  }
  getmessage(id)
  {
    return this.http.get("http://localhost:3000/form/bydept/"+id)
  }

  statuschange(details)
  {
    return this.http.put("http://localhost:3000/form/reject",details);
  }

  getrejectmsg(id)
  {
    return this.http.get("http://localhost:3000/form/reject/"+id);
  }

  getapprovemsg(id)
  {
    return this.http.get("http://localhost:3000/form/approve/"+id)
  }

  postnoti(details)
  {
    return this.http.post("http://localhost:3000/noti",details);
  }

  getnoti(id)
  {
    return this.http.get("http://localhost:3000/noti/"+id);
  }
  getnotiByid(id)
  {
    return this.http.get("http://localhost:3000/form/noti/"+id);
  }

}
