package com.svartvalp.lottodo.dao;

import com.svartvalp.lottodo.entity.Todo;
import com.svartvalp.lottodo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByTodosContains(Todo todo);
}
