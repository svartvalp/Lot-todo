package com.svartvalp.lottodo.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserDto {
    @NotNull
    @Size(min = 8, max = 50)
    private String username;
    @Size(min = 6, max = 50)
    private String password;
}
