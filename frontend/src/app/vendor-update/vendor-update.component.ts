import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Request } from '../request';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vendor-update',
  templateUrl: './vendor-update.component.html',
  styleUrls: ['./vendor-update.component.css']
})
export class VendorUpdateComponent implements OnInit {
  id!:number;
  n!:string;
  minDate = new Date();
  cValue = formatDate(this.minDate, 'yyyy-MM-dd', 'en-US');
  request:Request=new Request();
  constructor(private registrationService:RegistrationService,
    private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    this.registrationService.vendorById(this.id)
    .subscribe((response:any)=>{
      console.log(response)
    
      this.request=response;
      this.n=this.request.delivery_date;
      console.log(this.n);
    },error=>console.log(error));

  }

  onSubmit(d:string) {
    console.log(this.n);
    if(this.n===d){
    console.log(this.request.delivery_date);
      
      alert("No changes made")
      
    console.log(this.request);
   /* this.registrationService.vendorupdate( this.request).subscribe((response:any)=>{
     
      this.gotoList();
    }, error=> console.log(error));
    this. registrationService.sendEmail(this.request).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏  is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      }
      )*/
    
  }
  else if(this.n===null || !(this.n===d) ){
    this.registrationService.vendorupdate( this.request).subscribe((response:any)=>{
     
      this.gotoList();
    }, error=> console.log(error));
    this. registrationService.sendEmail(this.request).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏  is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      }
      )
  }
}

gotoList() {
  this.router.navigate(['/vendors']);
}

}
