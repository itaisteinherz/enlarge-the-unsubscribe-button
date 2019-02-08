"use strict";

const select = document.querySelector.bind(document);
select.all = document.querySelectorAll.bind(document);

const domLoaded = new Promise(resolve => {
	setInterval(() => {
		if (document.readyState === "complete") {
			resolve();
		}
	}, 50);
});

const update = () => {
	const enlargeRegExp = /^Unsubscribe/i;
	const links = select.all("a");

	if (links.length === 0) {
		return;
	}

	const fragment = document.createDocumentFragment();
	const enlarged = document.createElement("div");
	enlarged.classList.add("unsubscribe-container");
	fragment.append(enlarged);

	for (const link of links) {
		if (enlargeRegExp.test(link.textContent)) {
			const bigLink = link.cloneNode(true);
			bigLink.style = {};
			bigLink.classList.add("unsubscribe");
			enlarged.append(bigLink);
		}
	}

	if (enlarged.children.length === 0) {
		return;
	}

	select("div.nH.if").insertBefore(fragment, select("div.nH.aHU"));
	createdButtons = true;
};

let createdButtons = false;
let locationChanged = false;

const init = () => {
	update();

	window.addEventListener("hashchange", () => { // Update on page change
		if (createdButtons && !locationChanged) {
			locationChanged = true;
		} else if (!createdButtons || locationChanged) {
			update();
			createdButtons = true;
			locationChanged = false;
		}
	});
};

domLoaded.then(init);
