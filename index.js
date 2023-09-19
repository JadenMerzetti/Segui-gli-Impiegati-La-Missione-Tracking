const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Juljad131313!',
  database: 'employee_Tracker',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database: employee_Tracker');
    startApp();
  });

  function startApp() {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
        ],
      })
      .then((answer) => {
    
        switch (answer.action) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
            case 'Add a department':
            addDepartment();
            break;
            case `Add a role`:
            addRole();
            break;
            case 'Add an employee':
            addEmployee();
            break;
            case 'Update an employee role':
            updateEmployeeRole();
            break;   
        }
      });
  }
  
  function viewAllDepartments() {
    const query = 'SELECT * FROM department;'
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp(); 
    });
  }

  function viewAllRoles() {
    const query = `SELECT * FROM role;` 
    connection.query(query, (err, res) => {
      if (err) {
        console.error('Error fetching roles:', err);
        startApp(); 
      } else {
        console.log('All Roles:');
        console.table(res);
        startApp(); 
      }
    });
  }

  function viewAllEmployees() {
    const query = `SELECT * FROM employee;`
    connection.query(query, (err, res) => {
      if (err) {
        console.error('Error fetching employees:', err);
        startApp();
      } else {
        console.log('All Employees:');
        console.table(res);
        startApp(); 
      }
    });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the new department:',
        },
      ])
      .then((answer) => {
        const departmentName = answer.departmentName;
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'departmentId',
              message: 'Enter the department ID for the new department:',
            },
          ])
          .then((answer) => {
            const departmentId = parseInt(answer.departmentId);
            const query = 'INSERT INTO department (name,  department_id) VALUES (?, ?)';
            connection.query(query, [departmentName, departmentId], (err, result) => {
              if (err) {
                console.error('Error adding department:', err);
                startApp(); 
              } else {
                console.log(`Department '${departmentName}' with ID '${departmentId}' added successfully.`);
                startApp(); 
              }
            });
          });
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: "Enter the title of the new role:",
        },
        {
          type: 'input',
          name: 'salary',
          message: "Enter the salary for the new role:",
        },
        {
          type: 'input',
          name: 'roles_department',
          message: "Enter the department ID for the new role:",
        },
      ])
      .then((answers) => {
        const title = answers.title;
        const salary = parseFloat(answers.salary);
        const roles_department = parseInt(answers.roles_department);
  
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        connection.query(query, [title, salary, roles_department], (err, result) => {
          if (err) {
            console.error('Error adding role:', err);
            startApp(); 
          } else {
            console.log(`Role '${title}' added successfully.`);
            startApp(); 
          }
        });
      });
  }

function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter the employee's last name:",
        },
        {
          type: 'input',
          name: 'jobTitle',
          message: "Enter the employee's job title:",
        },
        {
          type: 'input',
          name: 'salary',
          message: "Enter the employee's yearly salary:",
        },
        {
          type: 'input',
          name: 'employeeManager',
          message: "Enter the employee's manager:",
        },
        {
          type: 'input',
          name: 'department',
          message: "Enter the employee's department:",
        },
      ])
      .then((answers) => {
        const firstName = answers.firstName;
        const lastName = answers.lastName;
        const jobTitle = answers.jobTitle;
        const salary = parseInt(answers.salary);
        const employeeManager = answers.employeeManager;
        const department = answers.department;
       
        const query = 'INSERT INTO employee (firstName, lastName, jobTitle, salary, employeeManager, department) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [firstName, lastName, jobTitle, salary, employeeManager, department], (err, result) => {
          if (err) {
            console.error('Error adding employee:', err);
            startApp(); 
          } else {
            console.log(`Employee '${firstName} ${lastName}' added successfully.`);
            startApp(); 
          }
        });
      });
  }

  function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newEmployeeId',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'input',
          name: 'newTitle',
          message: 'Enter the ID of the new role for the employee:',
        },
      ])
      .then((answers) => {
        const newEmployeeId = parseInt(answers.newEmployeeId);
        const newTitle = parseInt(answers.newTitle);
        const query = 'UPDATE employees SET employee_id, job_title = ? WHERE id = ?';
        connection.query(query, [newEmployeeId, newTitle], (err, result) => {
          if (err) {
            console.error('Error updating employee role:', err);
          } else {
            console.log('Employee role updated successfully.');
          }
          startApp();
        });
      });
  }
  
  