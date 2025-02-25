# To-Do List Web Application

## Overview
This is a simple To-Do List web application that allows users to create and manage tasks efficiently. The system consists of three main components:
- **Frontend**: Built using React with Redux for state management and Material-UI (MUI) for styling.
- **Backend**: Developed using Java Selenium with TestNG for testing.
- **Database**: MySQL is used to store tasks.
- **Testing**: Automated UI and API testing using Selenium and TestNG.

## Features
- Add new to-do tasks with a title and description.
- Display the latest five uncompleted tasks.
- Mark tasks as completed, removing them from the UI.
- Responsive and modern UI using MUI.
- Fully containerized with Docker and `docker-compose` (excluding tests).
- Automated testing with Selenium and TestNG.

## Tech Stack
- **Frontend**: React, Redux, Material-UI (MUI)
- **Backend**: Java, Selenium, TestNG
- **Database**: MySQL
- **Containerization**: Docker, Docker Compose (excluding tests)
- **Testing**: Selenium, TestNG

## Project Setup
### Prerequisites
- Docker & Docker Compose installed
- Git installed

### Clone the Repository
```sh
git clone https://github.com/vineescar/ToDoList.git
cd ToDoList
```

### Running the Application
1. **Start the services using Docker Compose**
   ```sh
   docker-compose up --build
   ```
2. The application will be available at `http://localhost:3000`
3. API endpoints will be accessible via `http://localhost:8080`
4. MySQL database runs on `localhost:3307`

### Database Schema
Table: `task`
| Column     | Type        | Description                     |
|------------|------------|---------------------------------|
| id         | INT (PK)    | Auto-incremented task ID       |
| title      | VARCHAR(255) | Task title                      |
| description | TEXT       | Task description                |
| completed  | BOOLEAN    | Task completion status (true/false) |
| created_at | TIMESTAMP  | Task creation timestamp         |


### Running Tests
To execute the automated tests using Selenium and TestNG, run the tests manually in your local setup.

## Additional Resources
- [Live Demo Video](https://drive.google.com/file/d/1p5ROoiInAJkF8ofNAQz9tPcZkCm0vPXd/view?usp=sharing)
- [Change Theme Demonstration](https://drive.google.com/file/d/1sEFG_68wTPN6Wd6MR4b3wPCw6jzodSG-/view?usp=sharing)
- [Testing Video](https://drive.google.com/file/d/1unGmxnHUfFBELo7pSOqb0TP2b_jdN1HH/view?usp=sharing)

## Contact
For any questions or issues, feel free to reach out via mail.

