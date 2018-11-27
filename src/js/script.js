window.addEventListener("load", function() {
	init();
});

function init() {
	addEventListeners();
}

function addEventListeners() {
	const infoBlockElem = document.querySelector(".info-block");
	const btnVizualizeElem = document.querySelector(".input-block__btn");
	const textareaElem = document.querySelector(".input-block__textarea");

	btnVizualizeElem.addEventListener("click", function() {
		clearBlock(infoBlockElem);
		let parsedJson;
		try {
			parsedJson = JSON.parse(textareaElem.value)
		} catch (error) {
			alert("Неправильный json. Попробуйте снова)")
			return;
		}
		let json = {
			json: parsedJson
		};
		getVizualize(json, infoBlockElem);
	});

	infoBlockElem.addEventListener("click", function(event) {
		const target = event.target;

		if (target.classList.contains("dropdown__toggle")) {
			target.parentElement.classList.toggle("active");
		}
	});
};

function clearBlock(infoBlockElem) {
	infoBlockElem.innerHTML = "";
}

function getVizualize(json, infoBlockElem) {
	for (let key in json) {
		getVisualizeBlock(key, json[key], infoBlockElem);
	}
}

function getVisualizeBlock(keyName, json, blockElem) {
	const div = document.createElement("div");
	div.className = "dropdown";

	const button = document.createElement("button");
	button.className = "dropdown__toggle";
	button.innerHTML = keyName;

	div.appendChild(button);

	const divHidden = document.createElement("div");
	divHidden.className = "dropdown__menu";
	if (json instanceof Array) {
		div.classList.add("dropdown_array");
	}
	for (let key in json) {
		if (typeof json[key] === "object") {		
			getVisualizeBlock(key, json[key], divHidden);
			continue;
		}
		let divForObjectElem = document.createElement("div");
		divForObjectElem.className = "dropdown__text";
		divForObjectElem.innerHTML = key + ": " + json[key];
		divHidden.appendChild(divForObjectElem);
	}
	div.appendChild(divHidden);
	blockElem.appendChild(div);
}


