const firebaseConfig = {
  apiKey: "AIzaSyBpoA6lSN5uDQcwvAWrV2qo8ZoA8z6kc_w",
  authDomain: "gemeinsames-wir.firebaseapp.com",
  databaseURL: "https://gemeinsames-wir-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gemeinsames-wir",
  storageBucket: "gemeinsames-wir.firebasestorage.app",
  messagingSenderId: "731645990105",
  appId: "1:731645990105:web:99bb6668ef612385f45ac8",
  measurementId: "G-HSD0FJ661X"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let kategorie = "";

if (window.location.pathname.includes("einkauf")) {
  kategorie = "einkauf";
} else if (window.location.pathname.includes("ausgaben")) {
  kategorie = "ausgaben";
} else if (window.location.pathname.includes("ziele")) {
  kategorie = "ziele";
}

function hinzufuegen() {
  const eingabe = document.getElementById("eintrag").value.trim();
  if (!eingabe || !kategorie) return;

  db.ref(kategorie).push({
    text: eingabe,
    timestamp: Date.now()
  });

  document.getElementById("eintrag").value = "";
}

function eintragHinzufuegen(snapshot) {
  const daten = snapshot.val();
  const li = document.createElement("li");
  li.textContent = daten.text;

  const button = document.createElement("button");
  button.textContent = "🗑️";
  button.style.marginLeft = "10px";
  button.onclick = () => {
    db.ref(`${kategorie}/${snapshot.key}`).remove();
    li.remove(); // lokal entfernen
  };

  li.appendChild(button);
  document.getElementById("liste").appendChild(li);
}

if (kategorie) {
  db.ref(kategorie).on("child_added", eintragHinzufuegen);
}
