/** @type {import('@lingui/conf').LinguiConfig} */
import { formatter } from "@lingui/format-json";

module.exports = {
	locales: ["en","fr"],
	sourceLocale: "en",
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["<rootDir>/src"],
		},
	],
	format: formatter({ style: "minimal" }),
};
