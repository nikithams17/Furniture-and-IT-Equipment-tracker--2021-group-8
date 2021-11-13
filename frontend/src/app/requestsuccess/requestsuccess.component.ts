import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Request } from '../request';
@Component({
  selector: 'app-requestsuccess',
  templateUrl: './requestsuccess.component.html',
  styleUrls: ['./requestsuccess.component.css']
})
export class RequestsuccessComponent implements OnInit {
 id!:number;
  constructor(private _service: RegistrationService,private route:ActivatedRoute, private _router:Router) { }
  data:Request [] =[];


  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    console.log(this.id);
    this._service.getRequestById(this.id).subscribe(res=>
      
      this.data=res
   
    )
    console.log(this.data);
  }

  profile(){
    this._router.navigate(['profile',this.id])
  }
  create(){
    console.log(this.id)
    this._router.navigate(['user',this.id])
  }
  logout() {
    this._router.navigate(['/login']);
  }

}
