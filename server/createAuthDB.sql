create database auth;
use auth;
create table authorized_users (email varchar(50),
			       password varchar(40),
			       primary key (email));

insert into authorized_users values ('username','password');

insert into authorized_users values ('testuser',sha1('password'));

grant select on auth.* to 'webauth' identified by 'webauth';

flush privileges;
