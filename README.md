# RBAC Admin

A frontend project for Role-Based Access Management (RBAC) Admin built using **React JSX**, **Tailwind CSS**, **Lucide React** for icons, and **React Router DOM** for routing. The application provides an intuitive interface to manage users, roles, permissions, API keys, and system settings.

---

## Features

### **Header**
- **Latest Notifications**: Displays recent updates.
- **Latest Messages**: Shows recent communications.
- **Admin Profile**:  
  - View profile  
  - Sign out  
  - Manage profile settings  

### **Sidebar Navigation**
Provides quick access to all pages:
- Dashboard
- Users
- Roles
- Permissions
- API Keys
- Settings

### **Pages**

#### **Dashboard**
- Overview of system metrics:
  - Total Users
  - Active Users
  - Permissions Overview
  - Role Assignments Overview
- **Recent Activities**: Highlights recent user actions and system updates.

#### **Users**
- Add new users.
- Assign roles to users.
- View and manage user statuses (e.g., active/inactive).

#### **Roles**
- Create and manage roles with the following attributes:
  - **Name**: Unique role identifier.
  - **Description**: Role purpose or details.
  - **Risk Level**: Indicates risk based on permissions assigned (e.g., High or Low).
  - **Permissions**: Assign permissions from the **Permissions Page**.

#### **Permissions**
- Create and manage permissions:
  - **Name**: Permission name.
  - **Impact**: Description of its effect.
- Permissions created here can be assigned to roles in the **Roles Page**.

#### **API Keys**
- Generate and manage API keys for secure integrations.

#### **Settings**
- Customize and manage application settings.

---

## Tech Stack
- **React JSX**: Component-based architecture for the frontend.
- **Tailwind CSS**: Utility-first styling framework.
- **Lucide React**: Icon library for consistent UI.
- **React Router DOM**: Handles routing and navigation.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ARIngale/SecureVision_1
2. Change directory
   ```bash
   cd SecureVision_1
3. Install Dependencies 
   ```bash
   npm install
4. Run the code
   ```bash
   npm run dev




