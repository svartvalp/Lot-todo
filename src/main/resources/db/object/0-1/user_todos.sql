--liquibase formatted sql
--changeset kkasyanenko:user_todos-1 localPath:/object/0-1

create table lottodo.user_todos (
    user_id int,
    todo_id int,
    primary key (user_id, todo_id)
);

