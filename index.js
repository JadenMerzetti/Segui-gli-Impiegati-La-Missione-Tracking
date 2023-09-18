const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'placeholder',
  user: 'placeholder',
  password: 'placeholder',
  database: 'Employee_Tracker',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database: Employee_Tracker');
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
            case `add a role`:
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
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp(); 
    });
  }

  function viewAllRoles() {
    const query = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id';
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
    const query = `
      SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title AS job_title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM
        employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;
  
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
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, [departmentName], (err, result) => {
        if (err) {
          console.error('Error adding department:', err);
          startApp(); 
        } else {
          console.log(`Department '${departmentName}' added successfully.`);
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
          name: 'roleId',
          message: "Enter the employee's role ID:",
        },
        {
          type: 'input',
          name: 'managerId',
          message: "Enter the employee's manager's ID (if applicable):",
        },
      ])
      .then((answers) => {
        const firstName = answers.firstName;
        const lastName = answers.lastName;
        const roleId = parseInt(answers.roleId);
        const managerId = parseInt(answers.managerId) || null;
  
       
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
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

  function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the new role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the new role:',
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the new role:',
        },
      ])
      .then((answers) => {
        const title = answers.title;
        const salary = parseFloat(answers.salary);
        const departmentId = parseInt(answers.departmentId);
  
     
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        connection.query(query, [title, salary, departmentId], (err, result) => {
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

  function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the ID of the new role for the employee:',
        },
      ])
      .then((answers) => {
        const employeeId = parseInt(answers.employeeId);
        const newRoleId = parseInt(answers.newRoleId);
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
        connection.query(query, [newRoleId, employeeId], (err, result) => {
          if (err) {
            console.error('Error updating employee role:', err);
          } else {
            console.log('Employee role updated successfully.');
          }
          startApp();
        });
      });
  }
  
  