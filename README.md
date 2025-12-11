# Andres Henao - Digital Portfolio & AI Assistant

A next-generation digital portfolio showcasing the convergence of **Full-Stack Development**, **Cybersecurity**, and **AI Automation**. This application allows users to interact with a custom AI assistant ("Boto") that answers questions based on real-time data from the portfolio.

---

## 🏗️ Technical Architecture & Implementation Details

This project moves beyond a static portfolio by integrating complex backend systems, AI agents, and secure data handling.

### 1. Authentication & Identity Management
We leverage **Clerk** (`@clerk/nextjs`) for a robust, secure authentication system that handles the heavy lifting of identity management.

*   **Implementation**: Authenticated routes are protected via middleware (`proxy.ts`).
*   **Database Sync**: Authentication is decoupled but synchronized. When a user registers via Clerk, a custom sync mechanism (`syncUserWithDatabase` in `lib/auth.ts`) mirrors their identity into our local **Neon Postgres** database.
*   **Benefits**: This allows us to maintain strict **Referential Integrity** between users and their data (like blog posts or messages) while offloading security-critical auth flows (MFA, Session Management) to a dedicated provider.

### 2. Database Layer (Serverless Postgres)
The application state is managed using **Neon Database**, a serverless Postgres provider, interacted with via **Drizzle ORM**.

*   **Why Drizzle?**: It provides TypeScript-first type safety, ensuring that database queries are validated at compile time, reducing runtime errors and SQL injection risks.
*   **Schema Design** (`lib/db.ts`):
    *   **Users**: Linked to Clerk identities with role-based access control (Admin vs User).
    *   **Blog/Projects**: Dynamic content tables that feed both the frontend UI and the AI context.
    *   **Optimization**: Connection pooling is configured (`@neondatabase/serverless`) to handle rapid scaling in a serverless environment without exhausting connection limits.

### 3. AI Chat Integration (RAG-Lite)
The "Boto" chatbot isn't just a wrapper around ChatGPT. It functions as a **Retrieval-Augmented Generation (RAG)** system, albeit simplified.

*   **Dynamic Context Injection**: When a user asks a question, the API route (`app/api/chat/route.ts`) first queries the database for the latest *Projects* and *Blog Posts*.
*   **System Prompting**: This data is injected into a strict "System Prompt." The prompt enforces the persona of "Boto," restricts the scope to professional inquiries only, and provides the AI with the specific "Ground Truth" about Andres's skills.
*   **Safety**: The system prompt explicitly instructs the AI to refuse off-topic queries (e.g., "Write a poem about cats"), ensuring the bot remains a professional representative.

---

## 📚 LMS Curriculum Alignment

This project adheres to the advanced Cyber Security Bootcamp curriculum. The following modules were instrumental in its deployment and configuration:

### Chapter 25: Mini Project - Setup Vercel Storage
*   **Objective**: Configuring persistent storage for dynamic application data.
*   **Reference**: [View Curriculum Entry](https://www.ausbizconsulting.com.au/courses/cybersec-bootcamp/curriculum/680f440741288710ec10e4de)

### Chapter 30: Mini Project - Deploy on Vercel
*   **Objective**: CI/CD pipeline setup and production deployment.
*   **Reference**: [View Curriculum Entry](https://www.ausbizconsulting.com.au/courses/cybersec-bootcamp/curriculum/680f457f41288710ec10e4e3)

### Chapter 35: Mini Project - Configure Custom Domain
*   **Objective**: DNS management and SSL/TLS configuration for production identity.
*   **Reference**: [View Curriculum Entry](https://www.ausbizconsulting.com.au/courses/cybersec-bootcamp/curriculum/680f488241288710ec10e4e8)

---

## 🛡️ Security Plan & Measures

Security is a primary feature of this application, not an afterthought. Below is the breakdown of implemented and planned security controls.

### Current Implementation
1.  **Authentication Readiness**:
    *   Proprietary auth flows are avoided in favor of **Clerk**, which is SOC2 compliant.
    *   Support for **MFA (Multi-Factor Authentication)** is enabled at the provider level.
2.  **Secrets Management**:
    *   Zero hardcoded secrets. All sensitive keys (`OPENAI_API_KEY`, `DATABASE_URL`) are loaded via strict Environment Variables.
    *   Production secrets are injected securely via Vercel's encrypted environment storage.
3.  **Data Validation**:
    *   All API inputs using Drizzle ORM are parameterized, preventing SQL Injection.
    *   Strict TypeScript types enforce data integrity across the full stack.

### Upcoming Security Enhancements (Roadmap)

#### 1. Web Application Firewall (WAF)
We are planning to implement a WAF layered approach:
*   **Vercel Firewall**: To handle DDoS mitigation and IP blocking at the edge.
*   **Arcjet Integration**: We will integrate **Arcjet** directly into the Next.js middleware.
    *   **Bot Protection**: To distinguish between organic users and scrapers/bots.
    *   **Rate Limiting**: To prevent abuse of the expensive OpenAI API routes.
    *   **SQL Injection Detection**: An additional layer of analysis on incoming requests.

#### 2. Logging & Auditing
*   **Centralized Logging**: Future updates will stream application logs to a specialized observer (like Datadog or Axiom) to track anomaly detection in real-time.
*   **Audit Trails**: We will implement specific database tables to log sensitive admin actions (e.g., deleting a blog post or modifying user roles).
