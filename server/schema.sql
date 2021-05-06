CREATE DATABASE JWT;
CREATE EXTENSION "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

create table locations(
	location_id serial primary key,
	location_name varchar(255) not null,
	latitude varchar(255) not null,
	longitude varchar(255) not null,
	description varchar(1024) not null,
	city varchar(255) not null,
	photo varchar(255) not null,
	visit_during varchar(255) not null,
	added_by uuid not null,
	foreign key(added_by) references users(user_id) on delete cascade on update cascade
);

--sample inserts users
INSERT INTO users(username, email, password) values('rakshith','rakshithcrm@gmail.com','arra1902');
--sample inserts locations
insert into locations(location_name, latitude, longitude, description, city, photo, visit_during, added_by) values
('Marina beach', '12.12.12.12', '13.13.13.13', 'Wonderful Beach', 'Chennai', 'path', 'Winter', '6a93b3a4-72c8-4953-2e9-4e923ff38590');

select location_name, latitude, longitude, description, city, photo, visit_during, username from locations left join users on users.user_id=locations.added_by;