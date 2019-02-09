"use strict";
const select = document.querySelector.bind(document);
const selectAll = document.querySelectorAll.bind(document);

const domLoaded = new Promise(resolve => {
	setInterval(() => {
		if (document.readyState === "complete") {
			resolve();
		}
	}, 50);
});

const isMailPage = () => {
	return Boolean(document.querySelector("h2[data-thread-perm-id]"));
};

const update = () => {
	const enlargeRegex = /^unsubscribe/i;
	const links = selectAll("a");

	if (!links || links.length === 0) {
		return;
	}

	const fragment = document.createDocumentFragment();
	const enlarged = document.createElement("div");

	enlarged.classList.add("unsubscribe-container");
	fragment.append(enlarged);

	for (const link of links) {
		if (enlargeRegex.test(link.textContent)) {
			const bigLink = link.cloneNode(true);
			bigLink.style = {};
			bigLink.classList.add("unsubscribe");

			for (const child of bigLink.children) {
				child.style = {};
			}

			enlarged.append(bigLink);
		}
	}

	if (enlarged.children.length === 0) {
		return;
	}

	select("div.nH.aHU").before(fragment);
	return true;
};

const init = () => {
	update();

	window.addEventListener("hashchange", () => { // Update on navigation
		if (isMailPage()) {
			update();
		}
	});
};

domLoaded.then(init);
