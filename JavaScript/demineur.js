/*	By The GTN	*/

var SetupListener = function() {
	blocDeBoutons();
	play = false;
	Yolo = false;
	compteMine = 0;
	compteAide = 0;
}

window.addEventListener("load",SetupListener);

var blocDeBoutons = function() {
	var easy = document.createElement("button");
	easy.id = "easy";
	var medium = document.createElement("button");
	medium.id = "medium";
	var hard = document.createElement("button");
	hard.id = "hard";
	var choose = document.createElement("button");
	choose.id= "choose";
	var bloc = document.createElement("div");
	bloc.id = "bloc"
	var help = document.createElement("button");
	help.id = "help";
	var cheat = document.createElement("button");
	cheat.id = "cheat";
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(bloc);
	bloc.appendChild(easy);
	bloc.appendChild(medium);
	bloc.appendChild(hard);
	bloc.appendChild(choose);
	bloc.appendChild(help);
	bloc.appendChild(cheat);
	var texte1 = document.createTextNode("facile");
	easy.appendChild(texte1);
	var texte2 = document.createTextNode("moyen");
	medium.appendChild(texte2);
	var texte3 = document.createTextNode("chaud");
	hard.appendChild(texte3);
	var texte = document.createTextNode("Construis ton plateau");
	choose.appendChild(texte);
	var texte4 = document.createTextNode("Tu veux De L'aide ?");
	help.appendChild(texte4);
	var texte5 = document.createTextNode("Si t'es mauvais tu peux tricher");
	cheat.appendChild(texte5);
	
	easy.addEventListener("click",easyGame);
	medium.addEventListener("click",mediumGame);
	hard.addEventListener("click",hardGame);
	choose.addEventListener("click",gogogo);
	help.addEventListener("click",aide);
	cheat.addEventListener("click",triche);
	
}

var gogogo = function() {
	var x = window.prompt("Combien de lignes ?");
	while(x>2==false) {
		var x = window.prompt("Sélectionnes un nombre valide de lignes, au moins 3");
	}
	var y = window.prompt("Combien de colonnes ?");
	while(y>2==false) {
		var y = window.prompt("Sélectionnes un nombre valide de colonnes, au moins 3");
	}
	choosenGame(x,y);
}

var choosenGame = function(x,y) {
	var body = document.getElementsByTagName("body")[0]
	var game = document.createElement("table");
	game.id = "game";
	var tbody = document.createElement("tbody");
	for (ligne=0; ligne<x; ligne++) {
		var row = document.createElement("tr");
		for (colonne=0; colonne<y; colonne++) {
			var column = document.createElement("td");
			column.id = ligne+"-"+colonne;
			column.style.backgroundColor = "grey";
			column.addEventListener("click",letsgo);
			row.appendChild(column);
		}
		tbody.appendChild(row);
	}
	game.appendChild(tbody);
	if (play == false) {
		body.appendChild(game);
		yeah = 0;
		play = true;
	}
	else if (play == true) {
		var ask = window.prompt("Are you sure to quit your game ?");
		ask = ask.toLowerCase();
		if (ask == "yes" || ask == "oui" || ask == "si" || ask == "da") {
			compteAide = 0;
			yeah = 0;
			Yolo = false;
			var firstGame = document.getElementsByTagName("table")[0];
			body.removeChild(firstGame);
			body.appendChild(game);
			document.getElementById("affiche").parentNode.removeChild(document.getElementById("affiche"));
			compteMine = 0;
		}
	}
}
	

var easyGame = function() {
	choosenGame(5,5);
}

var mediumGame = function() {
	choosenGame(8,8);
}

var hardGame = function() {
	choosenGame(10,10);
}

var letsgo = function() {
	Yolo = true;
	var lesTd = document.getElementsByTagName("td");
	var lesTr = document.getElementsByTagName("tr");
	var ligne = parseInt(this.id.split("-")[0]);
	var colonne = parseInt(this.id.split("-")[1]);
	this.className = "safe";
	var laLigne = lesTr[ligne].getElementsByTagName("td");
	if (colonne != 0) {
		laLigne[colonne-1].className = "safe";
	}
	if (colonne != laLigne.length-1) {
		laLigne[colonne+1].className = "safe";
	}
	if (ligne != 0) {
		var laLigneAuDessus = lesTr[ligne-1].getElementsByTagName("td");
		laLigneAuDessus[colonne].className = "safe";
		if (colonne != 0) {
			laLigneAuDessus[colonne-1].className = "safe";
		}
		if (colonne != laLigne.length-1) {
			laLigneAuDessus[colonne+1].className = "safe";
		}
	}
	if (ligne != lesTr.length-1) {
		var laLigneAuDessous = lesTr[ligne+1].getElementsByTagName("td");
		laLigneAuDessous[colonne].className = "safe";
		if (colonne != 0) {
			laLigneAuDessous[colonne-1].className = "safe";
		}
		if (colonne != laLigne.length-1) {
			laLigneAuDessous[colonne+1].className = "safe";
		}
	}
	for (i=0;i<lesTd.length; i++) {
		OnPlaceLesMines(lesTd[i]);
	}
	AllezGoOnAffecte();
	for (i=0;i<lesTd.length; i++) {
		lesTd[i].addEventListener("click",CliqueSurLesZero);
		lesTd[i].addEventListener("click",CliqueAutour);
		lesTd[i].addEventListener("click",Demine);
		lesTd[i].removeEventListener("click", letsgo);
	}
	this.click();
	
}

var OnPlaceLesMines = function(uneCase,mines) {
	if (uneCase.className == "") {
		var aleatoire = Math.random();
		if (aleatoire > 0.70) {
			uneCase.className = "mine";
			uneCase.style.backgroundColor = "grey";
		}
		else {
			uneCase.className = "safe";
			uneCase.style.backgroundColor = "grey";
		}
	}
}



var AllezGoOnAffecte = function() {
	var tousLesTd = document.getElementsByTagName("td");
	for (i=0; i<tousLesTd.length; i++) {
		if (tousLesTd[i].className== "safe") {
			affecterValeur(tousLesTd[i]);
		}
	}
}


var affecterValeur = function(UneCase) {
		var numero = 0;
		var ligne = parseInt(UneCase.id.split("-")[0]);
		var colonne = parseInt(UneCase.id.split("-")[1]);
		var LesLignes = document.getElementsByTagName("tr");
		var LesColonnes = LesLignes[ligne].getElementsByTagName("td");
		if (colonne == 0) {
			if (ligne == 0) {
				if (LesColonnes[colonne+1].className=="mine") {
					numero++;
				}
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				if (LesColonnesAuDessous[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessous[colonne+1].className=="mine") {
					numero++;
				}
			}
			else if (ligne == LesLignes.length-1) {
				if (LesColonnes[colonne+1].className=="mine") {
					numero++;
				}
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				if (LesColonnesAuDessus[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessus[colonne+1].className=="mine") {
					numero++;
				}
			}
			else {
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				if (LesColonnes[colonne+1].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessous[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessous[colonne+1].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessus[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessus[colonne+1].className=="mine") {
					numero++;
				}
			}
		}
		else if (colonne == LesColonnes.length-1) {
			if (ligne == 0) {
				if (LesColonnes[colonne-1].className=="mine") {
					numero++;
				}
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				if (LesColonnesAuDessous[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessous[colonne-1].className=="mine") {
					numero++;
				}
			}
			else if (ligne == LesLignes.length-1) {
				if (LesColonnes[colonne-1].className=="mine") {
					numero++;
				}
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				if (LesColonnesAuDessus[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessus[colonne-1].className=="mine") {
					numero++;
				}
			}
			else {
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				if (LesColonnes[colonne-1].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessous[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessous[colonne-1].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessus[colonne].className=="mine") {
					numero++;
				}
				if (LesColonnesAuDessus[colonne-1].className=="mine") {
					numero++;
				}
			}
		}
				
		else if (ligne == 0) {
			var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
			if (LesColonnes[colonne-1].className=="mine")  {
				numero++;
			}
			if (LesColonnes[colonne+1].className=="mine")  {
				numero++;
			}
			if (LesColonnesAuDessous[colonne-1].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessous[colonne].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessous[colonne+1].className=="mine") {
				numero++;
			}
		}
		else if (ligne == LesLignes.length-1) {
			var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
			if (LesColonnes[colonne-1].className=="mine")  {
				numero++;
			}
			if (LesColonnes[colonne+1].className=="mine")  {
				numero++;
			}
			if (LesColonnesAuDessus[colonne-1].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessus[colonne].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessus[colonne+1].className=="mine") {
				numero++;
			}
		}
		else {
			var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
			var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
			if (LesColonnesAuDessus[colonne-1].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessus[colonne].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessus[colonne+1].className=="mine") {
				numero++;
			}
			if (LesColonnes[colonne-1].className=="mine")  {
				numero++;
			}
			if (LesColonnes[colonne+1].className=="mine")  {
				numero++;
			}
			if (LesColonnesAuDessous[colonne-1].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessous[colonne].className=="mine") {
				numero++;
			}
			if (LesColonnesAuDessous[colonne+1].className=="mine") {
				numero++;
			}
		}
		UneCase.id = ligne+"-"+colonne+"-"+numero;
}

var Demine = function() {
	var lesTd = document.getElementsByTagName("td");
	var mines = document.getElementsByClassName("mine");
	if (this.className == "mine") {
		this.style.backgroundColor = "";
		for(i=0;i<lesTd.length;i++) {
			lesTd[i].removeEventListener("click",Demine);
			lesTd[i].removeEventListener("click",CliqueSurLesZero);
			lesTd[i].removeEventListener("click",CliqueAutour);
		}
		window.alert("Sorry, you loose.");
		document.getElementById("affiche").parentNode.removeChild(document.getElementById("affiche"));
		compteMine = 0;
		compteAide = 0;
		play = false;
		yolo = false;
		rageQuit = window.setTimeout(enleverTableau,500);
	}
	else {
		if (this.style.backgroundColor == "grey") {
			yeah++;
			this.style.backgroundColor = "";
		}
		if ( yeah == lesTd.length - mines.length ) {
			window.alert("Bravoooo t'as gagné !!!! ^^ ");
			for (i=0; i<mines.length;i++) {
				mines[i].removeEventListener("click",Demine);
				mines[i].style.backgroundColor = "rgb(255, 215, 0)";
			}
			var safe = document.getElementsByClassName("mine");
			for (i=0; i<safe.length;i++) {
				safe[i].removeEventListener("click",Demine);
			}
			document.getElementById("affiche").parentNode.removeChild(document.getElementById("affiche"));
			compteMine = 0;
		}
		else {
			numero = parseInt(this.id.split("-")[2]);
			if (numero != 0) {
				this.innerHTML = numero;
			}
		}
	}
}

var CliqueSurLesZero = function() {
	ligne = parseInt(this.id.split("-")[0]);
	colonne = parseInt(this.id.split("-")[1]);
	var LesLignes = document.getElementsByTagName("tr");
	var LesColonnes = LesLignes[ligne].getElementsByTagName("td");
	if (colonne==0) {
		if (ligne==0) {
			var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
			if (LesColonnes[colonne+1].className != "mine") {
				if (LesColonnes[colonne+1].id.split("-")[2] == "0") {
					LesColonnes[colonne+1].click();
				}
			}
			if (LesColonnesAuDessous[colonne].className != "mine") {
				if (LesColonnesAuDessous[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessous[colonne].click();
				}
			}
		}
		else if (ligne==LesLignes.length-1) {
			var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
			if (LesColonnes[colonne+1].className != "mine") {
				if (LesColonnes[colonne+1].id.split("-")[2] == "0") {
					LesColonnes[colonne+1].click();
				}
			}
			if (LesColonnesAuDessus[colonne].className != "mine") {
				if (LesColonnesAuDessus[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessus[colonne].click();
				}
			}
		}
		else {
			var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
			var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
			if (LesColonnes[colonne+1].className != "mine") {
				if (LesColonnes[colonne+1].id.split("-")[2] == "0") {
					LesColonnes[colonne+1].click();
				}
			}
			if (LesColonnesAuDessous[colonne].className != "mine") {
				if (LesColonnesAuDessous[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessous[colonne].click();
				}
			}
			if (LesColonnesAuDessus[colonne].className != "mine") {
				if (LesColonnesAuDessus[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessus[colonne].click();
				}
			}
		}
	}
	else if (colonne == LesColonnes.length-1) {
		if (ligne==0) {
			var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
			if (LesColonnes[colonne-1].className != "mine") {
				if (LesColonnes[colonne-1].id.split("-")[2] == "0") {
					LesColonnes[colonne-1].click();
				}
			}
			if (LesColonnesAuDessous[colonne].className != "mine") {
				if (LesColonnesAuDessous[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessous[colonne].click();
				}
			}
		}
		else if (ligne==LesLignes.length-1) {
			var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
			if (LesColonnes[colonne-1].className != "mine") {
				if (LesColonnes[colonne-1].id.split("-")[2] == "0") {
					LesColonnes[colonne-1].click();
				}
			}
			if (LesColonnesAuDessus[colonne].className != "mine") {
				if (LesColonnesAuDessus[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessus[colonne].click();
				}
			}
		}
		else {
			var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
			var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
			if (LesColonnes[colonne-1].className != "mine") {
				if (LesColonnes[colonne-1].id.split("-")[2] == "0") {
					LesColonnes[colonne-1].click();
				}
			}
			if (LesColonnesAuDessous[colonne].className != "mine") {
				if (LesColonnesAuDessous[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessous[colonne].click();
				}
			}
			if (LesColonnesAuDessus[colonne].className != "mine") {
				if (LesColonnesAuDessus[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessus[colonne].click();
				}
			}
		}
	}
	else if (ligne==0) {
		var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
		if (LesColonnes[colonne-1].className != "mine") {
				if (LesColonnes[colonne-1].id.split("-")[2] == "0") {
					LesColonnes[colonne-1].click();
				}
			}
		if (LesColonnes[colonne+1].className != "mine") {
				if (LesColonnes[colonne+1].id.split("-")[2] == "0") {
					LesColonnes[colonne+1].click();
				}
			}
		if (LesColonnesAuDessous[colonne].className != "mine") {
				if (LesColonnesAuDessous[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessous[colonne].click();
				}
			}
	}
	else if (ligne == LesLignes.length-1) {
		var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
		if (LesColonnes[colonne-1].className != "mine") {
				if (LesColonnes[colonne-1].id.split("-")[2] == "0") {
					LesColonnes[colonne-1].click();
				}
			}
		if (LesColonnes[colonne+1].className != "mine") {
				if (LesColonnes[colonne+1].id.split("-")[2] == "0") {
					LesColonnes[colonne+1].click();
				}
			}
		if (LesColonnesAuDessus[colonne].className != "mine") {
				if (LesColonnesAuDessus[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessus[colonne].click();
				}
			}
	}
	else {
		var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
		var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
		if (LesColonnes[colonne-1].className != "mine") {
				if (LesColonnes[colonne-1].id.split("-")[2] == "0") {
					LesColonnes[colonne-1].click();
				}
			}
		if (LesColonnes[colonne+1].className != "mine") {
				if (LesColonnes[colonne+1].id.split("-")[2] == "0") {
					LesColonnes[colonne+1].click();
				}
			}
		if (LesColonnesAuDessus[colonne].className != "mine") {
				if (LesColonnesAuDessus[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessus[colonne].click();
				}
			}
		if (LesColonnesAuDessous[colonne].className != "mine") {
				if (LesColonnesAuDessous[colonne].id.split("-")[2] == "0") {
					LesColonnesAuDessous[colonne].click();
				}
			}
	}
}

var CliqueAutour = function() {
	if (this.className!="mine") {
		if (parseInt(this.id.split("-")[2]) == 0) {
			var ligne = parseInt(this.id.split("-")[0]);
			var colonne = parseInt(this.id.split("-")[1]);
			var LesLignes = document.getElementsByTagName("tr");
			var LesColonnes = LesLignes[ligne].getElementsByTagName("td");
			if (colonne == 0) {
				if (ligne == 0) {
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					LesColonnes[colonne+1].click();
					LesColonnesAuDessous[colonne].click();
					LesColonnesAuDessous[colonne+1].click();
				}
				else if (ligne == LesLignes.length-1) {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					LesColonnes[colonne+1].click();
					LesColonnesAuDessus[colonne].click();
					LesColonnesAuDessus[colonne+1].click();
				}
				else {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					LesColonnes[colonne+1].click();
					LesColonnesAuDessous[colonne].click();
					LesColonnesAuDessous[colonne+1].click();
					LesColonnesAuDessus[colonne].click();
					LesColonnesAuDessus[colonne+1].click();
				}
			}
			else if (colonne == LesColonnes.length-1) {
				if (ligne == 0) {
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					LesColonnes[colonne-1].click();
					LesColonnesAuDessous[colonne].click();
					LesColonnesAuDessous[colonne-1].click();
				}
				else if (ligne == LesLignes.length-1) {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					LesColonnes[colonne-1].click();
					LesColonnesAuDessus[colonne].click();
					LesColonnesAuDessus[colonne-1].click();
				}
				else {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					LesColonnes[colonne-1].click();
					LesColonnesAuDessous[colonne].click();
					LesColonnesAuDessous[colonne-1].click();
					LesColonnesAuDessus[colonne].click();
					LesColonnesAuDessus[colonne-1].click();
				}
			}
			else if (ligne == 0) {
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				LesColonnes[colonne-1].click();
				LesColonnes[colonne+1].click();
				LesColonnesAuDessous[colonne].click();
				LesColonnesAuDessous[colonne-1].click();
				LesColonnesAuDessous[colonne+1].click();
			}
			else if (ligne == LesLignes.length-1) {
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				LesColonnes[colonne-1].click();
				LesColonnes[colonne+1].click();
				LesColonnesAuDessus[colonne].click();
				LesColonnesAuDessus[colonne-1].click();
				LesColonnesAuDessus[colonne+1].click();
			}
			else {
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				LesColonnes[colonne-1].click();
				LesColonnes[colonne+1].click();
				LesColonnesAuDessous[colonne].click();
				LesColonnesAuDessous[colonne-1].click();
				LesColonnesAuDessous[colonne+1].click();
				LesColonnesAuDessus[colonne].click();
				LesColonnesAuDessus[colonne-1].click();
				LesColonnesAuDessus[colonne+1].click();
			}
		}
	}
}

var enleverTableau = function() {
	var tableau = document.getElementById("game");
	tableau.parentNode.removeChild(tableau);
}

var aide = function() {
	if(play == true) {
		if (Yolo == true) {
			compteAide++
			var list = []
			var td = document.getElementsByTagName("td");
			for(i=0;i<td.length;i++) {
				if( list.length != 1) {
					if(td[i].className != "mine" && td[i].style.backgroundColor != "") {
						list.push(td[i]);
					}
				}
			}
			list[0].click();
			var mines = document.getElementsByClassName("mine");
			if(compteAide > mines.length/2) {
				window.alert("Faut pas déconner non plus, je te fais tout le boulot là... Pour la peine, go te faire perdre !");
				mines[0].click();
				compteAide = 0;
			}
		}
		else {
			window.alert("Je sais que t'es mauvais mais là c'est de la mauvaise foi...");
		}
	}
}

var triche = function() {
	if(play == true) {
		var ask = window.prompt("QUOI TU VEUX TRICHER ??");
		ask = ask.toLowerCase();
		if (ask == "yes" || ask == "oui" || ask == "si" || ask == "da") {
			window.alert("Tu es faible. Tu ne mérites pas de jouer au démineur.");
			rageQuit = window.setTimeout(fermerFenetre,1);
		}
	}
}

var fermerFenetre = function() {
	window.close();
}

var ListAutour = function(Case) {
	res = [];
	if (Case.className!="mine") {
		if (parseInt(Case.id.split("-")[2]) == 0) {
			var ligne = parseInt(Case.id.split("-")[0]);
			var colonne = parseInt(Case.id.split("-")[1]);
			var LesLignes = document.getElementsByTagName("tr");
			var LesColonnes = LesLignes[ligne].getElementsByTagName("td");
			if (colonne == 0) {
				if (ligne == 0) {
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					res += [LesColonnes[colonne+1],LesColonnesAuDessous[colonne],LesColonnesAuDessous[colonne+1]]
				}
				else if (ligne == LesLignes.length-1) {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					res += [LesColonnes[colonne+1],LesColonnesAuDessus[colonne],LesColonnesAuDessus[colonne+1]]
				}
				else {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					res += [LesColonnes[colonne+1],LesColonnesAuDessus[colonne],LesColonnesAuDessus[colonne+1],LesColonnesAuDessous[colonne],LesColonnesAuDessous[colonne+1]]
				}
			}
			else if (colonne == LesColonnes.length-1) {
				if (ligne == 0) {
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					res += [LesColonnes[colonne-1],LesColonnesAuDessous[colonne],LesColonnesAuDessous[colonne-1]]
				}
				else if (ligne == LesLignes.length-1) {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					res += [LesColonnes[colonne-1],LesColonnesAuDessus[colonne],LesColonnesAuDessus[colonne-1]]
				}
				else {
					var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
					var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
					res += [LesColonnes[colonne-1],LesColonnesAuDessous[colonne],LesColonnesAuDessous[colonne-1],LesColonnesAuDessus[colonne],LesColonnesAuDessus[colonne-1]]
				}
			}
			else if (ligne == 0) {
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				res += [LesColonnes[colonne-1]]
				LesColonnes[colonne-1].click();
				LesColonnes[colonne+1].click();
				LesColonnesAuDessous[colonne].click();
				LesColonnesAuDessous[colonne-1].click();
				LesColonnesAuDessous[colonne+1].click();
			}
			else if (ligne == LesLignes.length-1) {
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				LesColonnes[colonne-1].click();
				LesColonnes[colonne+1].click();
				LesColonnesAuDessus[colonne].click();
				LesColonnesAuDessus[colonne-1].click();
				LesColonnesAuDessus[colonne+1].click();
			}
			else {
				var LesColonnesAuDessous = LesLignes[ligne+1].getElementsByTagName("td");
				var LesColonnesAuDessus = LesLignes[ligne-1].getElementsByTagName("td");
				LesColonnes[colonne-1].click();
				LesColonnes[colonne+1].click();
				LesColonnesAuDessous[colonne].click();
				LesColonnesAuDessous[colonne-1].click();
				LesColonnesAuDessous[colonne+1].click();
				LesColonnesAuDessus[colonne].click();
				LesColonnesAuDessus[colonne-1].click();
				LesColonnesAuDessus[colonne+1].click();
			}
		}
	}
	
}