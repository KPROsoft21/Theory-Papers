-- Initialize the database with tables for users, theories, follows, and messages

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Theories/Papers table
CREATE TABLE IF NOT EXISTS theories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  field TEXT NOT NULL,
  abstract TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Follows table (for following writers)
CREATE TABLE IF NOT EXISTS follows (
  follower_id INTEGER NOT NULL,
  following_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, following_id),
  FOREIGN KEY (follower_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  recipient_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Insert some sample data
INSERT INTO users (name, email, password_hash, bio) VALUES 
('Jane Doe', 'jane.doe@example.com', '$2a$12$1234567890123456789012', 'Theoretical physicist specializing in quantum mechanics. I love exploring the mysteries of the universe and sharing my theories with fellow enthusiasts.'),
('John Smith', 'john.smith@example.com', '$2a$12$0987654321098765432109', 'Cognitive psychologist researching decision-making processes and biases.'),
('Alex Johnson', 'alex.johnson@example.com', '$2a$12$abcdefghijklmnopqrstuv', 'Philosopher exploring emergent properties in complex systems and consciousness.'),
('Maria Garcia', 'maria.garcia@example.com', '$2a$12$zyxwvutsrqponmlkjihgfe', 'Computer scientist working on neural networks and artificial intelligence.'),
('David Wilson', 'david.wilson@example.com', '$2a$12$mnbvcxzlkjhgfdsapoiuyt', 'Economist studying resource allocation and sustainable economic models.');

INSERT INTO theories (title, field, abstract, content, tags, user_id) VALUES
('Quantum Entanglement and Its Implications on Reality', 'Physics', 'This paper explores the fascinating phenomenon of quantum entanglement and how it challenges our understanding of reality and locality in the universe.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'quantum physics, entanglement, non-locality', 1),
('String Theory: A New Perspective', 'Physics', 'An alternative approach to string theory that reconciles some of the inconsistencies in current models and provides testable predictions.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'string theory, quantum gravity, unified theory', 1),
('Cognitive Biases in Decision Making', 'Psychology', 'An exploration of how cognitive biases affect our decision-making processes and strategies to overcome these inherent mental shortcuts.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'cognitive bias, decision making, psychology', 2),
('Emergent Properties in Complex Systems', 'Philosophy', 'This theory examines how complex systems can exhibit properties that are not present in their individual components, challenging reductionist approaches.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'emergence, complexity, systems theory', 3),
('Neural Networks and Consciousness', 'Computer Science', 'A theoretical framework for understanding consciousness through the lens of artificial neural networks and information processing.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'neural networks, consciousness, AI', 4),
('Economic Implications of Resource Scarcity', 'Economics', 'This paper analyzes how resource scarcity affects economic systems and proposes alternative models for sustainable resource allocation.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'economics, resource scarcity, sustainability', 5);

-- Set up some follows
INSERT INTO follows (follower_id, following_id) VALUES
(2, 1), -- John follows Jane
(3, 1), -- Alex follows Jane
(4, 1), -- Maria follows Jane
(5, 1), -- David follows Jane
(1, 2), -- Jane follows John
(1, 3); -- Jane follows Alex

-- Add some messages
INSERT INTO messages (sender_id, recipient_id, content) VALUES
(2, 1, 'Hi Jane, I read your paper on quantum entanglement and had some questions about the implications for non-locality.'),
(1, 2, 'Of course! I''d be happy to discuss it. What specific aspects of non-locality are you interested in?'),
(2, 1, 'I''m particularly interested in how entanglement might relate to consciousness and information transfer across neural networks.'),
(1, 2, 'That''s a fascinating intersection! I''ve actually been exploring some ideas about quantum effects in neural microtubules that might be relevant to your research.');
