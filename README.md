# ERP KAY System - Vue.js Frontend

A comprehensive Vue.js 3 web application for the ERP KAY System. This frontend provides a user-friendly interface for managing clients, users, roles, rights, sectors, and employees.

## Features

- **Authentication**: Secure JWT-based login
- **Dashboard**: Overview of all system modules
- **Client Management**: Create, read, update, and delete clients
- **User Management**: Manage system users with role assignments
- **Role Management**: Define and manage user roles
- **Rights Management**: Configure system permissions
- **Sector Management**: Manage business sectors
- **Employee Management**: View active employees
- **Role-Based Access Control**: Assign rights to roles and users

## Technology Stack

- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Styling**: CSS3

## Project Structure

```
src/
├── api/                 # API client and endpoints
├── assets/             # CSS and static assets
├── components/         # Vue components
├── router/             # Route configuration
├── stores/             # Pinia state management
├── views/              # Page components
├── App.vue             # Root component
└── main.js             # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

The build output will be in the `dist/` directory.

## Configuration

### Environment Setup

See [.env.example](.env.example) for all available environment variables.

**Quick Start**:
```bash
# Development (uses default localhost:6668)
npm run dev

# With custom API URL
VITE_API_URL=http://your-api-server npm run dev
```

### API Base URL

The API base URL is configured via the `VITE_API_URL` environment variable in `.env` files. By default:
- **Development**: `http://localhost:6668`
- **Production**: Must be explicitly set in `.env.production`

The Vite configuration in `vite.config.js` includes a proxy for development that redirects API calls to the configured API URL.

## Code Structure & Best Practices

See [STRUCTURE_IMPROVEMENTS.md](STRUCTURE_IMPROVEMENTS.md) for:
- ✅ Implementation of the 10 structural improvements
- 📖 Best practices guide for the codebase
- 🚀 Recommended next steps
- 📚 API for new composables and components

**Key Improvements**:
1. **Router Guards** - Enforced authentication checks
2. **Modular Stores** - Better organized state management
3. **Error Boundary** - Graceful error handling
4. **Reusable Composables** - Common patterns extracted
5. **Environment Config** - Proper configuration management

This application integrates with the ERP KAY System REST API. The API documentation is available at `/api/docs` (if Swagger is enabled on the backend).

### Authentication

All endpoints except `/api/auth/login` require a valid JWT token. The token is automatically included in all requests via the request interceptor.

### Available Endpoints

- **Authentication**: `/api/auth/login`
- **Clients**: `/api/clients/*`
- **Users**: `/api/securite/users/*`
- **Roles**: `/api/securite/roles/*`
- **Rights**: `/api/securite/droits/*`
- **Sectors**: `/api/secteursActivites/*`
- **Employees**: `/api/param/employes/*`
- **Role-Rights**: `/api/securite/rolesDroits/*`
- **User-Rights**: `/api/securite/usersDroits/*`

## Usage

### Login

1. Navigate to the application
2. Enter your login credentials
3. Click the "Login" button
4. You'll be redirected to the dashboard upon successful authentication

### Managing Resources

Each resource (Clients, Users, Roles, etc.) has:
- A list/grid view with pagination and search
- Create form for adding new items
- Edit form for modifying existing items
- Delete functionality
- Enable/disable status toggle (where applicable)

### Role Rights Management

To manage rights for a specific role:
1. Navigate to Roles
2. Click "Manage Rights" for the desired role
3. Select/deselect the rights you want to assign
4. Click "Save Rights"

## Error Handling

The application includes comprehensive error handling:
- Network errors are caught and displayed
- 401 Unauthorized responses automatically redirect to the login page
- Form validation prevents invalid submissions
- User-friendly error messages are displayed throughout

## Security

- JWT tokens are stored in localStorage
- Tokens are automatically included in all API requests
- Protected routes require authentication
- Session tokens can be invalidated by clearing localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When adding new features:
1. Create API integration functions in `src/api/index.js`
2. Create a Pinia store in `src/stores/index.js` if needed
3. Add routes in `src/router/index.js`
4. Create view components in `src/views/`
5. Follow the existing code style and patterns

## License

This project is part of the ERP KAY System.

## Backend Integration

This frontend is designed to work with the ERP KAY System backend:
- Framework: Spring Boot 4.0.3
- Java Version: 17
- Database: MySQL (with H2 fallback)
- Last Updated: March 17, 2026

For backend setup and API documentation, refer to the backend repository.

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure:
1. The backend has CORS enabled for origin `*`
2. The API proxy in `vite.config.js` is correctly configured
3. The backend server is running on `http://localhost:8080`

### API Connection Issues
1. Verify the backend server is running
2. Check the `VITE_API_BASE_URL` environment variable
3. Inspect browser network requests in Developer Tools

### Authentication Issues
1. Clear browser localStorage
2. Log in again with correct credentials
3. Check that the backend is issuing valid JWT tokens

## Support

For issues or questions, please contact the development team.
