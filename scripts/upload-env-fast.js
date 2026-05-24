const { execSync } = require('child_process');

const envs = [
  { name: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', value: 'pk_test_YXJyaXZpbmctc2F3Zmx5LTExLmNsZXJrLmFjY291bnRzLmRldiQ' },
  { name: 'CLERK_SECRET_KEY', value: 'sk_test_ptMvleDVVt75JMqnDxfITz78QQqIf5dCE2xID0e0co' },
  { name: 'DATABASE_URL', value: 'postgresql://neondb_owner:npg_zbp1fMm3GRkS@ep-broad-bread-aq03f4xr-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require' },
  { name: 'ADMIN_CLERK_ID', value: 'user_3E9waMNqgoB0eWpq8RTnFuo7KXJ' },
  { name: 'NEXT_PUBLIC_UPI_ID', value: 'dipeshmaindolia@oksbi' },
  { name: 'NEXT_PUBLIC_WHATSAPP_GROUP_URL', value: 'https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw' }
];

console.log("Starting environment variables upload to Vercel (Production Only)...");

for (const env of envs) {
  console.log(`Uploading ${env.name} to production...`);
  try {
    const cmd = `npx vercel env add ${env.name} production --value "${env.value}" --force --yes`;
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to upload ${env.name}:`, err.message);
  }
}

console.log("\nAll environment variables uploaded successfully to Vercel Production!");
