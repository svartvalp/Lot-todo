package com.svartvalp.lottodo.service;

import com.svartvalp.lottodo.dto.TodoDto;

import java.util.List;

public interface TodoService {
    TodoDto findTodoById(Long id);

    List<TodoDto> findTodoByUserId(Long userId);

    TodoDto createTodo(TodoDto dto, Long userId);

    void deleteDto(Long id);

    void updateTodo(TodoDto todoDto);
}
