package com.tbp.crud.dao;

import com.tbp.crud.entity.Request;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

@Repository
public class RequestRepositoryImpl implements RequestRepository {



    private static final String INSERT_USER_QUERY = "INSERT INTO REQUEST(emp_id,furniture,it_equip,shipping_add,email) values(?,?,?,?,?)";
    private static final String GET_USERS_QUERY = "SELECT * FROM Request";
    private static final String update_query = "update request set status=?, rejectstatus=? where req_id=?";
    private static final String get_request_by_id = "select * from request where emp_id=?";

    private static final String query1 = "SELECT * FROM request where status=1";
    private static final String query2 = "update request set req_id=?, emp_id=?,furniture=?,it_equip=?,delivery_date=? where req_id=?";
    private static final String GET_USERBYID_QUERY = "SELECT * FROM request where req_id=?";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Request saveUser(Request request) {
        jdbcTemplate.update(INSERT_USER_QUERY, request.getEmp_id(), request.getFurniture(), request.getIt_equip(), request.getShipping_add(), request.getEmail());
        return request;
    }

    @Override
    public List<Request> allUsers() {
        return jdbcTemplate.query(GET_USERS_QUERY, (rs, rowNum) -> new Request(rs.getInt("req_id"), rs.getInt("status"), rs.getInt("rejectstatus"), rs.getInt("emp_id"), rs.getString("furniture"), rs.getString("it_equip"), rs.getString("shipping_add"), rs.getString("email"), rs.getDate("delivery_date")));
    }

    @Override
    public Request updateRequest(Request request) {
        jdbcTemplate.update(update_query, request.getStatus(), request.getRejectstatus(), request.getReq_id());
        return request;
    }

    @Override
    public List<Request> getrequestbyid(int emp_id) {
        return jdbcTemplate.query(get_request_by_id, (rs, rowNum) -> {
            return new Request(rs.getInt("req_id"), rs.getInt("status"), rs.getInt("rejectstatus"), rs.getInt("emp_id"), rs.getString("furniture"), rs.getString("it_equip"), rs.getString("shipping_add"), rs.getString("email"), rs.getDate("delivery_date"));
        }, emp_id);

    }


    @Override
    public Request updatevendor(Request request) {
        jdbcTemplate.update(query2, request.getReq_id(), request.getEmp_id(), request.getFurniture(), request.getIt_equip(), request.getDelivery_date(),request.getReq_id());
        return request;
    }


    @Override
    public List<Request> getallVendor() {
        return jdbcTemplate.query(query1, (rs, rowNum) -> new Request(rs.getInt("req_id"), rs.getInt("status"), rs.getInt("rejectstatus"), rs.getInt("emp_id"), rs.getString("furniture"), rs.getString("it_equip"), rs.getString("shipping_add"), rs.getString("email"), rs.getDate("delivery_date")));
    }

    @Override
    public Request getVendorById(Long id) {
        return (Request) jdbcTemplate.queryForObject(
                GET_USERBYID_QUERY,
                new Object[]{id},
                new BeanPropertyRowMapper(Request.class));

    }
}