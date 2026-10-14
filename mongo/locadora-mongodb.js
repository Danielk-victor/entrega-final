// Locadora Unifacisa - Operacoes no MongoDB (roteiro do PDF)
// Executar:  mongosh --file mongo/locadora-mongodb.js
// Recria o banco "locadora" do zero e roda todas as secoes em ordem.

const dbLoc = db.getSiblingDB("locadora");           // 1. Modelagem: use locadora
dbLoc.filmes.drop(); dbLoc.jogos.drop();
const mostrar = (t, cur) => { print("\n== " + t); cur.forEach(d => print("  - " + d.titulo)); };

// 2.1 insertOne
printjson(dbLoc.filmes.insertOne({ titulo: "Interestelar", genero: "Ficção científica", diretor: "Christopher Nolan", anoLancamento: 2014, valorLocacao: 9.9, disponivel: true }));
printjson(dbLoc.jogos.insertOne({ titulo: "The Legend of Zelda: Breath of the Wild", genero: "Aventura", plataforma: "Nintendo Switch", anoLancamento: 2017, valorLocacao: 15.0, disponivel: true }));

// 2.2 insertMany
dbLoc.filmes.insertMany([
  { titulo: "O Poderoso Chefão", genero: "Crime", diretor: "Francis Ford Coppola", anoLancamento: 1972, valorLocacao: 7.5, disponivel: true },
  { titulo: "Parasita", genero: "Suspense", diretor: "Bong Joon-ho", anoLancamento: 2019, valorLocacao: 12.0, disponivel: false },
  { titulo: "Matrix", genero: "Ficção científica", diretor: "Lana e Lilly Wachowski", anoLancamento: 1999, valorLocacao: 8.0, disponivel: true },
  { titulo: "Toy Story", genero: "Animação", diretor: "John Lasseter", anoLancamento: 1995, valorLocacao: 6.5, disponivel: true }
]);
dbLoc.jogos.insertMany([
  { titulo: "God of War", genero: "Ação", plataforma: "PlayStation 4", anoLancamento: 2018, valorLocacao: 14.0, disponivel: true },
  { titulo: "FIFA 23", genero: "Esporte", plataforma: "PlayStation 5", anoLancamento: 2022, valorLocacao: 18.0, disponivel: false, multiplayer: true },
  { titulo: "Minecraft", genero: "Sandbox", plataforma: "PC", anoLancamento: 2011, valorLocacao: 10.0, disponivel: true, multiplayer: true },
  { titulo: "Halo Infinite", genero: "Tiro", plataforma: "Xbox Series X", anoLancamento: 2021, valorLocacao: 16.0, disponivel: true, multiplayer: true }
]);

// 3. Consultas basicas
mostrar("3.1 filmes.find()", dbLoc.filmes.find());
mostrar("3.1 jogos.find()", dbLoc.jogos.find());
mostrar("3.2 filmes genero = Ficção científica", dbLoc.filmes.find({ genero: "Ficção científica" }));
mostrar("3.2 jogos plataforma = PC", dbLoc.jogos.find({ plataforma: "PC" }));

// 4. updateOne
printjson(dbLoc.filmes.updateOne({ titulo: "Matrix" }, { $set: { disponivel: false, valorLocacao: 8.5 } }));
mostrar("4 verificacao Matrix", dbLoc.filmes.find({ titulo: "Matrix" }));

// 5. Comparacao (filmes)
mostrar("5.1 $eq anoLancamento 1999", dbLoc.filmes.find({ anoLancamento: { $eq: 1999 } }));
mostrar("5.2 $ne genero Ficção científica", dbLoc.filmes.find({ genero: { $ne: "Ficção científica" } }));
mostrar("5.3 $gt valorLocacao 9", dbLoc.filmes.find({ valorLocacao: { $gt: 9 } }));
mostrar("5.4 $gte anoLancamento 2014", dbLoc.filmes.find({ anoLancamento: { $gte: 2014 } }));
mostrar("5.5 $lt valorLocacao 8", dbLoc.filmes.find({ valorLocacao: { $lt: 8 } }));
mostrar("5.6 $lte anoLancamento 1995", dbLoc.filmes.find({ anoLancamento: { $lte: 1995 } }));
mostrar("5.7 faixa 1990 < ano < 2010", dbLoc.filmes.find({ anoLancamento: { $gt: 1990, $lt: 2010 } }));

// 6. Operadores (jogos)
mostrar("6.1 $in PS4/PS5", dbLoc.jogos.find({ plataforma: { $in: ["PlayStation 4", "PlayStation 5"] } }));
mostrar("6.2 $nin PC/Switch", dbLoc.jogos.find({ plataforma: { $nin: ["PC", "Nintendo Switch"] } }));
mostrar("6.3 $or Ação ou valor > 15", dbLoc.jogos.find({ $or: [{ genero: "Ação" }, { valorLocacao: { $gt: 15 } }] }));
mostrar("6.4 $and disponivel e ano >= 2017", dbLoc.jogos.find({ $and: [{ disponivel: true }, { anoLancamento: { $gte: 2017 } }] }));
mostrar("6.5 $exists multiplayer true", dbLoc.jogos.find({ multiplayer: { $exists: true } }));
mostrar("6.5 $exists multiplayer false", dbLoc.jogos.find({ multiplayer: { $exists: false } }));

// 7. Entre as duas entidades
mostrar("7 filmes disponiveis ate 10", dbLoc.filmes.find({ disponivel: true, valorLocacao: { $lte: 10 } }));
mostrar("7 jogos disponiveis ate 10", dbLoc.jogos.find({ disponivel: true, valorLocacao: { $lte: 10 } }));
mostrar("7 filmes >= 2017", dbLoc.filmes.find({ anoLancamento: { $gte: 2017 } }));
mostrar("7 jogos >= 2017", dbLoc.jogos.find({ anoLancamento: { $gte: 2017 } }));

// 8. deleteOne
printjson(dbLoc.filmes.deleteOne({ titulo: "Toy Story" }));
mostrar("8 filmes restantes (4)", dbLoc.filmes.find());
