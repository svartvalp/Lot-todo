--liquibase formatted sql
--changeset kkasyanenko:user-1 localPath:/object/0-1


create table if not exists lottodo.user (
  id int primary key,
  username varchar(50) not null unique,
  password varchar(300) not null
);

create sequence lottodo.user_id_seq start 1 increment 1;
