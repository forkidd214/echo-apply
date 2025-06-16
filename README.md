# Echo Apply

A form builder application that helps job seekers collect and organize feedback from potential employers during the application process. Built for personal use to streamline the job application feedback collection process.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **UI**: Radix UI, Shadcn Ui, Embla Carousel
- **Server State**: React Query
- **Forms**: React Hook Form, Zod
- **Features**: Dynamic form builder, response collection

## Getting Started

1. Clone and install dependencies:

   ```bash
   git clone https://github.com/forkidd214/echo-apply.git
   cd echo-apply
   pnpm install
   ```

2. Set up environment variables in `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

## License

MIT
