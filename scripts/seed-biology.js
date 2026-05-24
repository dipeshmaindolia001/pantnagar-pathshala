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

// High-quality Biology questions to pad mock tests to exactly 100 questions
const paddingQuestions = {
  2: [
    {
      groupName: 'Biology',
      questionText: 'Which plant growth regulator is primarily responsible for apical dominance?',
      optionA: 'Gibberellin',
      optionB: 'Auxin',
      optionC: 'Cytokinin',
      optionD: 'Ethylene',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The cell wall of diatoms is silica-rich and forms two thin overlapping shells called:',
      optionA: 'Frustule',
      optionB: 'Capsule',
      optionC: 'Theca',
      optionD: 'Pellicle',
      correctOption: 'A'
    },
    {
      groupName: 'Biology',
      questionText: 'In a double-stranded DNA molecule, if adenine constitutes 30% of the bases, what is the percentage of cytosine?',
      optionA: '20%',
      optionB: '30%',
      optionC: '40%',
      optionD: '70%',
      correctOption: 'A'
    },
    {
      groupName: 'Biology',
      questionText: 'Which structure in a eukaryotic cell is directly involved in ribosomal RNA (rRNA) synthesis?',
      optionA: 'Nucleus',
      optionB: 'Nucleolus',
      optionC: 'Golgi body',
      optionD: 'Lysosome',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The association of a fungus with the roots of higher plants is called:',
      optionA: 'Lichen',
      optionB: 'Mycorrhiza',
      optionC: 'Root nodule',
      optionD: 'Slime mold',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'Which enzyme is responsible for the conversion of glucose-6-phosphate to fructose-6-phosphate in glycolysis?',
      optionA: 'Hexokinase',
      optionB: 'Phosphoglucose isomerase',
      optionC: 'Aldolase',
      optionD: 'Phosphofructokinase',
      correctOption: 'B'
    }
  ],
  3: [
    {
      groupName: 'Biology',
      questionText: 'Who proposed the chromosomal theory of inheritance?',
      optionA: 'Gregor Mendel',
      optionB: 'Sutton and Boveri',
      optionC: 'Watson and Crick',
      optionD: 'T.H. Morgan',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'What is the primary function of the Leydig cells in the human testes?',
      optionA: 'Sperm maturation',
      optionB: 'Synthesis and secretion of androgens (testosterone)',
      optionC: 'Nourishment of spermatids',
      optionD: 'Formation of blood-testis barrier',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The primary carbon dioxide acceptor in C4 plants is:',
      optionA: 'RuBP',
      optionB: 'PEP (Phosphoenolpyruvate)',
      optionC: 'PGA',
      optionD: 'Oxaloacetate',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'Which part of the human ear is primarily responsible for maintaining static and dynamic equilibrium?',
      optionA: 'Cochlea',
      optionB: 'Vestibular apparatus (semicircular canals and otolith organs)',
      optionC: 'Tympanic membrane',
      optionD: 'Eustachian tube',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The phenomenon of "industrial melanism" is an excellent example of:',
      optionA: 'Mutation',
      optionB: 'Natural selection',
      optionC: 'Genetic drift',
      optionD: 'Artificial selection',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'Which antibody class is most abundant in human colostrum?',
      optionA: 'IgG',
      optionB: 'IgA',
      optionC: 'IgM',
      optionD: 'IgE',
      correctOption: 'B'
    }
  ],
  4: [
    {
      groupName: 'Biology',
      questionText: 'What is the primary role of restriction endonucleases in recombinant DNA technology?',
      optionA: 'To join DNA pieces together',
      optionB: 'To cut DNA at specific palindromic recognition sequences',
      optionC: 'To copy DNA strands',
      optionD: 'To translate mRNA into protein',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The type of natural selection that favors intermediate phenotypes and acts against extreme variations is:',
      optionA: 'Directional selection',
      optionB: 'Stabilizing selection',
      optionC: 'Disruptive selection',
      optionD: 'Sexual selection',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'In which region of the chloroplast do the dark reactions (Calvin cycle) of photosynthesis take place?',
      optionA: 'Thylakoid lumen',
      optionB: 'Stroma',
      optionC: 'Grana',
      optionD: 'Inner membrane space',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'Which hormone triggers the release of milk from the mammary glands during lactation?',
      optionA: 'Prolactin',
      optionB: 'Oxytocin',
      optionC: 'Progesterone',
      optionD: 'Estrogen',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The nitrogenous base Thymine is chemically also known as:',
      optionA: '5-Methyluracil',
      optionB: '2-Oxy-4-aminopyrimidine',
      optionC: '6-Aminopurine',
      optionD: '6-Oxypurine',
      correctOption: 'A'
    },
    {
      groupName: 'Biology',
      questionText: 'Which cell organelle is characterized by the presence of rich hydrolytic enzymes active at acidic pH?',
      optionA: 'Peroxisome',
      optionB: 'Lysosome',
      optionC: 'Vacuole',
      optionD: 'Golgi body',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The biological relationship where one species is benefited and the other is neither harmed nor benefited is:',
      optionA: 'Mutualism',
      optionB: 'Commensalism',
      optionC: 'Amensalism',
      optionD: 'Parasitism',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'During DNA replication, Okazaki fragments are joined together by the enzyme:',
      optionA: 'DNA Polymerase I',
      optionB: 'DNA Ligase',
      optionC: 'Helicase',
      optionD: 'Primase',
      correctOption: 'B'
    }
  ],
  5: [
    {
      groupName: 'Biology',
      questionText: 'The process of double fertilization is a unique characteristic of:',
      optionA: 'Gymnosperms',
      optionB: 'Angiosperms',
      optionC: 'Pteridophytes',
      optionD: 'Bryophytes',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'Which plant hormone stimulates cell division and is highly abundant in coconut milk?',
      optionA: 'Auxin',
      optionB: 'Cytokinin',
      optionC: 'Gibberellin',
      optionD: 'Abscisic acid',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The structural and functional unit of the nervous system is the:',
      optionA: 'Nephron',
      optionB: 'Neuron',
      optionC: 'Glia cell',
      optionD: 'Alveolus',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The enzyme RuBisCO is primarily located in which cell type in C4 plants?',
      optionA: 'Mesophyll cells',
      optionB: 'Bundle sheath cells',
      optionC: 'Epidermal cells',
      optionD: 'Guard cells',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The sequence of structural genes in the lac operon is:',
      optionA: 'lacY, lacZ, lacA',
      optionB: 'lacZ, lacY, lacA',
      optionC: 'lacA, lacY, lacZ',
      optionD: 'lacZ, lacA, lacY',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'In human lungs, the exchange of gases occurs across the thin walls of:',
      optionA: 'Bronchioles',
      optionB: 'Alveoli',
      optionC: 'Bronchi',
      optionD: 'Trachea',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The hormone that promotes seed dormancy and is often called the stress hormone in plants is:',
      optionA: 'Auxin',
      optionB: 'Abscisic acid (ABA)',
      optionC: 'Ethylene',
      optionD: 'Gibberellic acid',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'An organism that obtains its nutrition from dead and decaying organic matter is called a:',
      optionA: 'Parasite',
      optionB: 'Saprophyte',
      optionC: 'Autotroph',
      optionD: 'Herbivore',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The cross between an F1 hybrid and its homozygous recessive parent is called a:',
      optionA: 'Monohybrid cross',
      optionB: 'Test cross',
      optionC: 'Back cross',
      optionD: 'Dihybrid cross',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'Which cellular junction facilitates rapid transfer of ions and small molecules between adjacent animal cells?',
      optionA: 'Tight junction',
      optionB: 'Gap junction',
      optionC: 'Adhering junction',
      optionD: 'Desmosome',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The first stable product of carbon fixation in the Calvin cycle (C3 pathway) is:',
      optionA: 'Oxaloacetic acid (OAA)',
      optionB: '3-Phosphoglyceric acid (3-PGA)',
      optionC: 'Phosphoenolpyruvate (PEP)',
      optionD: 'Glyceraldehyde-3-phosphate',
      correctOption: 'B'
    },
    {
      groupName: 'Biology',
      questionText: 'The method of conservation where endangered plants or animals are taken out of their natural habitat and placed in special care is:',
      optionA: 'In situ conservation',
      optionB: 'Ex situ conservation',
      optionC: 'Sacred groves',
      optionD: 'Biosphere reserve',
      correctOption: 'B'
    }
  ]
};

async function seed() {
  const files = [
    { name: 'biology_neet_mock1.txt', mockNumber: 1 },
    { name: 'biology_neet_mock2.txt', mockNumber: 2 },
    { name: 'biology_neet_mock3.txt', mockNumber: 3 },
    { name: 'biology_neet_mock4.txt', mockNumber: 4 },
    { name: 'biology_neet_mock5.txt', mockNumber: 5 },
  ];

  for (const file of files) {
    const filePath = path.join(__dirname, '..', '..', file.name);
    console.log(`\nParsing ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`File ${filePath} does not exist. Skipping.`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    let questions = [];
    
    const lines = content.split('\n');
    let currentQ = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.match(/^Q\d*:\s*(.*)/)) {
        if (currentQ) {
          questions.push(currentQ);
        }
        
        const match = line.match(/^Q\d*:\s*(.*)/);
        currentQ = {
          groupName: 'Biology',
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
          currentQ.questionText += '\n' + line;
        }
      }
    }
    
    if (currentQ) {
      questions.push(currentQ);
    }

    // Filter out invalid questions
    let validQuestions = questions.filter(q => 
      q.questionText && q.optionA && q.optionB && q.optionC && q.optionD && q.correctOption
    );

    console.log(`Parsed ${validQuestions.length} valid questions from file.`);

    // --- EXACT 100 BALANCE LOGIC ---
    if (validQuestions.length > 100) {
      console.log(`Mock ${file.mockNumber} has ${validQuestions.length} questions. Slicing down to exactly 100.`);
      validQuestions = validQuestions.slice(0, 100);
    } else if (validQuestions.length < 100) {
      const needed = 100 - validQuestions.length;
      console.log(`Mock ${file.mockNumber} has ${validQuestions.length} questions. Padding with ${needed} questions to reach exactly 100.`);
      const extras = paddingQuestions[file.mockNumber] || [];
      
      for (let j = 0; j < Math.min(needed, extras.length); j++) {
        const ext = extras[j];
        validQuestions.push({
          groupName: 'Biology',
          mockNumber: file.mockNumber,
          questionText: ext.questionText,
          optionA: ext.optionA,
          optionB: ext.optionB,
          optionC: ext.optionC,
          optionD: ext.optionD,
          correctOption: ext.correctOption
        });
      }
    }

    console.log(`Balanced Mock ${file.mockNumber} has exactly ${validQuestions.length} questions to seed.`);

    // Clear existing questions for this group & mock number to avoid duplicates
    console.log(`Clearing existing Biology Mock ${file.mockNumber} questions...`);
    await sql.query(
      `DELETE FROM questions WHERE group_name = $1 AND mock_number = $2`,
      ['Biology', file.mockNumber]
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
    console.log(`Seeded Biology Mock ${file.mockNumber} successfully!`);
  }
}

seed()
  .then(() => {
    console.log("\nAll Biology mocks balanced and seeded successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("\nError seeding database:", err);
    process.exit(1);
  });
