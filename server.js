// called in express and port
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// set up express app
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// routers for app
require("./routes/index")(app);
require("./routes/notes")(app);

// lisinting to port
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})