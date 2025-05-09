# YouTube Analysis with Supabase

## Environment Variables and Security

This project uses environment variables to manage sensitive credentials:

1. Create a `.env` file in the root directory based on the `.env.example` template
2. Add your actual credentials to the `.env` file
3. Never commit the `.env` file to version control

### For Supabase Functions

For Supabase Edge Functions, you need to set up environment variables differently:

```bash
# Set environment variables for local development
supabase secrets set BRIGHT_DATA_API_KEY=your_api_key

# For production deployment
supabase secrets set --env-file .env --project-ref your-project-ref
```

### Security Best Practices

- Always use environment variables for sensitive information
- Never hardcode credentials in your codebase
- Check your commits for accidentally exposed secrets
- Consider using tools like GitGuardian to monitor for exposed credentials 