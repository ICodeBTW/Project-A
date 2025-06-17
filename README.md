# 🌐 Project-A (Astro + React + Express)

This is a full-stack demo application built using [Astro](https://astro.build/) for the frontend with embedded [React](https://reactjs.org/) islands, and [Express.js](https://expressjs.com/) for the backend API server. The project is designed to demonstrate how to deploy a web application on AWS using Docker and CloudFormation templates.

## 📁 Project Structure

```
.
├── application
│   ├── api
│   │   └── app                  # Express.js backend application
│   │       ├── app.js           # Entry point for Express server
│   │       ├── Dockerfile       # Docker setup for backend
│   │       ├── package.json     # Backend dependencies and scripts
│   │       └── package-lock.json
│   └── web
│       └── app                  # Astro frontend application
│           ├── astro.config.mjs# Astro config
│           ├── Dockerfile       # Docker setup for frontend
│           ├── public           # Static public assets
│           ├── src
│           │   ├── assets       # Images and SVGs
│           │   ├── components   # UI components (Astro & React)
│           │   ├── layouts      # Astro layout components
│           │   ├── pages        # Astro pages (routes)
│           │   └── styles       # Global CSS styles
│           ├── package.json     # Frontend dependencies and scripts
│           └── tsconfig.json    # TypeScript config
├── cloudformations              # AWS CloudFormation templates
├── scripts                      # Utility scripts for deployment
└── README.md
```

## 🚀 Tech Stack

- **Frontend:** Astro with React Islands
- **Backend:** Node.js with Express.js
- **Styling:** Tailwindcss
- **Deployment:** Docker containers
- **Infrastructure as Code:** AWS CloudFormation
- **CI/CD:** Github workflow actions.

## 🎯 Purpose

This is a **demo project** created to demonstrate:

- Building a full-stack web app with modern frontend and backend technologies.
- Containerizing both the frontend and backend using Docker.
- Deploying the app on AWS using CloudFormation templates.
- Clean project structure separation for scalability and maintainability.

## 🐳 Docker

Each service (frontend and backend) includes its own `Dockerfile`. You can build and run them individually or as part of a multi-container setup.

Example:
```bash
# Backend
cd application/api/app
docker build -t demo-api .
docker run -p 3001:3000 demo-api

# Frontend
cd application/web/app
docker build -t demo-web .
docker run -p 3000:4321 demo-web
````

## ☁️ AWS Deployment

Infrastructure is managed using AWS CloudFormation templates located in the `cloudformations/` directory. These templates provision the required AWS resources such as:

* EC2 instances
* Load balancers
* Security groups
* VPC and networking components
 
## 🧪 Future Improvements

* Integrate a database (e.g., DynamoDB or RDS)
* Enable HTTPS with ACM
* Add health checks and monitoring

---

## 📬 Feedback

This project is part of a learning and experimentation process with cloud-native application architecture. Contributions and suggestions are welcome!

```
 