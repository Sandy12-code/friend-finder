
// Sets up the Express App
var express = require("express");
var app = express();
// =============================================================
var friendsArray = require("../data/friends");
console.log('friendsArray', friendsArray)
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = function (app) {

    //Displays all friends.
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        return res.json(friendsArray);
    });

    // Create New Friends - takes in Json input

    app.post("/api/friends", function (req, res) {

          var newFriend = req.body;

          newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

          console.log(newFriend);

          var bestMatch = findBestFriend(newFriend, friendsArray);

          friendsArray.push(newFriend);

          res.json(bestMatch);

        //code for the app logic

        function compareFriend(user1, user2) {
            var totalDifference = 0;

            for (var i = 0; i < user1.scores.length; i++) {

                var user1answer = user1.scores[i];
                var user2answer = user2.scores[i];
                var difference = Math.abs(parseInt(user1answer - user2answer));

                totalDifference = totalDifference + difference;

            }

            return totalDifference;
        }


        function findBestFriend(user, usersArray) {
            var lowestDifference = Infinity;
            var bestFriend = {};

            for (var i = 0; i < usersArray.length; i++) {

                if (usersArray.indexOf(user) !== i) {
                    var difference = compareFriend(user, usersArray[i]);

                    if (difference <= lowestDifference) {
                        lowestDifference = difference;
                        bestFriend = usersArray[i];
                    }
                }
            }
            return bestFriend;
        }

    });
    // app.post("/api/clear", function (req, res) {
    //     // Empty out the array of data
    //     usersArray.length = 0;
    //     res.json({ ok: true });
    // });
}

