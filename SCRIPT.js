var atoms = { // tableau périodique avec les masses atomiques
	H: 1.00794,
	He: 4.002602,
	Li: 6.941,
	Be: 9.012182,
	B: 10.811,
	C: 12.011,
	N: 14.0067,
	O: 15.9994,
	F: 18.9984032,
	Ne: 20.1797,
	Na: 22.989770,
	Mg: 24.3050,
	Al: 26.981539,
	Si: 28.0855,
	P: 30.973762,
	S: 32.066,
	Cl: 35.4527,
	Ar: 39.948,
	K: 39.0983,
	Ca: 40.078,
	Sc: 44.95591,
	Ti: 47.88,
	V: 50.9415,
	Cr: 51.9961,
	Mn: 54.93805,
	Fe: 55.847,
	Co: 58.9332,
	Ni: 58.69,
	Cu: 63.546,
	Zn: 65.39,
	Ga: 69.723,
	Ge: 72.61,
	As: 74.92159,
	Se: 78.96,
	Br: 79.904,
	Kr: 83.8,
	Rb: 85.4678,
	Sr: 87.62,
	Y: 88.90585,
	Zr: 91.224,
	Nb: 92.90638,
	Mo: 95.94,
	Tc: 98.9063,
	Ru: 101.07,
	Rh: 102.9055,
	Pd: 106.42,
	Ag: 107.8682,
	Cd: 112.411,
	In: 114.82,
	Sn: 118.71,
	Sb: 121.75,
	Te: 127.6,
	I: 126.90447,
	Xe: 131.29,
	Cs: 132.90543,
	Ba: 137.327,
	La: 138.9055,
	Ce: 140.115,
	Pr: 140.90765,
	Nd: 144.24,
	Pm: 146.9151,
	Sm: 150.36,
	Eu: 151.965,
	Gd: 157.25,
	Tb: 158.92534,
	Dy: 162.5,
	Ho: 164.93032,
	Er: 167.26,
	Tm: 168.93421,
	Yb: 173.04,
	Lu: 174.967,
	Hf: 178.49,
	Ta: 180.9479,
	W: 183.85,
	Re: 186.207,
	Os: 190.2,
	Ir: 192.22,
	Pt: 195.08,
	Au: 196.96654,
	Hg: 200.59,
	Tl: 204.3833,
	Pb: 207.2,
	Bi: 208.98037,
	Po: 208.9824,
	At: 209.9871,
	Rn: 222.0176,
	Fr: 223.0197,
	Ra: 226.0254,
	Ac: 227.0278,
	U: 238.0289,
	Np: 237.0482,
	Pu: 244.0642,
	Am: 243.0614,
	Cm: 247.0703,
	Bk: 247.0703,
	Cf: 251.0796,
	Es: 252.0829,
	Fm: 257.0951,
	Md: 258.0986,
	No: 259.1009,
	Lr: 260.1053,
	Rf: 261.1087,
	Db: 262.1138,
	Sg: 263.1182,
	Bh: 262.1229,
	Hs: 265,
	Mt: 266,
	Ds: 269,
	Rg: 272,
	Cn: 277
};
var compteur;
var masseTotal;
var formule;

function transformSaisie(chaine) {
	var resultat = chaine.replace(/([0-9a-zA-Z])([^0-9a-zA-Z])/g, "$1 $2"); // Espace entre alphanum et non-alphanum
	resultat = resultat.replace(/([^0-9a-zA-Z])([0-9a-zA-Z])/g, "$1 $2"); // Espace entre non-alphanum et alphanum
	resultat = resultat.replace(/([a-z])([A-Z])/g, "$1 $2"); // Espace entre minuscule et majuscule
	resultat = resultat.replace(/([A-Z])([A-Z])/g, "$1 $2"); // Espace entre majuscule et majuscule
	resultat = resultat.replace(/([A-Z])([A-Z])/g, "$1 $2"); // Espace entre majuscule et majuscule
	resultat = resultat.replace(/([a-zA-Z])([0-9])/g, "$1 $2"); // Espace entre lettre et chiffre
	resultat = resultat.replace(/([0-9])([a-zA-Z])/g, "$1 $2"); // Espace entre chiffre et lettre
	console.log("Avant: " + chaine + "\nAprès: " + resultat);
	return resultat;
}

function calcule(){
  var nombrestoe = null;
  var nombrestoeType = null;
  masseTotal = 0; // On commence par une masse zéro
	compteur = 0
  document.getElementById('resultat').innerHTML = "";
	document.getElementById('faux').innerHTML = "Voici la liste de vos erreurs : ";
  formule = document.getElementById('formule').value;
	traitement = transformSaisie(formule);
  console.log('formule :'+formule);
	console.log('formule traitée:'+traitement);
	if( traitement.length === 0 ){ // Check si la formule est vide
		compteur=1
	}	else if(!isNaN(traitement.substr(0, 1))){ // Check si le premier caracètre est un nombre
			compteur=2
		}	else {
		var traitement = traitement.split(' '); // Transformation de la chaine de caractère en tableau
			traitement.reverse(); // Inversion de l'ordre de l'array pour faciliter le calcul.
		for (var i=0 ; i<traitement.length ; i++){ //On boucle sur le tableau
			var F = traitement[i];
			console.log( i + "==>> F : "+F);
			var Mass = verification(F);  //Cherche la valeur correspondante
				if(Mass !=null && !isNaN(Mass)){ //Check si l'atome déclaré dans le tableau
					console.log('Mass : '+Mass);
					if(nombrestoeType != "stoechiometrique"){ //Check si ce n'est pas un nombre stoechiometrique
							masseTotal += Mass; // On additionne les masses atomiques de la formule
							nombrestoeType = null;
							nombrestoe = 0;
					}	else{
								masseTotal += parseFloat(nombrestoe * Mass);//Si oui on multiplie le nombre stoechiometrique et la masse molaire atomique
								nombrestoeType = null;
								nombrestoe = 0;
						}
				}	else if(Number.isInteger(parseInt(F))){ //Si F est un nombre on définie ses varriables
						console.log(F +" est un nombre stoechiometrique");
						nombrestoeType = "stoechiometrique";
						nombrestoe = parseInt(F);
					}	else{ //Si non on reset les variables, et le compteur s'incrémente de 1
							nombrestoeType = null;
							nombrestoe = 0;
							console.log("Valeur inconnue : ("+F+") n'est ni un nombre, ni une valeur du tableau");
							compteur=2;
							document.getElementById('faux').innerHTML = document.getElementById('faux').innerHTML + "--" + F ;
						}
        }
    }
	affichage();
}

function verification(valeur){
	if(typeof(valeur)!='undefined' && valeur!=null){
  	if(atoms.hasOwnProperty(valeur)){ // Check s'il existe dans le tableau, retourne vrai ou faux
    	return atoms[valeur];
  	}	else{
			return null;
		}
	}
}

function affichage(){
	console.log(compteur)
	switch (compteur) {
		case 0:
			document.getElementById('resultat').innerHTML = "La masse molaire de " + formule + " est égale à " + masseTotal + " g/mol";
			document.getElementById('faux').innerHTML = "Vous n'avez aucune erreurs !";
			break;
		case 1:
			document.getElementById('resultat').innerHTML = "Attention le champs de saisie ne peut être vide !";
			document.getElementById('faux').innerHTML = "";
			break;
		case 2:
			document.getElementById('resultat').innerHTML = "La formule brute saisie est incorrecte !";
			break;
	}
}
