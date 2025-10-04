import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User],
    synchronize: false, // Don't sync, assume schema exists
  });

  await dataSource.initialize();
  console.log('Database connected for seeding.');

  const userRepository = dataSource.getRepository(User);

  // Check if admin already exists
  const existingAdmin = await userRepository.findOne({ where: { email: 'admin@example.com' } });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    await dataSource.destroy();
    return;
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10); // Change password as needed
  const admin = userRepository.create({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567890',
    role: 'admin',
    passwordHash: hashedPassword,
    languagePref: 'en',
  });

  await userRepository.save(admin);
  console.log('Admin user created with email: admin@example.com and password: admin123');

  await dataSource.destroy();
  console.log('Seeding complete.');
}

seed().catch(console.error);
