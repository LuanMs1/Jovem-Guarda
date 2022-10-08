INSERT INTO users (user_type, name, email, password)
VALUES ('collectors', 'Leonardo', 'leo@gmail.com', '1234'),
	('collectors', 'Abigail', 'abe@gmail.com', '1234'),
	('collectors', 'Amanda', 'manda@gmail.com', '1234');
	
INSERT INTO discs (user_id, album, artist, release_year)
VALUES (1, 'Help!', 'The Beatles', 1965),
		(1, 'Beatles For Sale', 'The Beatles', 1964),
		(2, 'Blues', 'Jimi Hendrix ', 1994),
		(2, 'The dark side of the moon', 'pink floyd', 1973),
		(2,'Help!', 'The Beatles', 1965),
		(3,'Help!', 'The Beatles', 1965),
		(3,'The dark side of the moon', 'pink floyd', 1973),
		(3,'Abbey Road', 'The Beatles', 1969),
		(3,'Demon Days', 'Gorillaz', 2005);
		
INSERT INTO music_genre_list(album_id, genre)
VALUES (1,'Beat'), (1, 'Soundtrack'),(1, 'Pop Rock'),
		(2, 'Rock & Roll'),(2, 'Pop Rock'),(2, 'Beat'),
		(5,'Beat'),(5, 'Soundtrack'),(5, 'Pop Rock'),
		(6,'Beat'),(6, 'Soundtrack'),(6, 'Pop Rock'),
		(3, 'Blues Rock'),
		(4,'Prog Rock'), (4, 'Psychedelic Rock'),
		(7,'Prog Rock'), (7, 'Psychedelic Rock'),
		(8, 'Pop Rock'),
		(9,	'Trip Hop'), (9,'Pop Rap'), (9,'Pop Rock'), (9, 'Downtempo');