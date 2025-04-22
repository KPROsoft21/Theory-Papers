# Theory Papers

A platform for sharing and discovering theories and papers in any field, featuring a black and white paintbrush theme with typewriter-style text.

## Features

- **User Authentication**: Register, login, and manage your profile
- **Post Theories**: Share your theories and papers with the community
- **Browse Content**: Discover theories and papers from other writers
- **Search Functionality**: Find content by topics, papers, writers, and fields
- **Sorting & Filtering**: Organize content by recency, popularity, or field
- **Follow Writers**: Keep up with your favorite content creators
- **Messaging System**: Communicate directly with other writers

## Design Elements

- Black and white paintbrush theme
- Typewriter-style text (Space Mono font)
- Minimalist UI with paintbrush stroke accents
- Responsive design for all devices

## Technology Stack

- **Frontend**: Next.js with React and TypeScript
- **Styling**: Tailwind CSS
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Workers

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database:
   ```
   wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Deployment

The application is deployed at: https://lzkzkxzn.manus.space

## Project Structure

- `src/app`: Next.js pages and API routes
- `src/app/components`: UI components
- `src/lib`: Utility functions and database operations
- `migrations`: Database schema and sample data
- `public`: Static assets including paintbrush SVGs

## License

This project is for demonstration purposes.
