package com.svartvalp.lottodo.service;

import com.svartvalp.lottodo.dto.UserDto;
import com.svartvalp.lottodo.entity.User;

public interface UserService {
    Long register(UserDto userDto);
    Long findIdByUsername(String username);
}
