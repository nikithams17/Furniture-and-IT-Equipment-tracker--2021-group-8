import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Request } from './request';
import { Vendor } from './vendor';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http:HttpClient) { }
  private  url="/user";
  private url1="/users";
  private  url2="/request";
  private  url3="/requests";
  private url4="/vendor";
  private  url5="/vendors";
  private url6="/vendorupdate";
  private url8="/vendors/"
  private url9="/sendmail"
  private log="us"
   loginUserFromRemote():Observable<User[]>{
    return this._http.get<User[]>(this.url1);
  }
  
   registerUserFromRemote(user: User):Observable<User>{
    return this._http.post<User>(this.url,user);
  }
  requests():Observable<Request[]>{
    return this._http.get<Request[]>(this.url3);
  }
  request(request:Request,id:number):Observable<Request[]>{
    console.log(request);
    return this._http.post<Request[]>(`${this.url2}/${id}`,request);
  }
 fetch():Observable<Request[]>{
    return this._http.get<Request[]>(this.url5);
  }
  vendor(vendor:Vendor):Observable<Vendor[]>{
    return this._http.post<Vendor[]>(this.url4,vendor);
  }
  vendorupdate(request:Request):Observable<Request[]>{
    return this._http.put<Request[]>(this.url6,request);
  }
  private url7="/updateRequest";
  requestupdate(request:Request):Observable<Request[]>{
    return this._http.put<Request[]>(this.url7,request);
  }
  vendorById(id: number): Observable<Object> {
    return this._http.get(`${this.url4}/${id}`);
  }
  vendordelete(id:number):Observable<object>{
    return this._http.delete(`${this.url8}/${id}`);

  }
  getRequestById(id:number):Observable<Request[]>{
    return this._http.get<Request[]>(`${this.url3}/${id}`);
  }
  getUserByUsername(id:number):Observable<object>{
    return this._http.get(`${this.url}/${id}`)
  }
  sendEmail(email:any):Observable<object>{
    return this._http.post(this.url9,email);
  }
  login(data:User):Observable<User>{
    return this._http.post<User>(this.log,data);
  }
}
