import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user =new User();
  msg="";
  registrationform!:NgForm;
  constructor(private _service: RegistrationService, private _router:Router) { }
  mydata:User [] =[];

  ngOnInit(): void {
   
    
  }
  registerUser(username:string,email:string)
  {
    this._service.loginUserFromRemote().subscribe(
      res =>{
        const use=res.find((a:any)=>{
          return a.username===username || a.email===email;
        })

        if(!use){
          this._service.registerUserFromRemote(this.user).subscribe(
            data=>{
          
              
              this._router.navigate(['/login'])
            },
            error=>{
              this.registrationform.reset();
              alert("username and email are already taken goodbye ");
              this.msg=error.error;  
            }    
    );
        
  }
  else{
   
    alert("username and email already taken");
  }
}
    );
}
}
