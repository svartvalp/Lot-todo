package com.svartvalp.lottodo.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(schema = "lottodo", name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_seq")
    @SequenceGenerator(name = "user_id_seq", schema = "lottodo", sequenceName = "user_id_seq", allocationSize = 1)
    private Long id;
    private String username;
    private String password;
    @OneToMany
    @JoinTable(schema = "lottodo", name = "user_todos",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "todo_id"))
    private List<Todo> todos;
}
