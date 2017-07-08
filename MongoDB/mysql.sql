CREATE TABLE student(
    student_id INT NOT NULL AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    student_parent VARCHAR(40) NOT NULL,
    PRIMARY KEY(student_id)
);

CREATE TABLE class(
    class_id INT NOT NULL, AUTO_INCREMENT,
    student_leader VARCHAR(100) NOT NULL,
    student_count INT NOT NULL DEFAULT 0,
    PRIMARY KEY(class_id)
)

DROP TABLE student;

INSERT INTO student (student_id, student_name) VALUES (0001, "asan");

SELECT * FROM student;

SELECT * FROM student WHERE student_id=0001;

UPDATE student SET student_name="asi" WHERE student_id=0001;

DELETE FROM student WHERE student_id=0001;

# 只返回两个表中联结字段相等的行
SELECT a.student_id, a.student_name, b.student_count FROM student AS a JOIN class AS b ON a.student_name = b.student_leader

# 返回包括左表中的所有记录和右表中联结字段相等的记录
SELECT a.student_id, a.student_name, b.student_count FROM student AS a LEFT JOIN class AS b ON a.student_name = b.student_leader

# 返回包括右表中的所有记录和右表中联结字段相等的记录
SELECT a.student_id, a.student_name, b.student_count FROM student AS a RIGHT JOIN class AS b ON a.student_name = b.student_leader