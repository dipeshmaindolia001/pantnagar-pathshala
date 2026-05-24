const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

// High-quality Biology questions to pad mock tests to exactly 100 questions
const bioPadding = {
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

// High-quality Chemistry questions to pad Mock 1 from 91 to 100
const chemPadding = [
  {
    groupName: 'Chemistry',
    questionText: 'Which of the following has the highest electronegativity on the Pauling scale?',
    optionA: 'Oxygen',
    optionB: 'Fluorine',
    optionC: 'Chlorine',
    optionD: 'Nitrogen',
    correctOption: 'B'
  },
  {
    groupName: 'Chemistry',
    questionText: 'The geometry of XeF4 molecule according to VSEPR theory is:',
    optionA: 'Tetrahedral',
    optionB: 'Square planar',
    optionC: 'Octahedral',
    optionD: 'Trigonal bipyramidal',
    correctOption: 'B'
  },
  {
    groupName: 'Chemistry',
    questionText: 'Which of the following is a sink for carbon monoxide (CO) in nature?',
    optionA: 'Microorganisms present in the soil',
    optionB: 'Oceans',
    optionC: 'Plants',
    optionD: 'Hemoglobin',
    correctOption: 'A'
  },
  {
    groupName: 'Chemistry',
    questionText: 'The rate constant of a first-order reaction depends on:',
    optionA: 'Concentration of reactant',
    optionB: 'Time',
    optionC: 'Temperature',
    optionD: 'Extent of reaction',
    correctOption: 'C'
  },
  {
    groupName: 'Chemistry',
    questionText: 'Which of the following ligands is a didentate ligand?',
    optionA: 'Ethylenediamine',
    optionB: 'EDTA',
    optionC: 'Ammonia',
    optionD: 'Pyridine',
    correctOption: 'A'
  },
  {
    groupName: 'Chemistry',
    questionText: 'Which of the following compounds will undergo Aldol condensation?',
    optionA: 'Formaldehyde',
    optionB: 'Benzaldehyde',
    optionC: 'Acetaldehyde',
    optionD: 'Benzophenone',
    correctOption: 'C'
  },
  {
    groupName: 'Chemistry',
    questionText: 'What is the oxidation state of the central iron atom in potassium ferrocyanide, K4[Fe(CN)6]?',
    optionA: '+2',
    optionB: '+3',
    optionC: '+4',
    optionD: '0',
    correctOption: 'A'
  },
  {
    groupName: 'Chemistry',
    questionText: 'The monomer of natural rubber is:',
    optionA: 'Neoprene',
    optionB: 'Isoprene',
    optionC: 'Chloroprene',
    optionD: 'Butadiene',
    correctOption: 'B'
  },
  {
    groupName: 'Chemistry',
    questionText: 'Which of the following is an example of an amphoteric oxide?',
    optionA: 'Na2O',
    optionB: 'Cl2O7',
    optionC: 'Al2O3',
    optionD: 'SO2',
    correctOption: 'C'
  }
];

async function balanceSubject(subjectName) {
  console.log(`\n========================================`);
  console.log(`Balancing questions for subject: ${subjectName}`);
  console.log(`========================================`);

  for (let mockNumber = 1; mockNumber <= 5; mockNumber++) {
    // 1. Fetch current questions
    const res = await sql`
      SELECT id, group_name as "groupName", mock_number as "mockNumber", 
             question_text as "questionText", option_a as "optionA", 
             option_b as "optionB", option_c as "optionC", 
             option_d as "optionD", correct_option as "correctOption"
      FROM questions
      WHERE group_name = ${subjectName} AND mock_number = ${mockNumber}
      ORDER BY id ASC
    `;

    console.log(`\n[${subjectName} Mock ${mockNumber}] Current question count in DB: ${res.length}`);

    let balancedList = [...res];

    if (res.length > 100) {
      console.log(`--> Excess detected (${res.length} > 100). Truncating to first 100 questions.`);
      balancedList = balancedList.slice(0, 100);
    } else if (res.length < 100) {
      const needed = 100 - res.length;
      console.log(`--> Deficiency detected (${res.length} < 100). Padding with ${needed} questions.`);
      
      let paddingSource = [];
      if (subjectName === 'Biology') {
        paddingSource = bioPadding[mockNumber] || [];
      } else if (subjectName === 'Chemistry' && mockNumber === 1) {
        paddingSource = chemPadding;
      }

      if (paddingSource.length < needed) {
        console.error(`ERROR: Not enough padding questions for ${subjectName} Mock ${mockNumber}! Needed ${needed}, got ${paddingSource.length}`);
        process.exit(1);
      }

      for (let j = 0; j < needed; j++) {
        const item = paddingSource[j];
        balancedList.push({
          groupName: subjectName,
          mockNumber: mockNumber,
          questionText: item.questionText,
          optionA: item.optionA,
          optionB: item.optionB,
          optionC: item.optionC,
          optionD: item.optionD,
          correctOption: item.correctOption
        });
      }
    } else {
      console.log(`--> Already balanced! Mock ${mockNumber} has exactly 100 questions.`);
      continue; // No DB mutation needed
    }

    // Double check size
    if (balancedList.length !== 100) {
      console.error(`CRITICAL ERROR: Failed to balance to 100 questions. Target size was: ${balancedList.length}`);
      process.exit(1);
    }

    // 2. Perform DB Updates (Delete and Re-insert)
    console.log(`--> Re-seeding balanced ${subjectName} Mock ${mockNumber}...`);
    
    // Delete
    await sql`
      DELETE FROM questions 
      WHERE group_name = ${subjectName} AND mock_number = ${mockNumber}
    `;

    // Re-insert in chunk of 50
    const CHUNK_SIZE = 50;
    for (let i = 0; i < balancedList.length; i += CHUNK_SIZE) {
      const chunk = balancedList.slice(i, i + CHUNK_SIZE);
      await Promise.all(chunk.map(q => 
        sql`
          INSERT INTO questions (group_name, mock_number, question_text, option_a, option_b, option_c, option_d, correct_option) 
          VALUES (${q.groupName}, ${q.mockNumber}, ${q.questionText}, ${q.optionA}, ${q.optionB}, ${q.optionC}, ${q.optionD}, ${q.correctOption})
        `
      ));
    }
    console.log(`--> Seeding complete! ${subjectName} Mock ${mockNumber} now has exactly 100 questions.`);
  }
}

async function run() {
  await balanceSubject('Biology');
  await balanceSubject('Chemistry');
  await balanceSubject('Physics');
  console.log(`\n========================================`);
  console.log(`SUCCESS: All subjects balanced to exactly 500 questions total!`);
  console.log(`========================================`);
}

run()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("Error during balancing:", err);
    process.exit(1);
  });
