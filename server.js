var express = require('express');
var app = express();
var fs = require('fs');

var employee = {
    "users5": {
        "id": 5,
        "companyName": "PVC",
        "employees": [
            "Mark",
            "Arch",
            "Joh"
        ],
        "positions": [
            "Chairman",
            "Tableman",
            "Floorman"
        ],
        "location": "Malagamot"
    }
}

// Get a list of employees
app.get('/getUsers', function(req, res) {
    fs.readFile(__dirname + "/employee.json", 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
})

// Add an employee
app.post('/addUser', function(req, res) {
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading data from file: " + err);
            res.status(500).send("Error reading data from file.");
            return;
        }

        data = JSON.parse(data);

        // Append user variable to list
        data["users5"] = employee["users5"];

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(data), 'utf8', function(err) {
            if (err) {
                console.error("Error writing data to file: " + err);
                res.status(500).send("Error writing data to file.");
                return;
            }

            console.log(data);
            res.end(JSON.stringify(data));
        });
    });
});

// Get an employee by searching ID
app.get('/:id', function (req, res) {
    // First retrieve existing user list
    fs.readFile(__dirname + "/" + "employee.json", 'utf8', function (err, data) {
      var userArray = JSON.parse(data);
  
      // Find the user with the specified id
      var userId = parseInt(req.params.id);
      var foundUser = null;
  
      userArray.forEach((users) => {
        for (var key in users) {
          if (users[key].id === userId) {
            foundUser = users[key];
            break;
          }
        }
      });
  
      if (foundUser) {
        console.log(foundUser);
        res.end(JSON.stringify(foundUser));
      } else {
        res.status(404).send('User not found');
      }
    });
  });
  
  
  
    //Code to delete a user by id
    app.delete('/deleteUser/:id', function (req, res) {
      const id = parseInt(req.params.id);
    
      fs.readFile(__dirname + "/employee.json", 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Error while reading data');
        }
    
        let usersArray = JSON.parse(data);
    
        // Find the user with the specified "id" and delete it
        let userKey = 'users' + id;
    
        if (usersArray[0][userKey]) {
          delete usersArray[0][userKey];
    
          fs.writeFile(__dirname + "/users.json", JSON.stringify(usersArray, null, 2), 'utf8', (err) => {
            if (err) {
              return res.status(500).send('Error while saving data');
            }
    
            console.log('User deleted:', id);
            res.end('User deleted');
          });
        } else {
          return res.status(404).send('User not found');
        }
      });
    });


var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
