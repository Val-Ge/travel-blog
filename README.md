# Web Blog Project

This is a web blog application where users can view posts about places I have visited. Each post contains an image and a brief description. Users can click on a post to read the full content. The blog also has an about page, a contact form, and a feature to create new posts.

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
- Contact page with a form validated using Bootstrap
- Ability to create new posts with image upload
- Navigation bar and footer using Bootstrap partials

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- Bootstrap for styling and form validation
- Multer for image uploads

## Setup and Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up MongoDB**
    - Make sure you have MongoDB installed and running on your machine.
    - You can use a local instance or a MongoDB Atlas cloud instance.

4. **Configure environment variables**
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```plaintext
        DATABASE_URL=your-mongodb-connection-string
        ```

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
- **About Page:** Contains an image and description about the blog.
- **Contact Page:** Users can fill out a contact form which is validated using Bootstrap.
- **Create New Post:** Click on the "New Post" link to create a new blog post and upload an image.

## Contributing

1. **Fork the repository**
2. **Create a new branch**
    ```bash
    git checkout -b feature-name
    ```
3. **Make your changes**
4. **Commit your changes**
    ```bash
    git commit -m "Description of changes"
    ```
5. **Push to your branch**
    ```bash
    git push origin feature-name
    ```
6. **Create a Pull Request**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
