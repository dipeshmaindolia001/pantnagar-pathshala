# Upload Environment Variables to Vercel
Write-Host "Uploading Clerk Publishable Key..."
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --value "pk_test_YXJyaXZpbmctc2F3Zmx5LTExLmNsZXJrLmFjY291bnRzLmRldiQ" --yes
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY preview --value "pk_test_YXJyaXZpbmctc2F3Zmx5LTExLmNsZXJrLmFjY291bnRzLmRldiQ" --yes
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY development --value "pk_test_YXJyaXZpbmctc2F3Zmx5LTExLmNsZXJrLmFjY291bnRzLmRldiQ" --yes

Write-Host "Uploading Clerk Secret Key..."
npx vercel env add CLERK_SECRET_KEY production --value "sk_test_ptMvleDVVt75JMqnDxfITz78QQqIf5dCE2xID0e0co" --yes
npx vercel env add CLERK_SECRET_KEY preview --value "sk_test_ptMvleDVVt75JMqnDxfITz78QQqIf5dCE2xID0e0co" --yes
npx vercel env add CLERK_SECRET_KEY development --value "sk_test_ptMvleDVVt75JMqnDxfITz78QQqIf5dCE2xID0e0co" --yes

Write-Host "Uploading Database URL..."
npx vercel env add DATABASE_URL production --value "postgresql://neondb_owner:npg_zbp1fMm3GRkS@ep-broad-bread-aq03f4xr-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require" --yes
npx vercel env add DATABASE_URL preview --value "postgresql://neondb_owner:npg_zbp1fMm3GRkS@ep-broad-bread-aq03f4xr-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require" --yes
npx vercel env add DATABASE_URL development --value "postgresql://neondb_owner:npg_zbp1fMm3GRkS@ep-broad-bread-aq03f4xr-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require" --yes

Write-Host "Uploading Admin Clerk ID..."
npx vercel env add ADMIN_CLERK_ID production --value "user_3E9waMNqgoB0eWpq8RTnFuo7KXJ" --yes
npx vercel env add ADMIN_CLERK_ID preview --value "user_3E9waMNqgoB0eWpq8RTnFuo7KXJ" --yes
npx vercel env add ADMIN_CLERK_ID development --value "user_3E9waMNqgoB0eWpq8RTnFuo7KXJ" --yes

Write-Host "Uploading UPI ID..."
npx vercel env add NEXT_PUBLIC_UPI_ID production --value "dipeshmaindolia@oksbi" --yes
npx vercel env add NEXT_PUBLIC_UPI_ID preview --value "dipeshmaindolia@oksbi" --yes
npx vercel env add NEXT_PUBLIC_UPI_ID development --value "dipeshmaindolia@oksbi" --yes

Write-Host "Uploading WhatsApp Group URL..."
npx vercel env add NEXT_PUBLIC_WHATSAPP_GROUP_URL production --value "https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw" --yes
npx vercel env add NEXT_PUBLIC_WHATSAPP_GROUP_URL preview --value "https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw" --yes
npx vercel env add NEXT_PUBLIC_WHATSAPP_GROUP_URL development --value "https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw" --yes

Write-Host "All Environment Variables Uploaded Successfully!"
