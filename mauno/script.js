function newGame() {

	hide(".frame, .mask, .virus");
	unhide("#start");
	unhide("#game-container");

}

function prepareGame() {

	selectFinnish();

	$("#start__button-fi").onclick = selectFinnish;
	$("#start__button-en").onclick = selectEnglish;
	$("#start__button-play").onclick = function() {
		hide("#start");
		unhide("#put-mask");
	};

	$("#put-mask__button-no").onclick = function() {
		hide("#put-mask");
		unhide("#hmm, #lose__virus-nose, #lose__virus-mouth");
		setTimeout(function() {
			hide("#hmm");
			unhide("#lose");
		}, 800);
	};
	$("#put-mask__button-bad").onclick = function() {
		const masks = [];
		$("#hmm .mask").forEach(e => e.classList.forEach(c => c.indexOf("mask-") === 0 && masks.push(c)));
		const mask = masks[Math.floor(Math.random() * masks.length)];
		hide("#put-mask");
		unhide("." + mask);
		unhide("#hmm");
		setTimeout(function() {
			hide("#hmm");
			unhide("#lose");
		}, 800);
	};
	$("#put-mask__button-yes").onclick = function() {
		hide("#put-mask");
		unhide("#win");
	}

	$("#lose__button-replay").onclick = function() {
		hide("#lose, .mask, .virus");
		unhide("#start");
	};
	
	$("#win__button-replay").onclick = function() {
		hide("#win");
		unhide("#start");
	};

	newGame();

}

function selectFinnish() {
	unhide(".text-fi");
	hide(".text-en");
}

function selectEnglish() {
	unhide(".text-en");
	hide(".text-fi");
}


function $(s) {
	if (s.indexOf(",") === -1 && s.split(" ").at(-1)[0] === "#") {
		return document.querySelector(s);
	}
	return document.querySelectorAll(s);
}

function hide(s) {
	document.querySelectorAll(s).forEach(e => e.classList.add("hide"));
}

function unhide(s) {
	document.querySelectorAll(s).forEach(e => e.classList.remove("hide"));
}

function loadStuff() {
	resources.loadSVG();
}

window.onload = loadStuff;


const resources = {

	svgLoaded: 0,
	soundLoaded: 0,

	sources: {
		svg: {
			start:    "start",
			put_mask: "put_mask",
			hmm:      "hmm",
			lose:     "lose",
			win:      "win"
		},
		sound: {
		//	name: "source",
		}
	},

	loadSVG() {
		const path = "resources/svg/";
		const keys = Object.keys(this.sources.svg);
		for (let i = 0; i < keys.length; i++) {
			const src = path + this.sources.svg[keys[i]] + ".svg";
			load(src, cb);
		}
		function cb(txt) {
			document.getElementById("game-container").innerHTML += txt;
			resources.svgLoaded++;
			console.log("Loading in progress: " + resources.loadProgress() * 100 + " %");
			if (resources.loadProgress() === 1) prepareGame();
		}
	},

	loadProgress() {
		const totalSVG = Object.keys(this.sources.svg).length;
		const totalSound = Object.keys(this.sources.sound).length;
		return (this.svgLoaded + this.soundLoaded) / (totalSVG + totalSound);
	}

}


function load(src, cb) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if (this.status === 200) {
			cb(this.responseText);
		}
	}
	xhttp.open("GET", src, true);
	xhttp.send();
}