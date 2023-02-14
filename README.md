# E-commerce App with Advanced Features
This web application is designed to provide basic e-commerce functionalities like product listing, sorting, filtering, and pagination; cart, user. In addition to these, the app also offers two advanced features:

* MOMO Payment Integration: This feature allows users to pay for their orders using the MOMO payment gateway. The app captures the wallet from the MOMO and redirect when receiving the information from MOMO.

* OAUTH 2 Login with Facebook: This feature enables users to log in to the app using their Facebook account. 

To use this feature, follow these steps:

* Register for an account with the app.
* Go to your user profile by clicking on your username.
* Link your Facebook account to your app account.
* You can now use your Facebook account to log in to the app.

**Note** : The app is currently in development mode, and Facebook has updated its policy. Therefore, it only takes information from dev teams for testing purposes. If you want to test the app, please contact me via Facebook or Zalo.

## Facebook OAUTH2 Flow:

* The user clicks on the Facebook button (created using the Facebook SDK).
* Facebook asks the user to grant profile reading permissions for the app.
* After the user accepts, Facebook saves the user's information to cookies.
* The web app takes this cookie, sends it to Facebook to parse the information, and Facebook responds with the result. The app then takes the information (in this case, the Facebook ID) to sign the user in the website.

## Thank you for using our app!
