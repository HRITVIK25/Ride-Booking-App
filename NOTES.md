## BACKEND

1. We first start any backend by creating 2 things index.js(server.js in this case) and app.js in which we create server connect to DB and start and express application
   a)index.js:- we write code realted to calling the sever and making the database connection
   HT we wrote the code to call the initialise the server in db.js and it is called in index.js to make connection there we use app.js as automatically executes http.createserver(app) internally and starts listening
   ST we first imported http module created a server by passing app and then listen to it to start the server
   b)app.js:- app refers to express application [const app = express()]
   we write the code related to express appplication here like enabling cors, urlencoded, json, static, cookieparser this is
   used to passed to listen to server in index.js and strat tyhe application with these features, along with main routes
   app.use(method_name) sets these methods as middlewares
   index.js is our starting point

2. Now connect to DB write the method to create the mongoDB server in db.js and that server is started in index.js with proper method to log errors(then and catch)
   store the port to be used in env file

3. We create user model along with requiremnts we write function to generate access token and hashing the password and comparing the new password to old password isnide the user model file so methods can be easily used
   method to generate access tokena dn refresh token using jwt can be diffrent or same for access and refresh token

4. The logic and methods for the model is written inside controller

5. And we write the routes for all endpoint in one file like user.routes but main route is defined in app.js

6. Services contain the code that perform operation on Db like create user etc

7. In SV we are using express validation in HV we used custom utils like APIresponse ApiError etc

8. const token = req.cookies.token || req.headers.authorization.split(' ')[1];
   This line extracts a token, typically used for authentication or authorization, from either:

Cookies (req.cookies.token)

If the token is stored as a cookie, it will be available in the req.cookies object.
req.cookies.token attempts to directly access the token from the cookies.
Authorization Header (req.headers.authorization)

If the token is sent as part of the Authorization header, the code extracts it. This is common in APIs where tokens are passed in the request headers.
req.headers.authorization.split(' ')[1]:
req.headers.authorization contains the full Authorization header, which might look like this:- Authorization: Bearer <token>
.split(' ') splits this string into two parts:
Bearer (index 0)
<token> (index 1)
[1] accesses the token part of the header

9. Auth middleware
   Request Contains Token:
   Token is extracted from cookies or the Authorization header.
   Verified using jwt.verify.
   User is fetched from the database and attached to the request.

Request Without Token:
Responds immediately with a 401 Unauthorized error.

Request with Invalid/Expired Token:
Fails during jwt.verify, triggering the catch block.
Responds with a 401 Unauthorized error.

The user we get from decoding is set in req.user and passed to next() which is sent to getting user profile or other functions

10. cookie-parser se hum authentication token ko cookies se decode kar sakte hain
    during login authToken is set in cookies and we do not need to manually send the token cookie parser will automatically take it out and run the authentication code using const token = req.cookies.token

11. auth middleware login ke time par tokens set kardo
    logout ke time par
    SV mai humne usko blacklist token mai daala hai agar wo wahan hoga to usko koi function nhi karne dega logout ke time mai blacklist token DB mai set ho jayega aur time to live 24 hours hai tab tak wahan rahega
    HT mai humne userDb mai refresh token ki value set kardi thi login ke time aur logout ke time usko unset kiya tha aur dono cases mai cookies clear kardi thi

## FRONTEND

1. Token is stored in localstorage on login and signup and userprotectwrapper checks if token is available for preventing unauthorized access

2. on logout we fetch token from local storage and send it in header to backend to perform functiion

3. useConetxt helps us in fetching and storing user information and prevents props drilling

4. The two wrappers you've created, CaptainProtectWrapper and UserprotectWrapper, are designed to protect specific routes or components from unauthorized access. These wrappers ensure that only authenticated users (captains or general users) can access certain parts of the application. If a user is not authenticated, they will be redirected to the login page.

Explanation of the Wrapper Pattern
A wrapper component in React is typically used to add additional functionality, such as authentication checks, layout, or state management, without modifying the core functionality of the child components it wraps.

How It Works:
Authentication Check:

Both wrappers are designed to check whether the user (captain or general user) has a valid JWT token stored in localStorage.
If the token is missing or invalid, the user is redirected to the respective login page (/captain-login or /login).
Profile Fetch:

After checking for the token, the wrapper makes an API request to fetch the user's profile data:
CaptainWrapper fetches the captain's profile.
UserWrapper fetches the general user's profile.
If the profile data is successfully retrieved, the user object is saved to the UserDataContext (or CaptainDataContext in the case of the captain), and the application renders the children components.
Loading State:

If the profile is still being fetched (isLoading is true), the wrapper shows a loading message ("Loading..."). Once the profile data is retrieved, the children components are rendered.
Unauthorized Access Handling:

If the token is not valid (or not provided), the wrapper removes the invalid token from localStorage and redirects the user to the appropriate login page (/captain-login or /login).
Use Cases for Wrappers:
Route Protection:

The wrappers act as route protection mechanisms. Without this, each protected page would need its own logic for verifying if a user is authenticated. Wrapping the children components with this logic makes the code reusable and clean.
Centralized Authentication Handling:

By using context (UserDataContext or CaptainDataContext), you centralize the authentication handling. This allows other components to consume the context for the logged-in user or captain data, making it easier to display personalized content across the application.
Reusable Logic:

Wrappers provide a reusable, modular way to handle authentication and redirect logic across different parts of your app. If you add more protected routes in the future, you simply need to wrap them with the appropriate wrapper (UserprotectWrapper or CaptainProtectWrapper).
Consistency:

Wrappers ensure a consistent user experience. When a user is logged in, they will have access to the content. If they're not logged in, they'll always be redirected to the login page without the need to repeat authentication logic.
When to Use This Wrapper Pattern:
Protected Pages or Routes:

If you have pages or sections of your app that should only be accessible to authenticated users, the wrapper pattern ensures that only authorized users can access those pages.
Multiple User Roles:

If your app supports multiple roles (like "admin", "captain", "user"), you can create separate wrappers for each role. This ensures that users only have access to pages meant for their roles.
Better Code Structure:

Wrappers promote cleaner and more maintainable code by separating concerns (authentication, profile loading) from the main component logic. This reduces redundancy.

# key:

HT Hitesh sir video
SV Sheriyans video
