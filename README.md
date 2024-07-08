# Web Blog Project

This is a web blog application where users can view posts about places I have visited.
Each post contains an image and a brief description. Users can click on a post to read the full content. 


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Home page with cards displaying images and short descriptions of posts
- Detailed view of posts
- About page with an image and description
- Contact page with a form validated using Bootstrap and email functionality
- User authentication (login and registration)
- Conditional navigation links based on user authentication status
  - Logged in users see a logout button instead of login and register buttons
  - Admin users see a "New Post" link to create new posts
- Ability to create new posts with image upload
- Navigation bar and footer using Bootstrap partials

---

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- Bootstrap for styling and form validation
- Multer for image uploads
- Nodemailer for email functionality

---

## Setup and Installation

#### Install Dependencies
```bash
npm install

1. **Clone the repository**
    ```bash
    git clone https://github.com/Val-Ge/travel-blog
    cd travel-blog
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up MongoDB**
    - Make sure you have MongoDB installed and running on your machine.
    
4. **Configure environment variables**
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
      DATABASE_URL=your-mongodb-connection-string
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password-or-app-password
    RECIPIENT_EMAIL=recipient@example.com
    SESSION_SECRET=your-session-secret


5. **Run seed data**
    ```bash
    node seed.js
    ```

6. **Start the application**
    ```bash
    npm start
    ```
    - The application will be running on `http://localhost:3000`

## Usage

- **Home Page:** Displays posts with images and short descriptions.
- **Post Page:** Click on any post on the home page to view the full content.
- **About Page:** Contains an image and description about the blog and author.
- **Contact Page:** Users can fill out a contact form which is validated using Bootstrap.
    Upon submission, the form sends an email with the user's message.
- **User Authentication:** Users can register and log in.
    Logged in users will not see the login or register buttons; instead, they will see a logout button.
    Admin users have additional access to create new posts.
- **Create New Post:** Admin users can click on the "New Post" link to create a new blog post and upload an image.

your-repo-name/
│
├── .env                 # Environment variables
├── public/              # Static files
│   ├── css/
│   └── js/
├── routes/              # Express routes
│   ├── blogRoutes.js
│   ├── postRoutes.js
│   └── userRoutes.js
├── views/               # EJS templates
│   ├── partials/
│   ├── layouts/
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   ├── new.ejs
│   └── ...
├── models/              # Mongoose models
│   ├── Post.js
│   ├── User.js
│   └── Message.js
├── app.js               # Main application file
├── seed.js              # Seed data script
└── ...

---

## Contributing
1. Fork the repository
2. Create a new branch
```bash
git checkout -b feature-name


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
