import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Request } from '../request';

import { Vendor } from '../vendor';


@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {
  vend=new Vendor();

  request=new Request();
  isButtonVisible = true;
  constructor(private _service: RegistrationService, private _router:Router) { }
  mydata:Request [] =[];
  ngOnInit(){
    this._service.requests().subscribe(res=>
       this.mydata=res    
    )
  }
  
  onSubmit(data:any){
      this.accept(data);
      this.status(data);
      console.log(data.email);
      this. _service.sendEmail(data).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏  is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      }
      )
      this.reloadCurrentPage();
  }
  accept(data:any){
    this.vend.req_id=data.req_id;
      this.vend.emp_id=data.emp_id;
      this.vend.furniture=data.furniture;
      this.vend.it_equip=data.it_equip;
      this.vend.email=data.email;
    console.log(this.vend);
    this._service.vendor(this.vend).subscribe((response:any)=>{
      alert("updated successfully") 
    }, error=> console.log(error));
  }
   status(data:any){
     this.request.req_id=data.req_id;
     this.request.status=1;
     this.request.rejectstatus=0;
     this._service.requestupdate(this.request).subscribe((respose:any)=>{
     }),(error: any)=>console.log(error);
   }
   
   reject(data:any){
    this.del(data);
    this.astatus(data);
    this.reloadCurrentPage()
  }

  astatus(data:any){
    this.request.req_id=data.req_id;
    this.request.rejectstatus=1;
    this.request.status=0;
    
    
    this._service.requestupdate(this.request).subscribe((respose:any)=>{
    }),(error: any)=>console.log(error);
  }
  del(data:any){
    this.request.req_id=data.req_id;
    this._service.vendordelete(this.request.req_id).subscribe();
  }



  re(data:any){
    if(data.status===0){
    this.status(data);
    }
    else{
    this.astatus(data);
  }
    this. reloadCurrentPage();
  }
  reloadCurrentPage() {
    window.location.reload();
  }

  logout() {
    this._router.navigate(['/login']);
  }
  
}
