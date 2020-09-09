package com.svartvalp.lottodo.service;

import com.svartvalp.lottodo.dao.TodoDao;
import com.svartvalp.lottodo.dao.UserDao;
import com.svartvalp.lottodo.dto.TodoDto;
import com.svartvalp.lottodo.entity.Todo;
import com.svartvalp.lottodo.entity.User;
import com.svartvalp.lottodo.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {

    private final TodoDao todoDao;
    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public TodoDto findTodoById(Long id) {
        return null;
    }

    @Override
    public List<TodoDto> findTodoByUserId(Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found by id !"));
        List<TodoDto> dtos = new ArrayList<>();
        for (var todo : user.getTodos()) {
            dtos.add(modelMapper.map(todo, TodoDto.class));
        }
        return dtos;
    }

    @Override
    public TodoDto createTodo(TodoDto dto, Long userId) {
        var todo = todoDao.save(modelMapper.map(dto, Todo.class));
        var user = userDao.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found by id !"));
        var todos = user.getTodos();
        todos.add(todo);
        user.setTodos(todos);
        userDao.save(user);
        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public void deleteDto(Long id) {
        User user = userDao.findByTodosContains(todoDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Todo not found by id !")));
        if (user == null) {
            throw new EntityNotFoundException("User not found associated with this todo!");
        }
        user.getTodos().removeIf(todo -> todo.getId().equals(id));
        todoDao.deleteById(id);
    }

    @Override
    public void updateTodo(TodoDto todoDto) {
        todoDao.save(modelMapper.map(todoDto, Todo.class));
    }
}
