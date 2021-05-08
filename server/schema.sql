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
create table ratings(
	location_id integer not null,
	user_id uuid not null,
	liked boolean default NULL,
	foreign key(location_id) references locations(location_id),
	foreign key(user_id) references users(user_id),
	primary key(user_id, location_id)
);


--sample inserts users
INSERT INTO users(username, email, password) values('rakshith','rakshithcrm@gmail.com','arra1902');
--sample inserts locations
insert into locations(location_name, latitude, longitude, description, city, photo, visit_during, added_by) values
('Marina beach', '12.12.12.12', '13.13.13.13', 'Wonderful Beach', 'Chennai', 'path', 'Winter', '6a93b3a4-72c8-4953-2e9-4e923ff38590');
--sample inserts ratings
insert into ratings values(1, '6a93b3a4-72c8-4953-92e9-4e923ff38590', 'true');

--used selects
select locations.location_id, location_name, latitude, longitude, description, city, photo, visit_during, username, liked from locations left join users on users.user_id=locations.added_by left outer join ratings on ratings.location_id = locations.location_id and ratings.user_id=cast('fd1a6c3b-32c6-4f4b-940d-9135be254967' as uuid);

select count(*) from ratings group by location_id;

select table1.*,table2.count from (select locations.location_id, location_name, latitude, longitude, description, city, photo, visit_during, username, liked from locations left join users on users.user_id=locations.added_by left outer join ratings on ratings.location_id = locations.location_id and ratings.user_id=cast('6a93b3a4-72c8-4953-92e9-4e923ff38590' as uuid)) as table1 inner join 
(select location_id,count(*) from ratings group by location_id) as table2 on table1.location_id = table2.location_id;
