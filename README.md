# CheckFlow

CheckFlow is a web application developed using the principles of CRUD (Create, Read, Update, Delete) for managing tasks and to-do lists.

The application is built on React using the Redux Toolkit library to simplify application state management.

The entire codebase is written in TypeScript, which provides static typing and enhances the reliability and maintainability of the project.

The Material-UI library is used to create the user interface in the project, providing ready-made components and styles following the principles of Material Design. Axios is used to interact with the server-side API in the project. It provides a convenient way to send HTTP requests and handle server responses.

Using the REST API, the application can perform read, create, update, and delete operations on tasks, providing full CRUD functionality.

The CheckFlow project provides a user-friendly interface for creating, editing, deleting, and displaying tasks and to-do lists. Users can easily add new tasks, set their completion status, modify deadlines and priorities. All changes are saved on the server using the REST API. This repository contains the source code and documentation for the CheckFlow project.

## Technologies Used

CheckFlow is built using the following technologies:

- **TypeScript**: CheckFlow is written in TypeScript, a statically typed superset of JavaScript that helps catch errors and provides better tooling for developing large-scale applications.
- **React**: The frontend of CheckFlow is built using React, a popular JavaScript library for building user interfaces. React enables efficient development of components and provides a responsive and interactive user experience.
- **Redux Toolkit**: Redux Toolkit is used for state management in CheckFlow. It simplifies the process of managing application state and provides tools for efficient data flow and handling side effects.
- **Formik**: Formik is used for form management in CheckFlow. It simplifies the process of creating and validating forms, managing form state, and handling form submission.
- **REST API**: CheckFlow interacts with a RESTful API to retrieve and modify data. API endpoints are used for tasks such as creating, updating, and deleting tasks, as well as retrieving task-related information.
- **Axios**: Axios is used in CheckFlow as the HTTP client for sending requests to the API. It provides a simple-to-use interface for asynchronously sending HTTP requests and handling responses.
- **Storybook**: Storybook is used for developing and testing UI components in isolation. It allows developers to create and showcase components independently, making iteration easier and ensuring UI consistency.
- **Unit Tests**: CheckFlow includes unit tests to verify the correctness of individual components and functions. Test frameworks such as Jest and React Testing Library are used to write and execute these tests.
- **Material-UI**: CheckFlow utilizes Material-UI, a popular React UI component library that provides a set of pre-built components with a modern and visually appealing design.
- **CSS Modules**: CSS modules are used in CheckFlow for localizing styles. This ensures that styles are scoped within individual components, preventing conflicts and facilitating CSS maintenance.
- **Yarn**: Yarn is used as the package manager for CheckFlow. It provides fast and reliable dependency management for the project.

## Getting Started

To get started with CheckFlow, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/checkflow.git`
2. Install project dependencies: `yarn install`
3. Start the development server: `yarn start`
4. Open a browser and access CheckFlow at `http://localhost:3000`.