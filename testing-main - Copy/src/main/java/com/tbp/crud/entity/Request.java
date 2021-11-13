package com.tbp.crud.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    private int req_id;
    private int status;
    private int rejectstatus;
    private int emp_id;
    private String furniture;
    private String it_equip;
    private String shipping_add;
    private String email;
    private Date delivery_date;
}
