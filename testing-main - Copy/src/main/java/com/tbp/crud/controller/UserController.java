package com.tbp.crud.controller;

import com.tbp.crud.dao.UserRepository;
import com.tbp.crud.entity.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@RestController
@Controller
public class UserController {
    @Autowired
    UserRepository userRepository;

 @ResponseBody
    @PostMapping("/user")
    public User addUser(@RequestBody User user) throws Exception {
        /*String tempEmailId=user.getEmail();
        if(tempEmailId != null && !"".equals(tempEmailId)){
            User userobj= userRepository.fetchUserByEmailId(tempEmailId);
            if(userobj !=null){
                throw new Exception("user with "+tempEmailId+" already exists");
            }
        }
        User userObj=null;*/
        return userRepository.saveUser(user);
    }
    @ResponseBody
    @GetMapping("/users")
    public List<User> getUser()  {
        return userRepository.allUsers();
    }
    @ResponseBody
    @GetMapping("/user/{id}")
    public User getUserByUsername(@PathVariable  int id)  {
        return userRepository.getUserByUsername(id);
    }

    @ResponseBody
    @PostMapping("/us")
            public User login(@RequestBody User user){
        return userRepository.loginUser(user);
    }
}
