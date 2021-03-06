// load data
const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
// routing
module.exports = function(app) {
    app.get("/api/notes", function(req,res){
        res.json(data);
    });

    app.get("/api/notes/:id", function(req,res){
        res.json(data[Number(req.params.id)]);
    });

    app.post("/api/notes", function(req,res) {
        let nextNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        nextNote.id = uniqueId;
        data.push(nextNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err)
        });
        res.json(data);
    });

    app.delete("/api/notes/:id", function(req,res) {
        let noteId = req.params.id;
        let nextID = 0;
        console.log(`Deleted the note with id ${noteId} from list.`);
        data = data.filter(currentNote => {
            return currentNote.id != noteId;
        });

        for (currentNote of data) {
            currentNote.id = nextID.toString();
            nextID++;
        }

        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    });
}