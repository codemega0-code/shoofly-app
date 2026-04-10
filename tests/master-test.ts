import { execSync } from 'child_process';
import { prisma } from '../lib/prisma';
import 'dotenv/config';

const testsToRun = [
  { name: 'Database Connectivity', file: 'tests/test-db.ts' },
  { name: 'Core Simulation', file: 'tests/simulation.ts' },
  { name: 'Security Stress Test', file: 'tests/stress-test.ts' },
  { name: 'Ultimate Lifecycle', file: 'tests/ultimate-test.ts' },
  { name: 'Chat System', file: 'tests/chat-test.ts' },
  { name: 'Treasury & Ledger', file: 'tests/treasury-test.ts' }
];

async function runAllTests() {
  console.log('===================================================');
  console.log('🚀 INITIATING MASTER TEST SUITE VALIDATION');
  console.log('===================================================\n');

  let passed = 0;
  let failed = 0;

  for (const test of testsToRun) {
    console.log(`\n▶️ RUNNING: ${test.name} (${test.file})...`);
    try {
      // Use tsx to run the typescript files directly
      execSync(`npx tsx ${test.file}`, { stdio: 'inherit', cwd: process.cwd() });
      console.log(`✅ PASSED: ${test.name}\n`);
      passed++;
    } catch (error) {
      console.error(`❌ FAILED: ${test.name} encountered an error.\n`);
      failed++;
      break; // Stop on first failure to investigate
    }
  }

  console.log('===================================================');
  console.log(`📊 MASTER TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log('===================================================');

  await prisma.$disconnect();
  
  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests();
