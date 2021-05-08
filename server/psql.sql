-- pl/sql procedures
create or replace procedure insert_into_ratings(lid in varchar(255),uid in varchar(255), rtng in varchar(255)) 
language sql as
$$
	insert into ratings values(cast(lid as integer), cast(uid as uuid), cast(rtng as float));
$$;
-- usage call insert_into_ratings('1', '6a93b3a4-72c8-4953-92e9-4e923ff38590' , '6.0');

create or replace procedure insert_into_ratings(lid in varchar(255), uid in varchar(255), bl in varchar(255))
language sql as
$$
	insert into ratings values(cast(lid as integer), cast(uid as uuid), cast(bl as boolean));

$$;
-- usage call insert_into_ratings('2', '6a93b3a4-72c8-4953-92e9-4e923ff38590', 'true');
