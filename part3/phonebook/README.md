# phonebook(part3) for Full Stack Open 2020
## Run the backend at /backend directory:
> $ `npm install`  
> $ `npm start` or `npm run dev` for development enviroment
## Run the frontend at /frontend directory:
> $ `npm install`  
> $ `npm start`
## For deployment scripts at Heroku (with Heroku CLI):
If you have cloned this entire repository, it's better to copy this phonebook directory to another location before nesting git repos.
> $ `npm install --prefix ./frontend`  
> $ `cd backend`  
> $ `git init`  
> $ `heroku create`  
> $ `npm run deploy:full`  
> $ `heroku config:set <your_db_uri>`  
> $ `heroku open`
## Online project:
> https://fsopen-part3-phonebook.herokuapp.com  
> https://fsopen-part3-phonebook.herokuapp.com/api/persons (JSON API)