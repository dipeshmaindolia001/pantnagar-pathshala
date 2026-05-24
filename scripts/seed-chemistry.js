const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  const files = [
    { name: 'chemistry_neet_mock1.txt', mockNumber: 1 },
    { name: 'chemistry_neet_mock2.txt', mockNumber: 2 },
    { name: 'chemistry_neet_mock3.txt', mockNumber: 3 },
    { name: 'chemistry_neet_mock4.txt', mockNumber: 4 },
    { name: 'chemistry_neet_mock5.txt', mockNumber: 5 },
  ];

  for (const file of files) {
    // The TXT files are in the parent directory (d:\Mock)
    const filePath = path.join(__dirname, '..', '..', file.name);
    console.log(`\nParsing ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`File ${filePath} does not exist. Skipping.`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const questions = [];
    
    const lines = content.split('\n');
    let currentQ = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Match both 'Q: ' and 'Q1: ' or similar formats
      if (line.match(/^Q\d*:\s*(.*)/)) {
        if (currentQ) {
          questions.push(currentQ);
        }
        
        const match = line.match(/^Q\d*:\s*(.*)/);
        currentQ = {
          groupName: 'Chemistry',
          mockNumber: file.mockNumber,
          questionText: match ? match[1].trim() : line,
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctOption: ''
        };
      } else if (currentQ) {
        if (line.startsWith('A)')) {
          currentQ.optionA = line.substring(2).trim();
        } else if (line.startsWith('B)')) {
          currentQ.optionB = line.substring(2).trim();
        } else if (line.startsWith('C)')) {
          currentQ.optionC = line.substring(2).trim();
        } else if (line.startsWith('D)')) {
          currentQ.optionD = line.substring(2).trim();
        } else if (line.startsWith('Correct:')) {
          currentQ.correctOption = line.replace('Correct:', '').trim();
        } else if (line !== '' && !line.startsWith('[Group:') && !line.startsWith('===') && !line.startsWith('END')) {
          // Append to question text if it spans multiple lines
          currentQ.questionText += '\n' + line;
        }
      }
    }
    
    if (currentQ) {
      questions.push(currentQ);
    }

    // Filter out invalid questions (must have text, options and correct answer)
    const validQuestions = questions.filter(q => 
      q.questionText && q.optionA && q.optionB && q.optionC && q.optionD && q.correctOption
    );

    console.log(`Parsed ${validQuestions.length} valid questions out of ${questions.length} total from ${file.name}`);

    if (validQuestions.length === 0) {
      console.warn("No valid questions found, skipping database insert.");
      continue;
    }

    // Clear existing questions for this group & mock number to avoid duplicates
    console.log(`Clearing existing Chemistry Mock ${file.mockNumber} questions...`);
    await sql.query(
      `DELETE FROM questions WHERE group_name = $1 AND mock_number = $2`,
      ['Chemistry', file.mockNumber]
    );

    // Insert into DB in chunks using Promise.all for fast parallel execution
    const CHUNK_SIZE = 50;
    for (let i = 0; i < validQuestions.length; i += CHUNK_SIZE) {
      const chunk = validQuestions.slice(i, i + CHUNK_SIZE);
      console.log(`Inserting chunk ${i / CHUNK_SIZE + 1} of ${Math.ceil(validQuestions.length / CHUNK_SIZE)}...`);
      
      await Promise.all(chunk.map(q => 
        sql.query(
          `INSERT INTO questions (group_name, mock_number, question_text, option_a, option_b, option_c, option_d, correct_option) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [q.groupName, q.mockNumber, q.questionText, q.optionA, q.optionB, q.optionC, q.optionD, q.correctOption]
        )
      ));
    }
    console.log(`Seeded Chemistry Mock ${file.mockNumber} successfully!`);
  }
}

seed()
  .then(() => {
    console.log("\nAll Chemistry mocks seeded successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("\nError seeding database:", err);
    process.exit(1);
  });
