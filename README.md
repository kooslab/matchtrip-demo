# MatchTrip Demo

A travel platform that connects travelers with local guides using AI-powered journey planning.

## Features

- AI-powered journey planning using OpenAI GPT-3.5
- Role-based interface (Traveler/Guide)
- Journey proposal system
- Payment integration with Toss Payments
- Supabase backend

## Tech Stack

- SvelteKit v2
- TailwindCSS
- Supabase
- OpenAI API
- Toss Payments

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Set up Supabase:

   - Create a new Supabase project
   - Run the following SQL in the SQL editor:

   ```sql
   -- Create journeys table
   create table journeys (
     id uuid default uuid_generate_v4() primary key,
     city text not null,
     days integer not null,
     keywords text not null,
     journey_details text not null,
     status text not null default 'pending',
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Create proposals table
   create table proposals (
     id uuid default uuid_generate_v4() primary key,
     journey_id uuid references journeys(id) not null,
     message text not null,
     cost decimal not null,
     status text not null default 'pending',
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

## Usage

1. As a Traveler:

   - Enter your destination city (default: Berlin)
   - Specify the number of days
   - Add keywords for your interests
   - Generate and select a journey option
   - Submit your journey request

2. As a Guide:

   - Switch to Guide mode
   - Browse available journey requests
   - Select a journey and submit a proposal
   - Include your message and proposed cost

3. Payment:
   - After accepting a proposal, proceed with payment
   - Use the test card number: 4242 4242 4242 4242
   - Any future date for expiry
   - Any 3-digit CVC

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm check` - Type-check the project
- `pnpm lint` - Lint the project
- `pnpm format` - Format the project
