const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Accept-Control-Allow-methods', 'POST,GET');
  next();
});

app.get('/getTeachers', function (req, res) {
  const teacherData = readFileSync(resolve(__dirname, './data/teachers.json'), 'utf8');
  res.send(teacherData);
});

app.get('/getStudents', function (req, res) {
  const studentData = readFileSync(resolve(__dirname, './data/students.json'), 'utf8');
  res.send(studentData);
});

app.listen(8080, () => {
  console.log('welcome to use Express.');
});