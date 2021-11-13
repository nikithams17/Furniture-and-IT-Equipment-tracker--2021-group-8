package com.tbp.crud.dao;

import com.tbp.crud.entity.User;

import java.util.List;

public interface UserRepository {
    User saveUser(User user);
    List<User> allUsers();
   User loginUser(User user);
    User getUserByUsername(int emp_id);
    /*public User fetchUserByEmailId(String email){
        return
    }*/
}
