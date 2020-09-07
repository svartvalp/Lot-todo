package com.svartvalp.lottodo.dao;

import com.svartvalp.lottodo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoDao extends JpaRepository<Todo, Long> {
}
