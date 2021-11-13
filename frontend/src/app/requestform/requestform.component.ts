import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Request } from '../request';
import { User } from '../user';

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit {

  @ViewChild('userForm') userForm!: NgForm;
  id!: number;
  user = new User;
  request = new Request();
  msg = "";

  furnitures: string[] = ["None", "Computer Desk", "Desk Lamp", "Laptop Stand", "Storage Cabinet", "Small Corner Desk", "Work Chair"];
  equipments: string[] = ["None", "Cables", "Docking Station", "Headset", "Keyboard", "Monitor", "Mouse"];

  constructor(private _service: RegistrationService, private route: ActivatedRoute, private _router: Router) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this._service.getUserByUsername(this.id)
      .subscribe((response: any) => {
        console.log(response)
        this.user = response;
        this.request.emp_id = this.user.emp_id
        this.request.email = this.user.email
      }, error => console.log(error));
  }

  onSubmit(id: number) {

    this._service.request(this.request, this.id).subscribe(
      data => {
        
      
        this._router.navigate(['/requests', this.user.emp_id])
      },
      error => {
        console.log("exception occured");
        this.msg = error.error;
        console.log(this.msg)
      }
    )
  }
  viewOrder(emp_id: number) {
    this._router.navigate(['/requests', emp_id])
  }
  profile(){
    this._router.navigate(['profile',this.id])
  }
  logout() {
    this._router.navigate(['/login']);
  }

}







