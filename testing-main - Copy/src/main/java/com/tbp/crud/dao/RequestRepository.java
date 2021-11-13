package com.tbp.crud.dao;
import com.tbp.crud.entity.Request;


import java.util.List;

public interface RequestRepository {
    Request saveUser(Request request);
    List<Request> allUsers();
    Request updateRequest(Request request);
    List<Request> getrequestbyid(int emp_id);

   Request getVendorById(Long id);
    Request updatevendor(Request request);
    List<Request> getallVendor();

}
