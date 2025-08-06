create database blog;
use blog;

create table users(
    `id` int primary key auto_increment ,
    `name` varchar(50),
    `email` varchar(50) 
);

create table posts(
    `id` int primary key auto_increment,
    `title` varchar(50),
    `user_id` int,
    foreign key (user_id) references users(id)
);

create table comments(
    `id` int primary key auto_increment,
    `content` varchar(50),
    `post_id` int,
    `user_id` int,
    foreign key (post_id) references posts(id),
    foreign key (user_id) references users(id)
);

insert into users(name,email) values ("farid","farid@something.com"),("Moustafa","Moustafa@isAwesome.com"),("Charbel","CharbelDaoud@isAwesome.com");

insert into posts(title,user_id) values ("This blog is about food",1),("How to become a developer",2),("How to become a 10x software engineer",3);

insert into comments(content,post_id,user_id) values ("This recipe is awesome, I can't wait to try it",1,3),("I had problems centering a div",2,1),("Just buy more monitors",3,2);