# Software Technical Test (RESTful API)

This is a RESTfull API for a technical test as Full-Stack Developer

## Installation 

- Make sure you had clone this repo
- Copy environment from `.env.example` to `.env`
- Configure your `.env` file according to your MongoDb credentials
- Open your terminal in this project and run 

	```bash
	npm install
	```

## How To Run This RESTful API

- Run On Development

	```bash
	npm run dev
	```

- Run On Production

	```bash
	npm run build
	npm run start
	```

## API SPECS

- POST `/api/v1/users/join` (Join to a chat room)

	Request Body

	```
	{
		"username": "your username",
		"roomId": "your room id"
	}
	```

- PUT `/api/v1/users/exit/:id/:roomId` (Exit from Chat Room)

- POST `/api/v1/user/access-token` (Create an Acess Token)

	Request Body

	```
	{
		"refreshToken": "your refresh token"
	}
	```

- POST `/api/v1/messages` (Sending a message)

	Request Body

	```
	{
		"activeRoomId": "your active room id",
		"message": "your message"
	}
	```

- GET `/api/v1/messages/:activeRoomId` (Get All Messages)

## License
[MIT](https://choosealicense.com/licenses/mit/)