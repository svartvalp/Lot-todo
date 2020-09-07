--liquibase formatted sql
--changeset kkasyanenko:todo-1 localPath:/object/0-1


create table if not exists lottodo.todo (
  id int primary key,
  is_done boolean,
  name varchar(50) not null,
  description varchar(300) not null
);

create sequence lottodo.todo_id_seq start 1 increment 1;
