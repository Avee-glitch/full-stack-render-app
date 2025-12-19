const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, 'data');

async function seedData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Seed users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);
    
    const users = [
      {
        id: uuidv4(),
        username: 'admin',
        email: 'admin@aiharmwatch.org',
        passwordHash: adminPassword,
        role: 'admin',
        contributionScore: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        username: 'researcher',
        email: 'research@aiharmwatch.org',
        passwordHash: userPassword,
        role: 'contributor',
        contributionScore: 50,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    // Seed cases
    const cases = [
      {
        id: uuidv4(),
        title: 'Algorithmic Bias in Hiring Tools',
        description: 'Major corporations using AI hiring software found to systematically discriminate against women and minorities.',
        detailedDescription: 'A study revealed that AI-powered hiring tools used by Fortune 500 companies were rejecting female candidates at a rate 30% higher than male candidates with similar qualifications. The algorithm was trained on historical hiring data that reflected existing biases.',
        category: 'bias',
        severity: 'high',
        aiSystem: 'Resume screening AI',
        company: 'Multiple tech companies',
        country: 'Global',
        status: 'verified',
        views: 1243,
        upvotes: 89,
        evidenceCount: 5,
        createdBy: users[1].id,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-20T14:20:00Z'
      },
      {
        id: uuidv4(),
        title: 'Deepfake Political Manipulation',
        description: 'State-sponsored deepfake campaigns targeting elections in multiple countries.',
        detailedDescription: 'Government-backed actors used AI-generated videos to spread misinformation during elections. The deepfakes were so convincing that they influenced voter behavior and caused political unrest.',
        category: 'deepfakes',
        severity: 'critical',
        aiSystem: 'Generative Adversarial Networks',
        company: 'State-sponsored groups',
        country: 'Multiple',
        status: 'verified',
        views: 2156,
        upvotes: 156,
        evidenceCount: 8,
        createdBy: users[0].id,
        createdAt: '2024-02-01T09:15:00Z',
        updatedAt: '2024-02-10T11:45:00Z'
      },
      {
        id: uuidv4(),
        title: 'Autonomous Drone Strikes',
        description: 'Documented cases of civilian casualties from AI-powered autonomous weapons systems.',
        detailedDescription: 'Military drones equipped with AI target recognition systems misidentified civilians as combatants, resulting in multiple civilian casualties. The AI system had a 15% false positive rate in combat zones.',
        category: 'weapons',
        severity: 'critical',
        aiSystem: 'Computer vision AI',
        company: 'Defense contractors',
        country: 'Conflict zones',
        status: 'verified',
        views: 1872,
        upvotes: 203,
        evidenceCount: 12,
        createdBy: users[1].id,
        createdAt: '2024-01-25T14:30:00Z',
        updatedAt: '2024-02-05T16:20:00Z'
      },
      {
        id: uuidv4(),
        title: 'Surveillance Overreach in Smart Cities',
        description: 'Facial recognition systems used for mass surveillance without public consent.',
        detailedDescription: 'Cities implementing "smart city" technology are using facial recognition to track citizens movements without proper oversight or consent. The data is being shared with private companies and used for predictive policing.',
        category: 'surveillance',
        severity: 'high',
        aiSystem: 'Facial recognition AI',
        company: 'Multiple surveillance tech firms',
        country: 'Various',
        status: 'pending',
        views: 932,
        upvotes: 67,
        evidenceCount: 3,
        createdBy: users[0].id,
        createdAt: '2024-02-15T08:45:00Z',
        updatedAt: '2024-02-15T08:45:00Z'
      }
    ];
    
    // Seed evidence
    const evidence = [
      {
        id: uuidv4(),
        caseId: cases[0].id,
        title: 'Research paper on hiring bias',
        description: 'Academic study demonstrating systematic bias in AI hiring tools',
        type: 'document',
        url: 'https://example.com/research-paper.pdf',
        uploaderId: users[1].id,
        verificationStatus: 'verified',
        createdAt: '2024-01-16T11:20:00Z'
      },
      {
        id: uuidv4(),
        caseId: cases[1].id,
        title: 'Deepfake analysis report',
        description: 'Technical analysis of the deepfake videos used in elections',
        type: 'analysis',
        url: 'https://example.com/deepfake-analysis.pdf',
        uploaderId: users[0].id,
        verificationStatus: 'verified',
        createdAt: '2024-02-02T10:15:00Z'
      }
    ];
    
    // Write data to files
    await fs.writeFile(
      path.join(DATA_DIR, 'users.json'),
      JSON.stringify(users, null, 2)
    );
    
    await fs.writeFile(
      path.join(DATA_DIR, 'cases.json'),
      JSON.stringify(cases, null, 2)
    );
    
    await fs.writeFile(
      path.join(DATA_DIR, 'evidence.json'),
      JSON.stringify(evidence, null, 2)
    );
    
    console.log('✅ Data seeded successfully!');
    console.log(`📁 Created ${users.length} users`);
    console.log(`📁 Created ${cases.length} cases`);
    console.log(`📁 Created ${evidence.length} evidence items`);
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData };
