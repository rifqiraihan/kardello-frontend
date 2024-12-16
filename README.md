## Kardello Frontend

This is the frontend for the Kardelo application, a Trello clone built using Next.js, React, and TypeScript. The app allows users to manage tasks, replies, and their user profiles in a Trello-like environment with drag-and-drop functionality for task management. The core features are fully functional, including task and reply management, but the application is still under development, with ongoing improvements to ensure a smooth experience on mobile devices.

## Features in Detail

User Authentication
Register: New users can sign up by providing their email and password.
Login: Existing users can log in with their email and password.
JWT Authentication: Once logged in, users will receive a JSON Web Token (JWT) to be used for making authenticated requests.

Task Management
Create Task: Logged-in users can create new tasks by providing a title, description, and other details.
Edit Task: Users can edit existing tasks, updating their details.
Delete Task: Tasks can be deleted by their creator.
View Tasks: Tasks are displayed in a Trello-like board with different lists and columns.
Drag-and-Drop: Tasks can be reorganized by dragging and dropping task cards between different lists or columns. This allows users to easily prioritize or categorize tasks by simply dragging them.

Reply Management
Create Reply: Logged-in users can create replies on tasks to provide comments or updates.
Edit Reply: Users can edit their replies to update or correct any information.
Delete Reply: Replies can be deleted by the user who created them.
Role-based Permissions
Only logged-in users can perform task and reply operations. Anonymous users can only view tasks and replies.

Drag-and-Drop Task Management
We use React Beautiful DnD to implement drag-and-drop functionality for task cards. Users can easily move tasks between different columns or lists by clicking and dragging them. This feature provides a smooth and intuitive user experience for organizing tasks.

API Integration
The frontend communicates with the backend via tRPC for type-safe API calls.

## Tech Stack

- **Next.js**: React framework for building server-rendered applications.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Static typing for safer, more maintainable code.
- **tRPC**: Type-safe API client and server integration.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **JWT**: Authentication using JSON Web Tokens.
- **TailwindCSS**: Utility-first CSS framework for fast UI development.
- **React Beautiful DnD**: Library for implementing drag-and-drop functionality in React.

Clone the repository
git clone https://github.com/yourusername/kardello-frontend.git
cd kardello-frontend

Install dependencies
pnpm install

Configure Environment Variables
Create a .env file in the root of your project with the following content:
NEXT_PUBLIC_API_URL=http://localhost:8080

For development, run:
pnpm dev

