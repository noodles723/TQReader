create table users(
    userId int unsigned not null auto_increment primary key,
    name char(50) not null,
    password char(50) not null,
    email char(50) not null
);

create table subscribes(
    rssId int unsigned not null,
    userId int unsigned not null,
    lastReaded int unsigned,
    primary key (rssId, userId)
);

create table rss(
    rssId int unsigned not null auto_increment primary key,
    address char(100) not null
);
