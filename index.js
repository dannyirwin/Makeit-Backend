const express = require('express');
const cors = require('cors');
const database = require('./database');
const app = express();
const PORT = 4000;

const { User } = require('./models/User')
const {FollowerFollowee} = require('./models/FollowerFollowee')

app.use(cors());
app.use(express.json());

app.get("/users", (_, response) => {
    User.query().withGraphFetched('followers').then(users => response.status(200).json(users))
})

app.get("/ffs", (_, response) => {
    FollowerFollowee.query().then(ffs => response.status(200).json(ffs))
})


app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
});
