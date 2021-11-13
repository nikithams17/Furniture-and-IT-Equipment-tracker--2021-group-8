import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id!: number;
  user = new User;
  msg = "";
  constructor(private _service: RegistrationService,private route:ActivatedRoute, private _router:Router) { }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this._service.getUserByUsername(this.id)
      .subscribe((response: any) => {
        console.log(response)
        this.user = response;
      }, error => console.log(error));
   
    console.log(this.user);
  }

}
