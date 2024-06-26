!(function () {
	"use strict";
	var t = {
		d: function (e, n) {
			for (var o in n) t.o(n, o) && !t.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: n[o] });
		},
		o: function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		},
	};
	t.d(
		{},
		{
			rw: function () {
				return Ce;
			},
			uJ: function () {
				return Ne;
			},
			Q2: function () {
				return Kt;
			},
			uL: function () {
				return ke;
			},
			dt: function () {
				return Vt;
			},
			DO: function () {
				return be;
			},
			wW: function () {
				return je;
			},
			$J: function () {
				return de;
			},
			oR: function () {
				return we;
			},
		}
	);
	Math.pow(10, 8);
	const e = 6048e5,
		n = 864e5,
		o = 6e4,
		a = 36e5,
		r = 43200,
		i = 1440;
	function s(t, e) {
		const n = e?.additionalDigits ?? 2,
			r = (function (t) {
				const e = {},
					n = t.split(c.dateTimeDelimiter);
				let o;
				if (n.length > 2) return e;
				/:/.test(n[0])
					? (o = n[0])
					: ((e.date = n[0]),
						(o = n[1]),
						c.timeZoneDelimiter.test(e.date) &&
							((e.date = t.split(c.timeZoneDelimiter)[0]), (o = t.substr(e.date.length, t.length))));
				if (o) {
					const t = c.timezone.exec(o);
					t ? ((e.time = o.replace(t[1], "")), (e.timezone = t[1])) : (e.time = o);
				}
				return e;
			})(t);
		let i;
		if (r.date) {
			const t = (function (t, e) {
				const n = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + e) + "})|(\\d{2}|[+-]\\d{" + (2 + e) + "})$)"),
					o = t.match(n);
				if (!o) return { year: NaN, restDateString: "" };
				const a = o[1] ? parseInt(o[1]) : null,
					r = o[2] ? parseInt(o[2]) : null;
				return { year: null === r ? a : 100 * r, restDateString: t.slice((o[1] || o[2]).length) };
			})(r.date, n);
			i = (function (t, e) {
				if (null === e) return new Date(NaN);
				const n = t.match(u);
				if (!n) return new Date(NaN);
				const o = !!n[4],
					a = m(n[1]),
					r = m(n[2]) - 1,
					i = m(n[3]),
					s = m(n[4]),
					c = m(n[5]) - 1;
				if (o)
					return (function (t, e, n) {
						return e >= 1 && e <= 53 && n >= 0 && n <= 6;
					})(0, s, c)
						? (function (t, e, n) {
								const o = new Date(0);
								o.setUTCFullYear(t, 0, 4);
								const a = o.getUTCDay() || 7,
									r = 7 * (e - 1) + n + 1 - a;
								return o.setUTCDate(o.getUTCDate() + r), o;
							})(e, s, c)
						: new Date(NaN);
				{
					const t = new Date(0);
					return (function (t, e, n) {
						return e >= 0 && e <= 11 && n >= 1 && n <= (h[e] || (p(t) ? 29 : 28));
					})(e, r, i) &&
						(function (t, e) {
							return e >= 1 && e <= (p(t) ? 366 : 365);
						})(e, a)
						? (t.setUTCFullYear(e, r, Math.max(a, i)), t)
						: new Date(NaN);
				}
			})(t.restDateString, t.year);
		}
		if (!i || isNaN(i.getTime())) return new Date(NaN);
		const s = i.getTime();
		let g,
			y = 0;
		if (
			r.time &&
			((y = (function (t) {
				const e = t.match(d);
				if (!e) return NaN;
				const n = f(e[1]),
					r = f(e[2]),
					i = f(e[3]);
				if (
					!(function (t, e, n) {
						if (24 === t) return 0 === e && 0 === n;
						return n >= 0 && n < 60 && e >= 0 && e < 60 && t >= 0 && t < 25;
					})(n, r, i)
				)
					return NaN;
				return n * a + r * o + 1e3 * i;
			})(r.time)),
			isNaN(y))
		)
			return new Date(NaN);
		if (!r.timezone) {
			const t = new Date(s + y),
				e = new Date(0);
			return (
				e.setFullYear(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()),
				e.setHours(t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds()),
				e
			);
		}
		return (
			(g = (function (t) {
				if ("Z" === t) return 0;
				const e = t.match(l);
				if (!e) return 0;
				const n = "+" === e[1] ? -1 : 1,
					r = parseInt(e[2]),
					i = (e[3] && parseInt(e[3])) || 0;
				if (
					!(function (t, e) {
						return e >= 0 && e <= 59;
					})(0, i)
				)
					return NaN;
				return n * (r * a + i * o);
			})(r.timezone)),
			isNaN(g) ? new Date(NaN) : new Date(s + y + g)
		);
	}
	const c = { dateTimeDelimiter: /[T ]/, timeZoneDelimiter: /[Z ]/i, timezone: /([Z+-].*)$/ },
		u = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
		d = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
		l = /^([+-])(\d{2})(?::?(\d{2}))?$/;
	function m(t) {
		return t ? parseInt(t) : 1;
	}
	function f(t) {
		return (t && parseFloat(t.replace(",", "."))) || 0;
	}
	const h = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	function p(t) {
		return t % 400 == 0 || (t % 4 == 0 && t % 100 != 0);
	}
	function g(t) {
		const e = Object.prototype.toString.call(t);
		return t instanceof Date || ("object" == typeof t && "[object Date]" === e)
			? new t.constructor(+t)
			: "number" == typeof t || "[object Number]" === e || "string" == typeof t || "[object String]" === e
				? new Date(t)
				: new Date(NaN);
	}
	function y(t, e) {
		const n = g(t),
			o = g(e),
			a = n.getTime() - o.getTime();
		return a < 0 ? -1 : a > 0 ? 1 : a;
	}
	function b(t, e, n) {
		return (
			(e = (function (t) {
				var e = (function (t, e) {
					if ("object" != typeof t || !t) return t;
					var n = t[Symbol.toPrimitive];
					if (void 0 !== n) {
						var o = n.call(t, e || "default");
						if ("object" != typeof o) return o;
						throw new TypeError("@@toPrimitive must return a primitive value.");
					}
					return ("string" === e ? String : Number)(t);
				})(t, "string");
				return "symbol" == typeof e ? e : e + "";
			})(e)) in t
				? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
				: (t[e] = n),
			t
		);
	}
	class v {
		constructor(t, e) {
			var n = this;
			b(this, "addTodo", function (t) {
				n.todos.push(t);
			}),
				b(this, "deleteTodo", function (t) {
					n.todos.splice(t, 1);
				}),
				b(this, "editTodo", function (t, e) {
					Object.assign(n.todos[t], e);
				}),
				b(this, "sortTodos", function () {
					n.todos.sort(function (t, e) {
						const n = y(s(`${t.dueDate}`), s(`${e.dueDate}`));
						if (0 !== n) return n;
						const o = { low: 3, medium: 2, high: 1 };
						return o[t.priority] - o[e.priority];
					});
				}),
				(this.name = t),
				(this.description = e),
				(this.todos = []);
		}
	}
	class w {
		constructor(t, e, n, o) {
			let a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
			(this.name = t), (this.dueDate = e), (this.priority = n), (this.projectName = o), (this.completed = a);
		}
		toggleComplete() {
			this.completed = !this.completed;
		}
	}
	function M(t, e) {
		return (t < 0 ? "-" : "") + Math.abs(t).toString().padStart(e, "0");
	}
	function k(t, e) {
		const n = g(t);
		if (isNaN(n.getTime())) throw new RangeError("Invalid time value");
		const o = e?.format ?? "extended",
			a = e?.representation ?? "complete";
		let r = "",
			i = "";
		const s = "extended" === o ? "-" : "",
			c = "extended" === o ? ":" : "";
		if ("time" !== a) {
			const t = M(n.getDate(), 2),
				e = M(n.getMonth() + 1, 2);
			r = `${M(n.getFullYear(), 4)}${s}${e}${s}${t}`;
		}
		if ("date" !== a) {
			const t = n.getTimezoneOffset();
			if (0 !== t) {
				const e = Math.abs(t);
				i = `${t < 0 ? "+" : "-"}${M(Math.trunc(e / 60), 2)}:${M(e % 60, 2)}`;
			} else i = "Z";
			r = `${r}${"" === r ? "" : "T"}${[M(n.getHours(), 2), M(n.getMinutes(), 2), M(n.getSeconds(), 2)].join(c)}${i}`;
		}
		return r;
	}
	function D(t) {
		const e = g(t);
		return e.setHours(0, 0, 0, 0), e;
	}
	function T() {
		return D(Date.now());
	}
	function x(t, e) {
		return t instanceof Date ? new t.constructor(e) : new Date(e);
	}
	function N(t, e) {
		const n = g(t);
		return isNaN(e) ? x(t, NaN) : e ? (n.setDate(n.getDate() + e), n) : n;
	}
	function E(t, e) {
		return N(t, 7 * e);
	}
	const S = {
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
	function j(t) {
		return (e = {}) => {
			const n = e.width ? String(e.width) : t.defaultWidth;
			return t.formats[n] || t.formats[t.defaultWidth];
		};
	}
	const B = {
			date: j({
				formats: { full: "EEEE, MMMM do, y", long: "MMMM do, y", medium: "MMM d, y", short: "MM/dd/yyyy" },
				defaultWidth: "full",
			}),
			time: j({
				formats: { full: "h:mm:ss a zzzz", long: "h:mm:ss a z", medium: "h:mm:ss a", short: "h:mm a" },
				defaultWidth: "full",
			}),
			dateTime: j({
				formats: {
					full: "{{date}} 'at' {{time}}",
					long: "{{date}} 'at' {{time}}",
					medium: "{{date}}, {{time}}",
					short: "{{date}}, {{time}}",
				},
				defaultWidth: "full",
			}),
		},
		C = {
			lastWeek: "'last' eeee 'at' p",
			yesterday: "'yesterday at' p",
			today: "'today at' p",
			tomorrow: "'tomorrow at' p",
			nextWeek: "eeee 'at' p",
			other: "P",
		};
	function L(t) {
		return (e, n) => {
			let o;
			if ("formatting" === (n?.context ? String(n.context) : "standalone") && t.formattingValues) {
				const e = t.defaultFormattingWidth || t.defaultWidth,
					a = n?.width ? String(n.width) : e;
				o = t.formattingValues[a] || t.formattingValues[e];
			} else {
				const e = t.defaultWidth,
					a = n?.width ? String(n.width) : t.defaultWidth;
				o = t.values[a] || t.values[e];
			}
			return o[t.argumentCallback ? t.argumentCallback(e) : e];
		};
	}
	function P(t) {
		return (e, n = {}) => {
			const o = n.width,
				a = (o && t.matchPatterns[o]) || t.matchPatterns[t.defaultMatchWidth],
				r = e.match(a);
			if (!r) return null;
			const i = r[0],
				s = (o && t.parsePatterns[o]) || t.parsePatterns[t.defaultParseWidth],
				c = Array.isArray(s)
					? (function (t, e) {
							for (let n = 0; n < t.length; n++) if (e(t[n])) return n;
							return;
						})(s, (t) => t.test(i))
					: (function (t, e) {
							for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return n;
							return;
						})(s, (t) => t.test(i));
			let u;
			(u = t.valueCallback ? t.valueCallback(c) : c), (u = n.valueCallback ? n.valueCallback(u) : u);
			return { value: u, rest: e.slice(i.length) };
		};
	}
	var I;
	const H = {
		code: "en-US",
		formatDistance: (t, e, n) => {
			let o;
			const a = S[t];
			return (
				(o = "string" == typeof a ? a : 1 === e ? a.one : a.other.replace("{{count}}", e.toString())),
				n?.addSuffix ? (n.comparison && n.comparison > 0 ? "in " + o : o + " ago") : o
			);
		},
		formatLong: B,
		formatRelative: (t, e, n, o) => C[t],
		localize: {
			ordinalNumber: (t, e) => {
				const n = Number(t),
					o = n % 100;
				if (o > 20 || o < 10)
					switch (o % 10) {
						case 1:
							return n + "st";
						case 2:
							return n + "nd";
						case 3:
							return n + "rd";
					}
				return n + "th";
			},
			era: L({
				values: { narrow: ["B", "A"], abbreviated: ["BC", "AD"], wide: ["Before Christ", "Anno Domini"] },
				defaultWidth: "wide",
			}),
			quarter: L({
				values: {
					narrow: ["1", "2", "3", "4"],
					abbreviated: ["Q1", "Q2", "Q3", "Q4"],
					wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
				},
				defaultWidth: "wide",
				argumentCallback: (t) => t - 1,
			}),
			month: L({
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
			day: L({
				values: {
					narrow: ["S", "M", "T", "W", "T", "F", "S"],
					short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
					wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				},
				defaultWidth: "wide",
			}),
			dayPeriod: L({
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
				((I = {
					matchPattern: /^(\d+)(th|st|nd|rd)?/i,
					parsePattern: /\d+/i,
					valueCallback: (t) => parseInt(t, 10),
				}),
				(t, e = {}) => {
					const n = t.match(I.matchPattern);
					if (!n) return null;
					const o = n[0],
						a = t.match(I.parsePattern);
					if (!a) return null;
					let r = I.valueCallback ? I.valueCallback(a[0]) : a[0];
					return (r = e.valueCallback ? e.valueCallback(r) : r), { value: r, rest: t.slice(o.length) };
				}),
			era: P({
				matchPatterns: {
					narrow: /^(b|a)/i,
					abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
					wide: /^(before christ|before common era|anno domini|common era)/i,
				},
				defaultMatchWidth: "wide",
				parsePatterns: { any: [/^b/i, /^(a|c)/i] },
				defaultParseWidth: "any",
			}),
			quarter: P({
				matchPatterns: { narrow: /^[1234]/i, abbreviated: /^q[1234]/i, wide: /^[1234](th|st|nd|rd)? quarter/i },
				defaultMatchWidth: "wide",
				parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
				defaultParseWidth: "any",
				valueCallback: (t) => t + 1,
			}),
			month: P({
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
			day: P({
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
			dayPeriod: P({
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
	let W = {};
	function O() {
		return W;
	}
	function $(t) {
		const e = g(t),
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
	function q(t, e) {
		const o = D(t),
			a = D(e),
			r = +o - $(o),
			i = +a - $(a);
		return Math.round((r - i) / n);
	}
	function Y(t) {
		const e = g(t),
			n = x(t, 0);
		return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
	}
	function F(t) {
		const e = g(t);
		return q(e, Y(e)) + 1;
	}
	function A(t, e) {
		const n = O(),
			o =
				e?.weekStartsOn ??
				e?.locale?.options?.weekStartsOn ??
				n.weekStartsOn ??
				n.locale?.options?.weekStartsOn ??
				0,
			a = g(t),
			r = a.getDay(),
			i = (r < o ? 7 : 0) + r - o;
		return a.setDate(a.getDate() - i), a.setHours(0, 0, 0, 0), a;
	}
	function z(t) {
		return A(t, { weekStartsOn: 1 });
	}
	function X(t) {
		const e = g(t),
			n = e.getFullYear(),
			o = x(t, 0);
		o.setFullYear(n + 1, 0, 4), o.setHours(0, 0, 0, 0);
		const a = z(o),
			r = x(t, 0);
		r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0);
		const i = z(r);
		return e.getTime() >= a.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
	}
	function Q(t) {
		const e = X(t),
			n = x(t, 0);
		return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), z(n);
	}
	function U(t) {
		const n = g(t),
			o = +z(n) - +Q(n);
		return Math.round(o / e) + 1;
	}
	function G(t, e) {
		const n = g(t),
			o = n.getFullYear(),
			a = O(),
			r =
				e?.firstWeekContainsDate ??
				e?.locale?.options?.firstWeekContainsDate ??
				a.firstWeekContainsDate ??
				a.locale?.options?.firstWeekContainsDate ??
				1,
			i = x(t, 0);
		i.setFullYear(o + 1, 0, r), i.setHours(0, 0, 0, 0);
		const s = A(i, e),
			c = x(t, 0);
		c.setFullYear(o, 0, r), c.setHours(0, 0, 0, 0);
		const u = A(c, e);
		return n.getTime() >= s.getTime() ? o + 1 : n.getTime() >= u.getTime() ? o : o - 1;
	}
	function J(t, e) {
		const n = O(),
			o =
				e?.firstWeekContainsDate ??
				e?.locale?.options?.firstWeekContainsDate ??
				n.firstWeekContainsDate ??
				n.locale?.options?.firstWeekContainsDate ??
				1,
			a = G(t, e),
			r = x(t, 0);
		r.setFullYear(a, 0, o), r.setHours(0, 0, 0, 0);
		return A(r, e);
	}
	function R(t, n) {
		const o = g(t),
			a = +A(o, n) - +J(o, n);
		return Math.round(a / e) + 1;
	}
	const Z = {
			y(t, e) {
				const n = t.getFullYear(),
					o = n > 0 ? n : 1 - n;
				return M("yy" === e ? o % 100 : o, e.length);
			},
			M(t, e) {
				const n = t.getMonth();
				return "M" === e ? String(n + 1) : M(n + 1, 2);
			},
			d(t, e) {
				return M(t.getDate(), e.length);
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
				return M(t.getHours() % 12 || 12, e.length);
			},
			H(t, e) {
				return M(t.getHours(), e.length);
			},
			m(t, e) {
				return M(t.getMinutes(), e.length);
			},
			s(t, e) {
				return M(t.getSeconds(), e.length);
			},
			S(t, e) {
				const n = e.length,
					o = t.getMilliseconds();
				return M(Math.trunc(o * Math.pow(10, n - 3)), e.length);
			},
		},
		V = "midnight",
		K = "noon",
		_ = "morning",
		tt = "afternoon",
		et = "evening",
		nt = "night",
		ot = {
			G: function (t, e, n) {
				const o = t.getFullYear() > 0 ? 1 : 0;
				switch (e) {
					case "G":
					case "GG":
					case "GGG":
						return n.era(o, { width: "abbreviated" });
					case "GGGGG":
						return n.era(o, { width: "narrow" });
					default:
						return n.era(o, { width: "wide" });
				}
			},
			y: function (t, e, n) {
				if ("yo" === e) {
					const e = t.getFullYear(),
						o = e > 0 ? e : 1 - e;
					return n.ordinalNumber(o, { unit: "year" });
				}
				return Z.y(t, e);
			},
			Y: function (t, e, n, o) {
				const a = G(t, o),
					r = a > 0 ? a : 1 - a;
				if ("YY" === e) {
					return M(r % 100, 2);
				}
				return "Yo" === e ? n.ordinalNumber(r, { unit: "year" }) : M(r, e.length);
			},
			R: function (t, e) {
				return M(X(t), e.length);
			},
			u: function (t, e) {
				return M(t.getFullYear(), e.length);
			},
			Q: function (t, e, n) {
				const o = Math.ceil((t.getMonth() + 1) / 3);
				switch (e) {
					case "Q":
						return String(o);
					case "QQ":
						return M(o, 2);
					case "Qo":
						return n.ordinalNumber(o, { unit: "quarter" });
					case "QQQ":
						return n.quarter(o, { width: "abbreviated", context: "formatting" });
					case "QQQQQ":
						return n.quarter(o, { width: "narrow", context: "formatting" });
					default:
						return n.quarter(o, { width: "wide", context: "formatting" });
				}
			},
			q: function (t, e, n) {
				const o = Math.ceil((t.getMonth() + 1) / 3);
				switch (e) {
					case "q":
						return String(o);
					case "qq":
						return M(o, 2);
					case "qo":
						return n.ordinalNumber(o, { unit: "quarter" });
					case "qqq":
						return n.quarter(o, { width: "abbreviated", context: "standalone" });
					case "qqqqq":
						return n.quarter(o, { width: "narrow", context: "standalone" });
					default:
						return n.quarter(o, { width: "wide", context: "standalone" });
				}
			},
			M: function (t, e, n) {
				const o = t.getMonth();
				switch (e) {
					case "M":
					case "MM":
						return Z.M(t, e);
					case "Mo":
						return n.ordinalNumber(o + 1, { unit: "month" });
					case "MMM":
						return n.month(o, { width: "abbreviated", context: "formatting" });
					case "MMMMM":
						return n.month(o, { width: "narrow", context: "formatting" });
					default:
						return n.month(o, { width: "wide", context: "formatting" });
				}
			},
			L: function (t, e, n) {
				const o = t.getMonth();
				switch (e) {
					case "L":
						return String(o + 1);
					case "LL":
						return M(o + 1, 2);
					case "Lo":
						return n.ordinalNumber(o + 1, { unit: "month" });
					case "LLL":
						return n.month(o, { width: "abbreviated", context: "standalone" });
					case "LLLLL":
						return n.month(o, { width: "narrow", context: "standalone" });
					default:
						return n.month(o, { width: "wide", context: "standalone" });
				}
			},
			w: function (t, e, n, o) {
				const a = R(t, o);
				return "wo" === e ? n.ordinalNumber(a, { unit: "week" }) : M(a, e.length);
			},
			I: function (t, e, n) {
				const o = U(t);
				return "Io" === e ? n.ordinalNumber(o, { unit: "week" }) : M(o, e.length);
			},
			d: function (t, e, n) {
				return "do" === e ? n.ordinalNumber(t.getDate(), { unit: "date" }) : Z.d(t, e);
			},
			D: function (t, e, n) {
				const o = F(t);
				return "Do" === e ? n.ordinalNumber(o, { unit: "dayOfYear" }) : M(o, e.length);
			},
			E: function (t, e, n) {
				const o = t.getDay();
				switch (e) {
					case "E":
					case "EE":
					case "EEE":
						return n.day(o, { width: "abbreviated", context: "formatting" });
					case "EEEEE":
						return n.day(o, { width: "narrow", context: "formatting" });
					case "EEEEEE":
						return n.day(o, { width: "short", context: "formatting" });
					default:
						return n.day(o, { width: "wide", context: "formatting" });
				}
			},
			e: function (t, e, n, o) {
				const a = t.getDay(),
					r = (a - o.weekStartsOn + 8) % 7 || 7;
				switch (e) {
					case "e":
						return String(r);
					case "ee":
						return M(r, 2);
					case "eo":
						return n.ordinalNumber(r, { unit: "day" });
					case "eee":
						return n.day(a, { width: "abbreviated", context: "formatting" });
					case "eeeee":
						return n.day(a, { width: "narrow", context: "formatting" });
					case "eeeeee":
						return n.day(a, { width: "short", context: "formatting" });
					default:
						return n.day(a, { width: "wide", context: "formatting" });
				}
			},
			c: function (t, e, n, o) {
				const a = t.getDay(),
					r = (a - o.weekStartsOn + 8) % 7 || 7;
				switch (e) {
					case "c":
						return String(r);
					case "cc":
						return M(r, e.length);
					case "co":
						return n.ordinalNumber(r, { unit: "day" });
					case "ccc":
						return n.day(a, { width: "abbreviated", context: "standalone" });
					case "ccccc":
						return n.day(a, { width: "narrow", context: "standalone" });
					case "cccccc":
						return n.day(a, { width: "short", context: "standalone" });
					default:
						return n.day(a, { width: "wide", context: "standalone" });
				}
			},
			i: function (t, e, n) {
				const o = t.getDay(),
					a = 0 === o ? 7 : o;
				switch (e) {
					case "i":
						return String(a);
					case "ii":
						return M(a, e.length);
					case "io":
						return n.ordinalNumber(a, { unit: "day" });
					case "iii":
						return n.day(o, { width: "abbreviated", context: "formatting" });
					case "iiiii":
						return n.day(o, { width: "narrow", context: "formatting" });
					case "iiiiii":
						return n.day(o, { width: "short", context: "formatting" });
					default:
						return n.day(o, { width: "wide", context: "formatting" });
				}
			},
			a: function (t, e, n) {
				const o = t.getHours() / 12 >= 1 ? "pm" : "am";
				switch (e) {
					case "a":
					case "aa":
						return n.dayPeriod(o, { width: "abbreviated", context: "formatting" });
					case "aaa":
						return n.dayPeriod(o, { width: "abbreviated", context: "formatting" }).toLowerCase();
					case "aaaaa":
						return n.dayPeriod(o, { width: "narrow", context: "formatting" });
					default:
						return n.dayPeriod(o, { width: "wide", context: "formatting" });
				}
			},
			b: function (t, e, n) {
				const o = t.getHours();
				let a;
				switch (((a = 12 === o ? K : 0 === o ? V : o / 12 >= 1 ? "pm" : "am"), e)) {
					case "b":
					case "bb":
						return n.dayPeriod(a, { width: "abbreviated", context: "formatting" });
					case "bbb":
						return n.dayPeriod(a, { width: "abbreviated", context: "formatting" }).toLowerCase();
					case "bbbbb":
						return n.dayPeriod(a, { width: "narrow", context: "formatting" });
					default:
						return n.dayPeriod(a, { width: "wide", context: "formatting" });
				}
			},
			B: function (t, e, n) {
				const o = t.getHours();
				let a;
				switch (((a = o >= 17 ? et : o >= 12 ? tt : o >= 4 ? _ : nt), e)) {
					case "B":
					case "BB":
					case "BBB":
						return n.dayPeriod(a, { width: "abbreviated", context: "formatting" });
					case "BBBBB":
						return n.dayPeriod(a, { width: "narrow", context: "formatting" });
					default:
						return n.dayPeriod(a, { width: "wide", context: "formatting" });
				}
			},
			h: function (t, e, n) {
				if ("ho" === e) {
					let e = t.getHours() % 12;
					return 0 === e && (e = 12), n.ordinalNumber(e, { unit: "hour" });
				}
				return Z.h(t, e);
			},
			H: function (t, e, n) {
				return "Ho" === e ? n.ordinalNumber(t.getHours(), { unit: "hour" }) : Z.H(t, e);
			},
			K: function (t, e, n) {
				const o = t.getHours() % 12;
				return "Ko" === e ? n.ordinalNumber(o, { unit: "hour" }) : M(o, e.length);
			},
			k: function (t, e, n) {
				let o = t.getHours();
				return 0 === o && (o = 24), "ko" === e ? n.ordinalNumber(o, { unit: "hour" }) : M(o, e.length);
			},
			m: function (t, e, n) {
				return "mo" === e ? n.ordinalNumber(t.getMinutes(), { unit: "minute" }) : Z.m(t, e);
			},
			s: function (t, e, n) {
				return "so" === e ? n.ordinalNumber(t.getSeconds(), { unit: "second" }) : Z.s(t, e);
			},
			S: function (t, e) {
				return Z.S(t, e);
			},
			X: function (t, e, n) {
				const o = t.getTimezoneOffset();
				if (0 === o) return "Z";
				switch (e) {
					case "X":
						return rt(o);
					case "XXXX":
					case "XX":
						return it(o);
					default:
						return it(o, ":");
				}
			},
			x: function (t, e, n) {
				const o = t.getTimezoneOffset();
				switch (e) {
					case "x":
						return rt(o);
					case "xxxx":
					case "xx":
						return it(o);
					default:
						return it(o, ":");
				}
			},
			O: function (t, e, n) {
				const o = t.getTimezoneOffset();
				switch (e) {
					case "O":
					case "OO":
					case "OOO":
						return "GMT" + at(o, ":");
					default:
						return "GMT" + it(o, ":");
				}
			},
			z: function (t, e, n) {
				const o = t.getTimezoneOffset();
				switch (e) {
					case "z":
					case "zz":
					case "zzz":
						return "GMT" + at(o, ":");
					default:
						return "GMT" + it(o, ":");
				}
			},
			t: function (t, e, n) {
				return M(Math.trunc(t.getTime() / 1e3), e.length);
			},
			T: function (t, e, n) {
				return M(t.getTime(), e.length);
			},
		};
	function at(t, e = "") {
		const n = t > 0 ? "-" : "+",
			o = Math.abs(t),
			a = Math.trunc(o / 60),
			r = o % 60;
		return 0 === r ? n + String(a) : n + String(a) + e + M(r, 2);
	}
	function rt(t, e) {
		if (t % 60 == 0) {
			return (t > 0 ? "-" : "+") + M(Math.abs(t) / 60, 2);
		}
		return it(t, e);
	}
	function it(t, e = "") {
		const n = t > 0 ? "-" : "+",
			o = Math.abs(t);
		return n + M(Math.trunc(o / 60), 2) + e + M(o % 60, 2);
	}
	const st = (t, e) => {
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
		ct = (t, e) => {
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
		ut = {
			p: ct,
			P: (t, e) => {
				const n = t.match(/(P+)(p+)?/) || [],
					o = n[1],
					a = n[2];
				if (!a) return st(t, e);
				let r;
				switch (o) {
					case "P":
						r = e.dateTime({ width: "short" });
						break;
					case "PP":
						r = e.dateTime({ width: "medium" });
						break;
					case "PPP":
						r = e.dateTime({ width: "long" });
						break;
					default:
						r = e.dateTime({ width: "full" });
				}
				return r.replace("{{date}}", st(o, e)).replace("{{time}}", ct(a, e));
			},
		},
		dt = /^D+$/,
		lt = /^Y+$/,
		mt = ["D", "DD", "YY", "YYYY"];
	function ft(t) {
		return t instanceof Date || ("object" == typeof t && "[object Date]" === Object.prototype.toString.call(t));
	}
	function ht(t) {
		if (!ft(t) && "number" != typeof t) return !1;
		const e = g(t);
		return !isNaN(Number(e));
	}
	const pt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
		gt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
		yt = /^'([^]*?)'?$/,
		bt = /''/g,
		vt = /[a-zA-Z]/;
	function wt(t, e, n) {
		const o = O(),
			a = n?.locale ?? o.locale ?? H,
			r =
				n?.firstWeekContainsDate ??
				n?.locale?.options?.firstWeekContainsDate ??
				o.firstWeekContainsDate ??
				o.locale?.options?.firstWeekContainsDate ??
				1,
			i =
				n?.weekStartsOn ??
				n?.locale?.options?.weekStartsOn ??
				o.weekStartsOn ??
				o.locale?.options?.weekStartsOn ??
				0,
			s = g(t);
		if (!ht(s)) throw new RangeError("Invalid time value");
		let c = e
			.match(gt)
			.map((t) => {
				const e = t[0];
				if ("p" === e || "P" === e) {
					return (0, ut[e])(t, a.formatLong);
				}
				return t;
			})
			.join("")
			.match(pt)
			.map((t) => {
				if ("''" === t) return { isToken: !1, value: "'" };
				const e = t[0];
				if ("'" === e) return { isToken: !1, value: Mt(t) };
				if (ot[e]) return { isToken: !0, value: t };
				if (e.match(vt))
					throw new RangeError("Format string contains an unescaped latin alphabet character `" + e + "`");
				return { isToken: !1, value: t };
			});
		a.localize.preprocessor && (c = a.localize.preprocessor(s, c));
		const u = { firstWeekContainsDate: r, weekStartsOn: i, locale: a };
		return c
			.map((o) => {
				if (!o.isToken) return o.value;
				const r = o.value;
				((!n?.useAdditionalWeekYearTokens &&
					(function (t) {
						return lt.test(t);
					})(r)) ||
					(!n?.useAdditionalDayOfYearTokens &&
						(function (t) {
							return dt.test(t);
						})(r))) &&
					(function (t, e, n) {
						const o = (function (t, e, n) {
							const o = "Y" === t[0] ? "years" : "days of the month";
							return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${o} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
						})(t, e, n);
						if ((console.warn(o), mt.includes(t))) throw new RangeError(o);
					})(r, e, String(t));
				return (0, ot[r[0]])(s, r, a.localize, u);
			})
			.join("");
	}
	function Mt(t) {
		const e = t.match(yt);
		return e ? e[1].replace(bt, "'") : t;
	}
	const kt = k(T(), { representation: "date" }),
		Dt = k(N(T(), 1), { representation: "date" }),
		Tt = k(E(T(), 1), { representation: "date" }),
		xt = k(N(T(), -6), { representation: "date" }),
		Nt = {
			Default: {
				name: "Default",
				description: "Default project. Cannot be removed",
				todos: [
					new w("Example of High Priority task that is overdue", xt, "high", "Default"),
					new w("Example of High Priority task that is due Today", kt, "high", "Default"),
					new w("Example of task that is due Tomorrow", Dt, "low", "Default"),
					new w("Example of High Priority task that is due Next Week", Tt, "medium", "Default"),
				],
			},
		},
		Et = function (t) {
			return wt(t, "E, do 'of' MMMM yyyy HH:mm:ss").replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
		},
		St = [
			{
				text: "This is a sample note. Notes are for storing information, like a recipe, a phone number, an address, etc. Notes are not ToDo tasks",
				dateAdded: Et(new Date()),
			},
		];
	function jt(t, e, n) {
		if ((t.classList.add("open"), e.classList.add("open"), t === de)) {
			!(function () {
				const t = wt(new Date(), "yyyy-MM-dd");
				document.getElementById("dueDate").value = t;
			})();
			const t = ke.options;
			for (let e = 0; e < t.length; e++)
				if (t[e].value === n) {
					t[e].selected = !0;
					break;
				}
		}
	}
	function Bt(t, e, n) {
		t.classList.remove("open"), e.classList.remove("open"), n && n.reset();
	}
	function Ct() {
		localStorage.setItem("projects", JSON.stringify(Vt)), localStorage.setItem("notes", JSON.stringify(Kt));
	}
	function Lt(t, e) {
		const n = O(),
			o =
				e?.weekStartsOn ??
				e?.locale?.options?.weekStartsOn ??
				n.weekStartsOn ??
				n.locale?.options?.weekStartsOn ??
				0,
			a = g(t),
			r = a.getDay(),
			i = 6 + (r < o ? -7 : 0) - (r - o);
		return a.setDate(a.getDate() + i), a.setHours(23, 59, 59, 999), a;
	}
	function Pt(t, e) {
		return +D(t) == +D(e);
	}
	function It(t, e) {
		const n = +g(t),
			[o, a] = [+g(e.start), +g(e.end)].sort((t, e) => t - e);
		return n >= o && n <= a;
	}
	function Ht(t) {
		return (e) => {
			const n = (t ? Math[t] : Math.trunc)(e);
			return 0 === n ? 0 : n;
		};
	}
	function Wt(t, e) {
		return +g(t) - +g(e);
	}
	function Ot(t, e, n) {
		const o = Wt(t, e) / a;
		return Ht(n?.roundingMethod)(o);
	}
	function $t() {
		const t = new Date(),
			e = t.getFullYear(),
			n = t.getMonth(),
			o = t.getDate(),
			a = new Date(0);
		return a.setFullYear(e, n, o + 1), a.setHours(0, 0, 0, 0), a;
	}
	function qt(t, e) {
		const n = g(t),
			o = g(e);
		return 12 * (n.getFullYear() - o.getFullYear()) + (n.getMonth() - o.getMonth());
	}
	function Yt(t) {
		const e = g(t);
		return e.setHours(23, 59, 59, 999), e;
	}
	function Ft(t) {
		const e = g(t),
			n = e.getMonth();
		return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
	}
	function At(t) {
		const e = g(t);
		return +Yt(e) == +Ft(e);
	}
	function zt(t, e) {
		const n = g(t),
			o = g(e),
			a = y(n, o),
			r = Math.abs(qt(n, o));
		let i;
		if (r < 1) i = 0;
		else {
			1 === n.getMonth() && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - a * r);
			let e = y(n, o) === -a;
			At(g(t)) && 1 === r && 1 === y(t, o) && (e = !1), (i = a * (r - Number(e)));
		}
		return 0 === i ? 0 : i;
	}
	function Xt(t, e, n) {
		const o = Wt(t, e) / 1e3;
		return Ht(n?.roundingMethod)(o);
	}
	function Qt(t, e, n) {
		const o = O(),
			a = n?.locale ?? o.locale ?? H,
			s = y(t, e);
		if (isNaN(s)) throw new RangeError("Invalid time value");
		const c = Object.assign({}, n, { addSuffix: n?.addSuffix, comparison: s });
		let u, d;
		s > 0 ? ((u = g(e)), (d = g(t))) : ((u = g(t)), (d = g(e)));
		const l = Xt(d, u),
			m = ($(d) - $(u)) / 1e3,
			f = Math.round((l - m) / 60);
		let h;
		if (f < 2)
			return n?.includeSeconds
				? l < 5
					? a.formatDistance("lessThanXSeconds", 5, c)
					: l < 10
						? a.formatDistance("lessThanXSeconds", 10, c)
						: l < 20
							? a.formatDistance("lessThanXSeconds", 20, c)
							: l < 40
								? a.formatDistance("halfAMinute", 0, c)
								: l < 60
									? a.formatDistance("lessThanXMinutes", 1, c)
									: a.formatDistance("xMinutes", 1, c)
				: 0 === f
					? a.formatDistance("lessThanXMinutes", 1, c)
					: a.formatDistance("xMinutes", f, c);
		if (f < 45) return a.formatDistance("xMinutes", f, c);
		if (f < 90) return a.formatDistance("aboutXHours", 1, c);
		if (f < i) {
			const t = Math.round(f / 60);
			return a.formatDistance("aboutXHours", t, c);
		}
		if (f < 2520) return a.formatDistance("xDays", 1, c);
		if (f < r) {
			const t = Math.round(f / i);
			return a.formatDistance("xDays", t, c);
		}
		if (f < 2 * r) return (h = Math.round(f / r)), a.formatDistance("aboutXMonths", h, c);
		if (((h = zt(d, u)), h < 12)) {
			const t = Math.round(f / r);
			return a.formatDistance("xMonths", t, c);
		}
		{
			const t = h % 12,
				e = Math.trunc(h / 12);
			return t < 3
				? a.formatDistance("aboutXYears", e, c)
				: t < 9
					? a.formatDistance("overXYears", e, c)
					: a.formatDistance("almostXYears", e + 1, c);
		}
	}
	const Ut = document.getElementById("taskProjectName");
	function Gt(t) {
		let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
		if (
			((we.innerHTML = ""),
			document.getElementById("sidebar").classList.remove("opened"),
			(Ut.textContent = ""),
			null === e)
		)
			t.forEach(function (t) {
				t.sortTodos(),
					(Ut.innerHTML = 'from <span class="pn">all projects</span>'),
					t.todos.forEach(function (t, e) {
						Jt(t, e, we);
					});
			});
		else {
			const n = t[e];
			n.sortTodos(),
				(Ut.innerHTML = `from <span class="pn">${n.name}</span> project`),
				n.todos.forEach(function (t, e) {
					Jt(t, e, we);
				});
		}
	}
	function Jt(t, e, n) {
		const o = (function (t, e) {
			const n = document.createElement("div");
			n.classList.add("task");
			const o = document.createElement("div");
			o.classList.add("checkbox-container");
			const a = document.createElement("input");
			(a.type = "checkbox"),
				(a.id = `task${t.projectName}${e}`),
				(a.className = "toggle-complete"),
				a.setAttribute("data-project", t.projectName),
				t.completed && (a.checked = !0);
			const r = document.createElement("label");
			r.setAttribute("for", a.id), o.appendChild(a), o.appendChild(r);
			const i = document.createElement("span");
			(i.className = "task-name"),
				(i.innerHTML += t.name),
				(i.innerHTML += `<span class="task-project">${t.projectName}</span>`);
			const c = document.createElement("span");
			c.className = "task-date-time";
			const u = wt(s(t.dueDate), "E, do 'of' MMMM").replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
			c.innerHTML = u;
			const d = new Date(),
				l = s(t.dueDate);
			if (wt(d, "yyyy-MM-dd") === wt(l, "yyyy-MM-dd")) {
				const t = Ot($t(), d);
				c.innerHTML += `<span class="due-in">due in ${t} hours</span>`;
			} else if (d > l) {
				const t = Qt(d, l);
				(c.innerHTML += `<span class="overdue">overdue by ${t}</span>`), n.classList.add("overdue");
			}
			const m = document.createElement("span");
			m.className = `task-priority ${t.priority}`;
			const f = document.createElement("span");
			m.appendChild(f);
			const h = document.createElement("button");
			(h.className = "edit-task icon"), (h.textContent = "Edit");
			const p = document.createElement("button");
			return (
				(p.className = "delete-task icon"),
				(p.textContent = "Delete"),
				n.appendChild(m),
				n.appendChild(o),
				n.appendChild(i),
				n.appendChild(c),
				n.appendChild(h),
				n.appendChild(p),
				n
			);
		})(t, e);
		n.appendChild(o),
			t.completed && o.classList.add("completed"),
			(o.querySelector(".delete-task").onclick = function () {
				je("task", t.name, function () {
					const e = Vt.find(function (e) {
							return e.name === t.projectName;
						}),
						n = Vt.indexOf(e),
						o = e.todos.indexOf(t);
					e.deleteTodo(o), Ct(), Gt(Vt, n);
				});
			}),
			(o.querySelector(".edit-task").onclick = function () {
				(document.getElementById("taskName").value = t.name),
					(document.getElementById("dueDate").value = t.dueDate),
					(document.querySelector(`input[name="priority"][value="${t.priority}"]`).checked = !0),
					(ke.value = t.projectName);
				const e = Vt.find(function (e) {
						return e.name === t.projectName;
					}),
					n = Vt.indexOf(e);
				jt(de, Ne),
					(be.onsubmit = function (o) {
						o.preventDefault();
						const a = ke.value;
						if (a !== t.projectName) {
							const n = Vt.find(function (t) {
								return t.name === a;
							});
							e.deleteTodo(e.todos.indexOf(t)), (t.projectName = a), n.addTodo(t);
						}
						(t.name = document.getElementById("taskName").value),
							(t.dueDate = document.getElementById("dueDate").value),
							(t.priority = document.querySelector('input[name="priority"]:checked').value),
							Ct(),
							Gt(Vt, n),
							Ce(),
							Bt(de, Ne, be);
					});
			}),
			(o.querySelector(".toggle-complete").onclick = function (e) {
				const n = Vt.find(function (e) {
						return e.name === t.projectName;
					}),
					a = n.todos.indexOf(t);
				n.todos[a].toggleComplete(),
					e.target.checked ? o.classList.add("completed") : o.classList.remove("completed"),
					Ct();
			});
	}
	function Rt(t, e, n) {
		const o = T(),
			a = N(o, 1),
			r = A(o, { weekStartsOn: 1 }),
			i = Lt(o, { weekStartsOn: 1 }),
			c = A(E(o, 1), { weekStartsOn: 1 }),
			u = Lt(c, { weekStartsOn: 1 });
		document.getElementById("sidebar").classList.toggle("opened");
		const d = document.querySelector("#menuToggle .icon");
		(d.textContent = "menu" === d.textContent ? "close" : "menu"),
			(n.innerHTML = ""),
			(Ut.innerHTML = 'from <span class="pn">all projects</span>'),
			e.forEach(function (e) {
				e.todos.forEach(function (e, d) {
					const l = s(e.dueDate);
					let m = !1;
					(("today" === t && Pt(l, o)) ||
						("tomorrow" === t && Pt(l, a)) ||
						("thisWeek" === t && It(l, { start: r, end: i })) ||
						("nextWeek" === t && It(l, { start: c, end: u })) ||
						("overdue" === t && o > l)) &&
						(m = !0),
						m &&
							(Jt(e, d, n),
							(Ut.innerHTML = `from <span class="pn">all projects</span>, due <span class="fi">${t}.</span>`));
				});
			});
	}
	function Zt(t) {
		const e = new v(t.name, t.description);
		return (
			t.todos.forEach(function (t) {
				const n = new w(t.name, t.dueDate, t.priority, t.projectName, t.completed);
				e.addTodo(n);
			}),
			e
		);
	}
	!(function () {
		const t = document.querySelector("#modals");
		(t.innerHTML +=
			'<div id="projectModal" class="modal"> <form class="modal-content" id="projectForm"> <span class="close icon" id="closeProjectModal">close</span> <h2 class="modal-title">Add Project</h2> <p class="note">Only 5 projects are allowed</p> <input type="text" id="projectName" class="user-input" placeholder="Project Name" required> <textarea id="projectDescription" maxlength="50" class="user-input" placeholder="What is this project for"></textarea> <div class="modal-actions"> <button id="saveProjectBtn">Save Project</button> </div> </form> </div>'),
			(t.innerHTML +=
				'<div id="taskModal" class="modal"> <form class="modal-content" id="taskForm"> <span class="close icon" id="closeTaskModal">close</span> <h2 class="modal-title">Add Task</h2> <div class="form-group"> <label for="taskName">What needs to get done?</label> <input type="text" id="taskName" class="user-input" placeholder="Task Name" required> </div> <div class="form-group date-group"> <label>What is the due date?</label> <input type="date" id="dueDate" class="user-input"> <span class="icon">event</span> </div> <div class="priority-container"> <p>Task priority</p> <div class="form-radio"> <input type="radio" name="priority" id="priorityLow" value="low" checked="true" required> <label for="priorityLow">Low</label> </div> <div class="form-radio"> <input type="radio" name="priority" id="priorityMedium" value="medium" required> <label for="priorityMedium">Medium</label> </div> <div class="form-radio"> <input type="radio" name="priority" id="priorityHigh" value="high" required> <label for="priorityHigh">High</label> </div> </div> <div class="form-group form-select"> <select id="projectSelect" class="user-input"></select> <div class="icon">keyboard_arrow_down</div> </div> <div class="modal-actions"> <button id="saveTaskBtn" type="submit" class="save">Save Task</button> </div> </form> </div>'),
			(t.innerHTML +=
				'<div id="noteModal" class="modal"> <form class="modal-content" id="noteForm"> <span class="close icon" id="closeNoteModal">close</span> <h2 class="modal-title">Add Note</h2> <textarea id="noteText" class="user-input" placeholder="Note text" required></textarea> <div class="modal-actions"> <button id="saveNoteBtn" type="submit">Save Note</button> </div> </form> </div>'),
			(t.innerHTML +=
				'<div id="confirmationModal" class="modal"> <div class="modal-content"> <span class="close" id="closeConfirmationModal">&times;</span> <h2 class="modal-title center">Are you sure you want to delete this <span id="conformationModalElement"></span>?</h2> <p id="confirmationMessage" class="text-center"></p> <div class="modal-actions center"> <button id="confirmDeleteBtn" class="button delete">Delete</button> <button id="cancelDeleteBtn" class="button cancel">Cancel</button> </div> </div> </div>');
	})(),
		(document.querySelector("#sidebar").innerHTML =
			' <div class="sidebar-container"> <div class="sidebar-logo"> <div>ToDo <span>App</span></div> <button id="menuToggle"><span class="icon">menu</span></button> </div> <div class="sidebar-group"> <div class="group-list"> <div class="list-item active"> <button id="viewAllBtn">All Tasks</button> </div> </div> </div> <div class="sidebar-group due"> <div class="group-title"> <h2 class="title">Due by</h2> </div> <div class="group-list"> <div class="list-item"> <button id="todayBtn">Today</button> </div> <div class="list-item"> <button id="tomorrowBtn">Tomorrow</button> </div> <div class="list-item"> <button id="thisWeekBtn">This Week</button> </div> <div class="list-item"> <button id="nextWeekBtn">Next Week</button> </div> <div class="list-item"> <button id="overdue">Overdue</button> </div> </div> </div> <div class="sidebar-group projects"> <div class="group-title"> <h2 class="title">Projects</h2> <button id="addProjectBtn" class="add-new-element"><span class="icon">add</span></button> </div> <div class="group-list" id="projectList"></div> </div> </div>'),
		(document.querySelector("#notes").innerHTML =
			' <div class="sidebar-container"> <div class="sidebar-group"> <div class="group-title"> <h2 class="title">Notes</h2> <button id="addNoteBtn" class="add-new-element"><span class="icon">add</span></button> </div> <div class="group-list" id="notesContainer"> <div class="list-item"> <div class="note"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi fugit ipsum unde illo sit ipsa culpa, eos maxime? Nihil id vero natus tenetur rerum autem esse assumenda alias modi ut! </div> </div> </div> </div> </div>');
	let Vt = JSON.parse(localStorage.getItem("projects")) || Object.values(Nt).map(Zt);
	Vt = Vt.map(Zt);
	let Kt = JSON.parse(localStorage.getItem("notes")) || St,
		_t = Vt[0].name || "";
	const te = document.getElementById("addProjectBtn"),
		ee = document.getElementById("addTaskBtn"),
		ne = document.getElementById("addNoteBtn"),
		oe = document.getElementById("viewAllBtn"),
		ae = document.getElementById("todayBtn"),
		re = document.getElementById("tomorrowBtn"),
		ie = document.getElementById("thisWeekBtn"),
		se = document.getElementById("nextWeekBtn"),
		ce = document.getElementById("overdue"),
		ue = document.getElementById("projectModal"),
		de = document.getElementById("taskModal"),
		le = document.getElementById("noteModal"),
		me = document.getElementById("closeProjectModal"),
		fe = document.getElementById("closeTaskModal"),
		he = document.getElementById("closeNoteModal"),
		pe = document.getElementById("confirmationModal"),
		ge = document.getElementById("closeConfirmationModal"),
		ye = document.getElementById("projectForm"),
		be = document.getElementById("taskForm"),
		ve = document.getElementById("noteForm"),
		we = document.getElementById("tasksContainer"),
		Me = document.getElementById("notesContainer"),
		ke = document.getElementById("projectSelect"),
		De = document.getElementById("confirmDeleteBtn"),
		Te = document.getElementById("cancelDeleteBtn"),
		xe = document.querySelector(".sidebar-container"),
		Ne = document.getElementById("modals");
	let Ee = null;
	function Se() {
		Vt.length >= 5 ? te.setAttribute("disabled", "disabled") : te.removeAttribute("disabled");
	}
	function je(t, e, n) {
		(document.getElementById("conformationModalElement").textContent = t),
			(document.getElementById("confirmationMessage").textContent = e),
			(Ee = n),
			Ne.classList.add("open"),
			pe.classList.add("open");
	}
	function Be() {
		Ne.classList.remove("open"), pe.classList.remove("open"), (Ee = null);
	}
	function Ce() {
		const t = document.getElementById("projectList");
		(t.innerHTML = ""),
			Vt.forEach(function (e, n) {
				e.sortTodos();
				const o = document.createElement("div");
				(o.className = "list-item"),
					"Default" === e.name
						? (o.innerHTML = `\n\t\t\t\t<button class="project-button" data-index="${n}"><span>${e.name}</span></button> \n\t\t\t\t<span class="project-description">${e.description}</span>`)
						: (o.innerHTML = `<button class="project-button" data-index="${n}"><span>${e.name}</span></button>\n                                     <button class="delete-project" data-index="${n}"><span class="icon">delete</span></button>\n                                     <span class="project-description">${e.description}</span>`),
					t.appendChild(o);
			}),
			(ke.innerHTML = ""),
			Vt.forEach(function (t) {
				const e = document.createElement("option");
				(e.value = t.name), (e.textContent = t.name), ke.appendChild(e);
			}),
			document.querySelectorAll(".project-button").forEach(function (t) {
				t.onclick = function (t) {
					const e = t.target.dataset.index;
					(_t = Vt[e].name),
						0 === Vt[e].todos.length
							? (Gt(Vt, e),
								(we.innerHTML = '<span class="no-tasks">There are no tasks in this project.</span>'))
							: Gt(Vt, e),
						document.getElementById("sidebar").classList.remove("opened");
					const n = document.querySelector("#menuToggle .icon");
					console.log(n), (n.textContent = "menu" === n.textContent ? "close" : "menu");
				};
			}),
			document.querySelectorAll(".delete-project").forEach(function (t) {
				t.onclick = function (t) {
					const e = t.target.dataset.index;
					je("project", `Name: ${Vt[e].name}, For: ${Vt[e].description}`, function () {
						Vt.splice(e, 1), Ct(), Ce(), Se();
					});
				};
			});
	}
	function Le() {
		(Me.innerHTML = ""),
			Kt.forEach(function (t, e) {
				const n = document.createElement("div");
				(n.className = "note"),
					(n.innerHTML =
						0 === e
							? `\n\t\t\t\t<p>${t.text}</p>\n\t\t\t\t<p class="note-date">Added on: ${t.dateAdded}</p>\n\t\t\t\t<div class="note-actions default-note">\n\t\t\t\t\t<button class="edit-note icon" data-index="${e}">Edit</button>\n\t\t\t\t\t<button class="delete-note icon" data-index="${e}">Delete</button>\n\t\t\t\t</div>\n\t\t\t`
							: `\n\t\t\t<p>${t.text}</p>\n\t\t\t<p class="note-date">Added on: ${t.dateAdded}</p>\n\t\t\t<div class="note-actions">\n\t\t\t\t<button class="edit-note icon" data-index="${e}">Edit</button>\n\t\t\t\t<button class="delete-note icon" data-index="${e}">Delete</button>\n\t\t\t</div>\n\t\t`),
					Me.appendChild(n),
					(n.querySelector(".delete-note").onclick = function () {
						je("note", null, function () {
							Kt.splice(e, 1), Ct(), Le();
						});
					}),
					(n.querySelector(".edit-note").onclick = function () {
						(document.getElementById("noteText").value = t.text), jt(le, Ne);
						let n = e;
						ve.onsubmit = function (t) {
							t.preventDefault(),
								(Kt[n].text = document.getElementById("noteText").value),
								Ct(),
								Le(),
								Bt(le, Ne, ve),
								(document.getElementById("noteText").value = "Enter text");
						};
					});
			});
	}
	(te.onclick = function () {
		return jt(ue, Ne);
	}),
		(ee.onclick = function () {
			return jt(de, Ne, _t);
		}),
		(ne.onclick = function () {
			return jt(le, Ne);
		}),
		(oe.onclick = function () {
			return Gt(Vt);
		}),
		(ae.onclick = function () {
			return Rt("today", Vt, we);
		}),
		(re.onclick = function () {
			return Rt("tomorrow", Vt, we);
		}),
		(ie.onclick = function () {
			return Rt("thisWeek", Vt, we);
		}),
		(se.onclick = function () {
			return Rt("nextWeek", Vt, we);
		}),
		(ce.onclick = function () {
			return Rt("overdue", Vt, we);
		}),
		(me.onclick = function () {
			return Bt(ue, Ne, ye);
		}),
		(fe.onclick = function () {
			return Bt(de, Ne, be);
		}),
		(he.onclick = function () {
			return Bt(le, Ne, ve);
		}),
		(ge.onclick = function () {
			return Be();
		}),
		(Te.onclick = function () {
			return Be();
		}),
		(De.onclick = function () {
			Ee && (Ee(), Be());
		}),
		(ye.onsubmit = function (t) {
			t.preventDefault();
			const e = document.getElementById("projectName").value,
				n = document.getElementById("projectDescription").value;
			if (e) {
				const t = new v(e, n);
				Vt.push(t),
					Ct(),
					Ce(),
					Bt(ue, Ne, ye),
					(document.getElementById("projectName").value = ""),
					(document.getElementById("projectDescription").value = ""),
					Se();
			}
		}),
		(be.onsubmit = function (t) {
			t.preventDefault();
			const e = document.getElementById("taskName").value,
				n = document.getElementById("dueDate").value,
				o = ke.value,
				a = document.querySelector('input[name="priority"]:checked').value;
			if (e && n && o && a) {
				const t = new w(e, n, a, o),
					r = Vt.findIndex(function (t) {
						return t.name === o;
					});
				Vt[r].addTodo(t);
				xe.querySelectorAll(".list-item button, .project-btn").forEach(function (t) {
					return t.parentNode.classList.remove("active");
				});
				document.querySelector(`.project-button[data-index="${r}"]`).parentNode.classList.add("active"),
					Ct(),
					Gt(Vt, r),
					Bt(de, Ne, be);
			}
		}),
		(ve.onsubmit = function (t) {
			t.preventDefault();
			const e = document.getElementById("noteText").value;
			if (e) {
				const t = Et(new Date());
				Kt.push({ text: e, dateAdded: t }),
					Ct(),
					Le(),
					Bt(le, Ne, ve),
					(document.getElementById("noteText").value = "");
			}
		}),
		xe.addEventListener("click", function (t) {
			if ("BUTTON" === t.target.tagName && "menuToggle" !== t.target.id) {
				xe.querySelectorAll(".list-item button, .project-btn").forEach(function (t) {
					return t.parentNode.classList.remove("active");
				}),
					t.target.parentNode.classList.add("active");
			}
		}),
		document.addEventListener("DOMContentLoaded", function () {
			!(function () {
				const t = document.getElementById("dueDate"),
					e = new Date().toISOString().split("T")[0];
				t.setAttribute("min", e);
			})();
			document.querySelectorAll('input[name="priority"]').forEach(function (t) {
				"high" === t.value && (t.checked = !0);
			});
			const t = document.getElementById("menuToggle");
			t.addEventListener("click", function () {
				document.getElementById("sidebar").classList.toggle("opened");
				const e = t.querySelector(".icon");
				e.textContent = "menu" === e.textContent ? "close" : "menu";
			});
		}),
		Ce(),
		Gt(Vt),
		Le(),
		Se();
})();
