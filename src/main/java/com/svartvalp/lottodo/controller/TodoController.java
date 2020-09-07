package com.svartvalp.lottodo.controller;

import com.svartvalp.lottodo.dto.TodoDto;
import com.svartvalp.lottodo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/todo")
public class TodoController {

    private final TodoService todoService;

    @GetMapping(value = "/user/{id}")
    public List<TodoDto> getTodosByUserId(@PathVariable("id") Long id) {
        return todoService.findTodoByUserId(id);
    }

    @PostMapping(value = "/user/{id}")
    public TodoDto createTodo(@RequestBody @Valid TodoDto dto, @PathVariable("id") Long id) {
        return todoService.createTodo(dto, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteTodo(@PathVariable("id") Long id) {
        todoService.deleteDto(id);
    }

    @GetMapping(value = "/{id}")
    public TodoDto findById(@PathVariable("id") Long id) {
        return todoService.findTodoById(id);
    }

}
