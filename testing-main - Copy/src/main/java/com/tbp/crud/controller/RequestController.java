package com.tbp.crud.controller;
import com.tbp.crud.dao.RequestRepository;
import com.tbp.crud.entity.Request;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@RestController
@Controller
public class RequestController {
    @Autowired
    RequestRepository requestRepository;
    @ResponseBody
    @PostMapping("/request/{username}")
    public Request addUser(@RequestBody Request request,@PathVariable("username") String username) {

        return requestRepository.saveUser(request);

    }
    @ResponseBody
    @GetMapping("/requests")
    public List<Request> getUser()  {
        return requestRepository.allUsers();
    }
    @ResponseBody
    @PutMapping ("/updateRequest")
    public Request updateRequest(@RequestBody Request request){
        return requestRepository.updateRequest(request);
    }
    @ResponseBody
    @GetMapping("/requests/{emp_id}")
    public List<Request> getuserbyemp_id(@PathVariable("emp_id") int emp_id)  {
        return requestRepository.getrequestbyid(emp_id);

    }
    @ResponseBody
    @PutMapping ("/vendorupdate")
    public Request updatevendor(@RequestBody Request request){
        return requestRepository.updatevendor(request);
    }

    @ResponseBody
    @GetMapping("/vendors")
    public List<Request> getVendorById()  {
        return requestRepository.getallVendor();
    }
    @ResponseBody
    @GetMapping("/vendor/{id}")
    public Request getVendorById(@PathVariable Long id)  {
        return requestRepository.getVendorById(id);
    }


}