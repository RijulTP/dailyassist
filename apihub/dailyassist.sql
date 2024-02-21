CREATE TABLE `task_set` (
  `task_set_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `date_of_task` date NOT NULL
);


CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `task_set_id` int NOT NULL,
  `task_name` text NOT NULL,
  `task_status` text NOT NULL,
  FOREIGN KEY (`task_set_id`) REFERENCES `task_set` (`task_set_id`)
);

