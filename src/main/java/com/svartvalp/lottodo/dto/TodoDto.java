package com.svartvalp.lottodo.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class TodoDto {
    private Long id;
    private boolean isDone;
    @NotNull
    @Size(min = 4, max = 50)
    private String name;
    @Size(max = 300)
    private String description;
}
