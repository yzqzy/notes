// var teacher = {
//   name: '张三',
//   age: 32,
//   sex: 'mal',
//   height: 170,
//   weight: 130,
//   teach: function () {
//     console.log('I am teaching JavaScript.');
//   },
//   smoke: function () {
//     this.weight--;
//     console.log('I am smoking. ', this.weight);
//   },
//   eat: function () {
//     this.weight++;
//     console.log('I am having dinner. ', this.weight);
//   }
// }

// console.log(teacher.name);
// console.log(teacher.age);
// console.log(teacher.teach());
// teacher.address = '北京';
// console.log(teacher);
// teacher.drink = function () {
//   console.log('I am drinking beer.');
// }
// teacher.drink();
// teacher.name = '李四';
// console.log(teacher.name);
// teacher.teach = function () {
//   console.log('I am teaching HTML');
// }
// teacher.teach();
// delete teacher.address;
// delete teacher.teach;
// console.log(teacher);

// teacher.smoke();
// teacher.smoke();
// teacher.eat();


// var attendace = {
//   students: [],
//   total: 6,
//   join: function (name) {
//     this.students.push(name);
//     if (this.students.length === this.total) {
//       console.log(name +  '到课, 学生已到齐.');
//       return;
//     }
//     console.log(name +  '到课, 学生未到齐.');
//   },
//   leave: function (name) {
//     var idx = this.students.indexOf(name);
//     if (idx !== -1) {
//       this.students.splice(idx, 1);
//     }
//     console.log(name + '早退');
//     console.log(this.students);
//   },
//   classOver: function () {
//     this.students = [];
//     console.log('已下课');
//   }
// }

// attendace.join('杨一');
// attendace.join('张三');
// attendace.join('李四');
// attendace.join('王五');
// attendace.join('赵六');
// attendace.join('孙七');
// attendace.leave('李四');
// attendace.classOver();


// function Teacher () {
//   this.name = '张三';
//   this.sex = '男士';
//   this.weight = 130;
//   this.smoke = function () {
//     this.weight--;
//     console.log('I am smoking. ', this.weight);
//   }
//   this.eat = function () {
//     this.weight++;
//     console.log('I am having a dinner. ', this.weight);
//   }
// }

// var teacher1 = new Teacher();
// teacher1.name = '李四';
// teacher1.smoke();
// teacher1.smoke();
// teacher1.eat();
// console.log(teacher1);

// var teacher2 = new Teacher();
// teacher2.smoke();
// teacher2.eat();
// teacher2.eat();
// console.log(teacher2);


// function Teacher (name, sex, weight, course) {
//   this.name = name;
//   this.sex = sex;
//   this.weight = weight;
//   this.course = course;

//   this.smoke = function () {
//     this.weight--;
//     console.log(this.weight);
//   }

//   this.eat = function () {
//     this.weight++;
//     console.log(this.weight);
//   }
// }

// var t1 = new Teacher('张三', '男', 145, 'JavaScript');
// var t2 = new Teacher('李四', '女', 90, 'HTML');
// console.log(t1);
// console.log(t2);


// function Teacher (opt) {
//   this.name = opt.name;
//   this.sex = opt.sex;
//   this.weight = opt.weight;
//   this.course = opt.course;

//   this.smoke = function () {
//     this.weight--;
//     console.log(this.weight);
//   }

//   this.eat = function () {
//     this.weight++;
//     console.log(this.weight);
//   }
// }

// var t1 = new Teacher({
//   name: '张三',
//   age: '男',
//   weight: 145,
//   course: 'JavaScript'
// });
// var t2 = new Teacher({
//   name: '李四',
//   age: '女',
//   weight: 90,
//   course: 'HTML'
// });
// console.log(t1);
// console.log(t2);
