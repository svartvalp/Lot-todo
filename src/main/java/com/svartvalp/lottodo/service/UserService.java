package com.svartvalp.lottodo.service;

import com.svartvalp.lottodo.dto.UserDto;

public interface UserService {
    Long register(UserDto userDto);
}
