const lists = [
  {
    "board": "hsr/ost",
    "title": "Project1",
    "category": "proj",
    "items": [
      { "text": "projekt beginnen" },
      { "text": "mittelteil umsetzen" },
      { "text": "abschluss machen und so ... weiteres" }
    ]
  },
  {
    "board": "hsr/ost",
    "title": "Project2",
    "category": "proj",
    "items": [
      { "text": "dinge erledigen" },
      { "text": "sachen implementieren und veröffentlichen" },
      { "text": "zeugs nachfragen für weiteres vorgehen", "completed": true },
      { "text": "etwas erledigen", "completed": true },
      { "text": "alles machen und kommunizieren und bewerben und teilen und ..." }
    ]
  },
  {
    "board": "hsr/ost",
    "title": "Intern",
    "category": "info",
    "items": [
      { "text": "wenns dann noch zeit hat", "due_at": "26/06/2022", "importance": 1 },
      { "text": "das sollte das erste sein zum wahrnehmen", "importance": 5 },
      { "text": "wäre schon gut zu haben", "importance": 2, "completed": true },
      { "text": "ziemlich wichtig", "due_at": "12/06/2022", "importance": 3 },
      { "text": "besser als nächstes machen", "importance": 4 }
    ]
  }
]

export default function getLists(board) {
  return lists.filter(l => l.board === board).reverse();
}
