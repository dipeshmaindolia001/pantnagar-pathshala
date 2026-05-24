const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const result = await sql`
    SELECT group_name as "groupName", mock_number as "mockNumber", COUNT(*) as count 
    FROM questions 
    GROUP BY group_name, mock_number 
    ORDER BY group_name, mock_number
  `;
  console.log("Database Questions Summary:");
  console.table(result);
}

check().catch(console.error);
