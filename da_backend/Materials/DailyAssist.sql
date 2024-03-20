-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: DailyAssist
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `habit_challenges`
--

DROP TABLE IF EXISTS `habit_challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habit_challenges` (
  `challenge_id` int NOT NULL AUTO_INCREMENT,
  `habit_id` int NOT NULL,
  `day` int NOT NULL,
  `challenge_name` text NOT NULL,
  PRIMARY KEY (`challenge_id`),
  KEY `habit_id` (`habit_id`),
  CONSTRAINT `habit_challenges_ibfk_1` FOREIGN KEY (`habit_id`) REFERENCES `habits` (`habit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habit_challenges`
--

LOCK TABLES `habit_challenges` WRITE;
/*!40000 ALTER TABLE `habit_challenges` DISABLE KEYS */;
INSERT INTO `habit_challenges` VALUES (22,1,1,'Take a 10-minute walk'),(23,1,10,'Do a plank for 1 minute'),(24,1,11,'Take the stairs instead of the elevator'),(25,1,12,'Dance to your favorite song for 10 minutes'),(26,1,13,'Swim for 20 minutes'),(27,1,14,'Attend a fitness class'),(28,1,15,'Play a sport for 30 minutes'),(29,1,16,'Try interval training for 15 minutes'),(30,1,17,'Do 15 squats'),(31,1,18,'Hike for an hour'),(32,1,19,'Participate in a charity run'),(33,1,2,'Do 10 push-ups'),(34,1,20,'Join a gym and do a full-body workout'),(35,1,21,'Set a new personal fitness goal'),(36,1,3,'Stretch for 5 minutes'),(37,1,4,'Go for a 15-minute jog'),(38,1,5,'Complete a 20-minute home workout video'),(39,1,6,'Practice yoga for 15 minutes'),(40,1,7,'Do 20 jumping jacks'),(41,1,8,'Cycle for 30 minutes'),(42,1,9,'Try a new workout routine'),(43,2,1,'Read for 10 minutes before bed'),(44,2,10,'Reward yourself with a small treat after finishing a book'),(45,2,11,'Share book recommendations with friends or family'),(46,2,12,'Attend author readings or book signings'),(47,2,13,'Read aloud to a friend or family member'),(48,2,14,'Explore different formats like e-books, physical books, and audiobooks'),(49,2,15,'Challenge yourself to read a book outside of your comfort zone'),(50,2,16,'Create a reading schedule and stick to it'),(51,2,17,'Start a virtual book club with friends or online communities'),(52,2,18,'Take notes while reading to improve comprehension'),(53,2,19,'Set reading goals for the month or year'),(54,2,2,'Set aside 15 minutes each morning for reading'),(55,2,20,'Discuss books with others to deepen understanding'),(56,2,21,'Revisit a childhood favorite book'),(57,2,3,'Create a cozy reading nook in your home'),(58,2,4,'Join a book club or reading group'),(59,2,5,'Visit your local library or bookstore weekly'),(60,2,6,'Choose a specific genre or topic to focus on for a month'),(61,2,7,'Turn off electronic devices and read for 20 minutes'),(62,2,8,'Keep a reading journal to track progress and thoughts'),(63,2,9,'Listen to audiobooks during your commute or chores'),(64,2,1,'Read for 10 minutes before bed'),(65,2,10,'Reward yourself with a small treat after finishing a book'),(66,2,11,'Share book recommendations with friends or family'),(67,2,12,'Attend author readings or book signings'),(68,2,13,'Read aloud to a friend or family member'),(69,2,14,'Explore different formats like e-books, physical books, and audiobooks'),(70,2,15,'Challenge yourself to read a book outside of your comfort zone'),(71,2,16,'Create a reading schedule and stick to it'),(72,2,17,'Start a virtual book club with friends or online communities'),(73,2,18,'Take notes while reading to improve comprehension'),(74,2,19,'Set reading goals for the month or year'),(75,2,2,'Set aside 15 minutes each morning for reading'),(76,2,20,'Discuss books with others to deepen understanding'),(77,2,21,'Revisit a childhood favorite book'),(78,2,3,'Create a cozy reading nook in your home'),(79,2,4,'Join a book club or reading group'),(80,2,5,'Visit your local library or bookstore weekly'),(81,2,6,'Choose a specific genre or topic to focus on for a month'),(82,2,7,'Turn off electronic devices and read for 20 minutes'),(83,2,8,'Keep a reading journal to track progress and thoughts'),(84,2,9,'Listen to audiobooks during your commute or chores'),(85,4,1,'Drink 8 ounces of water immediately upon waking up'),(86,4,10,'Participate in a water drinking challenge with friends or family'),(87,4,11,'Experiment with different temperatures of water to find what you enjoy most'),(88,4,12,'Keep a water intake journal to monitor your progress'),(89,4,13,'Drink a glass of water before and after exercise'),(90,4,14,'Replace one snack per day with a glass of water'),(91,4,15,'Try herbal teas or flavored water as alternatives to plain water'),(92,4,16,'Set up a hydration station at work or home with a variety of water options'),(93,4,17,'Join online communities or forums for accountability and support'),(94,4,18,'Educate yourself on the benefits of staying hydrated to stay motivated'),(95,4,19,'Challenge yourself to drink a certain amount of water by specific times throughout the day'),(96,4,2,'Keep a water bottle with you at all times and take sips regularly throughout the day'),(97,4,20,'Experiment with different types of water containers to find what you prefer'),(98,4,21,'Practice mindful drinking by focusing on the taste and sensation of each sip'),(99,4,3,'Set reminders on your phone to drink water every hour'),(100,4,4,'Replace one sugary or caffeinated beverage with a glass of water each day'),(101,4,5,'Drink a glass of water before every meal'),(102,4,6,'Track your water intake using a hydration app'),(103,4,7,'Infuse your water with fruit slices for added flavor'),(104,4,8,'Challenge yourself to finish a certain number of water bottles per day'),(105,4,9,'Reward yourself for reaching daily water intake goals'),(106,5,1,'Write three things you\'re grateful for each morning'),(107,5,10,'Write a letter to your future self'),(108,5,11,'Reflect on a mistake you made and write about what you learned from it'),(109,5,12,'Record your thoughts on a recent book or article you read'),(110,5,13,'Journal about a person who inspires you and why'),(111,5,14,'Write about a place you\'d like to visit and why it interests you'),(112,5,15,'Document your progress towards a personal goal'),(113,5,16,'Describe a moment of kindness you witnessed or experienced'),(114,5,17,'Explore your fears and write about how you can overcome them'),(115,5,18,'Reflect on your relationships and write about ways to improve them'),(116,5,19,'Write about a hobby or interest you\'re passionate about'),(117,5,2,'Reflect on your emotions and write about them for 5 minutes'),(118,5,20,'Journal about a memorable experience from your past'),(119,5,21,'Record your thoughts on a recent podcast or TED talk'),(120,5,3,'Describe your day in detail before going to bed'),(121,5,4,'Write down one thing you learned today'),(122,5,5,'Set three goals for the next day and journal about how you plan to achieve them'),(123,5,6,'Practice free-writing for 10 minutes every evening'),(124,5,7,'Create a list of affirmations and write them out daily'),(125,5,8,'Journal about a recent challenge you faced and how you overcame it'),(126,5,9,'Document your daily accomplishments, no matter how small'),(127,5,1,'Write three things you\'re grateful for each morning'),(128,5,10,'Write a letter to your future self'),(129,5,11,'Reflect on a mistake you made and write about what you learned from it'),(130,5,12,'Record your thoughts on a recent book or article you read'),(131,5,13,'Journal about a person who inspires you and why'),(132,5,14,'Write about a place you\'d like to visit and why it interests you'),(133,5,15,'Document your progress towards a personal goal'),(134,5,16,'Describe a moment of kindness you witnessed or experienced'),(135,5,17,'Explore your fears and write about how you can overcome them'),(136,5,18,'Reflect on your relationships and write about ways to improve them'),(137,5,19,'Write about a hobby or interest you\'re passionate about'),(138,5,2,'Reflect on your emotions and write about them for 5 minutes'),(139,5,20,'Journal about a memorable experience from your past'),(140,5,21,'Record your thoughts on a recent podcast or TED talk'),(141,5,3,'Describe your day in detail before going to bed'),(142,5,4,'Write down one thing you learned today'),(143,5,5,'Set three goals for the next day and journal about how you plan to achieve them'),(144,5,6,'Practice free-writing for 10 minutes every evening'),(145,5,7,'Create a list of affirmations and write them out daily'),(146,5,8,'Journal about a recent challenge you faced and how you overcame it'),(147,5,9,'Document your daily accomplishments, no matter how small'),(148,6,1,'Prepare your clothes for the next day'),(149,6,10,'Practice deep breathing exercises'),(150,6,11,'Reflect on your day in a journal'),(151,6,12,'Dim the lights to signal bedtime'),(152,6,13,'Use a sleep mask or blackout curtains'),(153,6,14,'Avoid caffeine after 2pm'),(154,6,15,'Turn off all electronic devices'),(155,6,16,'Use aromatherapy with lavender scent'),(156,6,17,'Limit alcohol consumption before bed'),(157,6,18,'Set a consistent bedtime and wake-up time'),(158,6,19,'Create a soothing bedtime ritual'),(159,6,2,'Limit screen time an hour before bed'),(160,6,20,'Visualize a peaceful place before sleeping'),(161,6,21,'Use a white noise machine or app'),(162,6,3,'Read for at least 15 minutes before sleeping'),(163,6,4,'Write down three things you\'re grateful for'),(164,6,5,'Drink a glass of water before bedtime'),(165,6,6,'Stretch or do yoga for 10 minutes'),(166,6,7,'Set tomorrow\'s goals'),(167,6,8,'Take a relaxing bath or shower'),(168,6,9,'Listen to calming music or a podcast'),(169,7,1,'Repeat \'I am capable of achieving my goals\' every morning'),(170,7,10,'Start a gratitude journal and write \'I am surrounded by abundance\' as the first entry'),(171,7,11,'Repeat \'I am resilient and can overcome any challenge\' during tough times'),(172,7,12,'Set reminders on my phone to repeat affirmations like \'I am worthy of happiness\''),(173,7,13,'Create a vision board with images that represent my goals and aspirations'),(174,7,14,'Repeat \'I am enough just as I am\' while looking in the mirror each morning'),(175,7,15,'Engage in positive self-talk during exercise by saying \'I am strong and capable\''),(176,7,16,'Join a support group where members encourage each other with affirmations'),(177,7,17,'Repeat \'I attract positive opportunities into my life\' as a daily affirmation'),(178,7,18,'Practice mindfulness and repeat \'I am present and fully engaged in this moment\''),(179,7,19,'Write down my achievements and repeat \'I am proud of my progress\' at the end of each week'),(180,7,2,'Write down three things I am grateful for each day'),(181,7,20,'Surround myself with people who uplift me and affirm my worth'),(182,7,21,'End each day by repeating \'I am grateful for the lessons learned and the growth achieved\''),(183,7,3,'Practice deep breathing and repeat \'I am calm and in control\' during stressful moments'),(184,7,4,'Visualize my success and repeat \'I am worthy of success\' before starting each task'),(185,7,5,'Replace negative self-talk with positive affirmations like \'I am confident and capable\''),(186,7,6,'Create a mantra like \'I am enough\' and repeat it during meditation sessions'),(187,7,7,'Leave positive notes for myself in places I frequent throughout the day'),(188,7,8,'Surround myself with positive affirmations by decorating my workspace with uplifting quotes'),(189,7,9,'Repeat \'I deserve love and respect\' whenever I feel doubt about my worth'),(190,8,1,'Wake up at 6:00 AM'),(191,8,10,'Go for a brisk walk'),(192,8,11,'Listen to uplifting music'),(193,8,12,'Review your goals'),(194,8,13,'Practice deep breathing exercises'),(195,8,14,'Journal for 5 minutes'),(196,8,15,'Do a quick workout routine'),(197,8,16,'Visualize a successful day'),(198,8,17,'Avoid checking your phone for the first 30 minutes'),(199,8,18,'Tidy up your living space'),(200,8,19,'Plan one small act of kindness for the day'),(201,8,2,'Drink a glass of water immediately after waking up'),(202,8,20,'Smile at yourself in the mirror'),(203,8,21,'Express gratitude to someone in your life'),(204,8,3,'Stretch for 5 minutes'),(205,8,4,'Read a motivational quote'),(206,8,5,'Plan your day ahead'),(207,8,6,'Take a cold shower'),(208,8,7,'Meditate for 10 minutes'),(209,8,8,'Eat a healthy breakfast'),(210,8,9,'Write down three things you\'re grateful for'),(211,3,1,'Start with 5 minutes of guided meditation'),(212,3,10,'Find a comfortable sitting position for meditation'),(213,3,11,'Incorporate mindfulness into daily activities like eating or walking'),(214,3,12,'Practice gratitude meditation for a positive mindset'),(215,3,13,'Engage in body scan meditation to relax muscles and release tension'),(216,3,14,'Join a meditation group or community for support and accountability'),(217,3,15,'Read books or listen to podcasts on meditation for inspiration'),(218,3,16,'Practice loving-kindness meditation to cultivate compassion'),(219,3,17,'Experiment with different meditation music or ambient sounds'),(220,3,18,'Take breaks throughout the day for short meditation sessions'),(221,3,19,'Use visualization techniques during meditation for focus and relaxation'),(222,3,2,'Practice deep breathing exercises for 10 minutes'),(223,3,20,'Set realistic goals and celebrate small victories in your meditation journey'),(224,3,21,'Reflect on the benefits of meditation to stay motivated and committed'),(225,3,3,'Set aside a quiet space for meditation sessions'),(226,3,4,'Explore different meditation techniques for variety'),(227,3,5,'Gradually increase meditation duration by 2 minutes each day'),(228,3,6,'Keep a meditation journal to track progress and insights'),(229,3,7,'Experiment with morning and evening meditation routines'),(230,3,8,'Attend a meditation class or workshop for guidance'),(231,3,9,'Use meditation apps for structured sessions and timers');
/*!40000 ALTER TABLE `habit_challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habit_record`
--

DROP TABLE IF EXISTS `habit_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habit_record` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `habit_id` int NOT NULL,
  `challenge_id` int NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `habit_id` (`habit_id`),
  KEY `challenge_id` (`challenge_id`),
  CONSTRAINT `habit_record_ibfk_1` FOREIGN KEY (`habit_id`) REFERENCES `habits` (`habit_id`),
  CONSTRAINT `habit_record_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `habit_challenges` (`challenge_id`),
  CONSTRAINT `habit_record_ibfk_3` FOREIGN KEY (`habit_id`) REFERENCES `habits` (`habit_id`),
  CONSTRAINT `habit_record_ibfk_4` FOREIGN KEY (`challenge_id`) REFERENCES `habit_challenges` (`challenge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habit_record`
--

LOCK TABLES `habit_record` WRITE;
/*!40000 ALTER TABLE `habit_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `habit_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habits`
--

DROP TABLE IF EXISTS `habits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habits` (
  `habit_id` int NOT NULL AUTO_INCREMENT,
  `habit_name` text NOT NULL,
  PRIMARY KEY (`habit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habits`
--

LOCK TABLES `habits` WRITE;
/*!40000 ALTER TABLE `habits` DISABLE KEYS */;
INSERT INTO `habits` VALUES (1,'Exercise'),(2,'Read'),(3,'Meditate'),(4,'Drink Water'),(5,'Journal'),(6,'Night Routine'),(7,'Positive Affirmations'),(8,'Morning Routine');
/*!40000 ALTER TABLE `habits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_choices`
--

DROP TABLE IF EXISTS `survey_choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_choices` (
  `choice_id` int NOT NULL AUTO_INCREMENT,
  `survey_question_id` int NOT NULL,
  `choices` text NOT NULL,
  PRIMARY KEY (`choice_id`),
  KEY `survey_question_id` (`survey_question_id`),
  CONSTRAINT `survey_choices_ibfk_1` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_questions` (`survey_question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_choices`
--

LOCK TABLES `survey_choices` WRITE;
/*!40000 ALTER TABLE `survey_choices` DISABLE KEYS */;
INSERT INTO `survey_choices` VALUES (58,44,'Daily'),(59,44,'Several times a week'),(60,44,'Once a week'),(61,44,'Rarely'),(62,44,'Never'),(63,46,'Vegetarian'),(64,46,'Vegan'),(65,46,'Pescatarian'),(66,46,'Omnivore'),(67,48,'Less than 5 hours'),(68,48,'5-6 hours'),(69,48,'6-7 hours'),(70,48,'7-8 hours'),(71,48,'More than 8 hours'),(72,49,'Yes, regularly'),(73,49,'Sometimes'),(74,49,'No, never'),(75,50,'Very satisfied'),(76,50,'Satisfied'),(77,50,'Neutral'),(78,50,'Dissatisfied'),(79,50,'Very dissatisfied'),(80,51,'Daily'),(81,51,'Several times a week'),(82,51,'Once a week'),(83,51,'Rarely'),(84,51,'Never'),(85,53,'Yes'),(86,53,'No'),(87,54,'Yes'),(88,54,'No'),(89,57,'Yes'),(90,57,'No'),(91,59,'Yes'),(92,59,'No'),(93,60,'Yes'),(94,60,'No'),(95,61,'Yes'),(96,61,'No'),(97,64,'To-do list app'),(98,64,'Calendar'),(99,64,'Notebook'),(100,64,'Task management software'),(101,67,'Rarely'),(102,67,'Occasionally'),(103,67,'Frequently'),(104,67,'Every hour'),(105,70,'Checklists'),(106,70,'Task boards'),(107,70,'Progress bars'),(108,70,'Time tracking software');
/*!40000 ALTER TABLE `survey_choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_questions`
--

DROP TABLE IF EXISTS `survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_questions` (
  `survey_question_id` int NOT NULL AUTO_INCREMENT,
  `survey_id` int NOT NULL,
  `question` text NOT NULL,
  `question_type` text NOT NULL,
  PRIMARY KEY (`survey_question_id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `survey_questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_questions`
--

LOCK TABLES `survey_questions` WRITE;
/*!40000 ALTER TABLE `survey_questions` DISABLE KEYS */;
INSERT INTO `survey_questions` VALUES (43,17,'How would you describe your overall mood today?','paragraph'),(44,17,'How often do you engage in physical exercise?','multiple_choice'),(45,17,'Rate your overall happiness on a scale of 1 to 5.','rating'),(46,17,'Which of the following best describes your diet?','multiple_choice'),(47,17,'Rate your stress level on a scale of 1 to 5.','rating'),(48,17,'How many hours of sleep do you typically get per night?','multiple_choice'),(49,17,'Do you engage in mindfulness or meditation practices?','multiple_choice'),(50,17,'How satisfied are you with your work-life balance?','multiple_choice'),(51,17,'How often do you socialize with friends or family?','multiple_choice'),(52,17,'Rate your overall well-being on a scale of 1 to 5.','rating'),(53,18,'Do you feel stressed at work?','multiple_choice'),(54,18,'Do you regularly work overtime?','multiple_choice'),(55,18,'Rate your satisfaction with your current job on a scale of 1 to 5.','rating'),(56,18,'Rate your satisfaction with your personal life on a scale of 1 to 5.','rating'),(57,18,'Do you have flexibility in your work schedule?','multiple_choice'),(58,18,'Rate your stress level related to work on a scale of 1 to 5.','rating'),(59,18,'Do you take regular breaks during your workday?','multiple_choice'),(60,18,'Do you feel that your workload is manageable?','multiple_choice'),(61,18,'Do you have time for hobbies and leisure activities?','multiple_choice'),(62,18,'Rate your overall work-life balance on a scale of 1 to 5.','rating'),(63,19,'How do you prioritize your tasks?','paragraph'),(64,19,'What tools do you use for task management?','multiple_choice'),(65,19,'Rate your satisfaction with your current task management system (1 - Not satisfied, 5 - Very satisfied)','rating'),(66,19,'How do you handle distractions while working?','paragraph'),(67,19,'How often do you take breaks during work?','multiple_choice'),(68,19,'Rate your ability to maintain focus on tasks (1 - Very difficult, 5 - Very easy)','rating'),(69,19,'Describe your current work environment.','paragraph'),(70,19,'How do you track your progress on tasks?','multiple_choice'),(71,19,'Rate your overall productivity level today (1 - Very low, 5 - Very high)','rating'),(72,19,'What improvements would you like to see in your productivity?','paragraph');
/*!40000 ALTER TABLE `survey_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_result`
--

DROP TABLE IF EXISTS `survey_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_result` (
  `result_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `survey_id` int NOT NULL,
  `answer_json` json NOT NULL,
  `survey_response_date` date NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `survey_result_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_result`
--

LOCK TABLES `survey_result` WRITE;
/*!40000 ALTER TABLE `survey_result` DISABLE KEYS */;
INSERT INTO `survey_result` VALUES (1,2,17,'{\"1\": \"Yes\", \"2\": \"No\", \"3\": \"Maybe\", \"4\": \"Yes\", \"5\": \"No\"}','2024-03-20'),(2,1,17,'null','2024-03-20'),(3,1,17,'{\"1\": \"Good\", \"2\": \"Daily\", \"3\": 2, \"4\": \"Vegan\", \"5\": 4, \"6\": \"6-7 hours\", \"7\": \"No, never\", \"8\": \"Very dissatisfied\", \"9\": \"Never\", \"10\": 5}','2024-03-20'),(4,1,17,'{\"1\": \"Hello there guys\", \"2\": \"Several times a week\", \"3\": 3, \"4\": null, \"5\": 4}','2024-03-20'),(5,1,17,'{\"1\": \"\", \"10\": 3}','2024-03-20');
/*!40000 ALTER TABLE `survey_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `survey_id` int NOT NULL AUTO_INCREMENT,
  `survey_name` text NOT NULL,
  `survey_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`survey_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
INSERT INTO `surveys` VALUES (17,'Well-being Survey','Assess your overall well-being and happiness.'),(18,'Work-Life Balance Survey','Evaluate your work-life balance.'),(19,'Productivity Survey','Measure your current productivity levels.');
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_set`
--

DROP TABLE IF EXISTS `task_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_set` (
  `task_set_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date_of_task` date NOT NULL,
  PRIMARY KEY (`task_set_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_set`
--

LOCK TABLES `task_set` WRITE;
/*!40000 ALTER TABLE `task_set` DISABLE KEYS */;
INSERT INTO `task_set` VALUES (1,1,'2024-02-22'),(2,1,'2024-02-26'),(3,1,'2024-03-01'),(4,1,'2024-03-20');
/*!40000 ALTER TABLE `task_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `task_set_id` int NOT NULL,
  `task_name` text NOT NULL,
  `task_status` text NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `task_set_id` (`task_set_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`task_set_id`) REFERENCES `task_set` (`task_set_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (10,2,'Hey there','Pending'),(11,3,'Do todays Homework','completed'),(12,3,'Get the journals','Pending'),(14,3,'Watch a movie','Pending'),(15,4,'Do Hw','completed'),(16,4,'Study for viva','completed');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-21  0:53:22
