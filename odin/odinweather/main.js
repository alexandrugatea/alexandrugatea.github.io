!(function () {
	"use strict";
	async function t(t) {
		const e = await fetch(t, { mode: "cors" });
		if (!e.ok) throw new Error("Network response was not ok");
		return await e.json();
	}
	function e() {
		document.getElementById("loader").classList.add("open");
	}
	function n() {
		document.getElementById("loader").classList.remove("open");
	}
	const a = {
		lessThanXSeconds: { one: "less than a second", other: "less than {{count}} seconds" },
		xSeconds: { one: "1 second", other: "{{count}} seconds" },
		halfAMinute: "half a minute",
		lessThanXMinutes: { one: "less than a minute", other: "less than {{count}} minutes" },
		xMinutes: { one: "1 minute", other: "{{count}} minutes" },
		aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
		xHours: { one: "1 hour", other: "{{count}} hours" },
		xDays: { one: "1 day", other: "{{count}} days" },
		aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
		xWeeks: { one: "1 week", other: "{{count}} weeks" },
		aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
		xMonths: { one: "1 month", other: "{{count}} months" },
		aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
		xYears: { one: "1 year", other: "{{count}} years" },
		overXYears: { one: "over 1 year", other: "over {{count}} years" },
		almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
	};
	function r(t) {
		return (e = {}) => {
			const n = e.width ? String(e.width) : t.defaultWidth;
			return t.formats[n] || t.formats[t.defaultWidth];
		};
	}
	const o = {
			date: r({
				formats: { full: "EEEE, MMMM do, y", long: "MMMM do, y", medium: "MMM d, y", short: "MM/dd/yyyy" },
				defaultWidth: "full",
			}),
			time: r({
				formats: { full: "h:mm:ss a zzzz", long: "h:mm:ss a z", medium: "h:mm:ss a", short: "h:mm a" },
				defaultWidth: "full",
			}),
			dateTime: r({
				formats: {
					full: "{{date}} 'at' {{time}}",
					long: "{{date}} 'at' {{time}}",
					medium: "{{date}}, {{time}}",
					short: "{{date}}, {{time}}",
				},
				defaultWidth: "full",
			}),
		},
		i = {
			lastWeek: "'last' eeee 'at' p",
			yesterday: "'yesterday at' p",
			today: "'today at' p",
			tomorrow: "'tomorrow at' p",
			nextWeek: "eeee 'at' p",
			other: "P",
		};
	function c(t) {
		return (e, n) => {
			let a;
			if ("formatting" === (n?.context ? String(n.context) : "standalone") && t.formattingValues) {
				const e = t.defaultFormattingWidth || t.defaultWidth,
					r = n?.width ? String(n.width) : e;
				a = t.formattingValues[r] || t.formattingValues[e];
			} else {
				const e = t.defaultWidth,
					r = n?.width ? String(n.width) : t.defaultWidth;
				a = t.values[r] || t.values[e];
			}
			return a[t.argumentCallback ? t.argumentCallback(e) : e];
		};
	}
	function s(t) {
		return (e, n = {}) => {
			const a = n.width,
				r = (a && t.matchPatterns[a]) || t.matchPatterns[t.defaultMatchWidth],
				o = e.match(r);
			if (!o) return null;
			const i = o[0],
				c = (a && t.parsePatterns[a]) || t.parsePatterns[t.defaultParseWidth],
				s = Array.isArray(c)
					? (function (t, e) {
							for (let n = 0; n < t.length; n++) if (e(t[n])) return n;
							return;
						})(c, (t) => t.test(i))
					: (function (t, e) {
							for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return n;
							return;
						})(c, (t) => t.test(i));
			let d;
			(d = t.valueCallback ? t.valueCallback(s) : s), (d = n.valueCallback ? n.valueCallback(d) : d);
			return { value: d, rest: e.slice(i.length) };
		};
	}
	var d;
	const u = {
		code: "en-US",
		formatDistance: (t, e, n) => {
			let r;
			const o = a[t];
			return (
				(r = "string" == typeof o ? o : 1 === e ? o.one : o.other.replace("{{count}}", e.toString())),
				n?.addSuffix ? (n.comparison && n.comparison > 0 ? "in " + r : r + " ago") : r
			);
		},
		formatLong: o,
		formatRelative: (t, e, n, a) => i[t],
		localize: {
			ordinalNumber: (t, e) => {
				const n = Number(t),
					a = n % 100;
				if (a > 20 || a < 10)
					switch (a % 10) {
						case 1:
							return n + "st";
						case 2:
							return n + "nd";
						case 3:
							return n + "rd";
					}
				return n + "th";
			},
			era: c({
				values: { narrow: ["B", "A"], abbreviated: ["BC", "AD"], wide: ["Before Christ", "Anno Domini"] },
				defaultWidth: "wide",
			}),
			quarter: c({
				values: {
					narrow: ["1", "2", "3", "4"],
					abbreviated: ["Q1", "Q2", "Q3", "Q4"],
					wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
				},
				defaultWidth: "wide",
				argumentCallback: (t) => t - 1,
			}),
			month: c({
				values: {
					narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
					abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					wide: [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December",
					],
				},
				defaultWidth: "wide",
			}),
			day: c({
				values: {
					narrow: ["S", "M", "T", "W", "T", "F", "S"],
					short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
					wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				},
				defaultWidth: "wide",
			}),
			dayPeriod: c({
				values: {
					narrow: {
						am: "a",
						pm: "p",
						midnight: "mi",
						noon: "n",
						morning: "morning",
						afternoon: "afternoon",
						evening: "evening",
						night: "night",
					},
					abbreviated: {
						am: "AM",
						pm: "PM",
						midnight: "midnight",
						noon: "noon",
						morning: "morning",
						afternoon: "afternoon",
						evening: "evening",
						night: "night",
					},
					wide: {
						am: "a.m.",
						pm: "p.m.",
						midnight: "midnight",
						noon: "noon",
						morning: "morning",
						afternoon: "afternoon",
						evening: "evening",
						night: "night",
					},
				},
				defaultWidth: "wide",
				formattingValues: {
					narrow: {
						am: "a",
						pm: "p",
						midnight: "mi",
						noon: "n",
						morning: "in the morning",
						afternoon: "in the afternoon",
						evening: "in the evening",
						night: "at night",
					},
					abbreviated: {
						am: "AM",
						pm: "PM",
						midnight: "midnight",
						noon: "noon",
						morning: "in the morning",
						afternoon: "in the afternoon",
						evening: "in the evening",
						night: "at night",
					},
					wide: {
						am: "a.m.",
						pm: "p.m.",
						midnight: "midnight",
						noon: "noon",
						morning: "in the morning",
						afternoon: "in the afternoon",
						evening: "in the evening",
						night: "at night",
					},
				},
				defaultFormattingWidth: "wide",
			}),
		},
		match: {
			ordinalNumber:
				((d = {
					matchPattern: /^(\d+)(th|st|nd|rd)?/i,
					parsePattern: /\d+/i,
					valueCallback: (t) => parseInt(t, 10),
				}),
				(t, e = {}) => {
					const n = t.match(d.matchPattern);
					if (!n) return null;
					const a = n[0],
						r = t.match(d.parsePattern);
					if (!r) return null;
					let o = d.valueCallback ? d.valueCallback(r[0]) : r[0];
					return (o = e.valueCallback ? e.valueCallback(o) : o), { value: o, rest: t.slice(a.length) };
				}),
			era: s({
				matchPatterns: {
					narrow: /^(b|a)/i,
					abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
					wide: /^(before christ|before common era|anno domini|common era)/i,
				},
				defaultMatchWidth: "wide",
				parsePatterns: { any: [/^b/i, /^(a|c)/i] },
				defaultParseWidth: "any",
			}),
			quarter: s({
				matchPatterns: { narrow: /^[1234]/i, abbreviated: /^q[1234]/i, wide: /^[1234](th|st|nd|rd)? quarter/i },
				defaultMatchWidth: "wide",
				parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
				defaultParseWidth: "any",
				valueCallback: (t) => t + 1,
			}),
			month: s({
				matchPatterns: {
					narrow: /^[jfmasond]/i,
					abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
					wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
				},
				defaultMatchWidth: "wide",
				parsePatterns: {
					narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
					any: [
						/^ja/i,
						/^f/i,
						/^mar/i,
						/^ap/i,
						/^may/i,
						/^jun/i,
						/^jul/i,
						/^au/i,
						/^s/i,
						/^o/i,
						/^n/i,
						/^d/i,
					],
				},
				defaultParseWidth: "any",
			}),
			day: s({
				matchPatterns: {
					narrow: /^[smtwf]/i,
					short: /^(su|mo|tu|we|th|fr|sa)/i,
					abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
					wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
				},
				defaultMatchWidth: "wide",
				parsePatterns: {
					narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
					any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
				},
				defaultParseWidth: "any",
			}),
			dayPeriod: s({
				matchPatterns: {
					narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
					any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
				},
				defaultMatchWidth: "any",
				parsePatterns: {
					any: {
						am: /^a/i,
						pm: /^p/i,
						midnight: /^mi/i,
						noon: /^no/i,
						morning: /morning/i,
						afternoon: /afternoon/i,
						evening: /evening/i,
						night: /night/i,
					},
				},
				defaultParseWidth: "any",
			}),
		},
		options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
	};
	let l = {};
	function m() {
		return l;
	}
	Math.pow(10, 8);
	const h = 6048e5,
		f = 864e5;
	function p(t) {
		const e = Object.prototype.toString.call(t);
		return t instanceof Date || ("object" == typeof t && "[object Date]" === e)
			? new t.constructor(+t)
			: "number" == typeof t || "[object Number]" === e || "string" == typeof t || "[object String]" === e
				? new Date(t)
				: new Date(NaN);
	}
	function g(t) {
		const e = p(t);
		return e.setHours(0, 0, 0, 0), e;
	}
	function w(t) {
		const e = p(t),
			n = new Date(
				Date.UTC(
					e.getFullYear(),
					e.getMonth(),
					e.getDate(),
					e.getHours(),
					e.getMinutes(),
					e.getSeconds(),
					e.getMilliseconds()
				)
			);
		return n.setUTCFullYear(e.getFullYear()), +t - +n;
	}
	function y(t, e) {
		const n = g(t),
			a = g(e),
			r = +n - w(n),
			o = +a - w(a);
		return Math.round((r - o) / f);
	}
	function b(t, e) {
		return t instanceof Date ? new t.constructor(e) : new Date(e);
	}
	function v(t) {
		const e = p(t),
			n = b(t, 0);
		return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
	}
	function L(t) {
		const e = p(t);
		return y(e, v(e)) + 1;
	}
	function M(t, e) {
		const n = m(),
			a =
				e?.weekStartsOn ??
				e?.locale?.options?.weekStartsOn ??
				n.weekStartsOn ??
				n.locale?.options?.weekStartsOn ??
				0,
			r = p(t),
			o = r.getDay(),
			i = (o < a ? 7 : 0) + o - a;
		return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
	}
	function S(t) {
		return M(t, { weekStartsOn: 1 });
	}
	function C(t) {
		const e = p(t),
			n = e.getFullYear(),
			a = b(t, 0);
		a.setFullYear(n + 1, 0, 4), a.setHours(0, 0, 0, 0);
		const r = S(a),
			o = b(t, 0);
		o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
		const i = S(o);
		return e.getTime() >= r.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
	}
	function k(t) {
		const e = C(t),
			n = b(t, 0);
		return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), S(n);
	}
	function E(t) {
		const e = p(t),
			n = +S(e) - +k(e);
		return Math.round(n / h) + 1;
	}
	function T(t, e) {
		const n = p(t),
			a = n.getFullYear(),
			r = m(),
			o =
				e?.firstWeekContainsDate ??
				e?.locale?.options?.firstWeekContainsDate ??
				r.firstWeekContainsDate ??
				r.locale?.options?.firstWeekContainsDate ??
				1,
			i = b(t, 0);
		i.setFullYear(a + 1, 0, o), i.setHours(0, 0, 0, 0);
		const c = M(i, e),
			s = b(t, 0);
		s.setFullYear(a, 0, o), s.setHours(0, 0, 0, 0);
		const d = M(s, e);
		return n.getTime() >= c.getTime() ? a + 1 : n.getTime() >= d.getTime() ? a : a - 1;
	}
	function x(t, e) {
		const n = m(),
			a =
				e?.firstWeekContainsDate ??
				e?.locale?.options?.firstWeekContainsDate ??
				n.firstWeekContainsDate ??
				n.locale?.options?.firstWeekContainsDate ??
				1,
			r = T(t, e),
			o = b(t, 0);
		o.setFullYear(r, 0, a), o.setHours(0, 0, 0, 0);
		return M(o, e);
	}
	function D(t, e) {
		const n = p(t),
			a = +M(n, e) - +x(n, e);
		return Math.round(a / h) + 1;
	}
	function H(t, e) {
		return (t < 0 ? "-" : "") + Math.abs(t).toString().padStart(e, "0");
	}
	const P = {
			y(t, e) {
				const n = t.getFullYear(),
					a = n > 0 ? n : 1 - n;
				return H("yy" === e ? a % 100 : a, e.length);
			},
			M(t, e) {
				const n = t.getMonth();
				return "M" === e ? String(n + 1) : H(n + 1, 2);
			},
			d(t, e) {
				return H(t.getDate(), e.length);
			},
			a(t, e) {
				const n = t.getHours() / 12 >= 1 ? "pm" : "am";
				switch (e) {
					case "a":
					case "aa":
						return n.toUpperCase();
					case "aaa":
						return n;
					case "aaaaa":
						return n[0];
					default:
						return "am" === n ? "a.m." : "p.m.";
				}
			},
			h(t, e) {
				return H(t.getHours() % 12 || 12, e.length);
			},
			H(t, e) {
				return H(t.getHours(), e.length);
			},
			m(t, e) {
				return H(t.getMinutes(), e.length);
			},
			s(t, e) {
				return H(t.getSeconds(), e.length);
			},
			S(t, e) {
				const n = e.length,
					a = t.getMilliseconds();
				return H(Math.trunc(a * Math.pow(10, n - 3)), e.length);
			},
		},
		q = "midnight",
		W = "noon",
		$ = "morning",
		N = "afternoon",
		Y = "evening",
		O = "night",
		F = {
			G: function (t, e, n) {
				const a = t.getFullYear() > 0 ? 1 : 0;
				switch (e) {
					case "G":
					case "GG":
					case "GGG":
						return n.era(a, { width: "abbreviated" });
					case "GGGGG":
						return n.era(a, { width: "narrow" });
					default:
						return n.era(a, { width: "wide" });
				}
			},
			y: function (t, e, n) {
				if ("yo" === e) {
					const e = t.getFullYear(),
						a = e > 0 ? e : 1 - e;
					return n.ordinalNumber(a, { unit: "year" });
				}
				return P.y(t, e);
			},
			Y: function (t, e, n, a) {
				const r = T(t, a),
					o = r > 0 ? r : 1 - r;
				if ("YY" === e) {
					return H(o % 100, 2);
				}
				return "Yo" === e ? n.ordinalNumber(o, { unit: "year" }) : H(o, e.length);
			},
			R: function (t, e) {
				return H(C(t), e.length);
			},
			u: function (t, e) {
				return H(t.getFullYear(), e.length);
			},
			Q: function (t, e, n) {
				const a = Math.ceil((t.getMonth() + 1) / 3);
				switch (e) {
					case "Q":
						return String(a);
					case "QQ":
						return H(a, 2);
					case "Qo":
						return n.ordinalNumber(a, { unit: "quarter" });
					case "QQQ":
						return n.quarter(a, { width: "abbreviated", context: "formatting" });
					case "QQQQQ":
						return n.quarter(a, { width: "narrow", context: "formatting" });
					default:
						return n.quarter(a, { width: "wide", context: "formatting" });
				}
			},
			q: function (t, e, n) {
				const a = Math.ceil((t.getMonth() + 1) / 3);
				switch (e) {
					case "q":
						return String(a);
					case "qq":
						return H(a, 2);
					case "qo":
						return n.ordinalNumber(a, { unit: "quarter" });
					case "qqq":
						return n.quarter(a, { width: "abbreviated", context: "standalone" });
					case "qqqqq":
						return n.quarter(a, { width: "narrow", context: "standalone" });
					default:
						return n.quarter(a, { width: "wide", context: "standalone" });
				}
			},
			M: function (t, e, n) {
				const a = t.getMonth();
				switch (e) {
					case "M":
					case "MM":
						return P.M(t, e);
					case "Mo":
						return n.ordinalNumber(a + 1, { unit: "month" });
					case "MMM":
						return n.month(a, { width: "abbreviated", context: "formatting" });
					case "MMMMM":
						return n.month(a, { width: "narrow", context: "formatting" });
					default:
						return n.month(a, { width: "wide", context: "formatting" });
				}
			},
			L: function (t, e, n) {
				const a = t.getMonth();
				switch (e) {
					case "L":
						return String(a + 1);
					case "LL":
						return H(a + 1, 2);
					case "Lo":
						return n.ordinalNumber(a + 1, { unit: "month" });
					case "LLL":
						return n.month(a, { width: "abbreviated", context: "standalone" });
					case "LLLLL":
						return n.month(a, { width: "narrow", context: "standalone" });
					default:
						return n.month(a, { width: "wide", context: "standalone" });
				}
			},
			w: function (t, e, n, a) {
				const r = D(t, a);
				return "wo" === e ? n.ordinalNumber(r, { unit: "week" }) : H(r, e.length);
			},
			I: function (t, e, n) {
				const a = E(t);
				return "Io" === e ? n.ordinalNumber(a, { unit: "week" }) : H(a, e.length);
			},
			d: function (t, e, n) {
				return "do" === e ? n.ordinalNumber(t.getDate(), { unit: "date" }) : P.d(t, e);
			},
			D: function (t, e, n) {
				const a = L(t);
				return "Do" === e ? n.ordinalNumber(a, { unit: "dayOfYear" }) : H(a, e.length);
			},
			E: function (t, e, n) {
				const a = t.getDay();
				switch (e) {
					case "E":
					case "EE":
					case "EEE":
						return n.day(a, { width: "abbreviated", context: "formatting" });
					case "EEEEE":
						return n.day(a, { width: "narrow", context: "formatting" });
					case "EEEEEE":
						return n.day(a, { width: "short", context: "formatting" });
					default:
						return n.day(a, { width: "wide", context: "formatting" });
				}
			},
			e: function (t, e, n, a) {
				const r = t.getDay(),
					o = (r - a.weekStartsOn + 8) % 7 || 7;
				switch (e) {
					case "e":
						return String(o);
					case "ee":
						return H(o, 2);
					case "eo":
						return n.ordinalNumber(o, { unit: "day" });
					case "eee":
						return n.day(r, { width: "abbreviated", context: "formatting" });
					case "eeeee":
						return n.day(r, { width: "narrow", context: "formatting" });
					case "eeeeee":
						return n.day(r, { width: "short", context: "formatting" });
					default:
						return n.day(r, { width: "wide", context: "formatting" });
				}
			},
			c: function (t, e, n, a) {
				const r = t.getDay(),
					o = (r - a.weekStartsOn + 8) % 7 || 7;
				switch (e) {
					case "c":
						return String(o);
					case "cc":
						return H(o, e.length);
					case "co":
						return n.ordinalNumber(o, { unit: "day" });
					case "ccc":
						return n.day(r, { width: "abbreviated", context: "standalone" });
					case "ccccc":
						return n.day(r, { width: "narrow", context: "standalone" });
					case "cccccc":
						return n.day(r, { width: "short", context: "standalone" });
					default:
						return n.day(r, { width: "wide", context: "standalone" });
				}
			},
			i: function (t, e, n) {
				const a = t.getDay(),
					r = 0 === a ? 7 : a;
				switch (e) {
					case "i":
						return String(r);
					case "ii":
						return H(r, e.length);
					case "io":
						return n.ordinalNumber(r, { unit: "day" });
					case "iii":
						return n.day(a, { width: "abbreviated", context: "formatting" });
					case "iiiii":
						return n.day(a, { width: "narrow", context: "formatting" });
					case "iiiiii":
						return n.day(a, { width: "short", context: "formatting" });
					default:
						return n.day(a, { width: "wide", context: "formatting" });
				}
			},
			a: function (t, e, n) {
				const a = t.getHours() / 12 >= 1 ? "pm" : "am";
				switch (e) {
					case "a":
					case "aa":
						return n.dayPeriod(a, { width: "abbreviated", context: "formatting" });
					case "aaa":
						return n.dayPeriod(a, { width: "abbreviated", context: "formatting" }).toLowerCase();
					case "aaaaa":
						return n.dayPeriod(a, { width: "narrow", context: "formatting" });
					default:
						return n.dayPeriod(a, { width: "wide", context: "formatting" });
				}
			},
			b: function (t, e, n) {
				const a = t.getHours();
				let r;
				switch (((r = 12 === a ? W : 0 === a ? q : a / 12 >= 1 ? "pm" : "am"), e)) {
					case "b":
					case "bb":
						return n.dayPeriod(r, { width: "abbreviated", context: "formatting" });
					case "bbb":
						return n.dayPeriod(r, { width: "abbreviated", context: "formatting" }).toLowerCase();
					case "bbbbb":
						return n.dayPeriod(r, { width: "narrow", context: "formatting" });
					default:
						return n.dayPeriod(r, { width: "wide", context: "formatting" });
				}
			},
			B: function (t, e, n) {
				const a = t.getHours();
				let r;
				switch (((r = a >= 17 ? Y : a >= 12 ? N : a >= 4 ? $ : O), e)) {
					case "B":
					case "BB":
					case "BBB":
						return n.dayPeriod(r, { width: "abbreviated", context: "formatting" });
					case "BBBBB":
						return n.dayPeriod(r, { width: "narrow", context: "formatting" });
					default:
						return n.dayPeriod(r, { width: "wide", context: "formatting" });
				}
			},
			h: function (t, e, n) {
				if ("ho" === e) {
					let e = t.getHours() % 12;
					return 0 === e && (e = 12), n.ordinalNumber(e, { unit: "hour" });
				}
				return P.h(t, e);
			},
			H: function (t, e, n) {
				return "Ho" === e ? n.ordinalNumber(t.getHours(), { unit: "hour" }) : P.H(t, e);
			},
			K: function (t, e, n) {
				const a = t.getHours() % 12;
				return "Ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : H(a, e.length);
			},
			k: function (t, e, n) {
				let a = t.getHours();
				return 0 === a && (a = 24), "ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : H(a, e.length);
			},
			m: function (t, e, n) {
				return "mo" === e ? n.ordinalNumber(t.getMinutes(), { unit: "minute" }) : P.m(t, e);
			},
			s: function (t, e, n) {
				return "so" === e ? n.ordinalNumber(t.getSeconds(), { unit: "second" }) : P.s(t, e);
			},
			S: function (t, e) {
				return P.S(t, e);
			},
			X: function (t, e, n) {
				const a = t.getTimezoneOffset();
				if (0 === a) return "Z";
				switch (e) {
					case "X":
						return j(a);
					case "XXXX":
					case "XX":
						return _(a);
					default:
						return _(a, ":");
				}
			},
			x: function (t, e, n) {
				const a = t.getTimezoneOffset();
				switch (e) {
					case "x":
						return j(a);
					case "xxxx":
					case "xx":
						return _(a);
					default:
						return _(a, ":");
				}
			},
			O: function (t, e, n) {
				const a = t.getTimezoneOffset();
				switch (e) {
					case "O":
					case "OO":
					case "OOO":
						return "GMT" + A(a, ":");
					default:
						return "GMT" + _(a, ":");
				}
			},
			z: function (t, e, n) {
				const a = t.getTimezoneOffset();
				switch (e) {
					case "z":
					case "zz":
					case "zzz":
						return "GMT" + A(a, ":");
					default:
						return "GMT" + _(a, ":");
				}
			},
			t: function (t, e, n) {
				return H(Math.trunc(t.getTime() / 1e3), e.length);
			},
			T: function (t, e, n) {
				return H(t.getTime(), e.length);
			},
		};
	function A(t, e = "") {
		const n = t > 0 ? "-" : "+",
			a = Math.abs(t),
			r = Math.trunc(a / 60),
			o = a % 60;
		return 0 === o ? n + String(r) : n + String(r) + e + H(o, 2);
	}
	function j(t, e) {
		if (t % 60 == 0) {
			return (t > 0 ? "-" : "+") + H(Math.abs(t) / 60, 2);
		}
		return _(t, e);
	}
	function _(t, e = "") {
		const n = t > 0 ? "-" : "+",
			a = Math.abs(t);
		return n + H(Math.trunc(a / 60), 2) + e + H(a % 60, 2);
	}
	const I = (t, e) => {
			switch (t) {
				case "P":
					return e.date({ width: "short" });
				case "PP":
					return e.date({ width: "medium" });
				case "PPP":
					return e.date({ width: "long" });
				default:
					return e.date({ width: "full" });
			}
		},
		B = (t, e) => {
			switch (t) {
				case "p":
					return e.time({ width: "short" });
				case "pp":
					return e.time({ width: "medium" });
				case "ppp":
					return e.time({ width: "long" });
				default:
					return e.time({ width: "full" });
			}
		},
		z = {
			p: B,
			P: (t, e) => {
				const n = t.match(/(P+)(p+)?/) || [],
					a = n[1],
					r = n[2];
				if (!r) return I(t, e);
				let o;
				switch (a) {
					case "P":
						o = e.dateTime({ width: "short" });
						break;
					case "PP":
						o = e.dateTime({ width: "medium" });
						break;
					case "PPP":
						o = e.dateTime({ width: "long" });
						break;
					default:
						o = e.dateTime({ width: "full" });
				}
				return o.replace("{{date}}", I(a, e)).replace("{{time}}", B(r, e));
			},
		},
		Q = /^D+$/,
		X = /^Y+$/,
		G = ["D", "DD", "YY", "YYYY"];
	function R(t) {
		return t instanceof Date || ("object" == typeof t && "[object Date]" === Object.prototype.toString.call(t));
	}
	function J(t) {
		if (!R(t) && "number" != typeof t) return !1;
		const e = p(t);
		return !isNaN(Number(e));
	}
	const U = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
		V = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
		K = /^'([^]*?)'?$/,
		Z = /''/g,
		tt = /[a-zA-Z]/;
	function et(t, e, n) {
		const a = m(),
			r = n?.locale ?? a.locale ?? u,
			o =
				n?.firstWeekContainsDate ??
				n?.locale?.options?.firstWeekContainsDate ??
				a.firstWeekContainsDate ??
				a.locale?.options?.firstWeekContainsDate ??
				1,
			i =
				n?.weekStartsOn ??
				n?.locale?.options?.weekStartsOn ??
				a.weekStartsOn ??
				a.locale?.options?.weekStartsOn ??
				0,
			c = p(t);
		if (!J(c)) throw new RangeError("Invalid time value");
		let s = e
			.match(V)
			.map((t) => {
				const e = t[0];
				if ("p" === e || "P" === e) {
					return (0, z[e])(t, r.formatLong);
				}
				return t;
			})
			.join("")
			.match(U)
			.map((t) => {
				if ("''" === t) return { isToken: !1, value: "'" };
				const e = t[0];
				if ("'" === e) return { isToken: !1, value: nt(t) };
				if (F[e]) return { isToken: !0, value: t };
				if (e.match(tt))
					throw new RangeError("Format string contains an unescaped latin alphabet character `" + e + "`");
				return { isToken: !1, value: t };
			});
		r.localize.preprocessor && (s = r.localize.preprocessor(c, s));
		const d = { firstWeekContainsDate: o, weekStartsOn: i, locale: r };
		return s
			.map((a) => {
				if (!a.isToken) return a.value;
				const o = a.value;
				((!n?.useAdditionalWeekYearTokens &&
					(function (t) {
						return X.test(t);
					})(o)) ||
					(!n?.useAdditionalDayOfYearTokens &&
						(function (t) {
							return Q.test(t);
						})(o))) &&
					(function (t, e, n) {
						const a = (function (t, e, n) {
							const a = "Y" === t[0] ? "years" : "days of the month";
							return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
						})(t, e, n);
						if ((console.warn(a), G.includes(t))) throw new RangeError(a);
					})(o, e, String(t));
				return (0, F[o[0]])(c, o, r.localize, d);
			})
			.join("");
	}
	function nt(t) {
		const e = t.match(K);
		return e ? e[1].replace(Z, "'") : t;
	}
	const at = function (t) {
			return et(t, "E, MMMM do, yyyy").replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
		},
		rt = function (t) {
			return et(t, "E, do").replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
		},
		ot = function (t) {
			const [e] = t.split(":"),
				n = new Date().getMinutes().toString().padStart(2, "0"),
				a = new Date().getSeconds().toString().padStart(2, "0");
			return `${e.padStart(2, "0")}:${n}:${a}`;
		};
	let it;
	function ct(t, e, n, a, r) {
		const o =
			((i = r),
			e.split(".").reduce(function (t, e) {
				return t && t[e];
			}, i));
		var i;
		const c = document.createElement("span"),
			s = document.createElement("span");
		c.classList.add("metric"),
			s.classList.add("imperial"),
			(c.innerHTML = `${o.metric}<span class="unit">${n}</span>`),
			(s.innerHTML = `${o.imperial}<span class="unit">${a}</span>`),
			(t.innerHTML = ""),
			t.classList.add("dual-value"),
			t.appendChild(c),
			t.appendChild(s);
	}
	function st(t) {
		let e = (function (t) {
				const [e, n] = t.localtime.split(" "),
					a = at(e),
					r = ot(n);
				return {
					country: t.country,
					city: t.name,
					lat: t.lat,
					lon: t.lon,
					localtime: { date: a, time: r },
					tz_id: t.tz_id,
					region: t.region,
				};
			})(t.location),
			n = (function (t) {
				return {
					clouds: t.cloud,
					code: t.condition.code,
					icon: t.condition.icon,
					text: t.condition.text,
					humidity: t.humidity,
					uv: t.uv,
					windDir: t.wind_dir,
					feelsLike: { metric: t.feelslike_c, imperial: t.feelslike_f },
					temp: { metric: t.temp_c, imperial: Math.round(t.temp_f) },
					wind: { metric: t.wind_kph, imperial: t.wind_mph },
					precipitation: { metric: t.precip_mm, imperial: t.precip_in },
					isDay: t.is_day,
				};
			})(t.current),
			a = (function (t, e) {
				const n = t.forecastday.map(function (t) {
						return {
							date: at(t.date),
							astro: { sunrise: t.astro.sunrise, sunset: t.astro.sunset },
							condition: t.day.condition.text,
							conditionIcon: t.day.condition.icon,
							temp: {
								max: { metric: t.day.maxtemp_c, imperial: t.day.maxtemp_f },
								min: { metric: t.day.mintemp_c, imperial: t.day.mintemp_f },
							},
							precip: { metric: t.day.totalprecip_mm, imperial: t.day.totalprecip_in },
						};
					}),
					a = new Date(e.localtime).getHours();
				let r = [];
				const o = t.forecastday[0].hour.slice(a + 1);
				let i = 24 - o.length;
				if (i > 0)
					for (let e = 1; e < t.forecastday.length && i > 0; e++) {
						const n = t.forecastday[e].hour.slice(0, i);
						(r = r.concat(n)), (i -= n.length);
					}
				return (
					(r = o.concat(r)),
					(r = r.map(function (t) {
						const e = t.time.split(" ")[1],
							n = t.time.split(" ")[0];
						return {
							date: rt(n),
							time: e,
							temp: { metric: t.temp_c, imperial: t.temp_f },
							feelsLike: { metric: t.feelslike_c, imperial: t.feelslike_f },
							precip: { metric: t.precip_mm, imperial: t.precip_in },
							wind: { metric: t.wind_kph, imperial: t.wind_mph },
							condition: t.condition.text,
							conditionIcon: t.condition.icon,
						};
					})),
					{ forecastDays: n, currentDayHours: r }
				);
			})(t.forecast, t.location);
		console.log(e),
			(function (t) {
				const e = document.querySelector("#locationCity"),
					n = document.querySelector("#locationRegion"),
					a = document.querySelector("#locationCountry"),
					r = document.querySelector("#locationCoords"),
					o = document.querySelector("#locationTime");
				(e.innerHTML = `${t.city}`),
					(n.innerHTML = `Region: ${t.region}, `),
					(a.innerHTML = `Country: ${t.country}.`),
					(r.innerHTML = `Lat: ${t.lat}, Lon: ${t.lon}`),
					it && clearInterval(it);
				const i = function () {
					const [e] = t.localtime.time.split(":"),
						n = new Date(),
						a = `${e}:${n.getMinutes().toString().padStart(2, "0")}:${n.getSeconds().toString().padStart(2, "0")}`;
					o.innerHTML = `${t.localtime.date}, ${a}`;
				};
				i(), (it = setInterval(i, 1e3));
			})(e),
			(function (t) {
				const e = document.body;
				e.setAttribute("data-code", t.code),
					ct(document.querySelector(".weather-current-temp"), "temp", "&deg", "&deg", t),
					(document.querySelector("#currentIcon").src = t.icon);
				const n = document.querySelector("#currentText");
				(n.innerHTML = t.text),
					(n.innerHTML = t.text),
					(document.querySelector("#currentHumidity").innerHTML = `${t.humidity}<span class="unit">%<span>`),
					ct(document.querySelector(".weather-current-wind-values"), "wind", " kph", " mph", t),
					ct(
						document.querySelector(".weather-current-precipitation-values"),
						"precipitation",
						" mm",
						" in",
						t
					),
					(document.querySelector("#weatherCurrentClouds").innerHTML =
						`${t.clouds}<span class="unit">%<span>`),
					(document.querySelector("#weatherCurrentWindDir").innerHTML = `${t.windDir}`),
					(document.querySelector("#weatherCurrentUV").innerHTML = `${t.uv}`);
				const a = document.querySelector("#weatherNow");
				1 === t.isDay
					? (e.classList.remove("night"),
						e.classList.add("day"),
						a.classList.remove("night"),
						a.classList.add("day"))
					: (e.classList.remove("day"),
						e.classList.add("night"),
						a.classList.remove("day"),
						a.classList.add("night"));
			})(n),
			(function (t) {
				document.querySelector(".astro").innerHTML =
					`\n    Sunrise: ${t.forecastDays[0].astro.sunrise} ,\n    Sunset: ${t.forecastDays[0].astro.sunset}`;
				const e = document.querySelector("#weatherNextDays");
				(e.innerHTML = ""),
					t.forecastDays.forEach(function (t) {
						const n = document.createElement("div");
						n.className = "weather-day-card";
						const a = document.createElement("div");
						(a.className = "weather-card-date"), (a.innerHTML = t.date);
						const r = document.createElement("img");
						r.setAttribute("src", t.conditionIcon), r.setAttribute("alt", t.condition);
						const o = document.createElement("h3");
						o.classList.add("weather-condition"), (o.innerHTML = t.condition);
						const i = document.createElement("div");
						i.className = "weather-card-details";
						const c = document.createElement("div");
						c.classList.add("weather-card-temp-min");
						const s = document.createElement("span");
						s.classList.add("temp-icon"), (s.textContent = "lo");
						const d = document.createElement("div");
						d.classList.add("weather-day-duals"),
							ct(d, "temp.min", "&deg;", "&deg;", t),
							c.appendChild(s),
							c.appendChild(d);
						const u = document.createElement("div");
						u.classList.add("weather-card-divider"), (u.innerHTML = " | ");
						const l = document.createElement("div");
						l.classList.add("weather-card-temp-max");
						const m = document.createElement("span");
						m.classList.add("temp-icon"), (m.textContent = "hi");
						const h = document.createElement("div");
						h.classList.add("weather-day-duals"),
							ct(h, "temp.max", "&deg;", "&deg;", t),
							l.appendChild(m),
							l.appendChild(h);
						const f = document.createElement("div");
						f.classList.add("weather-day-precip");
						const p = document.createElement("span");
						p.classList.add("icon"), (p.textContent = "rainy");
						const g = document.createElement("div");
						ct(g, "precip", " mm", " in", t),
							f.appendChild(p),
							f.appendChild(g),
							i.appendChild(c),
							i.appendChild(u),
							i.appendChild(l),
							i.appendChild(f),
							n.appendChild(a),
							n.appendChild(r),
							n.appendChild(o),
							n.appendChild(i),
							e.appendChild(n);
					});
				const n = document.querySelector("#weatherHoursContainer");
				(n.innerHTML = ""),
					t.currentDayHours.forEach(function (t) {
						const e = document.createElement("div");
						e.className = "weather-hour-card";
						const a = document.createElement("div");
						a.classList.add("weather-hour-value"), (a.innerHTML = t.date);
						const r = document.createElement("div");
						r.classList.add("weather-hour-value"), (r.innerHTML = t.time);
						const o = document.createElement("img");
						o.setAttribute("src", t.conditionIcon), o.setAttribute("alt", t.condition);
						const i = document.createElement("h3");
						i.classList.add("weather-hour-condition"), (i.innerHTML = t.condition);
						const c = document.createElement("div");
						c.classList.add("weather-hour-temp");
						const s = document.createElement("span");
						s.classList.add("icon"), (s.textContent = "thermometer");
						const d = document.createElement("div");
						ct(d, "temp", "&deg;", "&deg;", t), c.appendChild(s), c.appendChild(d);
						const u = document.createElement("div");
						u.classList.add("weather-hour-precip");
						const l = document.createElement("span");
						l.classList.add("icon"), (l.textContent = "rainy");
						const m = document.createElement("div");
						ct(m, "precip", " mm", " in", t), u.appendChild(l), u.appendChild(m);
						const h = document.createElement("div");
						h.classList.add("weather-hour-wind");
						const f = document.createElement("span");
						f.classList.add("icon"), (f.textContent = "air");
						const p = document.createElement("div");
						ct(p, "wind", " mm", " in", t),
							h.appendChild(f),
							h.appendChild(p),
							e.appendChild(a),
							e.appendChild(r),
							e.appendChild(o),
							e.appendChild(i),
							e.appendChild(c),
							e.appendChild(u),
							e.appendChild(h),
							n.appendChild(e);
					});
			})(a);
	}
	function dt(t, e) {
		const n = document.createElement("div");
		n.classList.add(e);
		const a = document.createElement("p");
		a.classList.add(`${e}-message`), (a.innerHTML = t), n.appendChild(a);
		const r = document.createElement("span");
		r.classList.add("icon"),
			(r.textContent = "close"),
			n.appendChild(r),
			document.body.appendChild(n),
			setTimeout(function () {
				n.classList.add("open");
			}, 300),
			r.addEventListener("click", function () {
				n.classList.remove("open"),
					setTimeout(function () {
						n.remove();
					}, 300);
			});
		"toast" === e &&
			(setTimeout(function () {
				n.classList.remove("open");
			}, 3e3),
			setTimeout(function () {
				n.remove();
			}, 6e3));
	}
	function ut() {
		new Promise(function (t) {
			navigator.geolocation.getCurrentPosition(
				function (e) {
					const n = { lat: e.coords.latitude, lon: e.coords.longitude };
					t(n);
				},
				function (e) {
					console.warn("Location disabled by user ", e), t({ lat: 0, lon: 0 });
				}
			);
		}).then(function (a) {
			let r,
				o = a.lat,
				i = a.lon;
			const c = "62853d9a45c1413b89f201737240106";
			if (0 === o && 0 === i) {
				r = `https://api.weatherapi.com/v1/forecast.json?key=${c}&q=London&days=7`;
				dt("Location is Disabled. Retrieving weather data for London");
			} else r = `https://api.weatherapi.com/v1/forecast.json?key=${c}&q=${o},${i}&days=7`;
			e(),
				t(r)
					.then(function (t) {
						n(), st(t);
					})
					.catch(function (t) {
						console.error("Error fetching data: ", t);
					});
		}),
			(function () {
				const a = document.getElementById("newLocationField"),
					r = document.getElementById("newLocationForm"),
					o = document.getElementById("valueToFetchWeather"),
					i = document.getElementById("valueToDisplyOnUI");
				let c;
				a.addEventListener("input", function () {
					(o.value = a.value), (i.value = a.value), clearTimeout(c);
					const t = this.value;
					t.length > 2 &&
						(c = setTimeout(function () {
							const e = `https://api.locationiq.com/v1/autocomplete.php?key=pk.fa6e80804f9289787659846f822b3ee3&q=${t}&limit=5&dedupe=1`,
								n = document.getElementById("searchResults");
							fetch(e)
								.then(function (t) {
									return t.json();
								})
								.then(function (t) {
									if (!Array.isArray(t)) return;
									n.innerHTML = "";
									let e = -1;
									t.forEach(function (t, e) {
										const c = document.createElement("div");
										c.classList.add("dropdown-item"),
											(c.textContent = t.display_name),
											c.setAttribute("data-place", t.display_place),
											c.setAttribute("tabindex", -1),
											n.appendChild(c),
											c.addEventListener("click", function () {
												(a.value = c.textContent),
													(i.value = c.getAttribute("data-place")),
													(o.value = c
														.getAttribute("data-place")
														.normalize("NFD")
														.replace(/[\u0300-\u036f]/g, "")),
													(n.innerHTML = ""),
													r.requestSubmit(),
													r.reset();
											});
									}),
										document.addEventListener("keydown", function (t) {
											const a = n.querySelectorAll(".dropdown-item");
											0 !== a.length &&
												("ArrowDown" === t.key
													? ((e = (e + 1) % a.length), a[e].focus())
													: "ArrowUp" === t.key
														? ((e = (e - 1 + a.length) % a.length), a[e].focus())
														: "Enter" === t.key && e >= 0 && a[e].click());
										}),
										document.addEventListener("keydown", function (t) {
											"Escape" === t.key && ((n.innerHTML = ""), r.reset());
										});
								})
								.catch(function (t) {
									n.innerHTML = "";
									const e = a.value,
										r = document.createElement("div");
									r.classList.add("dropdown-item"),
										(r.innerHTML = `No locations found for <strong>${e}</strong>`),
										n.appendChild(r);
								});
						}, 100));
				}),
					r.addEventListener("submit", function (i) {
						if ((i.preventDefault(), "" === a.value || a.value.length < 3))
							return void dt("Please type a location", "toast");
						document.getElementById("searchResults").innerHTML = "";
						const c = o.value;
						if (c) {
							const a = `https://api.weatherapi.com/v1/forecast.json?key=62853d9a45c1413b89f201737240106&q=${c}&days=7`;
							e(),
								t(a)
									.then(function (t) {
										console.log(t), n(), st(t), r.reset();
									})
									.catch(function (t) {
										dt("Location not found", "toast"), n();
									});
						} else alert("Please enter a city name");
					}),
					document.querySelectorAll(".popular-place").forEach(function (a) {
						a.addEventListener("click", function (o) {
							o.preventDefault();
							const i = `https://api.weatherapi.com/v1/forecast.json?key=62853d9a45c1413b89f201737240106&q=${a.textContent}&days=7`;
							e(),
								t(i)
									.then(function (t) {
										console.log(t), n(), st(t), r.reset();
									})
									.catch(function (t) {
										dt("Location not found", "toast"), n();
									});
						});
					});
			})();
	}
	function lt() {
		const t = document.getElementById("localTime"),
			e = new Date(),
			n = `\n        <span class="local-time hours">${String(e.getHours()).padStart(2, "0")}</span>\n        <span class="local-time divider">:</span>\n        <span class="local-time minutes">${String(e.getMinutes()).padStart(2, "0")}</span>\n        <span class="local-time divider">:</span>\n        <span class="local-time seconds">${String(e.getSeconds()).padStart(2, "0")}</span>\n    `;
		t.innerHTML = n;
	}
	function mt() {
		const t = document.querySelector("#weatherHoursContainer");
		let e,
			n,
			a = !1;
		function r() {
			(a = !1), t.classList.remove("active");
		}
		t.addEventListener("mousedown", (r) =>
			(function (r) {
				(a = !0), t.classList.add("active"), (e = r.pageX - t.offsetLeft), (n = t.scrollLeft);
			})(r)
		),
			t.addEventListener("mouseup", r),
			t.addEventListener("mouseleave", r),
			t.addEventListener("mousemove", (r) =>
				(function (r, o) {
					if (!a) return;
					const i = r.pageX - t.offsetLeft,
						c = i - e;
					t.scrollLeft = n - c * o;
				})(r, 1)
			);
	}
	document.addEventListener("DOMContentLoaded", function () {
		const t = document.getElementById("refresh");
		ut(),
			(function () {
				const t = document.getElementById("units");
				let e = t.querySelector("#unit");
				const n = document.body;
				let a = "";
				const r = localStorage.getItem("unitsSystem", "metric");
				"metric" === r
					? ((e.innerHTML = "&deg;C"), n.classList.remove("metric", "imperial"), n.classList.add(r))
					: "imperial" === r &&
						((e.innerHTML = "&deg;F"), n.classList.remove("metric", "imperial"), n.classList.add(r)),
					t.addEventListener("click", function () {
						e.textContent.includes("C")
							? ((a = "imperial"), (e.innerHTML = "&deg;F"))
							: e.textContent.includes("F") && ((a = "metric"), (e.innerHTML = "&deg;C")),
							localStorage.setItem("unitsSystem", a),
							n.classList.remove("metric", "imperial"),
							n.classList.add(a);
					});
			})(),
			setInterval(lt, 1e3),
			lt(),
			mt(),
			(t.onclick = function () {
				ut();
			});
	});
})();
