import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { FormBuilder,FormGroup } from '@angular/forms';
import { collectExternalReferences } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user=new User();
  hide=true;
 id!:string;
  msg ='';
  constructor(private _service: RegistrationService,private route:ActivatedRoute, private _router:Router) { }
  mydata!:User;

  ngOnInit(): void {

  }

  loginUser(data:User){
  
    this._service.login(data).subscribe(
      (res)=>{
      
        this.mydata=res;
       console.log(this.mydata.role)
       console.log(this.mydata)
       if(this.mydata.role===2){
        
        this._router.navigate(['/loginsuccess'])
       }
       if(this.mydata.role===3){
  
          this._router.navigate(['/vendors'])
       }

       if(this.mydata.role===1){
      

          this._router.navigate(['requests', this.mydata.emp_id])
       }
      },
      ()=>{
        console.log("Exception occured");
        this.msg="Bad credentials, please enter valid username and password";
      }  )
  }


      gotoregistration(){
        this._router.navigate(["/registration"])
      }
}

