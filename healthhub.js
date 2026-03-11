import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let medications = [];

// API to get medicines
app.get("/api/medications", (req, res) => {
  res.json(medications);
});

// API to add medicine
app.post("/api/medications", (req, res) => {
  const med = { id: Date.now(), ...req.body };
  medications.push(med);
  res.json(med);
});

// Homepage
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>HealthHub</title>
  </head>

  <body style="font-family:Arial;text-align:center;padding:40px">

  <h1>HealthHub Medicine Tracker 💊</h1>

  <input id="name" placeholder="Medicine Name">
  <input id="dose" placeholder="Dosage">
  <button onclick="addMed()">Add Medicine</button>

  <h3>Medicine List</h3>
  <ul id="list"></ul>

<script>

async function load(){
 const res = await fetch('/api/medications');
 const data = await res.json();

 const list = document.getElementById("list");
 list.innerHTML="";

 data.forEach(m=>{
   const li = document.createElement("li");
   li.innerText = m.name + " - " + m.dose;
   list.appendChild(li);
 });
}

async function addMed(){

 const name = document.getElementById("name").value;
 const dose = document.getElementById("dose").value;

 await fetch('/api/medications',{
   method:"POST",
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({name,dose})
 });

 load();
}

load();

</script>

</body>
</html>
`);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("HealthHub running on port 5000");
});