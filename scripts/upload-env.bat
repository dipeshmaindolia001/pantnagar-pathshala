@echo off
echo Uploading NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY...
call npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --value "pk_test_YXJyaXZpbmctc2F3Zmx5LTExLmNsZXJrLmFjY291bnRzLmRldiQ" --force --yes

echo Uploading CLERK_SECRET_KEY...
call npx vercel env add CLERK_SECRET_KEY production --value "sk_test_ptMvleDVVt75JMqnDxfITz78QQqIf5dCE2xID0e0co" --force --yes

echo Uploading DATABASE_URL...
call npx vercel env add DATABASE_URL production --value "postgresql://neondb_owner:npg_zbp1fMm3GRkS@ep-broad-bread-aq03f4xr-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require" --force --yes

echo Uploading ADMIN_CLERK_ID...
call npx vercel env add ADMIN_CLERK_ID production --value "user_3E9waMNqgoB0eWpq8RTnFuo7KXJ" --force --yes

echo Uploading NEXT_PUBLIC_UPI_ID...
call npx vercel env add NEXT_PUBLIC_UPI_ID production --value "dipeshmaindolia@oksbi" --force --yes

echo Uploading NEXT_PUBLIC_WHATSAPP_GROUP_URL...
call npx vercel env add NEXT_PUBLIC_WHATSAPP_GROUP_URL production --value "https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw" --force --yes

echo Done!
