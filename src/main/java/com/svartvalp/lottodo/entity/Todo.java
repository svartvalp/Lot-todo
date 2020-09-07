package com.svartvalp.lottodo.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "todo", schema = "lottodo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "todo_id_seq")
    @SequenceGenerator(sequenceName = "todo_id_seq", schema = "lottodo", name = "todo_id_seq", allocationSize = 1)
    private Long id;
    @Column(name = "is_done")
    private Boolean isDone;
    private String name;
    private String description;
}
