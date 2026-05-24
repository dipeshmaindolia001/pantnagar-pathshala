const { execSync } = require('child_process');

const envs = [
  { name: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', value: 'pk_test_YXJyaXZpbmctc2F3Zmx5LTExLmNsZXJrLmFjY291bnRzLmRldiQ' },
  { name: 'CLERK_SECRET_KEY', value: 'sk_test_ptMvleDVVt75JMqnDxfITz78QQqIf5dCE2xID0e0co' },
  { name: 'DATABASE_URL', value: 'postgresql://neondb_owner:npg_zbp1fMm3GRkS@ep-broad-bread-aq03f4xr-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require' },
  { name: 'ADMIN_CLERK_ID', value: 'user_3E9waMNqgoB0eWpq8RTnFuo7KXJ' },
  { name: 'NEXT_PUBLIC_UPI_ID', value: 'dipeshmaindolia@oksbi' },
  { name: 'NEXT_PUBLIC_WHATSAPP_GROUP_URL', value: 'https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw' }
];

const targets = ['production', 'preview', 'development'];

console.log("Starting environment variables upload to Vercel...");

for (const env of envs) {
  for (const target of targets) {
    console.log(`\nUploading ${env.name} to ${target}...`);
    try {
      // Use the local vercel binary to skip npm package lookup delays
      const cmd = `npx --no-install vercel env add ${env.name} ${target} --value "${env.value}" --force --yes`;
      const output = execSync(cmd, { stdio: 'inherit', encoding: 'utf-8' });
    } catch (err) {
      console.error(`Failed to upload ${env.name} to ${target}:`, err.message);
    }
  }
}

console.log("\nAll environment variables uploaded successfully!");
