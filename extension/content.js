"use strict";

const domLoaded = new Promise(resolve => {
	const interval = setInterval(() => {
		if (document.readyState === "complete") {
			resolve();
			clearInterval(interval);
		}
	}, 50);
});

const isMailPage = () => Boolean(document.querySelector("h2[data-thread-perm-id]"));

const enlargeUnsubscribeLinks = () => {
	const enlargeRegex = /^unsubscribe/i;
	const links = document.querySelectorAll("a");

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

	document.querySelector("div.nH.aHU").before(fragment);
	return true;
};

(async () => {
	await domLoaded;

	enlargeUnsubscribeLinks();

	// Enlarge links on navigation
	window.addEventListener("hashchange", () => {
		if (isMailPage()) {
			enlargeUnsubscribeLinks();
		}
	});
})();
