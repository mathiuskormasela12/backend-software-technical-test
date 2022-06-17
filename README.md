# Ucars Backend

This is a RESTfull API for a technical test as Full-Stack Developer at Ucars

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

- POST `/api/v1/auth/register` (Register)

	Request Body

	```
	{
		"username": "your username",
		"password": "your password"
	}
	```

- POST `/api/v1/auth/login` (Login)

	Request Body

	```
	{
		"username": "your username",
		"password": "your password"
	}
	```
- POST `/api/v1/auth/access-token` (Create an Acess Token)

	Request Body

	```
	{
		"refreshToken": "your refresh token"
	}
	```

- POST `/api/v1/cars/brand` (Add a Car Brand)

	Request Body (Multipart/Form-Data)

	```
	{
		"name": "car brand name",
		"carModelId": "model id",
		"year": "year",
		"description": "description",
		"logo": "image"
	}
	```

- POST `/api/v1/cars/model` (Add a Car Model)

	Request Body

	```
	{
		"modelName": "model name",
		"year": "year",
	}
	```

- GET `/api/v1/cars/model` (Get All Car Models)

	Request Query

	```
	{
		"page": "page",
		"limit": "limit"
	}
	```

- GET `/api/v1/cars/brand` (Get All Car Brands)

	Request Query

	```
	{
		"page": "page",
		"limit": "limit",
		"keywords": "keywords"
	}
	```

- GET `/api/v1/cars/brand/:id` (Get Detail a Car Brand)

- PUT `/api/v1/cars/model/:id` (Update a Car Model)

	Request Body

	```
	{
		"modelName": "model name",
		"year": "year",
	}
	```

- PUT `/api/v1/cars/brand/:id` (Update a Car Brand)

	Request Body (Multipart/Form-Data)

	```
	{
		"name": "car brand name",
		"carModelId": "model id",
		"year": "year",
		"description": "description",
		"logo": "image"
	}
	```

- DELETE `/api/v1/cars/model/:id` (Delete a Car Model)

- DELETE `/api/v1/cars/brand/:id` (Delete a Car Brand)


## License
[MIT](https://choosealicense.com/licenses/mit/)