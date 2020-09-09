package com.svartvalp.lottodo.service;

import com.svartvalp.lottodo.dao.UserDao;
import com.svartvalp.lottodo.dto.UserDto;
import com.svartvalp.lottodo.entity.User;
import com.svartvalp.lottodo.exception.EntityAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserDao userDao;

    @Override
    public Long register(UserDto userDto) {
        if (userDao.findByUsername(userDto.getUsername()) != null) {
            throw new EntityAlreadyExistsException("User with such username is already exists!");
        }
        User user = modelMapper.map(userDto, User.class);
        userDao.save(user);
        return user.getId();
    }

    @Override
    public Long findIdByUsername(String username) {
        return userDao.findByUsername(username).getId();
    }
}
