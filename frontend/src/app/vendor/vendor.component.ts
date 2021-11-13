import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Request } from '../request';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  v:Request[]=[];
  //vendors=new Vendor();
  constructor(private _service: RegistrationService, private _router:Router) { }

  ngOnInit() {
    this._service.fetch().subscribe(res=>{
      this.v=res;
      console.log(this.v);
    })
  }
  updateDeliveryDate(id: number){
    this._router.navigate(['vendor',id]);
  }
  logout() {
    this._router.navigate(['/login']);
  }

}