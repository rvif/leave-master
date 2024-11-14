
# Leave Master

Leave Master is a leave management application designed for small and medium-sized businesses. Built with Next.js, Prisma ORM, ShadCN, Supabase, and Google OAuth, it enables businesses to manage employee leave requests efficiently. The application offers role-based access, leave approval workflows, and detailed leave analytics, all within a user-friendly interface.

## 🚀 Features

- **Employee Leave Management:** Employees can request, view, and manage their leave.
- **Leave Approval Workflow:** Managers can approve or reject leave requests.
- **Leave Balances:** Track and display leave balances for each employee.
- **Role-based Access Control:** Different access levels for employees, managers, and admins.
- **Google OAuth Authentication:** Sign in with Google for a secure and seamless authentication process.
- **Responsive Design:** Built with ShadCN and TailwindCSS for a modern and accessible UI.
- **Leave Analytics:** Track leave statistics like leave usage and trends.
- **Real-time Notifications:** Employees and managers receive updates on leave status.

## 🛠️ Tech Stack

- **Next.js** - React framework for building the application
- **Prisma ORM** - Database ORM for seamless interaction with the database
- **ShadCN** - UI components for a responsive and modern interface
- **Supabase** - Backend as a service for authentication and database management
- **Google OAuth** - Secure authentication with Google accounts
- **TailwindCSS** - Utility-first CSS framework for styling
- **NextAuth.js** - Authentication library for Next.js
- **Prisma Database** - PostgreSQL database for storing leave records, employee data, and more

## 📦 Installation

Clone the repository:

```
git clone https://github.com/rvif/leave-master.git
cd leave-master
```

Install dependencies:

```
npm install
```

Set up environment variables in `.env`:

```
DATABASE_URL=your_database_url_here
DIRECT_URL=your_direct_database_url_here

GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_JWT_SECRET=your_nextauth_jwt_secret_here

NEXTAUTH_URL=https://leave-master.vercel.app
ALLOWED_DOMAIN=your_allowed_email_domain_here

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

Start the development server:

```
npm run dev
```

## 🗄️ Database Schema

### `User` Table

Stores information about users, including their role, contact details, and associated leave records.

```
create table
  public."User" (
    id text not null,
    name text null,
    email text null,
    "emailVerified" timestamp without time zone null,
    image text null,
    role public.Role not null default 'USER'::"Role",
    phone text null,
    title text null,
    manager text null,
    department text null,
    constraint User_pkey primary key (id)
  ) tablespace pg_default;

create unique index if not exists "User_email_key" on public."User" using btree (email) tablespace pg_default;
```

### `Leave` Table

Tracks leave requests submitted by users, including details like leave type, status, and approval.

```
create table
  public."Leave" (
    id text not null,
    type text not null,
    year text not null default ''::text,
    "startDate" timestamp without time zone not null,
    "endDate" timestamp without time zone not null,
    days integer not null,
    "userName" text not null,
    "userNote" text null,
    "tasksLink" text null,
    "userEmail" text not null,
    status public.LeaveStatus not null default 'PENDING'::"LeaveStatus",
    moderator text null,
    "moderatorNote" text null,
    "createdAt" timestamp without time zone not null default current_timestamp,
    "updatedAt" timestamp without time zone not null default current_timestamp,
    constraint Leave_pkey primary key (id)
  ) tablespace pg_default;
```

### `Balances` Table

Tracks leave balance information for employees, including credits, used, and available days for different leave types.

```
create table
  public."Balances" (
    id text not null,
    year text not null,
    "annualCredit" integer null default 0,
    "annualUsed" integer null default 0,
    "annualAvailable" integer null default 0,
    "healthCredit" integer null default 0,
    "healthUsed" integer null default 0,
    "healthAvailable" integer null default 0,
    "studyCredit" integer null default 0,
    "studyUsed" integer null default 0,
    "studyAvailable" integer null default 0,
    "maternityCredit" integer null default 0,
    "maternityUsed" integer null default 0,
    "maternityAvailable" integer null default 0,
    "familyCredit" integer null default 0,
    "familyUsed" integer null default 0,
    "familyAvailable" integer null default 0,
    "paternityCredit" integer null default 0,
    "paternityUsed" integer null default 0,
    "paternityAvailable" integer null default 0,
    "unpaidUsed" integer null default 0,
    name text not null,
    email text not null,
    constraint Balances_pkey primary key (id),
    constraint Balances_email_fkey foreign key (email) references "User" (email) on update cascade on delete cascade
  ) tablespace pg_default;
```

### `Events` Table

Stores information about special events such as holidays or company-wide leave policies.

```
create table
  public."Events" (
    id text not null,
    title text not null,
    description text null,
    "startDate" timestamp without time zone not null,
    "endDate" timestamp without time zone null,
    constraint Events_pkey primary key (id)
  ) tablespace pg_default;
```

## 🚀 Deployment

1. Set up environment variables in Vercel:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`

2. Deploy to Vercel:

```
vercel
```

## 🔒 Security Features

- **Google OAuth Authentication**: Secure login via Google accounts.
- **Role-based Access Control**: Different permissions for employees, managers, and admins.
- **Data Encryption**: Secure storage and transmission of sensitive data.
- **Protected API Routes**: Only authorized users can access specific endpoints.

## 📝 License

This project is open-source and available under the MIT License.

## 🔗 Links

- [Live Demo](https://leave-master.vercel.app/)
- [Repository](https://github.com/rvif/leave-master)
- [Issue Tracker](https://github.com/rvif/leave-master/issues)
