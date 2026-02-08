const mongoose = require('mongoose');
require('dotenv').config();

// Models
const User = require('./src/models/User');
const Note = require('./src/models/Note');
const Bookmark = require('./src/models/Bookmark');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Dummy Users - REMOVED manual hashing
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'  // Plain password - model will hash it
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  },
  {
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'demo123'
  }
];

// Dummy Notes
const notesData = [
  {
    title: 'Meeting Notes - Q1 Planning',
    content: 'Discussed Q1 goals and objectives. Key focus areas: product development, marketing strategy, and team expansion. Action items: finalize budget by end of month, hire 2 new developers, launch new feature by March.',
    tags: ['work', 'meeting', 'planning'],
    isFavorite: true
  },
  {
    title: 'Project Ideas',
    content: 'Ideas for side projects: 1) A task management app with AI suggestions, 2) Personal finance tracker with budget alerts, 3) Recipe sharing social platform, 4) Fitness challenge app with friends.',
    tags: ['ideas', 'projects', 'inspiration'],
    isFavorite: false
  },
  {
    title: 'Book Summary: Atomic Habits',
    content: 'Key takeaways from Atomic Habits by James Clear: Make it obvious, make it attractive, make it easy, make it satisfying. The compound effect of small habits. Identity-based habits are more powerful than outcome-based habits.',
    tags: ['books', 'self-improvement', 'notes'],
    isFavorite: true
  },
  {
    title: 'Grocery List',
    content: 'Weekly groceries: Milk, eggs, bread, chicken breast, vegetables (broccoli, carrots, spinach), fruits (apples, bananas, oranges), pasta, rice, olive oil, coffee, yogurt.',
    tags: ['personal', 'shopping', 'food'],
    isFavorite: false
  },
  {
    title: 'JavaScript Tips & Tricks',
    content: 'Useful JavaScript tips: 1) Use destructuring for cleaner code, 2) Optional chaining (?.) for safe property access, 3) Nullish coalescing (??) for default values, 4) Array methods like map, filter, reduce, 5) Async/await for better promise handling.',
    tags: ['coding', 'javascript', 'tips'],
    isFavorite: true
  },
  {
    title: 'Travel Plans - Japan 2024',
    content: 'Planning trip to Japan: Visit Tokyo (Shibuya, Akihabara, Senso-ji), Kyoto (temples and gardens), Osaka (street food), Mount Fuji. Duration: 10 days. Best time: Spring for cherry blossoms. Budget: $3000-4000.',
    tags: ['travel', 'planning', 'personal'],
    isFavorite: true
  },
  {
    title: 'Workout Routine',
    content: 'Weekly workout plan: Monday - Chest & Triceps, Tuesday - Back & Biceps, Wednesday - Rest/Cardio, Thursday - Legs & Shoulders, Friday - Full body, Weekend - Rest or light activity. 30 mins cardio daily.',
    tags: ['fitness', 'health', 'routine'],
    isFavorite: false
  },
  {
    title: 'Recipe: Perfect Pasta Carbonara',
    content: 'Ingredients: Spaghetti, eggs, Parmesan cheese, guanciale/pancetta, black pepper. Steps: Cook pasta al dente. Crisp guanciale. Mix eggs and cheese. Combine with pasta off heat. Add pasta water if needed. Season with pepper.',
    tags: ['cooking', 'recipes', 'italian'],
    isFavorite: true
  },
  {
    title: 'Birthday Gift Ideas',
    content: 'Gift ideas for Mom\'s birthday: 1) Spa day voucher, 2) Personalized jewelry, 3) Kindle with book collection, 4) Cooking class experience, 5) Garden tools set, 6) Photo album of family memories.',
    tags: ['personal', 'gifts', 'family'],
    isFavorite: false
  },
  {
    title: 'Learning Goals 2024',
    content: 'Skills to learn this year: 1) TypeScript for better type safety, 2) Docker and Kubernetes for deployment, 3) System design principles, 4) Machine learning basics, 5) Spanish language (intermediate level).',
    tags: ['learning', 'goals', 'self-improvement'],
    isFavorite: true
  },
  {
    title: 'Home Improvement Tasks',
    content: 'Things to fix/improve: Paint living room (beige color), Fix leaky faucet in bathroom, Install new curtains, Organize garage, Replace air filters, Clean gutters, Plant flowers in front yard.',
    tags: ['home', 'tasks', 'maintenance'],
    isFavorite: false
  },
  {
    title: 'Movie Watchlist',
    content: 'Movies to watch: Oppenheimer, The Holdovers, Past Lives, Killers of the Flower Moon, Poor Things, Anatomy of a Fall, Godzilla Minus One, The Boy and the Heron. Track progress on IMDb.',
    tags: ['entertainment', 'movies', 'watchlist'],
    isFavorite: false
  },
  {
    title: 'Budget Planning March 2024',
    content: 'Monthly budget breakdown: Rent $1200, Groceries $400, Utilities $150, Transportation $200, Entertainment $150, Savings $500, Miscellaneous $200. Total income: $3500. Need to cut entertainment to save more.',
    tags: ['finance', 'budget', 'planning'],
    isFavorite: true
  },
  {
    title: 'Inspirational Quotes',
    content: 'Quotes to remember: "The only way to do great work is to love what you do" - Steve Jobs. "Success is not final, failure is not fatal" - Churchill. "Be yourself; everyone else is already taken" - Oscar Wilde.',
    tags: ['inspiration', 'quotes', 'motivation'],
    isFavorite: true
  },
  {
    title: 'Client Meeting Notes - Tech Corp',
    content: 'Meeting with Tech Corp on Feb 5th. Requirements: Redesign landing page, improve mobile responsiveness, integrate payment gateway, add user analytics. Timeline: 6 weeks. Budget: $15,000. Next meeting: Feb 20th.',
    tags: ['work', 'client', 'meeting'],
    isFavorite: false
  },
  {
    title: 'Morning Routine Checklist',
    content: 'Daily morning routine: Wake up 6:30 AM, Drink water, 10 min meditation, 20 min exercise, Shower, Healthy breakfast, Review daily goals, Check emails, Start work by 9 AM. Consistency is key!',
    tags: ['routine', 'productivity', 'health'],
    isFavorite: true
  },
  {
    title: 'Photography Tips',
    content: 'Photography basics: Rule of thirds for composition, Golden hour for best lighting, Use leading lines, Experiment with perspectives, Focus on eyes in portraits, Edit subtly, Practice daily, Study great photographers.',
    tags: ['photography', 'hobbies', 'tips'],
    isFavorite: false
  },
  {
    title: 'Gardening Notes - Spring',
    content: 'Spring gardening tasks: Start seeds indoors in March, Prepare soil with compost, Plant tomatoes after last frost, Prune roses, Mulch flower beds, Set up drip irrigation, Plant herbs (basil, cilantro, mint).',
    tags: ['gardening', 'hobbies', 'spring'],
    isFavorite: false
  },
  {
    title: 'Side Business Ideas',
    content: 'Potential side hustles: 1) Freelance web development, 2) Online tutoring in programming, 3) Create and sell Notion templates, 4) Start a tech blog with affiliate marketing, 5) Develop mobile apps.',
    tags: ['business', 'ideas', 'entrepreneurship'],
    isFavorite: true
  },
  {
    title: 'Random Thoughts',
    content: 'Sometimes the best ideas come when you\'re not actively thinking about them. Take walks without phone. Let mind wander. Write things down immediately. Creativity needs space. Don\'t fill every moment with content.',
    tags: ['thoughts', 'philosophy', 'personal'],
    isFavorite: false
  }
];

// Dummy Bookmarks
const bookmarksData = [
  {
    url: 'https://github.com',
    title: 'GitHub: Where the world builds software',
    description: 'GitHub is where over 100 million developers shape the future of software, together.',
    tags: ['development', 'coding', 'tools'],
    isFavorite: true
  },
  {
    url: 'https://stackoverflow.com',
    title: 'Stack Overflow - Where Developers Learn & Share',
    description: 'The largest online community for programmers to learn, share their knowledge, and build their careers.',
    tags: ['development', 'coding', 'help'],
    isFavorite: true
  },
  {
    url: 'https://developer.mozilla.org',
    title: 'MDN Web Docs',
    description: 'Resources for developers, by developers. Complete documentation for web technologies including HTML, CSS, and JavaScript.',
    tags: ['documentation', 'web', 'learning'],
    isFavorite: true
  },
  {
    url: 'https://tailwindcss.com',
    title: 'Tailwind CSS - Rapidly build modern websites',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    tags: ['css', 'design', 'tools'],
    isFavorite: false
  },
  {
    url: 'https://react.dev',
    title: 'React - The library for web and native user interfaces',
    description: 'A JavaScript library for building user interfaces. Learn once, write anywhere.',
    tags: ['javascript', 'framework', 'frontend'],
    isFavorite: true
  },
  {
    url: 'https://nodejs.org',
    title: 'Node.js',
    description: 'Node.js is an open-source, cross-platform JavaScript runtime environment.',
    tags: ['javascript', 'backend', 'runtime'],
    isFavorite: false
  },
  {
    url: 'https://www.mongodb.com',
    title: 'MongoDB: The Developer Data Platform',
    description: 'Build faster and build smarter with a developer data platform built on the leading modern database.',
    tags: ['database', 'backend', 'nosql'],
    isFavorite: false
  },
  {
    url: 'https://vercel.com',
    title: 'Vercel: Build and deploy the best web experiences',
    description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.',
    tags: ['hosting', 'deployment', 'tools'],
    isFavorite: true
  },
  {
    url: 'https://www.figma.com',
    title: 'Figma: The collaborative interface design tool',
    description: 'Build better products as a team. Design, prototype, and gather feedback all in one place.',
    tags: ['design', 'tools', 'ui-ux'],
    isFavorite: true
  },
  {
    url: 'https://www.youtube.com/c/TraversyMedia',
    title: 'Traversy Media - YouTube',
    description: 'Web development tutorials and courses. Learn HTML, CSS, JavaScript, React, Node.js and more.',
    tags: ['learning', 'tutorials', 'videos'],
    isFavorite: true
  },
  {
    url: 'https://css-tricks.com',
    title: 'CSS-Tricks',
    description: 'Daily articles about CSS, HTML, JavaScript, and all things related to web design and development.',
    tags: ['css', 'web', 'tutorials'],
    isFavorite: false
  },
  {
    url: 'https://www.freecodecamp.org',
    title: 'freeCodeCamp.org',
    description: 'Learn to code for free. Build projects. Earn certifications.',
    tags: ['learning', 'coding', 'free'],
    isFavorite: true
  },
  {
    url: 'https://dribbble.com',
    title: 'Dribbble - Discover the World\'s Top Designers',
    description: 'Find top designers & creative professionals on Dribbble. We are where designers gain inspiration, feedback, and jobs.',
    tags: ['design', 'inspiration', 'portfolio'],
    isFavorite: false
  },
  {
    url: 'https://www.awwwards.com',
    title: 'Awwwards - Website Awards - Best Web Design Trends',
    description: 'Awwwards are the Website Awards that recognize and promote the talent and effort of the best developers, designers and web agencies.',
    tags: ['design', 'inspiration', 'web'],
    isFavorite: false
  },
  {
    url: 'https://dev.to',
    title: 'DEV Community',
    description: 'A constructive and inclusive social network for software developers. With you every step of your journey.',
    tags: ['community', 'coding', 'blog'],
    isFavorite: false
  },
  {
    url: 'https://www.producthunt.com',
    title: 'Product Hunt - The best new products in tech',
    description: 'Product Hunt is a curation of the best new products, every day. Discover the latest mobile apps, websites, and technology.',
    tags: ['products', 'tech', 'startup'],
    isFavorite: true
  },
  {
    url: 'https://www.notion.so',
    title: 'Notion - The all-in-one workspace',
    description: 'Write, plan, collaborate, and get organized. Notion is all you need — in one tool.',
    tags: ['productivity', 'tools', 'organization'],
    isFavorite: true
  },
  {
    url: 'https://roadmap.sh',
    title: 'Developer Roadmaps',
    description: 'Community driven roadmaps, articles and resources for developers.',
    tags: ['learning', 'career', 'roadmap'],
    isFavorite: true
  },
  {
    url: 'https://www.udemy.com',
    title: 'Udemy - Online Courses',
    description: 'Learn new skills with online courses. Choose from 213,000+ online video courses.',
    tags: ['learning', 'courses', 'education'],
    isFavorite: false
  },
  {
    url: 'https://codepen.io',
    title: 'CodePen: Online Code Editor and Frontend Web Developer Community',
    description: 'An online code editor, learning environment, and community for front-end web development.',
    tags: ['coding', 'tools', 'frontend'],
    isFavorite: false
  }
];

// Seed Function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Note.deleteMany({});
    await Bookmark.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create Users - Let the model handle password hashing
    console.log('👤 Creating users...');
    const createdUsers = [];
    
    for (const userData of users) {
      // Create user - the pre('save') hook will hash the password
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`   ✓ Created user: ${user.email}`);
    }

    // Create Notes for first user
    console.log('📝 Creating notes...');
    const notesWithUser = notesData.map(note => ({
      ...note,
      user: createdUsers[0]._id // Assign to first user
    }));
    
    const createdNotes = await Note.insertMany(notesWithUser);
    console.log(`   ✓ Created ${createdNotes.length} notes`);

    // Create Bookmarks for first user
    console.log('🔖 Creating bookmarks...');
    const bookmarksWithUser = bookmarksData.map(bookmark => ({
      ...bookmark,
      user: createdUsers[0]._id // Assign to first user
    }));
    
    const createdBookmarks = await Bookmark.insertMany(bookmarksWithUser);
    console.log(`   ✓ Created ${createdBookmarks.length} bookmarks`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Notes: ${createdNotes.length}`);
    console.log(`   Bookmarks: ${createdBookmarks.length}`);
    console.log('\n🔐 Login Credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: jane@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: demo@example.com');
    console.log('   Password: demo123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run seeder
connectDB().then(() => {
  seedDatabase();
});