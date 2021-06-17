# Drf+react

backend is made using django + djangorestframework and is completely independent of the frontend that is made using react + bootstrap.

password validation is done using regular expressions

database used is postgres

api docs are generated using swagger

authentication is done using JWT as well as sessions

demo frontend url: https://supplierdemo.netlify.app/

demo backend url: https://supplierdemo.herokuapp.com/

## features implemented

### backend

- registration as supplier
- view and edit profile for supplier
- account edit (email,name,address)
- admin can view all accounts
- account edit and delete for admin

- automated tests and deployment using github actions

### frontend

- signup page, login page, logout

- form validations using regular expressions and bootstrap

- redirect to profile page for suppliers and redirect to admin page for admin
- profile edit for suppliers
- view and delete accounts from admin page

### regex

containing one Capital and one lowercase letter, one digit, one special character
and minimum of 8 characters

`^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$`
