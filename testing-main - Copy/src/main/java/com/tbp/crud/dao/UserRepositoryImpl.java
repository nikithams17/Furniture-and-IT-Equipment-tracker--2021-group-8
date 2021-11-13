package com.tbp.crud.dao;

import com.tbp.crud.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private static final int iterations = 10000;
    private static final int keylength = 256;

    private static final String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    String saltvalue ="Furniture&ITEquipmentTracker";

    private static final String INSERT_USER_QUERY = "INSERT INTO USER(emp_id,username,email,password,first_name,last_name) values(?,?,?,?,?,?)";
    private static final String GET_USERS_QUERY = "SELECT * FROM USER";
    private static final String Get_User_By_USERNAME="SELECT * FROM USER WHERE emp_id=?";
    private static final String sql="SELECT role,username,emp_id,email from user where username=? and password=? ";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public User saveUser(User user) {
        String password = user.getPassword();
        String encryptedPassword = generateSecurePassword(password, saltvalue);
        jdbcTemplate.update(INSERT_USER_QUERY, user.getEmp_id(), user.getUsername(), user.getEmail(), encryptedPassword, user.getFirst_name(),user.getLast_name());
        return user;
    }
    @Override
    public List<User> allUsers() {
        return jdbcTemplate.query(GET_USERS_QUERY, (rs, rowNum) -> new User(rs.getInt("emp_id"), rs.getString("username"), rs.getString("email"), rs.getString("password"), rs.getString("first_name"), rs.getString("last_name"),rs.getInt("role")));
    }
    @Override
    public User getUserByUsername(int emp_id) {
        return (User) jdbcTemplate.queryForObject(
                Get_User_By_USERNAME,
                new Object[]{emp_id},
                new BeanPropertyRowMapper(User.class));
    }

    @Override
    public User loginUser(User user) {
        String password = user.getPassword();
        String encryptedPassword = generateSecurePassword(password, saltvalue);
        Boolean status = verifyUserPassword(password,encryptedPassword,saltvalue);
        return (User) jdbcTemplate.queryForObject(
                sql,
                new Object[]{user.getUsername(),encryptedPassword},

                new BeanPropertyRowMapper(User.class));
    }

    public static byte[] hash(char[] password, byte[] salt)
    {
        PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, keylength);
        Arrays.fill(password, Character.MIN_VALUE);
        try
        {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            return skf.generateSecret(spec).getEncoded();
        }
        catch (NoSuchAlgorithmException | InvalidKeySpecException e)
        {
            throw new AssertionError("Error while hashing a password: " + e.getMessage(), e);
        }
        finally
        {
            spec.clearPassword();
        }
    }
    public static String generateSecurePassword(String password, String salt)
    {
        String finalval = null;

        byte[] securePassword = hash(password.toCharArray(), salt.getBytes());

        finalval = Base64.getEncoder().encodeToString(securePassword);

        return finalval;
    }
    public static boolean verifyUserPassword(String providedPassword,
                                             String securedPassword, String salt)
    {
        boolean finalval = false;

        /* Generate New secure password with the same salt */
        String newSecurePassword = generateSecurePassword(providedPassword, salt);

        /* Check if two passwords are equal */
        finalval = newSecurePassword.equalsIgnoreCase(securedPassword);

        return finalval;
    }

 /* @Override
  public User loginUser(String username,String password) {
      return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {

          return new User(rs.getInt("emp_id"), rs.getString("username"), rs.getString("email"), rs.getString("password"), rs.getString("first_name"), rs.getString("last_name"),rs.getInt("role"));
      },username, password);
  }*/
}

