const fs = require('fs');

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];
const departments = ["Engineering", "Human Resources", "Sales", "Marketing", "Finance", "IT Support", "Legal"];
const roles = ["Admin", "HR", "Manager", "Employee"];
const designations = ["Software Engineer", "Senior Developer", "HR Manager", "Sales Executive", "Marketing Specialist", "Financial Analyst", "IT Admin", "Legal Counsel"];
const statuses = ["Active", "On Leave", "Terminated"];
const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
const locations = ["New York", "London", "Berlin", "Tokyo", "Sydney", "Remote"];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

const employees = [];
for (let i = 1; i <= 200; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const id = "EMP" + String(i).padStart(4, '0');
    
    employees.push({
        "EmployeeID": id,
        "FirstName": firstName,
        "LastName": lastName,
        "Email": `${firstName.toLowerCase()}.${lastName.toLowerCase()}@erm.local`,
        "Phone": "+1 " + Math.floor(1000000000 + Math.random() * 9000000000).toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
        "Department": getRandomItem(departments),
        "Designation": getRandomItem(designations),
        "Manager": "EMP" + String(Math.max(1, Math.floor(Math.random() * 50))).padStart(4, '0'),
        "EmploymentType": getRandomItem(employmentTypes),
        "Status": getRandomItem(statuses),
        "DateOfJoining": getRandomDate(new Date(2015, 0, 1), new Date()),
        "Salary": Math.floor(50000 + Math.random() * 100000),
        "Location": getRandomItem(locations),
        "Gender": Math.random() > 0.5 ? "Male" : "Female",
        "DateOfBirth": getRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)),
        "ProfileImage": "sap-icon://employee",
        "EmergencyContact": "+1 " + Math.floor(1000000000 + Math.random() * 9000000000).toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
        "Address": `${Math.floor(Math.random() * 9999)} Main St, ${getRandomItem(locations)}`,
        "Skills": ["SAPUI5", "OData", "JavaScript", "Communication", "Leadership"].sort(() => 0.5 - Math.random()).slice(0, 3).join(", "),
        "Experience": Math.floor(1 + Math.random() * 20) + " Years",
        "Education": "Bachelor's Degree",
        "LastUpdated": new Date().toISOString(),
        "CreatedBy": "System",
        "Role": getRandomItem(roles)
    });
}

fs.writeFileSync('D:/SAP_ERM_App/webapp/mockdata/employees.json', JSON.stringify(employees, null, 2));
console.log("Generated 200 mock employees.");
