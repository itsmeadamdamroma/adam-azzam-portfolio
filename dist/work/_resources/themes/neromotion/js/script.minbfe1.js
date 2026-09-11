var e = jQuery;
$(window).on("load", function() {
	setTimeout(function() {
		$(".loader").addClass("complete");
		$(".bg").addClass("complete");
		$("body").addClass("websiteLoaded");
	}, 1000);
});

document.addEventListener("DOMContentLoaded", function() {
	$("body").removeClass("websiteLoaded");
});

document.addEventListener("DOMContentLoaded", (function() {})),
	function(e) {
		let o, t = !1,
			s = !1,
			n, a, r, i, l, c, d;

		function m() {
			e(".cursorDot > div > div > div").css({
				transform: "scale(0)"
			}), e(".fullCursor > div").css({
				transform: "scale(0)"
			}), e(".fullTopCursor > .view, .fullTopCursor > .view .blue-circle, .fullTopCursor > .view p").css({
				transform: "scale(0)"
			}), e(".fullTopCursor > .drag, .fullTopCursor > .drag .blue-circle, .fullTopCursor > .drag p").css({
				transform: "scale(0)"
			}), e("#smoothAnim").removeClass("transitionAnimationIn"), e(window).width() < 768 && (e("body").css("overflow-y", "visible"), e("body").removeClass("menuClosed"), n.update(), e("#smoothAnim").css("opacity", 1), e("div[data-scroll]").addClass("is-inview animate"), e(".fullImage, .website-images").addClass("fadeImageDown animate").removeClass("imageDown"), e(".hamburger-menu").css("pointer-events", "all"))
		}

		function u() {
			o = "other", (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i)) && (o = "explorer", e("html").addClass("IE")), navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && (o = "safari")
		}

		function p() {
			"ontouchstart" in document.documentElement && (t = !0)
		}

		function f() {
			if (e("#smoothAnim").removeClass("preload").removeClass("transitionAnimationIn").addClass("transitionAnimationOut"), i = document.querySelector(".scrollContainer"), l = window.innerHeight, c = window.innerWidth, u(), p(), n = new LocomotiveScroll({
					el: i,
					smooth: !0,
					direction: "vertical",
					gestureDirection: "vertical",
					getSpeed: !0,
					getDirection: !0,
					reloadOnContextChange: !0,
					lerp: .1,
					multiplier: 1,
					offset: ["25%", 0],
					firefoxMultiplier: 1,
					touchMultiplier: 2,
					resetNativeScroll: !0,
					tablet: {
						smooth: !1,
						direction: "vertical",
						gestureDirection: "vertical",
						breakpoint: 768
					},
					smartphone: {
						smooth: !1,
						direction: "vertical",
						gestureDirection: "vertical",
						breakpoint: 768
					}
				}), "projectReturn" === a) {
				let e = document.getElementById("#projects");
				n.scrollTo(e, {
					duration: 0,
					disableLerp: !0
				})
			}
			e(".scrollContainerFSQ").length > 0 && (r = new LocomotiveScroll({
				el: document.querySelector(".scrollContainerFSQ"),
				smooth: !0,
				direction: "vertical",
				gestureDirection: "vertical",
				getDirection: !0,
				getSpeed: !0,
				reloadOnContextChange: !1,
				lerp: .1,
				multiplier: 1,
				firefoxMultiplier: 50,
				touchMultiplier: 2,
				resetNativeScroll: !0,
				tablet: {
					smooth: !1,
					direction: "vertical",
					gestureDirection: "vertical",
					breakpoint: 768
				},
				smartphone: {
					smooth: !1,
					direction: "vertical",
					gestureDirection: "vertical",
					breakpoint: 768
				}
			}))
		}

		function h(o) {
			e(".clipImage").each((function() {
				e(this).inViewport((function(o) {
					var t = 11 * o / e(this).height();
					t = Math.min(t, 10), e(this).css({
						clipPath: "inset(0%" + t + "%)"
					})
				}))
			}))
		}

		function v(o = !1) {
			if (o && (f(), initFluidAnimation(), P(), setTimeout((function() {
					e("#smoothAnim").addClass("animationLoaded")
				}), 5e3), e("header .logo").click((function(o) {
					let t = e(".blueFSQ"),
						s, n = Math.sqrt(c * c + l * l) / 40 * 2;
					e("body").hasClass("projectStartOpened") && (e(".closeFSQ, .blueFSQ").addClass("unactive"), e(".footerLetsGo").removeClass("unactive"), t.css({
						transform: "scale(" + n + ")",
						"transition-duration": "0s"
					}), e("body").removeClass("projectStartOpened").removeClass("animationDone"), e("canvas").removeClass("disabled"), setTimeout((function() {
						t.css({
							transform: "scale(0)",
							"transition-duration": ""
						})
					}), 200), e("header .navLinks, header .hamburger-menu, header .mobile-nav, footer .noAnim").fadeIn(100)), e(".fullTopCursor > .view").css({
						transform: "scale(0)"
					}), e(".fullTopCursor > .view .blue-circle").css({
						transform: "scale(0)"
					}), e(".fullTopCursor > .view p").css({
						transform: "scale(0)"
					}), e(".fullTopCursor > .drag").css({
						transform: "scale(0)"
					}), e(".fullTopCursor > .drag .blue-circle").css({
						transform: "scale(0)"
					}), e(".fullTopCursor > .drag p").css({
						transform: "scale(0)"
					})
				})), e(".footerLetsGo, .closeFSQ").click((function(o) {
					s = !s;
					let t = e(".blueFSQ"),
						n, a = Math.sqrt(c * c + l * l) / 40 * 2;
					e("body").hasClass("projectStartOpened") ? (e(".closeFSQ, .blueFSQ").addClass("unactive"), e(".footerLetsGo").removeClass("unactive"), t.css({
						transform: "scale(" + a + ")",
						"transition-duration": "0s"
					}), e("body").removeClass("projectStartOpened").removeClass("animationDone"), e("canvas").removeClass("disabled"), setTimeout((function() {
						t.css({
							transform: "scale(0)",
							"transition-duration": ""
						})
					}), 200), setTimeout((function() {
						e("header .navLinks, header .hamburger-menu, header .mobile-nav, footer .noAnim").fadeIn(100)
					}), 800)) : (e(".closeFSQ, .blueFSQ").removeClass("unactive"), e(".footerLetsGo").addClass("unactive"), t.css({
						transform: "scale(" + a + ")"
					}), e("body").addClass("projectStartOpened"), e("canvas").addClass("disabled"), e("header .navLinks, header .hamburger-menu, header .mobile-nav, footer .noAnim").fadeOut(100))
				})), e(document).on("click", ".hamburger-menu:not(.open)", (function(o) {
					e(this).addClass("open"), e("body").addClass("menuOpened"), e("body").css("overflow-y", "hidden"), e(".mobile-nav").addClass("open"), e("#smoothAnim").addClass("transitionAnimationIn"), e("div[data-scroll]").removeClass("skipAnim"), e(".fullImage, .website-images").removeClass("fadeImageDown").addClass("fadeImageUp"), e("footer").addClass("hideFooter"), e(".footerLetsGo .magnetItem, .footerLetsGo .blurBgFooter, .footerLetsGo .borderElement, footer .text-right span, footer .text-left span ").addClass("hideFooterC"), setTimeout((function() {
						e(".fullImage, .website-images").addClass("imageDown").removeClass("fadeImageUp"), e("#smoothAnim").css("opacity", 0), e("div[data-scroll]").removeClass("is-inview animate"), e("#smoothAnim").removeClass("transitionAnimationIn")
					}), 1750)
				})), e(document).on("click", ".hamburger-menu.open", (function(o) {
					e(this).removeClass("open"), e("body").addClass("menuClosed").removeClass("menuOpened"), e(".mobile-nav").removeClass("open"), e("#smoothAnim").removeClass("transitionAnimationIn"), setTimeout((function() {
						e("#smoothAnim").css("opacity", 1), e("div[data-scroll]").addClass("is-inview animate"), e(".fullImage, .website-images").addClass("fadeImageDown animate").removeClass("imageDown"), e("body").css("overflow-y", "visible"), e("body").removeClass("menuClosed"), e("footer").removeClass("hideFooter"), e(".footerLetsGo .magnetItem, .footerLetsGo .blurBgFooter, .footerLetsGo .borderElement, footer .text-right span, footer .text-left span ").removeClass("hideFooterC")
					}), 850)
				}))), e(".homePage").length ? (e(".navLinks a span, .mobile-nav a").removeClass("active"), e(".navLinks .home span, .mobile-nav .home").addClass("active")) : e(".agencyPage").length ? (e(".navLinks a span, .mobile-nav a").removeClass("active"), e(".navLinks .about span, .mobile-nav .about").addClass("active")) : e(".projectsPage").length || e(".projectPage").length ? (e(".navLinks a span, .mobile-nav a").removeClass("active"), e(".navLinks .work span, .mobile-nav .work").addClass("active")) : e(".contactPage").length ? (e(".navLinks a span, .mobile-nav a").removeClass("active"), e(".navLinks .contact span, .mobile-nav .contact").addClass("active")) : (e(".navLinks a span, .mobile-nav a").removeClass("active")), e(".clipImage").each((function() {
					e(this).css({
						clipPath: "inset(0% 10%)"
					})
				})), e(window).width(), ".splitText".length && (new SplitText(".splitText", {
					type: "lines",
					linesClass: "lineChild"
				}), new SplitText(".splitText", {
					type: "lines",
					linesClass: "lineParent"
				}), setTimeout(() => {
					e(".animationHero").addClass("animate")
				}, 100)), n.on("scroll", o => {
					if (e(window).width() > 992 && ("down" == o.direction ? (e("footer").addClass("hideFooter"), e("footer .text-right span, footer .text-left span").addClass("hideFooterC")) : (e("footer").removeClass("hideFooter"), e("footer .text-right span, footer .text-left span").removeClass("hideFooterC")), o.delta.y == o.limit.y && (e("footer").removeClass("hideFooter"), e("footer .text-right span, footer .text-left span").removeClass("hideFooterC"))), e(".projectPage").length) {
						let t = 1.2 * e(window).height() + 155,
							s = o.scroll.y / t / 2,
							n = Math.min(.3, s);
						e(".black-overlay").css({
							opacity: .5 + n
						})
					}
					h(o)
				}), e(window).width() < 992) {
				var t = 0;
				e(window).on("scroll", (function(o) {
					var s = window.pageYOffset || document.documentElement.scrollTop;
					s < t || 0 === e(window).scrollTop() ? e("footer").removeClass("hideFooter") : e("footer").addClass("hideFooter"), t = s <= 0 ? 0 : s, window.innerHeight + window.scrollY >= document.body.offsetHeight && e("footer").removeClass("hideFooter")
				}))
			}
			e(".readMoreLink").click((function(o) {
				e(".testimonyPopup").addClass("goingIn").addClass("closePopup"), e(".splide__pagination").fadeOut(500), e(window).width() > 768 && (e(".fullTopCursor > .drag").css({
					transform: "scale(0)"
				}), e(".fullTopCursor > .drag .blue-circle").css({
					transform: "scale(0)"
				}), e(".fullTopCursor > .drag p").css({
					transform: "scale(0)"
				}), e(".fullTopCursor > .close").css({
					transform: "scale(1)"
				}), e(".fullTopCursor > .close .blue-circle").css({
					transform: "scale(2.5)"
				}), e(".fullTopCursor > .close p").css({
					transform: "scale(1)"
				})), e("header").addClass("hideHeader"), e("footer").addClass("hideFooterPopup");
				let t = e(this).parents(".slide-wrapper").find(".logo-image").attr("src"),
					s = e(this).parents(".slide-wrapper").find(".lineClamp").html(),
					n = e(this).parents(".slide-wrapper").find(".person-image").attr("src"),
					a = e(this).parents(".slide-wrapper").find(".authName").html(),
					r = e(this).parents(".slide-wrapper").find(".authPos").html();
				e(".testimonyPopup").find(".logoPopup").attr("src", t), e(".testimonyPopup").find(".popupTestimony").html(s), e(".testimonyPopup").find(".authorImage").attr("src", n), e(".testimonyPopup").find(".name").html(a), e(".testimonyPopup").find(".position").html(r), e("body").addClass("menuOpened"), e("#smoothAnim").addClass("transitionAnimationIn"), e("div[data-scroll]").removeClass("skipAnim"), setTimeout((function() {
					e(".closeButton").fadeIn(500), e("#smoothAnim").css("opacity", 0), e("div[data-scroll]").removeClass("is-inview animate"), e("#smoothAnim").removeClass("transitionAnimationIn")
				}), 1750)
			})), e(document).on("click", ".closePopup, .closeButton", (function(o) {
				e(".testimonyPopup").addClass("goingOut").removeClass("goingIn").removeClass("closePopup"), e(".closeButton").fadeOut(500), e(window).width() > 768 && (e(".fullTopCursor > .close").css({
					transform: "scale(0)"
				}), e(".fullTopCursor > .close .blue-circle").css({
					transform: "scale(0)"
				}), e(".fullTopCursor > .close p").css({
					transform: "scale(0)"
				})), e("body").addClass("menuClosed").removeClass("menuOpened"), e("#smoothAnim").removeClass("transitionAnimationIn"), setTimeout((function() {
					e(".testimonyPopup").find(".logoPopup").attr("src", ""), e(".testimonyPopup").find(".popupTestimony").html(""), e(".testimonyPopup").find(".authorImage").attr("src", ""), e(".testimonyPopup").find(".name").html(""), e(".testimonyPopup").find(".position").html(""), e(".splide__pagination").fadeIn(500), e(".testimonyPopup").removeClass("goingOut"), e("#smoothAnim").css("opacity", 1), e("div[data-scroll]").addClass("is-inview animate"), e("body").removeClass("menuClosed"), e("header").removeClass("hideHeader"), e("footer").removeClass("hideFooterPopup")
				}), 1750)
			})), g(), A(), b(), x(), w(), C(), y()
		}

		function g() {
			e(window).width() > 768 && (e(".magnetContainer").mousemove((function(o) {
				let t = 20,
					s = 20 * (o.offsetX / this.offsetWidth - .5) * 2,
					n = 20 * (o.offsetY / this.offsetHeight - .5) * 2;
				e(this).find(".magnetItem").css("transform", `translate(${s}px, ${n}px)`)
			})).mouseleave((function(o) {
				e(this).find(".magnetItem").css("transform", "translate(0px, 0px)")
			})), e(window).on("mousemove", (function(o) {
				let t = e(".mainCursor > div > div"),
					s = t.width(),
					n = t.height();
				e(".cursorContainer").css({
					transform: `translate3d(${o.pageX-s/2}px,${o.pageY-n/2}px,0)`
				}).addClass("active"), e(".cursorContainerUnder").css({
					transform: `translate3d(${o.pageX-s/2}px,${o.pageY-n/2}px,0)`
				}).addClass("active")
			})).on("mouseenter mouseup mousedown mouseleave mouseover mouseout", (function(o) {
				let s = e(o.target).closest("header .logo, footer .magnetContainer"),
					n = e(o.target).closest(".blueCursor, .subscribeContainer .magnetContainer"),
					a = e(o.target).closest(".splideCarousel .splide__slide, .splideCarousel .splide__list, .splideCarousel"),
					r = e(o.target).closest(".splideCarousel .readMoreLink"),
					i = e(o.target).closest(".projectLink"),
					l = e(o.target).closest(".goBackProject");
				if (r.length > 0 || n.length > 0 || a.length > 0 || s.length > 0 || i.length > 0 || l.length > 0) {
					let i = e(".mainCursor > div > div"),
						c = e(".cursorDot > div > div > div"),
						d = e(".fullCursor > div"),
						m = e(".fullTopCursor > .view"),
						u = e(".fullTopCursor > .view .blue-circle"),
						p = e(".fullTopCursor > .view p"),
						f = e(".fullTopCursor > .drag"),
						h = e(".fullTopCursor > .drag .blue-circle"),
						v = e(".fullTopCursor > .drag p");
					t || ("mouseover" === o.type || "mouseenter" === o.type ? (c.css({
						transform: "scale(0)"
					}), s.length > 0 || l.length > 0 ? (i.css({
						transform: "scale(2.5)",
						"border-width": "0px"
					}), d.css({
						transform: "scale(2.5)"
					}), d.css({
						transform: "scale(2.5)"
					}), e(".hover-index").removeClass("hoverIndex")) : n.length > 0 ? (i.css({
						transform: "scale(2.5)",
						"border-width": "0px"
					}), d.css({
						transform: "scale(2.5)"
					}), d.css({
						transform: "scale(2.5)"
					}), e(".hover-index").addClass("hoverIndex")) : r.length > 0 ? (f.css({
						transform: "scale(0)"
					}), h.css({
						transform: "scale(0)"
					}), v.css({
						transform: "scale(0)"
					}), e(".hover-index").removeClass("hoverIndex")) : a.length > 0 ? (f.css({
						transform: "scale(1)"
					}), h.css({
						transform: "scale(2.5)"
					}), v.css({
						transform: "scale(1)"
					}), e(".hover-index").removeClass("hoverIndex")) : (i.css({
						"border-width": "0px"
					}), m.css({
						transform: "scale(1)"
					}), u.css({
						transform: "scale(2.5)"
					}), p.css({
						transform: "scale(1)"
					}), e(".hover-index").removeClass("hoverIndex"))) : "mouseout" !== o.type && "mouseleave" !== o.type || (i.css({
						transform: "scale(1)",
						"border-width": "2px"
					}), c.css({
						transform: "scale(1)"
					}), d.css({
						transform: "scale(0)"
					}), m.css({
						transform: "scale(0)"
					}), u.css({
						transform: "scale(0)"
					}), p.css({
						transform: "scale(0)"
					}), f.css({
						transform: "scale(0)"
					}), h.css({
						transform: "scale(0)"
					}), v.css({
						transform: "scale(0)"
					}), e(".hover-index").removeClass("hoverIndex")))
				}
			})))
		}

		function C() {
			let o = e(".careerUpload #uploadFile"),
				t = e(".careerUpload .fileName"),
				s = e(".careerUpload .removeFile"),
				n = t.text();
			s.hide(), o.on("change", (function(a) {
				var r = o.val().split("\\").pop();
				r ? (t.text(r), e(".careerUpload .uploadFileButton").hide(), s.show()) : (t.text(n), s.hide(), e(".careerUpload .uploadFileButton").show())
			})), s.on("click", (function(a) {
				o.val(""), t.text(n), e(".careerUpload .uploadFileButton").show(), s.hide()
			}));
			let a = e(".startProjectUpload #uploadFileProject"),
				r = e(".startProjectUpload .fileName"),
				i = e(".startProjectUpload .removeFile"),
				l = t.text();
			i.hide(), a.on("change", (function(o) {
				var t = a.val().split("\\").pop();
				t ? (r.text(t), e(".startProjectUpload .uploadFileButton").hide(), i.show()) : (r.text(l), i.hide(), e(".startProjectUpload .uploadFileButton").show())
			})), i.on("click", (function(o) {
				a.val(""), r.text(l), e(".startProjectUpload .uploadFileButton").show(), i.hide()
			}))
		}

		function w() {
			var o, o;
			e("#contact-form").length && (e("#contact-form input, #contact-form textarea").focusin((function() {
				e(this).parent(".input-group").addClass("borderBottom")
			})), e("#contact-form input, #contact-form textarea").focusout((function() {
				e(this).parent(".input-group").removeClass("borderBottom")
			})), e("#contact-form input, #contact-form textarea").on("input change", (function() {
				"" != e(this).val() ? e(this).parent(".input-group").addClass("borderActive") : e(this).parent(".input-group").removeClass("borderActive")
			})), (o = document.getElementById("textarea")).oninput = function() {
				o.style.height = "60px", o.style.height = Math.min(o.scrollHeight, 400) + "px"
			}, T());
			e("#career-form").length && (e("#career-form input, #career-form textarea").focusin((function() {
				e(this).parent(".input-group").addClass("borderBottom")
			})), e("#career-form input, #career-form textarea").focusout((function() {
				e(this).parent(".input-group").removeClass("borderBottom")
			})), e("#career-form input, #career-form textarea").on("input change", (function() {
				"" != e(this).val() ? e(this).parent(".input-group").addClass("borderActive") : e(this).parent(".input-group").removeClass("borderActive")
			})), (o = document.getElementById("textarea")).oninput = function() {
				o.style.height = "60px", o.style.height = Math.min(o.scrollHeight, 400) + "px"
			}, F())
		}

		function b() {
			if (e(".mobileCarousel").length) var o = new Splide(".mobileCarousel", {
				start: 0,
				perPage: 1,
				easing: "cubic-bezier(0.25, 1, 0.5, 1)",
				speed: 1e3,
				pagination: !1,
				arrows: !1,
				padding: "20%",
				gap: "30px",
				breakpoints: {
					768: {
						fixedWidth: "14rem"
					}
				}
			}).mount()
		}

		function x() {
			if (e(".splideCarousel").length) {
				var o = new Splide(".splideCarousel", {
					drag: "free",
					perPage: 1,
					easing: "cubic-bezier(0.25, 1, 0.5, 1)",
					speed: 1e3,
					pagination: !1,
					arrows: !1,
					breakpoints: {
						768: {
							drag: !0,
							snap: !0,
							pagination: !0
						}
					}
				}).mount();
				setTimeout(() => {
					e(".lineClamp").css({
						display: " -webkit-box",
						"-webkit-line-clamp": " 4",
						"-webkit-box-orient": " vertical",
						overflow: " hidden",
						"text-overflow": " ellipsis",
						"margin-bottom": " 24px",
						"-webkit-box-pack": " end"
					})
				}, 100);
				let t = e(".fullTopCursor > .drag .blue-circle");
				e(".splideCarousel .splide__slide, .splideCarousel .splide__list, .splideCarousel").on("mousedown", (function() {
					t.css({
						transform: "scale(2)"
					})
				})), e(".splideCarousel .splide__slide, .splideCarousel .splide__list, .splideCarousel").on("mouseup", (function() {
					t.css({
						transform: "scale(2.5)"
					})
				})), e(".splideCarousel .splide__slide, .splideCarousel .splide__list, .splideCarousel").on("mouseover", (function() {
					t.css({
						transform: "scale(2.5)"
					})
				})), o.on("dragging", (function() {
					t.css({
						transform: "scale(2)"
					})
				})), o.on("dragged", (function() {
					t.css({
						transform: "scale(2.5)"
					})
				}))
			}
		}

		function y() {
			function o() {
				e.ajax({
					url: "ajax/subForm.php",
					method: "POST",
					cache: !1,
					data: {
						Email: e("#fieldEmail").val()
					},
					beforeSend: function() {},
					success: function(o) {
						e(".subscribeContainer").fadeOut(250), e(".successMessage").fadeIn(250)
					},
					complete: function(e) {}
				})
			}
			e("#subForm").on("submit", (function(e) {
				e.preventDefault(), o()
			}))
		}

		function T() {
			function o() {
				e.ajax({
					url: "ajax/contact-form.php",
					method: "POST",
					cache: !1,
					data: {
						FullName: e("#FullName").val(),
						EmailAddress: e("#EmailAddress").val(),
						Message: e("#textarea").val()
					},
					beforeSend: function() {},
					success: function(o) {
						e("#contact-form .submitButton").fadeOut(250), setTimeout(() => {
							e(".response-message").fadeIn(250), e(".response-message").height(e("#contact-form").height())
						}, 250)
					},
					complete: function(e) {}
				})
			}
			e("#contact-form").on("submit", (function(e) {
				e.preventDefault(), o()
			}))
		}

		function F() {
			e("#career-form").on("submit", (function(o) {
				o.preventDefault();
				let t = e("#career-form");
				var s = new FormData(t[0]);
				e.ajax({
					url: "home/careerPageForm",
					cache: !1,
					data: s,
					type: "POST",
					processData: !1,
					contentType: !1,
					beforeSend: function() {},
					success: function(o) {
						e("#career-form .careerUpload").fadeOut(250), setTimeout(() => {
							e(".response-message").fadeIn(250), e(".response-message").height(e(".career-form").height())
						}, 250)
					},
					complete: function(e) {}
				})
			}))
		}

		function A() {
			function o() {
				let o = e("#FSQForm");
				var t = new FormData(o[0]);
				t.append("ProjectType", e(".question1Answer.selected").text()), t.append("Budget", e(".question2Answer.selected").text()), t.append("Duration", e(".question3Answer.selected").text()), e.ajax({
					url: "ajax/subForm.php",
					cache: !1,
					data: t,
					type: "POST",
					processData: !1,
					contentType: !1,
					beforeSend: function() {},
					success: function(o) {
						e("#FSQForm input").val(""), e("#FSQForm textarea").val(""), e(".question1Answer, .question2Answer, .question3Answer").removeClass("selected"), d.go(4), e(".splide__arrows").fadeOut(250), e(".closeFSQ").on("click", (function() {
							setTimeout(() => {
								d.go(0), e(".splide__arrows").fadeIn()
							}, 700)
						}))
					},
					complete: function(e) {}
				})
			}
			e(".question1Answer").click((function() {
				d.go(1), e(this).addClass("selected")
			})), e(".question2Answer").click((function() {
				d.go(2), e(this).addClass("selected")
			})), e(".question3Answer").click((function() {
				d.go(3), e(this).addClass("selected")
			})), e("#FSQForm").on("submit", (function(e) {
				e.preventDefault(), o()
			}))
		}

		function I(e) {
			return e = e || 2e3, new Promise(o => {
				setTimeout(() => {
					o()
				}, e)
			})
		}

		function P() {
			e(".splide-FSQ").length > 0 && (d = new Splide(".splide-FSQ", {
				type: "fade",
				perPage: 1,
				autoWidth: !0,
				arrows: !0,
				pagination: !1,
				keyboard: !1,
				wheel: !1,
				drag: !1,
				waitForTransition: !1,
				clones: 1,
				lazyLoad: !0
			}).mount({}, S))
		}

		function S(o, t) {
			let s = t.Elements.list;

			function n() {
				e(s).css({
					transition: "0.7s ease-out"
				})
			}

			function a(o, t) {
				e(s).css({
					opacity: 0,
					transform: "translateY(-50px)"
				}), setTimeout((function() {
					t(), r()
				}), 700)
			}

			function r() {
				e(s).css({
					opacity: 0,
					transform: "translateY(200px)"
				}), setTimeout((function() {
					e(s).css({
						opacity: 1,
						transform: "translateY(0)"
					})
				}), 150)
			}
			return {
				mount: n,
				start: a,
				cancel: r
			}
		}
		e(document).ready((function() {
				barba.hooks.after(() => {
					n.update()
				}), "explorer" === o ? v() : barba.init({
					timeout: 1e4,
					logLevel: "error",
					preventRunning: !0,
					prefetchIgnore: !0,
					cacheIgnore: !0,
					transitions: [{
						name: "general",
						once: function() {
							v(!0), e(".mobile-nav p, .mobile-nav a").on("click", (function(o) {
								e(".hamburger-menu, .mobile-nav").removeClass("open"), e("body").addClass("menuClosed").removeClass("menuOpened"), e("#smoothAnim").removeClass("transitionAnimationIn")
							}))
						},
						leave: function(o) {
							if (a = o.trigger, e("body").removeClass("menuOpened").removeClass("projectStartOpened"), "barba" !== o.trigger || o.trigger && "projectReturn" === o.trigger) {
								const o = this.async();
								e("#smoothAnim").addClass("transitionAnimationIn").removeClass("transitionAnimationOut"), setTimeout((function() {
									m(), e(".scrollContainer").fadeOut(0), o()
								}), 1750)
							}
						},
						afterLeave({
							current: e,
							next: o,
							trigger: t
						}) {
							n.destroy()
						},
						after() {
							"function" == typeof ga && (ga("set", "page", window.location.pathname), ga("send", "pageview")), e(".scrollContainer").fadeIn(0), n.init(), v(), n.stop(), I(200), n.start()
						}
					}, {
						name: "self",
						once: function() {
							v(!0)
						},
						leave: function(o) {
							if (a = o.trigger, e("body").removeClass("menuOpened").removeClass("projectStartOpened"), "barba" !== o.trigger || o.trigger && "projectReturn" === o.trigger) {
								const o = this.async();
								e("#smoothAnim").addClass("transitionAnimationIn").removeClass("transitionAnimationOut"), setTimeout((function() {
									m(), e(".scrollContainer").fadeOut(0), o()
								}), 1750)
							}
						},
						afterLeave({
							current: e,
							next: o,
							trigger: t
						}) {
							n.destroy()
						},
						after() {
							"function" == typeof ga && (ga("set", "page", window.location.pathname), ga("send", "pageview")), e(".scrollContainer").fadeIn(0), n.init(), v(), n.stop(), I(200), n.start()
						}
					}]
				})
			})),
			function(e, o) {
				e.fn.inViewport = function(t) {
					return this.each((function(s, n) {
						function a() {
							var o = n.getBoundingClientRect(),
								s = o.top;
							return e(window).width() < 768 && (s = o.top - o.height + 200), t.call(n, Math.max(0, s))
						}
						a(), e(o).on("resize scroll", a)
					}))
				}
			}(jQuery, window)
	}(jQuery);