(() => {
    function sa(a = !1) {
        return embeddedservice_bootstrap.isLocalStorageAvailable && a ? localStorage : embeddedservice_bootstrap.isSessionStorageAvailable ? sessionStorage : void 0;
    }
    function S(a) {
        if (a) for (const b of Object.keys(JSON.parse(a))) if (!Object.hasOwn(p, b)) return b;
    }
    function ta() {
        if (embeddedservice_bootstrap.isLocalStorageAvailable) return S(localStorage.getItem(k) || "{}");
        if (embeddedservice_bootstrap.isSessionStorageAvailable) return S(sessionStorage.getItem(k) || "{}");
    }
    function ua() {
        let a, b;
        var c;
        if (!(c = ta())) {
            c = new Uint32Array(32);
            crypto.getRandomValues(c);
            let d = "";
            for (let e = 0; 32 > e; e++) {
                if (8 === e || 12 === e || 16 === e || 20 === e) d += "-";
                d = 12 === e ? d + "4" : 16 === e ? d + "0123456789abcdef".charAt((c[e] & 3) | 8) : d + "0123456789abcdef".charAt(c[e] & 15);
            }
            c = d;
        }
        m = c;
        c = JSON.stringify({
            [m]: {},
        });
        embeddedservice_bootstrap.isLocalStorageAvailable && !localStorage.getItem(k) && ((a = c), localStorage.setItem(k, a));
        embeddedservice_bootstrap.isSessionStorageAvailable && !sessionStorage.getItem(k) && ((b = c), sessionStorage.setItem(k, b));
        (a || b) &&
            T("ESW_3RDPARTY_STORAGE_SET_OBJECTS", {
                orgId: embeddedservice_bootstrap.settings.orgId,
                localStorageObj: a,
                sessionStorageObj: b,
            });
        n("web storage initialized");
    }
    function B(a, b = !0) {
        if ((b = sa(b))) {
            var c = (b.getItem(k) && JSON.parse(b.getItem(k))) || {};
            c = a === p.JWT ? c[a] : c[m] && c[m][a];
        }
        return c;
    }
    function va(a, b) {
        if (b && a) {
            const c = (b.getItem(k) && JSON.parse(b.getItem(k))) || {};
            Object.keys(a).forEach((d) => {
                c[d] = a[d];
            });
            0 !== Object.keys(c).length && b.setItem(k, JSON.stringify(c));
        }
    }
    function I(a, b, c = !0, d = !1) {
        const e = sa(c);
        if (e) {
            const f = (e.getItem(k) && JSON.parse(e.getItem(k))) || {};
            a === p.JWT ? (f[a] = b) : (f[m] || (f[m] = {}), (f[m][a] = b));
            e.setItem(k, JSON.stringify(f));
            n(`${a} set in ${c ? "localStorage" : "sessionStorage"}`);
            d &&
                T("ESW_3RDPARTY_STORAGE_SET_ITEMS", {
                    orgId: embeddedservice_bootstrap.settings.orgId,
                    conversationId: m,
                    key: a,
                    value: b,
                    inLocalStorage: c,
                });
        }
    }
    function ea(a) {
        embeddedservice_bootstrap.isLocalStorageAvailable && !a && localStorage.removeItem(k);
        embeddedservice_bootstrap.isSessionStorageAvailable && sessionStorage.removeItem(k);
        T("ESW_3RDPARTY_STORAGE_CLEAR", embeddedservice_bootstrap.settings.orgId);
        n("web storage cleared");
    }
    function cb() {
        wa = new Promise((a) => {
            fa = a;
        });
        z = {};
        E = {};
        C = void 0;
        H = A = !1;
        xa();
        n("Cleared in-memory data.");
    }
    function ya(a) {
        if (m !== a) {
            if (embeddedservice_bootstrap.isSessionStorageAvailable) {
                var b = sessionStorage.getItem(k) ? JSON.parse(sessionStorage.getItem(k)) : {};
                b[m] ? ((b[a] = b[m]), delete b[m]) : (b[a] = {});
                sessionStorage.setItem(k, JSON.stringify(b));
                n("conversationId updated in sessionStorage");
            }
            embeddedservice_bootstrap.isLocalStorageAvailable &&
                ((b = localStorage.getItem(k) ? JSON.parse(localStorage.getItem(k)) : {}), b[m] ? ((b[a] = b[m]), delete b[m]) : (b[a] = {}), localStorage.setItem(k, JSON.stringify(b)), n("conversationId updated in localStorage"));
            m = a;
        }
    }
    function za(a) {
        const b = (c, d) => {
            Object.keys(d).forEach((e) => {
                "object" === typeof c[e] && typeof ("object" === d[e]) ? b(c[e], d[e]) : void 0 === c[e] && (c[e] = d[e]);
            });
        };
        a && "object" === typeof a && b(embeddedservice_bootstrap.settings, a);
    }
    function L(a, b, c) {
        if ((c || embeddedservice_bootstrap.settings.devMode) && console && console[a]) console[a]("[EmbeddedServiceBootstrap] " + (Array.isArray(b) ? b.join(", ") : b));
    }
    function n() {
        L("log", [].slice.apply(arguments));
    }
    function l(a, b) {
        a ? L("warn", "Warning: " + a, b) : L("warn", "EmbeddedServiceBootstrap sent an anonymous warning.", b);
    }
    function g(a, b) {
        a ? L("error", a, b) : L("error", "EmbeddedServiceBootstrap responded with an unspecified error.", b);
    }
    function ha() {
        return window.$A && "function" === typeof window.$A.get && window.$A.get("$Site");
    }
    function ia(a, b, c) {
        const d = document.createElementNS("http://www.w3.org/2000/svg", b);
        Object.getOwnPropertyNames(c).forEach((e) => {
            "children" === e
                ? c.children.forEach((f) => {
                      ia(d, f.type, f);
                  })
                : d.setAttribute(e, c[e]);
        });
        a.appendChild(document.createTextNode("\n"));
        a.appendChild(d);
        a.appendChild(document.createTextNode("\n"));
    }
    function ja(a) {
        const b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (a)
            return (
                b.setAttribute("focusable", "false"),
                b.setAttribute("aria-hidden", "true"),
                b.setAttribute("viewBox", "0 0 100 100"),
                Array.isArray(a)
                    ? a.forEach((c) => {
                          ia(b, c.type, c);
                      })
                    : ia(b, "path", {
                          d: a,
                      }),
                b
            );
        g("Invalid icon data.");
    }
    function db() {
        [
            {
                name: "document",
                object: document,
                functions: "addEventListener createAttribute createComment createDocumentFragment createElementNS createTextNode createRange getElementById getElementsByTagName getElementsByClassName querySelector querySelectorAll removeEventListener".split(
                    " "
                ),
            },
            {
                name: "window",
                object: window,
                functions: "addEventListener clearTimeout dispatchEvent open removeEventListener requestAnimationFrame setInterval setTimeout fetch".split(" "),
            },
        ].forEach((a) => {
            a.functions.forEach((b) => {
                b in a.object && !Function.prototype.toString.call(a.object[b]).match(/\[native code\]/) && l("EmbeddedService Messaging Bootstrap may not function correctly with this native JS function modified: " + a.name + "." + b, !0);
            });
        });
    }
    function U(a) {
        "string" !== typeof a && g(`Expected to receive string, instead received: ${a}.`);
        I(p.JWT, a);
    }
    function Aa(a) {
        if (a && a.data && a.origin)
            if (embeddedservice_bootstrap.filePreviewFrame && embeddedservice_bootstrap.filePreviewFrame.contentWindow === a.source)
                switch (a.data.method) {
                    case "ESW_APP_SHOW_FILE_PREVIEW_FRAME":
                        Ba(!0);
                        break;
                    case "ESW_APP_HIDE_FILE_PREVIEW_FRAME":
                        Ba(!1);
                        break;
                    default:
                        l("Unrecognized event name: " + a.data.method);
                }
            else if (embeddedservice_bootstrap.siteContextFrame && embeddedservice_bootstrap.siteContextFrame.contentWindow === a.source)
                switch (a.data.method) {
                    case "ESW_3RDPARTY_STORAGE_READY":
                        Ca();
                        break;
                    case "ESW_3RDPARTY_STORAGE_RESPONSE":
                        a.data.data && a.data.data.localStorage && va(a.data.data.localStorage, localStorage);
                        a.data.data && a.data.data.sessionStorage && va(a.data.data.sessionStorage, sessionStorage);
                        Da();
                        break;
                    default:
                        l("Unrecognized event name: " + a.data.method);
                }
            else if ("null" === a.origin || (0 === D().indexOf(a.origin) && embeddedservice_bootstrap.isMessageFromSalesforceDomain(a.origin) && v().contentWindow === a.source)) {
                var b = v();
                switch (a.data.method) {
                    case "ESW_APP_READY_EVENT":
                        fa();
                        break;
                    case "ESW_APP_LOADED":
                        a = t();
                        b = document.getElementById("embeddedMessagingIconContainer");
                        let c = document.getElementById("embeddedMessagingIconChat"),
                            d = document.getElementById("embeddedMessagingLoadingSpinner");
                        v() || l("Embedded Messaging iframe not available for post-app-load updates.");
                        a
                            ? (b && d && b.removeChild(d),
                              c && (c.style.display = "none"),
                              (a.disabled = !1),
                              a.classList.remove("embeddedMessagingConversationButtonLoading"),
                              a.classList.add("embeddedMessagingConversationButtonLoaded"),
                              a.classList.add("no-hover"))
                            : l("Embedded Messaging static button not available for post-app-load updates.");
                        H = !0;
                        try {
                            F("onEmbeddedMessagingInitSuccess");
                        } catch (e) {
                            (H = !1), g(`Something went wrong in firing onEmbeddedMessagingInitSuccess event ${e}.`);
                        }
                        break;
                    case "ESW_APP_INITIALIZATION_ERROR":
                        V();
                        break;
                    case "ESW_APP_MINIMIZE":
                        embeddedservice_bootstrap.minimizeIframe(b, a.data.data);
                        break;
                    case "ESW_APP_MAXIMIZE":
                        embeddedservice_bootstrap.maximizeIframe(b);
                        break;
                    case "ESW_APP_RESET_INITIAL_STATE":
                        J();
                        break;
                    case "ESW_SET_JWT_EVENT":
                        U(a.data.data);
                        break;
                    case "ESW_CLEAN_UP_JWT_EVENT":
                        ea();
                        break;
                    case "ESW_DOWNLOAD_FILE":
                        eb(a.data.data);
                        break;
                    case "ESW_SET_WEBSTORAGE_FAILEDMESSAGES_EVENT":
                        a = a.data.data;
                        "object" !== typeof a ? g(`Expected to receive object, instead received: ${a}.`) : I(p.FAILED_OUTBOUND_MESSAGE_ENTRIES, a, !1);
                        break;
                    case "ESW_CLEAN_UP_WEBSTORAGE_FAILEDMESSAGES_EVENT":
                        a = p.FAILED_OUTBOUND_MESSAGE_ENTRIES;
                        embeddedservice_bootstrap.isLocalStorageAvailable && localStorage.getItem(k) && ((b = JSON.parse(localStorage.getItem(k)) || {}), delete b[a], b[m] && delete b[m][a], localStorage.setItem(k, JSON.stringify(b)));
                        embeddedservice_bootstrap.isSessionStorageAvailable &&
                            sessionStorage.getItem(k) &&
                            ((b = JSON.parse(sessionStorage.getItem(k)) || {}), delete b[a], b[m] && delete b[m][a], sessionStorage.setItem(k, JSON.stringify(b)));
                        n(`${a} removed from web storage`);
                        break;
                    case "ESW_APP_UPDATE_TITLE_NOTIFICATION":
                        xa(a.data.data);
                        break;
                    case "ESW_APP_SEND_HIDDEN_PRECHAT_FIELDS":
                        y("ESW_APP_RECEIVE_HIDDEN_PRECHAT_FIELDS", z);
                        break;
                    case "ESW_APP_SEND_AUTORESPONSE_PARAMETERS":
                        y("ESW_APP_RECEIVE_AUTORESPONSE_PARAMETERS", E);
                        break;
                    case "EMBEDDED_MESSAGING_CONVERSATION_ID_UPDATE":
                        ya(a.data.data);
                        break;
                    case "EMBEDDED_MESSAGING_IDENTITY_TOKEN_EXPIRED_EVENT":
                        w() !== u.AUTH ? l("handleIdentityTokenExpiredEvent method called but User Verification isn\u2019t enabled in Messaging Settings.") : F("onEmbeddedMessagingIdentityTokenExpired");
                        break;
                    case "EMBEDDED_MESSAGING_JWT_RETRIEVAL_FAILURE_EVENT":
                        Ea();
                        break;
                    case "ESW_APP_PRECHAT_SUBMIT":
                        fb(a.data.data);
                        break;
                    default:
                        l("Unrecognized event name: " + a.data.method);
                }
            } else g("Unexpected message origin: " + a.origin);
    }
    function Fa(a) {
        if (a && a.key && a.key === k)
            if (null === a.newValue) w() === u.AUTH && ka(!1, !0);
            else {
                const b = S(a.oldValue);
                a = S(a.newValue);
                b && a && b !== a && (n("ConversationId change detected in web storage"), ya(a));
            }
    }
    function V() {
        H = !0;
        try {
            F("onEmbeddedMessagingInitError");
        } catch (a) {
            (H = !1), g(`Something went wrong in firing onEmbeddedMessagingInitError event ${a}.`);
        }
    }
    function F(a) {
        if (!a) throw Error(`Expected an eventName parameter with a string value. Instead received ${a}.`);
        try {
            window.dispatchEvent(new CustomEvent(a));
        } catch (b) {
            throw Error("Something went wrong while dispatching the event " + a + ":" + b);
        }
    }
    function xa(a) {
        if (a) {
            const b = JSON.parse(a)[0],
                c = Ga;
            M && window.clearInterval(M);
            M = window.setInterval(() => {
                document.title = document.title === b ? c : b;
            }, 1e3);
        } else window.clearInterval(M), (M = void 0), (document.title = Ga);
    }
    function v() {
        return document.getElementById("embeddedMessagingFrame");
    }
    function t() {
        return document.getElementById("embeddedMessagingConversationButton");
    }
    function Ba(a) {
        const b = v();
        embeddedservice_bootstrap.filePreviewFrame &&
            b &&
            (a
                ? (embeddedservice_bootstrap.filePreviewFrame.classList.add("show"),
                  embeddedservice_bootstrap.filePreviewFrame.contentWindow.focus(),
                  embeddedservice_bootstrap.filePreviewFrame.setAttribute("aria-hidden", "false"),
                  (b.tabIndex = "-1"),
                  b.setAttribute("aria-hidden", "true"))
                : (embeddedservice_bootstrap.filePreviewFrame.classList.remove("show"), embeddedservice_bootstrap.filePreviewFrame.setAttribute("aria-hidden", "true"), (b.tabIndex = "0"), b.setAttribute("aria-hidden", "false")));
    }
    function eb(a) {
        let b;
        b = document.createElement("iframe");
        b.style.display = "none";
        b.src = a.attachmentDownloadURL || "";
        document.body.appendChild(b);
        a.shouldOpenFileInNewTab && window.open(b.src, "_blank", "noreferrer noopener");
        setTimeout(() => {
            document.body.removeChild(b);
        }, 1e3);
    }
    function Ha(a) {
        return new Promise((b, c) => {
            let d = D(),
                e = document.createElement("link");
            e.id = "embeddedMessagingBootstrapStyles";
            e.class = "embeddedMessagingBootstrapStyles";
            e.href = d + "/assets/styles/bootstrap" + (embeddedservice_bootstrap.settings.devMode ? "" : ".min") + ".css";
            e.type = "text/css";
            e.rel = "stylesheet";
            e.onerror = c;
            e.onload = b;
            document.getElementsByTagName("head")[0].appendChild(e);
        });
    }
    function Ia() {
        return Ja(
            embeddedservice_bootstrap.settings.scrt2URL +
                "/embeddedservice/v1/embedded-service-config?orgId=" +
                embeddedservice_bootstrap.settings.orgId +
                "&esConfigName=" +
                embeddedservice_bootstrap.settings.eswConfigDevName +
                "&language=" +
                embeddedservice_bootstrap.settings.language,
            "GET"
        );
    }
    function Ka() {
        return Ja(embeddedservice_bootstrap.settings.scrt2URL + "/embeddedservice/v1/businesshours?orgId=" + embeddedservice_bootstrap.settings.orgId + "&esConfigName=" + embeddedservice_bootstrap.settings.eswConfigDevName, "GET")
            .then((a) => {
                (a = a && a.businessHoursInfo) &&
                    Array.isArray(a.businessHours) &&
                    0 < a.businessHours.length &&
                    (W() || "boolean" !== typeof embeddedservice_bootstrap.settings.hideChatButtonOnLoad) &&
                    ((G = {
                        startTime: a.businessHours[0].startTime,
                        endTime: a.businessHours[0].endTime,
                    }),
                    la());
            })
            .catch((a) => {
                g("Error loading business hours metadata.", a);
            });
    }
    function Ja(a, b) {
        return new Promise((c, d) => {
            const e = new XMLHttpRequest();
            e.open(b, a, !0);
            e.onreadystatechange = (f) => {
                if (((f = f.target) && f.readyState === f.DONE) || 204 === f.status) 200 === f.status || 204 === f.status ? ((f = f.responseText ? JSON.parse(f.responseText) : f.responseText), c(f)) : d(f.status);
            };
            e.send();
        });
    }
    function gb() {
        return w() === u.AUTH
            ? La().then((a) => {
                  Ma()
                      .then((b) => {
                          n("finished joining verified user conversation");
                          X(a, b);
                      })
                      .catch(() => {
                          V();
                      });
              })
            : w() === u.UNAUTH
            ? Na() || (embeddedservice_bootstrap.settings.embeddedServiceConfig.termsAndConditions || {}).isTermsAndConditionsEnabled
                ? (X(), Promise.resolve())
                : ma().then((a) => {
                      Y(z)
                          .then((b) => {
                              n("finished creating conversation");
                              X(a, b);
                          })
                          .catch(() => {
                              V();
                          });
                  })
            : Promise.reject(Error("Something went wrong initializing conversation state."));
    }
    function X(a, b) {
        var c = B(p.FAILED_OUTBOUND_MESSAGE_ENTRIES, !1);
        const d = embeddedservice_bootstrap.settings.standardLabels,
            e = embeddedservice_bootstrap.settings.embeddedServiceConfig.customLabels;
        if (embeddedservice_bootstrap.settings.imageCompressionOptions) {
            var f = embeddedservice_bootstrap.settings.imageCompressionOptions;
            f = Object.assign(
                {},
                f.quality &&
                    !isNaN(Number(f.quality)) &&
                    0 <= Number(f.quality) &&
                    1 >= Number(f.quality) && {
                        quality: Number(f.quality),
                    },
                f.maxHeight &&
                    !isNaN(Number(f.maxHeight)) &&
                    0 < Number(f.maxHeight) && {
                        maxHeight: Number(f.maxHeight),
                    },
                f.maxWidth &&
                    !isNaN(Number(f.maxWidth)) &&
                    0 < Number(f.maxWidth) && {
                        maxWidth: Number(f.maxWidth),
                    },
                f.convertTypes &&
                    ("string" === typeof f.convertTypes || Array.isArray(f.convertTypes)) && {
                        convertTypes: f.convertTypes,
                    },
                f.convertSize &&
                    !isNaN(Number(f.convertSize)) &&
                    0 <= Number(f.convertSize) && {
                        convertSize: f.convertSize,
                    }
            );
        }
        c =
            Object.assign(
                {},
                embeddedservice_bootstrap.settings.embeddedServiceConfig,
                Object.assign(
                    {},
                    {
                        identityToken: C,
                        failedMessages: c,
                        conversationId: m,
                        devMode: !!embeddedservice_bootstrap.settings.devMode,
                        language: embeddedservice_bootstrap.settings.language,
                        imageCompressionOptions: f,
                    },
                    d && {
                        standardLabels: d,
                    },
                    e && {
                        customLabels: e,
                    },
                    {
                        hasConversationButtonColorContrastMetA11yThreshold: Oa.isValidContrastRatio("#FFFFFF", K("headerColor")),
                    }
                )
            ) || {};
        a &&
            (c = Object.assign(c, {
                jwtData: a,
            }));
        b &&
            (c = Object.assign(c, {
                conversationData: b,
            }));
        y("ESW_SET_CONFIG_EVENT", c);
    }
    function fb(a) {
        const b = Object.assign(a, z);
        w() === u.AUTH
            ? Y(b).then((c) => {
                  y("EMBEDDED_MESSAGING_SET_CONVERSATION_DATA_EVENT", c);
              })
            : w() === u.UNAUTH &&
              ma().then((c) => {
                  y("ESW_SET_JWT_EVENT", c);
                  Y(b).then((d) => {
                      y("EMBEDDED_MESSAGING_SET_CONVERSATION_DATA_EVENT", d);
                  });
              });
    }
    function Pa() {
        return new Promise((a) => {
            embeddedservice_bootstrap.createFilePreviewFrame();
            embeddedservice_bootstrap.createIframe().then(() => {
                a("Created Embedded Messaging frame.");
            });
        });
    }
    function hb() {
        return B(p.JWT)
            ? ib()
                  .then((a) => {
                      U(a.accessToken);
                      return a;
                  })
                  .catch((a) => {
                      g(`Failed to get continuity JWT: ${a && a.message ? a.message : a}.`);
                      J();
                  })
            : Promise.reject(void 0);
    }
    function ib() {
        const a = embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/authorization/continuityAccessToken");
        return Z(a, "GET", "cors").then((b) => {
            if (!b.ok) throw b;
            return b.json();
        });
    }
    function ma() {
        return jb()
            .then((a) => {
                U(a.accessToken);
                return a;
            })
            .catch((a) => kb(a));
    }
    function jb() {
        const a = embeddedservice_bootstrap.settings.orgId,
            b = embeddedservice_bootstrap.settings.eswConfigDevName;
        var c = Qa();
        c = c
            ? embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/authorization/unauthenticated/accessToken", "?", c)
            : embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/authorization/unauthenticated/accessToken");
        return fetch(c, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orgId: a,
                developerName: b,
                capabilitiesVersion: "246",
            }),
        }).then((d) => {
            if (!d.ok) throw d;
            return d.json();
        });
    }
    function La() {
        return lb()
            .then((a) => {
                U(a.accessToken);
                return a;
            })
            .catch((a) => {
                g(`Error retrieving authenticated token: ${a && a.message ? a.message : a}.`);
                Ea();
            });
    }
    function lb() {
        const a = embeddedservice_bootstrap.settings.orgId,
            b = embeddedservice_bootstrap.settings.eswConfigDevName,
            c = C,
            d = Qa(),
            e = d
                ? embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/authorization/authenticated/accessToken", "?", d)
                : embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/authorization/authenticated/accessToken"),
            f = {
                "Content-Type": "application/json",
            },
            h = {
                orgId: a,
                developerName: b,
                capabilitiesVersion: "246",
                authorizationType: na.JWT,
                customerIdentityToken: c,
            };
        return c && aa(c)
            ? ba(e, "POST", "cors", f, h).then((q) => {
                  if (!q.ok) throw q;
                  return q.json();
              })
            : new Promise((q) => {
                  Ra({
                      apiPath: e,
                      method: "POST",
                      mode: "cors",
                      requestHeaders: f,
                      requestBody: h,
                      resolve: q,
                  });
              }).then((q) => {
                  if (!q.ok) throw q;
                  return q.json();
              });
    }
    function Sa() {
        Ta()
            .then(() => {
                n("Successfully Registered Device Capabilities.");
            })
            .catch((a) => {
                mb(a);
            });
    }
    function mb(a) {
        a &&
            a.status &&
            500 <= a.status &&
            599 >= a.status &&
            (g(`Something went wrong in Registering Device Capabilities: ${a && a.statusText ? a.statusText : a.status}. Retrying the request.`),
            Ta()
                .then(() => {
                    n("Successfully Registered Device Capabilities after retrying.");
                })
                .catch((b) => {
                    g(`Failed to Register Device Capabilities after retrying: ${b && b.statusText ? b.statusText : b.status}`);
                }));
        g(`Something went wrong while registering device capabilities: ${a && a.statusText ? a.statusText : a.status ? a.status : a}`);
    }
    function Ta() {
        const a = embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/device/registerDeviceCapabilities");
        return Z(a, "POST", "cors", null, {});
    }
    function Ma(a) {
        return nb(!1)
            .then((b) => {
                let c = [];
                if (!b.conversations || !Array.isArray(b.conversations)) throw Error(`Invalid conversation list: ${b.conversations}.`);
                c = b.conversations.filter((d) => 0 === d.endTimestamp);
                if (0 === c.length) {
                    if (a) throw ((b = ta()), l("No open conversation found, deleting stale data with conversationId " + b + " from web storage"), J(), Error(`Invalid conversation identifier: ${b}.`));
                    return Na() || (embeddedservice_bootstrap.settings.embeddedServiceConfig.termsAndConditions || {}).isTermsAndConditionsEnabled
                        ? null
                        : (l("No existing conversation found and pre-chat is not enabled. Will start a new conversation."), Y(z).then((d) => d));
                }
                1 < c.length && (l(`Expected the user to be participating in 1 open conversation but instead found ${c.length}. Loading the conversation with latest startTimestamp.`), c.sort((d, e) => e.startTimestamp - d.startTimestamp));
                b = c[0];
                if (!ob(b.conversationId)) throw Error(`Invalid conversation identifier: ${b.conversationId}.`);
                b.isExistingConversation = !0;
                return b;
            })
            .catch((b) => {
                throw Error(`Failed to list conversation entries: ${b && b.message ? b.message : b}.`);
            });
    }
    function nb(a) {
        const b = embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/queries/conversation/list");
        return Z(b, "POST", "cors", null, {
            includeClosedConversations: a,
        }).then((c) => c.json());
    }
    function kb(a) {
        if (a && a.status && 401 === a.status)
            return ma().catch((b) => {
                throw Error(b);
            });
        throw Error(`Error retrieving unauthenticated token: ${a}.`);
    }
    function Na() {
        return (embeddedservice_bootstrap.settings.embeddedServiceConfig.forms || []).some((a) => {
            a.formFields = a.formFields || [];
            return "PreChat" === a.formType && 0 < a.formFields.length;
        });
    }
    function Y(a) {
        return Ua(a)
            .then((b) => {
                Sa();
                return b;
            })
            .catch((b) => pb(b, a));
    }
    function pb(a, b) {
        if (!a || !a.status || (500 <= a.status && 599 >= a.status))
            return (
                g(`Something went wrong while creating a conversation: ${a && a.message ? a.message : a}. Re-trying the request.`),
                Ua(b)
                    .then((c) => {
                        Sa();
                        return c;
                    })
                    .catch((c) => {
                        g(`Create conversation request failed again: ${c && c.message ? c.message : c}.`);
                        throw c;
                    })
            );
        g(`Something went wrong while creating a conversation: ${a && a.message ? a.message : a}`);
        throw a;
    }
    function Ua(a) {
        const b = embeddedservice_bootstrap.settings.scrt2URL.concat("/iamessage/v1/conversation");
        return Z(
            b,
            "POST",
            "cors",
            null,
            Object.assign(
                {},
                a && {
                    routingAttributes: a,
                },
                {
                    conversationId: m,
                }
            )
        ).then((c) => c.json());
    }
    function ba(a, b, c, d, e) {
        const f = B(p.JWT);
        d = d
            ? d
            : Object.assign(
                  {},
                  {
                      "Content-Type": "application/json",
                  },
                  f && {
                      Authorization: "Bearer " + f,
                  }
              );
        e = e ? JSON.stringify(e) : void 0;
        return fetch(
            a,
            Object.assign(
                {},
                {
                    method: b,
                    mode: c,
                    headers: d,
                },
                e && {
                    body: e,
                }
            )
        ).then((h) => {
            401 === h.status && ea();
            if (!h.ok) throw h;
            return h;
        });
    }
    function Z(a, b, c, d, e) {
        const f = B(p.JWT);
        return w() === u.AUTH
            ? f && aa(f)
                ? ba(a, b, c, d, e)
                : C && aa(C)
                ? new Promise((h) => {
                      Va({
                          apiPath: a,
                          method: b,
                          mode: c,
                          requestHeaders: d,
                          requestBody: e,
                          resolve: h,
                      });
                  })
                : new Promise((h) => {
                      Ra({
                          apiPath: a,
                          method: b,
                          mode: c,
                          requestHeaders: d,
                          requestBody: e,
                          resolve: h,
                      });
                  })
            : ba(a, b, c, d, e);
    }
    function Qa() {
        var a = [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera].join(" ");
        const b = Wa(a, [
            {
                name: "Windows Phone",
                value: "Windows Phone",
                version: "OS",
            },
            {
                name: "Windows",
                value: "Win",
                version: "NT",
            },
            {
                name: "iPhone",
                value: "iPhone",
                version: "OS",
            },
            {
                name: "iPad",
                value: "iPad",
                version: "OS",
            },
            {
                name: "Kindle",
                value: "Silk",
                version: "Silk",
            },
            {
                name: "Android",
                value: "Android",
                version: "Android",
            },
            {
                name: "PlayBook",
                value: "PlayBook",
                version: "OS",
            },
            {
                name: "BlackBerry",
                value: "BlackBerry",
                version: "/",
            },
            {
                name: "Macintosh",
                value: "Mac",
                version: "OS X",
            },
            {
                name: "Linux",
                value: "Linux",
                version: "rv",
            },
            {
                name: "Palm",
                value: "Palm",
                version: "PalmOS",
            },
        ]);
        a = Wa(a, [
            {
                name: "Edge",
                value: "Edg",
                version: "Edg",
            },
            {
                name: "Chrome",
                value: "Chrome",
                version: "Chrome",
            },
            {
                name: "Firefox",
                value: "Firefox",
                version: "Firefox",
            },
            {
                name: "Safari",
                value: "Safari",
                version: "Version",
            },
            {
                name: "Internet Explorer",
                value: "MSIE",
                version: "MSIE",
            },
            {
                name: "Opera",
                value: "Opera",
                version: "Opera",
            },
            {
                name: "BlackBerry",
                value: "CLDC",
                version: "CLDC",
            },
            {
                name: "Mozilla",
                value: "Mozilla",
                version: "Mozilla",
            },
        ]);
        return new URLSearchParams({
            os: b.name,
            osVersion: b.version,
            browser: a.name,
            browserVersion: a.version,
        }).toString();
    }
    function Wa(a, b) {
        let c;
        let d;
        for (c = 0; c < b.length; c += 1) {
            var e = new RegExp(b[c].value, "i");
            if ((e = e.test(a))) {
                e = new RegExp(b[c].version + "[- /:;]([\\d._]+)", "i");
                e = a.match(e);
                d = "";
                e && e[1] && (e = e[1]);
                if (e) for (e = e.split(/[._]+/), a = 0; a < e.length; a += 1) d = 0 === a ? d + (e[a] + ".") : d + e[a];
                else d = "0";
                return {
                    name: b[c].name,
                    version: parseFloat(d),
                };
            }
        }
        return {
            name: "unknown",
            version: 0,
        };
    }
    function D() {
        try {
            return embeddedservice_bootstrap.settings.siteURL;
        } catch (a) {
            g("Error getting Site URL: " + a);
        }
    }
    function x(a, b) {
        for (const c of embeddedservice_bootstrap.settings.embeddedServiceConfig.customLabels) if (c.sectionName === a && c.labelName === b) return c.labelValue || "";
        for (const c of embeddedservice_bootstrap.settings.standardLabels) if (c.sectionName === a && c.labelName === b) return c.labelValue || "";
        return "";
    }
    function K(a) {
        for (const b of embeddedservice_bootstrap.brandingData) if (b.n && b.n === a) return b.v;
    }
    function Xa() {
        let a = t(),
            b = document.getElementById("embeddedMessagingIconContainer"),
            c = document.getElementById("embeddedMessagingIconChat"),
            d = document.createElement("div"),
            e,
            f = 1;
        if (a) {
            c.style.display = "none";
            d.setAttribute("class", "embeddedMessagingLoadingSpinner");
            for (d.setAttribute("id", "embeddedMessagingLoadingSpinner"); 13 > f; f++) (e = document.createElement("div")), e.setAttribute("class", "embeddedMessagingLoadingCircle" + f + " embeddedMessagingLoadingCircle"), d.appendChild(e);
            d.classList.add("embeddedMessagingIconLoading");
            a.classList.add("embeddedMessagingConversationButtonLoading");
            b.insertBefore(d, c);
            a.disabled = !0;
        }
    }
    function Ya() {
        if (!G) return !0;
        const a = Number(G.startTime),
            b = Number(G.endTime),
            c = Date.now();
        return c >= a && c < b ? !0 : !1;
    }
    function la() {
        let a;
        if (G) {
            var b = Ya();
            b ? (a = Number(G.endTime)) : ((a = Number(G.startTime)), F("onEmbeddedMessagingBusinessHoursEnded"));
            isNaN(a) ||
                (N && clearTimeout(N),
                (N = setTimeout(() => {
                    clearTimeout(N);
                    N = void 0;
                    b ? ((G = void 0), embeddedservice_bootstrap.utilAPI.hideChatButton(), Ka().then(la())) : (W() || embeddedservice_bootstrap.utilAPI.showChatButton(), la());
                    b ? F("onEmbeddedMessagingBusinessHoursEnded") : F("onEmbeddedMessagingBusinessHoursStarted");
                }, a - Date.now())));
        }
    }
    function qb() {
        const a = !!navigator.userAgent.match(/iP(hone|ad|od)/i);
        var b = navigator.userAgent.match(/(?!=OS)(([0-9]){2})/i);
        b = b && 0 < b.length ? Number(b[0]) : -1;
        const c = !!navigator.userAgent.match(/WebKit/i) && !navigator.userAgent.match(/CriOS/i);
        return a && c && 15 <= b;
    }
    function W() {
        try {
            return embedded_svc && embedded_svc.menu ? !0 : !1;
        } catch (a) {
            return !1;
        }
    }
    function Za() {
        const a = document.querySelector('meta[name="viewport"]');
        a && (a.setAttribute("content", O), (O = void 0));
    }
    function y(a, b) {
        wa.then(() => {
            const c = v();
            if ("string" !== typeof a) throw Error(`Expected a string to use as message param in post message, instead received ${a}.`);
            c && c.contentWindow
                ? c.contentWindow.postMessage(
                      Object.assign(
                          {},
                          {
                              method: a,
                          },
                          b && {
                              data: b,
                          }
                      ),
                      D()
                  )
                : l(`Embedded Messaging iframe not available for post message with method ${a}.`);
        });
    }
    function T(a, b) {
        rb.then(() => {
            const c = embeddedservice_bootstrap.siteContextFrame;
            if ("string" !== typeof a) throw Error(`Expected a string to use as message param in post message, instead received ${a}.`);
            c && c.contentWindow
                ? c.contentWindow.postMessage(
                      Object.assign(
                          {},
                          {
                              method: a,
                          },
                          b && {
                              data: b,
                          }
                      ),
                      D()
                  )
                : l(`Embedded Messaging iframe not available for post message with method ${a}.`);
        });
    }
    function oa() {
        return new Promise((a, b) => {
            try {
                let c = t(),
                    d = v();
                c && !c.classList.contains("embeddedMessagingConversationButtonLoaded")
                    ? (Xa(),
                      Pa()
                          .then(() => {
                              a();
                          })
                          .catch((e) => {
                              g(e);
                              b(e);
                          }),
                      gb().catch((e) => {
                          V();
                          g(e);
                          b(e);
                      }))
                    : c && c.classList.contains("embeddedMessagingConversationButtonLoaded") && d && d.classList && d.classList.contains("isMaximized")
                    ? y("ESW_APP_MINIMIZE")
                    : g("Something went wrong handling button click event.");
            } catch (c) {
                b(c);
            }
        });
    }
    function sb(a) {
        let b = v();
        a && a.key && (a.key === P.SPACE || a.key === P.ENTER ? (a.preventDefault(), oa()) : a.key === P.TAB && a.shiftKey && b && b.classList && b.classList.contains("isMaximized") && (a.preventDefault(), y("trapfocustolast")));
    }
    function tb() {
        const a = document.getElementById("embeddedMessagingMinimizedNotification"),
            b = t();
        a && a.parentNode.removeChild(a);
        b && b.focus();
    }
    function ub(a) {
        if (a.key === P.ENTER || a.key === P.SPACE) a.preventDefault(), this.handleNotificationDimissButtonClick();
    }
    function vb() {
        if (B(p.JWT))
            return (
                Xa(),
                Pa().catch(g),
                hb()
                    .then((a) => {
                        Ma(!0).then((b) => {
                            X(a, b);
                        });
                    })
                    .catch(g)
            );
    }
    function J(a) {
        try {
            ea(a), ua();
        } catch (b) {
            g("Error on clearing web storage for the previously ended conversation: " + b);
        }
        cb();
        Q && "function" === typeof Q && (Q(), (Q = void 0));
        O && Za();
        embeddedservice_bootstrap.removeMarkup();
        w() === u.UNAUTH && embeddedservice_bootstrap.generateMarkup();
    }
    function pa() {}
    function ka(a, b) {
        v() ? y("EMBEDDED_MESSAGING_CLEAR_USER_SESSION_EVENT", a) : J(b);
    }
    function Va(a) {
        return new Promise((b) => {
            La().then(() => {
                $a(a);
                b();
            });
        });
    }
    function $a(a) {
        a &&
            ba(a.apiPath, a.method, a.mode, a.requestHeaders, a.requestBody)
                .then((b) => {
                    a.resolve && "function" === typeof a.resolve && a.resolve(b);
                })
                .catch((b) => {
                    throw b;
                });
    }
    function Ra(a) {
        if (a) {
            F("onEmbeddedMessagingIdentityTokenExpired");
            var b = new Promise((d) => {
                    R = d;
                }),
                c = new Promise((d, e) => {
                    setTimeout(() => {
                        e();
                    }, 3e4);
                });
            Promise.race([b, c])
                .then(() => {
                    n("Valid identity token found. Fetch authenticated JWT.");
                    a.apiPath.includes("/accessToken") ? ((a.requestBody.customerIdentityToken = C), $a(a)) : Va(a);
                })
                .catch(() => {
                    g("Failed to fetch authenticated JWT due to setIdentityToken timeout or other error. Clearing the messaging session on all tabs.");
                    ka(!1, !1);
                });
        }
    }
    function Ea() {
        let a;
        J(!1);
        embeddedservice_bootstrap.generateMarkup();
        a = t();
        var b = document.getElementById("embeddedMessagingIconChat");
        var c = document.getElementById("embeddedMessagingIconContainer");
        if (a) {
            a.style.display = "block";
            a.setAttribute("tabindex", -1);
            a.style.setProperty("cursor", "default");
            a.classList.add("no-hover");
            c && b && c.removeChild(b);
            b = ja(ca.REFRESH);
            b.setAttribute("id", "embeddedMessagingIconRefresh");
            b.setAttribute("class", "embeddedMessagingIconRefresh");
            c.appendChild(b);
            c = document.createElement("div");
            b = document.createElement("div");
            const e = document.createElement("span"),
                f = document.createElement("span");
            var d = document.createElement("button");
            const h = document.createElement("span"),
                q = document.createElement("span");
            d.className = "embeddedMessagingMinimizedNotificationDismissButton";
            d.addEventListener("click", tb);
            d.addEventListener("keydown", ub);
            d.setAttribute("aria-describedby", "dismissButton-help");
            h.className = "embeddedMessagingMinimizedNotificationDismissButtonText";
            h.title = x("EmbeddedMessagingMinimizedState", "NotificationDismissButtonText") || "Dismiss";
            h.innerHTML = x("EmbeddedMessagingMinimizedState", "NotificationDismissButtonText") || "Dismiss";
            h.style.setProperty("font-family", K("font"));
            q.className = "slds-assistive-text";
            q.id = "dismissButton-help";
            q.innerHTML = x("EmbeddedMessagingMinimizedState", "MinimizedNotificationDismissButtonAssistiveText") || "Close the chat notification";
            d.appendChild(h);
            d.appendChild(q);
            c.id = "embeddedMessagingMinimizedNotification";
            c.className = "embeddedMessagingMinimizedNotification";
            b.className = "embeddedMessagingMinimizedNotificationTextWrapper";
            e.className = "embeddedMessagingMinimizedNotificationText";
            e.role = "status";
            e.title = x("EmbeddedMessagingMinimizedState", "JWTRetrievalFailureText") || "Something went wrong. Log in again to continue your messaging conversation.";
            e.innerHTML = x("EmbeddedMessagingMinimizedState", "JWTRetrievalFailureText") || "Something went wrong. Log in again to continue your messaging conversation.";
            e.style.setProperty("font-family", K("font"));
            f.className = "slds-assistive-text";
            f.innerHTML = x("EmbeddedMessagingMinimizedState", "MinimizedNotificationAssistiveText") || "Expand the text.";
            b.appendChild(e);
            b.appendChild(f);
            c.appendChild(b);
            c.appendChild(d);
            a.disabled = !0;
            embeddedservice_bootstrap.settings.targetElement.appendChild(c);
        }
    }
    function wb(a) {
        a = a.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        a = decodeURIComponent(
            window
                .atob(a)
                .split("")
                .map(function (b) {
                    return "%" + ("00" + b.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(a);
    }
    function aa(a) {
        let b, c;
        try {
            return (b = wb(a)), (c = Math.floor(Date.now() / 1e3) < b.exp), embeddedservice_bootstrap.settings.devMode && !c && n(`JWT has expired at ${new Date(1e3 * b.exp).toString()}`), c;
        } catch (d) {
            return embeddedservice_bootstrap.settings.devMode && g(`JWT validation failed: ${d.message}`), !1;
        }
    }
    function w() {
        let a = null;
        try {
            a = embeddedservice_bootstrap.settings.embeddedServiceConfig.embeddedServiceMessagingChannel.authMode;
        } catch (b) {
            g(`Failed to retrieve auth mode flag: ${b.message}`);
        }
        return a;
    }
    function qa() {
        z = B(p.HIDDEN_PRECHAT_FIELDS, !1) || {};
    }
    function xb(a, b) {
        var c = yb();
        const d = c.map(({ name: e }) => e);
        c = c.find((e) => e.name === a);
        return d.includes(a)
            ? "string" !== typeof b
                ? (g(`You must specify a string for the ${a} field in setHiddenPrechatFields instead of a ${typeof b} value.`), !1)
                : b.toLowerCase().includes("javascript:") || b.toLowerCase().includes("<script>")
                ? (g(`JavaScript isn't allowed in the value for the ${a} field when calling setHiddenPrechatFields.`), !1)
                : b.length > c.maxLength
                ? (g(`Value for the ${a} field in setHiddenPrechatFields exceeds the maximum length restriction of ${c.maxLength} characters.`), !1)
                : !0
            : (g(`setHiddenPrechatFields called with an invalid field name ${a}.`), !1);
    }
    function yb() {
        let a = [];
        var b =
            Array.isArray(embeddedservice_bootstrap.settings.embeddedServiceConfig.forms) &&
            embeddedservice_bootstrap.settings.embeddedServiceConfig.forms.length &&
            Array.isArray(embeddedservice_bootstrap.settings.embeddedServiceConfig.forms[0].hiddenFormFields)
                ? !0
                : !1;
        b && (a = embeddedservice_bootstrap.settings.embeddedServiceConfig.forms[0].hiddenFormFields);
        return a;
    }
    function ab(a) {
        return A ? !0 : (g(`Can't call ${a} before the onEmbeddedMessagingReady event is fired.`), !1);
    }
    function ob(a) {
        return "string" === typeof a && 0 < a.trim().length ? !0 : !1;
    }
    function ra() {
        E = B(p.AUTORESPONSE_PARAMETERS, !1) || {};
    }
    function bb(a) {
        return A ? !0 : (g(`[${a}] Cannot invoke Auto-Response API before the onEmbeddedMessagingReady event is fired.`), !1);
    }
    function da() {}
    function r() {
        this.settings = {
            devMode: !1,
            targetElement: document.body,
        };
        this.isSessionStorageAvailable = this.isLocalStorageAvailable = !0;
        Object.defineProperties(ca, {
            CHAT: {
                value:
                    "M50 0c27.614 0 50 20.52 50 45.833S77.614 91.667 50 91.667c-8.458 0-16.425-1.925-23.409-5.323-13.33 6.973-21.083 9.839-23.258 8.595-2.064-1.18.114-8.436 6.534-21.767C3.667 65.54 0 56.08 0 45.833 0 20.52 22.386 0 50 0zm4.583 61.667H22.917a2.917 2.917 0 000 5.833h31.666a2.917 2.917 0 000-5.833zm12.5-15.834H22.917a2.917 2.917 0 000 5.834h44.166a2.917 2.917 0 000-5.834zM79.583 30H22.917a2.917 2.917 0 000 5.833h56.666a2.917 2.917 0 000-5.833z",
            },
            MINIMIZE_MODAL: {
                value: "M47.6,17.8L27.1,38.5c-0.6,0.6-1.6,0.6-2.2,0L4.4,17.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2 c0.6-0.6,1.6-0.6,2.2,0l16.1,16.3c0.6,0.6,1.6,0.6,2.2,0l16.1-16.2c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C48.1,16.3,48.1,17.2,47.6,17.8z",
            },
            REFRESH: {
                value:
                    "M46.5,4h-3C42.7,4,42,4.7,42,5.5v7c0,0.9-0.5,1.3-1.2,0.7l0,0c-0.3-0.4-0.6-0.7-1-1c-5-5-12-7.1-19.2-5.7 c-2.5,0.5-4.9,1.5-7,2.9c-6.1,4-9.6,10.5-9.7,17.5c-0.1,5.4,2,10.8,5.8,14.7c4,4.2,9.4,6.5,15.2,6.5c5.1,0,9.9-1.8,13.7-5 c0.7-0.6,0.7-1.6,0.1-2.2l-2.1-2.1c-0.5-0.5-1.4-0.6-2-0.1c-3.6,3-8.5,4.2-13.4,3c-1.3-0.3-2.6-0.9-3.8-1.6 C11.7,36.6,9,30,10.6,23.4c0.3-1.3,0.9-2.6,1.6-3.8C15,14.7,19.9,12,25.1,12c4,0,7.8,1.6,10.6,4.4c0.5,0.4,0.9,0.9,1.2,1.4 c0.3,0.8-0.4,1.2-1.3,1.2h-7c-0.8,0-1.5,0.7-1.5,1.5v3.1c0,0.8,0.6,1.4,1.4,1.4h18.3c0.7,0,1.3-0.6,1.3-1.3V5.5 C48,4.7,47.3,4,46.5,4z",
            },
        });
        this.brandingData = [];
    }
    function zb() {
        const a = document.createElement("iframe"),
            b = `${D()}/assets/htdocs/sitecontext ${embeddedservice_bootstrap.settings.devMode ? "" : ".min"}.html?parent_domain=${window.location.origin}`;
        a.classList.add("embeddedMessagingSiteContextFrame");
        a.id = "embeddedMessagingSiteContextFrame";
        a.name = "embeddedMessagingSiteContextFrame";
        a.src = b;
        a.onload = () => {
            n("Created an iframe for siteContext.");
        };
        embeddedservice_bootstrap.siteContextFrame = a;
        document.body.appendChild(a);
    }
    const ca = {};
    class Oa {
        static isValidContrastRatio(a, b, c = 3) {
            return this.getContrastRatio(a, b) >= c;
        }
        static getContrastRatio(a, b) {
            a = this.convertHexToRGB(a);
            b = this.convertHexToRGB(b);
            a = this.getRelativeLuminance(a);
            b = this.getRelativeLuminance(b);
            return ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2);
        }
        static getRelativeLuminance(a) {
            const [b, c, d] = Object.values(a).map((e) => this.getSRGB(e));
            return 0.2126 * b + 0.7152 * c + 0.0722 * d;
        }
        static getSRGB(a) {
            a /= 255;
            return 0.03928 >= a ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
        }
        static convertHexToRGB(a) {
            const b = parseInt(a.slice(1, 3), 16),
                c = parseInt(a.slice(3, 5), 16);
            a = parseInt(a.slice(5, 7), 16);
            return {
                r: b,
                g: c,
                b: a,
            };
        }
    }
    const Ab = ".salesforce.com .force.com .sfdc.net .site.com .salesforce-sites.com .w.crm.dev".split(" "),
        na = {
            JWT: "JWT",
        },
        Ga = document.title;
    let M,
        A = !1,
        H = !1,
        z = {},
        E = {},
        C,
        k,
        m,
        fa,
        wa = new Promise((a) => {
            fa = a;
        }),
        Ca;
    const rb = new Promise((a) => {
        Ca = a;
    });
    let Da,
        Bb = new Promise((a) => {
            Da = a;
        }),
        O,
        G,
        N;
    const p = {
            JWT: "JWT",
            FAILED_OUTBOUND_MESSAGE_ENTRIES: "FAILED_MESSAGES",
            HIDDEN_PRECHAT_FIELDS: "HIDDEN_PRECHAT_FIELDS",
            AUTORESPONSE_PARAMETERS: "AUTORESPONSE_PARAMETERS",
        },
        P = {
            ENTER: "Enter",
            TAB: "Tab",
            SPACE: " ",
        };
    let Q, R;
    r.prototype.removeEventHandlers = function () {
        window.removeEventListener("message", Aa);
        window.removeEventListener("storage", Fa);
    };
    r.prototype.emitEmbeddedMessagingReadyEvent = function () {
        A = !0;
        try {
            F("onEmbeddedMessagingReady");
        } catch (a) {
            (A = !1), g(`Something went wrong in firing onEmbeddedMessagingReady event ${a}.`);
        }
    };
    r.prototype.removeMarkup = function (a) {
        const b = v(),
            c = t(),
            d = document.getElementById("embeddedMessagingModalOverlay"),
            e = document.getElementById("embeddedMessagingMinimizedNotification"),
            f = document.getElementById("embedded-messaging");
        b ? b.parentNode.removeChild(b) : l("Embedded Messaging iframe not available for resetting the client to initial state.");
        embeddedservice_bootstrap.filePreviewFrame && embeddedservice_bootstrap.filePreviewFrame.parentNode
            ? embeddedservice_bootstrap.filePreviewFrame.parentNode.removeChild(embeddedservice_bootstrap.filePreviewFrame)
            : l("Embedded Messaging file preview iframe not available for resetting the client to initial state.");
        a && embeddedservice_bootstrap.siteContextFrame && embeddedservice_bootstrap.siteContextFrame.parentNode
            ? embeddedservice_bootstrap.siteContextFrame.parentNode.removeChild(embeddedservice_bootstrap.siteContextFrame)
            : l("Embedded Messaging site context iframe not available for resetting the client to initial state.");
        d && d.parentNode.removeChild(d);
        document.body.classList.contains("embeddedMessagingPreventScrolling") &&
            (document.body.classList.remove("embeddedMessagingPreventScrolling"), embeddedservice_bootstrap.documentScrollPosition && window.scrollTo(0, embeddedservice_bootstrap.documentScrollPosition));
        c ? c.parentNode.removeChild(c) : l("Embedded Messaging static button not available for resetting the client to initial state.");
        e && e.parentNode.removeChild(e);
        f && f.parentNode.removeChild(f);
        embeddedservice_bootstrap.emitEmbeddedMessagingReadyEvent();
    };
    const u = {
        AUTH: "Auth",
        UNAUTH: "UnAuth",
    };
    pa.prototype.setIdentityToken = function (a) {
        let b;
        if (!A) return g("Method can\u2019t be invoked before the onEmbeddedMessagingReady event is fired."), !1;
        if (w() !== u.AUTH) return g("User Verification isn\u2019t enabled in Messaging Settings."), !1;
        if (!a || null === a || "object" !== typeof a) return g("Invalid identity token parameter passed into the setIdentityToken method. Specify a valid object containing the token data."), !1;
        b = a.identityTokenType;
        a = a.identityToken;
        if ("string" !== typeof b || b.trim().toUpperCase() !== na.JWT) return g("Unsupported identity token. Only JWT-based identity tokens are supported."), !1;
        let c = !1;
        switch (b) {
            case na.JWT:
                c = aa(a);
        }
        if (!c) return g("Invalid identity token passed into the setIdentityToken method."), !1;
        C = a;
        R && "function" === typeof R && (R(), (R = void 0));
        v()
            ? y("EMBEDDED_MESSAGING_SET_IDENTITY_TOKEN_EVENT", C)
            : t()
            ? t() && document.getElementById("embeddedMessagingIconRefresh") && (embeddedservice_bootstrap.removeMarkup(), embeddedservice_bootstrap.generateMarkup())
            : embeddedservice_bootstrap.generateMarkup();
        return !0;
    };
    pa.prototype.clearSession = function () {
        return new Promise((a, b) => {
            Q = a;
            A ? ka(w() === u.AUTH, !1) : b("Method can't be invoked before the onEmbeddedMessagingReady event is fired.");
        });
    };
    qa.prototype.setHiddenPrechatFields = function (a) {
        if (ab("setHiddenPrechatFields"))
            if (a && "object" === typeof a) for (const [b, c] of Object.entries(a)) xb(b, c) && ((z[b] = c), I(p.HIDDEN_PRECHAT_FIELDS, z, !1, !0), n(`[setHiddenPrechatFields] Successfully updated Hidden Pre-Chat field ${b}.`));
            else g("When calling setHiddenPrechatFields, you must pass in an object with key-value pairs.");
    };
    qa.prototype.removeHiddenPrechatFields = function (a) {
        ab("removeHiddenPrechatFields") &&
            (a && Array.isArray(a)
                ? a.forEach(function (b) {
                      z.hasOwnProperty(b)
                          ? (delete z[b], I(p.HIDDEN_PRECHAT_FIELDS, z, !1, !0), n(`[removeHiddenPrechatFields] Successfully removed Hidden Pre-Chat field ${b}.`))
                          : g(`removeHiddenPrechatFields called with an invalid field name ${b}.`);
                  })
                : g("When calling removeHiddenPrechatFields, you must pass in an array of fields."));
    };
    ra.prototype.setAutoResponseParameters = function (a) {
        if (bb("setAutoResponseParameters"))
            if (a && "object" === typeof a)
                for (const [c, d] of Object.entries(a)) {
                    a = c;
                    var b = d;
                    "string" !== typeof a || 1 > a.trim().length
                        ? (g(`Expected a non-empty string for the parameter name, but received ${typeof a}`), (a = !1))
                        : "string" !== typeof b || 1 > b.trim().length
                        ? (g(`Expected a non-empty string for the parameter value, but received ${typeof b}`), (a = !1))
                        : (a = !0);
                    a
                        ? ((E[c] = d), I(p.AUTORESPONSE_PARAMETERS, E, !1, !0), n(`[setAutoResponseParameters] Successfully updated auto-response parameter ${c}`))
                        : l(`[setAutoResponseParameters] Failed to validate auto-response parameter ${c}`);
                }
            else g("[setAutoResponseParameters] Must pass in an object of parameters as key-value pairs.");
    };
    ra.prototype.removeAutoResponseParameters = function (a) {
        bb("removeAutoResponseParameters") &&
            (a && Array.isArray(a)
                ? a.forEach(function (b) {
                      E.hasOwnProperty(b)
                          ? (delete E[b], I(p.AUTORESPONSE_PARAMETERS, E, !1), n(`[removeAutoResponseParameters] Successfully removed auto-response parameter ${b}`))
                          : l(`[removeAutoResponseParameters] Failed to validate auto-response parameter ${b}`);
                  })
                : g("[removeAutoResponseParameters] Must pass in an array of parameter names."));
    };
    da.prototype.showChatButton = function () {
        var a = w();
        if (!A) return g("Method can't be invoked before the onEmbeddedMessagingReady event is fired."), !1;
        if (a === u.UNAUTH || C) {
            if ((a = t())) return (a.style.display = "block"), !0;
        } else g("Can\u2019t call showChatButton for a verified user before calling the setIdentity method with a valid token.");
        return !1;
    };
    da.prototype.hideChatButton = function () {
        if (!A) return g("Method can't be invoked before the onEmbeddedMessagingReady event is fired."), !1;
        if (v()) g("Can\u2019t call hideChatButton once the messaging window is showing.");
        else {
            const a = t();
            if (a) return (a.style.display = "none"), !0;
        }
        return !1;
    };
    da.prototype.launchChat = function () {
        return new Promise((a, b) => {
            let c;
            const d = () => {
                    let f;
                    H
                        ? ((f = "[Launch Chat API] Successfully initialized web chat client."), n(f), a(f), window.removeEventListener("onEmbeddedMessagingInitSuccess", d), window.removeEventListener("onEmbeddedMessagingInitError", e))
                        : ((f = "[Launch Chat API] Web chat client initialized successfully or failed event isn\u2019t fired."), l(f), b(f));
                },
                e = () => {
                    let f;
                    H
                        ? ((f = "[Launch Chat API] Error launching web chat client."), g(f), b(f), window.removeEventListener("onEmbeddedMessagingInitSuccess", d), window.removeEventListener("onEmbeddedMessagingInitError", e), J())
                        : ((f = "[Launch Chat API] Web chat client initialized successfully or failed event isn\u2019t fired."), l(f), b(f));
                };
            try {
                A
                    ? t()
                        ? v()
                            ? (v(), (c = "[Launch Chat API] Web chat client window is already present."), l(c), a(c))
                            : (window.addEventListener("onEmbeddedMessagingInitSuccess", d),
                              window.addEventListener("onEmbeddedMessagingInitError", e),
                              oa().catch((f) => {
                                  c = `[Launch Chat API] Error handling simulating clicking the custom web chat client button: ${f}`;
                                  g(c);
                                  b(c);
                              }))
                        : ((c = "[Launch Chat API] Default chat button isn\u2019t present. Check if the web chat client initialized successfully."), l(c), b(c))
                    : ((c = "[Launch Chat API] Can\u2019t invoke Launch Chat API before the onEmbeddedMessagingReady event is fired."), l(c), b(c));
            } catch (f) {
                (c = `[Launch Chat API] Something went wrong launching the web chat client: ${f}`), g(c), b(c);
            }
        });
    };
    r.prototype.isValidEntityId = function (a) {
        return "string" === typeof a && (18 === a.length || 15 === a.length);
    };
    r.prototype.getKeyPrefix = function (a) {
        if (embeddedservice_bootstrap.isValidEntityId(a)) return a.substr(0, 3);
    };
    r.prototype.isOrganizationId = function (a) {
        return "00D" === embeddedservice_bootstrap.getKeyPrefix(a);
    };
    r.prototype.isMessageFromSalesforceDomain = function (a) {
        var b = a.split(":")[1].replace("//", "");
        if (ha() && b === document.domain) return !0;
        var c = function (d, e) {
            return -1 !== d.indexOf(e, d.length - e.length);
        };
        return Ab.some(function (d) {
            return c(b, d);
        });
    };
    r.prototype.generateMarkup = function (a = !1) {
        const b = document.createDocumentFragment();
        var c = document.getElementById("embedded-messaging"),
            d = t();
        if (!W() || a)
            if (!c || !d) {
                c = document.createElement("div");
                c.id = "embedded-messaging";
                c.className = "embedded-messaging";
                a = document.createElement("div");
                d = document.createElement("button");
                Oa.isValidContrastRatio("#FFFFFF", K("headerColor")) || document.documentElement.style.setProperty("--eswIconFillColor", "#1A1B1E");
                var e = document.createElement("div");
                const f = ja(ca.CHAT);
                f.setAttribute("id", "embeddedMessagingIconChat");
                f.setAttribute("class", "embeddedMessagingIconChat");
                e.id = "embeddedMessagingIconContainer";
                e.className = "embeddedMessagingIconContainer";
                e.appendChild(f);
                a.className = "embeddedMessagingConversationButtonWrapper";
                d.classList.add("embeddedMessagingConversationButton");
                d.id = "embeddedMessagingConversationButton";
                d.href = "javascript:void(0)";
                d.addEventListener("click", oa);
                d.addEventListener("keydown", sb);
                d.setAttribute("tabindex", 0);
                d.setAttribute("role", "button");
                d.setAttribute("aria-label", x("EmbeddedMessagingMinimizedState", "DefaultMinimizedText") || "Hello, have a question? Let\u2019s chat.");
                d.setAttribute("title", x("EmbeddedMessagingMinimizedState", "DefaultMinimizedText") || "Hello, have a question? Let\u2019s chat.");
                d.style.setProperty("--eswHeaderColor", K("headerColor"));
                d.style.setProperty("--eswSecondaryColor", K("secondaryColor"));
                embeddedservice_bootstrap.settings.hasBottomTabBar && d.classList.add("embeddedMessagingBottomTabBar");
                ("boolean" === typeof embeddedservice_bootstrap.settings.hideChatButtonOnLoad ? embeddedservice_bootstrap.settings.hideChatButtonOnLoad : W() || !Ya()) && !B(p.JWT) && (d.style.display = "none");
                embeddedservice_bootstrap.settings.embeddedServiceConfig.htmlDirection &&
                    "string" === typeof embeddedservice_bootstrap.settings.embeddedServiceConfig.htmlDirection &&
                    d.setAttribute("dir", embeddedservice_bootstrap.settings.embeddedServiceConfig.htmlDirection.toLowerCase());
                (void 0 !== window.LWR || ha()) && d.classList.add("experienceSite");
                d.appendChild(e);
                a.appendChild(d);
                d = a;
                b.appendChild(c);
                c.appendChild(d);
                embeddedservice_bootstrap.settings.targetElement.appendChild(b);
            }
    };
    r.prototype.createFilePreviewFrame = function () {
        const a = document.createElement("iframe"),
            b = `${D()}/assets/htdocs/filepreview ${embeddedservice_bootstrap.settings.devMode ? "" : ".min"}.html?parent_domain=${window.location.origin}`;
        a.classList.add("embeddedMessagingFilePreviewFrame");
        a.id = "embeddedMessagingFilePreviewFrame";
        a.name = "embeddedMessagingFilePreviewFrame";
        a.src = b;
        a.title = x("EmbeddedMessagingIframesAndContents", "FilePreviewIframeTitle") || "Enlarged image preview";
        a.onload = () => {
            n("Created an iframe for file preview.");
        };
        embeddedservice_bootstrap.filePreviewFrame = a;
        document.body.appendChild(a);
    };
    r.prototype.createIframe = function () {
        return new Promise((a, b) => {
            try {
                const e = document.getElementById("embedded-messaging"),
                    f = document.createElement("iframe");
                const h = document.createElement("div");
                h.id = "embeddedMessagingModalOverlay";
                var c = h;
                f.title = x("EmbeddedMessagingIframesAndContents", "MessagingIframeTitle") || "Chat with an Agent";
                f.className = "embeddedMessagingFrame";
                f.id = "embeddedMessagingFrame";
                f.onload = a;
                f.onerror = b;
                f.style.backgroundColor = "transparent";
                f.allowTransparency = "true";
                f.setAttribute("aria-label", x("EmbeddedMessagingChatHeader", "ChatWindowAssistiveText") || "Chat Window");
                embeddedservice_bootstrap.settings.omitSandbox || (f.sandbox = "allow-scripts allow-same-origin allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox");
                if (embeddedservice_bootstrap.settings.isAuraSite) {
                    var d = f;
                    d || g("Failed to load aura app. Iframe is undefined.");
                    d.src = D() + "/embeddedService/embeddedService.app";
                } else (a = f), (d = D()), a || g("Failed to load LWR site. Iframe is undefined."), d.endsWith("/") || (d += "/"), (a.src = d + "?lwc.mode=" + (embeddedservice_bootstrap.settings.devMode ? "dev" : "prod"));
                embeddedservice_bootstrap.settings.hasBottomTabBar && (f.classList.remove("embeddedMessagingFrameMinimizedBottomTabBar"), f.classList.add("embeddedMessagingFrameMaximizedBottomTabBar"));
                navigator.userAgent.includes("CommunityHybridContainer") || navigator.userAgent.includes("playgroundcommunity") ? f.classList.add("mobilePublisher") : (void 0 !== window.LWR || ha()) && f.classList.add("experienceSite");
                embeddedservice_bootstrap.settings.embeddedServiceConfig.htmlDirection &&
                    "string" === typeof embeddedservice_bootstrap.settings.embeddedServiceConfig.htmlDirection &&
                    f.setAttribute("dir", embeddedservice_bootstrap.settings.embeddedServiceConfig.htmlDirection.toLowerCase());
                e.appendChild(c);
                e.appendChild(f);
            } catch (e) {
                b(e);
            }
        });
    };
    r.prototype.bootstrapEmbeddedMessaging = function () {
        try {
            return w() === u.UNAUTH && embeddedservice_bootstrap.generateMarkup(!0), embeddedservice_bootstrap.utilAPI.launchChat();
        } catch (a) {
            throw Error("[Bootstrap API] Something went wrong bootstrapping Embedded Messaging: " + a);
        }
    };
    r.prototype.maximizeIframe = function (a) {
        const b = t();
        var c = document.getElementById("embeddedMessagingModalOverlay");
        const d = document.getElementById("embeddedMessagingIconChat"),
            e = document.getElementById("embeddedMessagingIconContainer"),
            f = document.querySelector('meta[name="viewport"]'),
            h = !!navigator.userAgent.match(/iP(hone|ad|od)/i);
        a &&
            (a.classList.add("isMaximized"),
            a.classList.remove("isMinimized"),
            a.classList.remove("hasMinimizedNotification"),
            embeddedservice_bootstrap.settings.hasBottomTabBar && (a.classList.remove("embeddedMessagingFrameMinimizedBottomTabBar"), a.classList.add("embeddedMessagingFrameMaximizedBottomTabBar")));
        b &&
            ((b.style.display = "block"),
            b.setAttribute("tabindex", -1),
            b.setAttribute("aria-label", x("EmbeddedMessagingChatHeader", "MinimizeButtonAssistiveText") || "Minimize the chat window"),
            b.setAttribute("title", x("EmbeddedMessagingChatHeader", "MinimizeButtonAssistiveText") || "Minimize the chat window"),
            (d.style.display = "none"),
            document.getElementById("embeddedMessagingIconMinimize") || ((a = ja(ca.MINIMIZE_MODAL)), a.setAttribute("id", "embeddedMessagingIconMinimize"), a.setAttribute("class", "embeddedMessagingIconMinimize"), e.insertBefore(a, d)));
        c && !c.classList.contains("isMaximized") && c.classList.add("isMaximized");
        -1 === navigator.userAgent.indexOf("Mobi") ||
            document.body.classList.contains("embeddedMessagingPreventScrolling") ||
            (document.scrollingElement
                ? (embeddedservice_bootstrap.documentScrollPosition = document.scrollingElement.scrollTop)
                : ((c = document.documentElement.getBoundingClientRect()), (embeddedservice_bootstrap.documentScrollPosition = Math.abs(c.top))),
            document.body.classList.add("embeddedMessagingPreventScrolling"));
        h && f && ((O = f.content), f.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1"));
        y("ESW_APP_MAXIMIZATION_RESIZING_COMPLETED");
    };
    r.prototype.minimizeIframe = function (a, b) {
        const c = t(),
            d = document.getElementById("embeddedMessagingModalOverlay"),
            e = document.getElementById("embeddedMessagingIconMinimize");
        b = b.hasMinimizedNotification;
        a &&
            (a.classList.remove("isMaximized"),
            a.classList.add("isMinimized"),
            b ? a.classList.add("hasMinimizedNotification") : a.classList.remove("hasMinimizedNotification"),
            embeddedservice_bootstrap.settings.hasBottomTabBar && (a.classList.remove("embeddedMessagingFrameMaximizedBottomTabBar"), a.classList.add("embeddedMessagingFrameMinimizedBottomTabBar")));
        e && e.remove();
        c && ((c.style.display = "none"), c.setAttribute("tabindex", -1), c.removeAttribute("title"), c.removeAttribute("aria-label"));
        d && d.classList.contains("isMaximized") && d.classList.remove("isMaximized");
        -1 !== navigator.userAgent.indexOf("Mobi") &&
            (document.body.classList.remove("embeddedMessagingPreventScrolling"), embeddedservice_bootstrap.documentScrollPosition && window.scrollTo(0, embeddedservice_bootstrap.documentScrollPosition));
        O && Za();
        y("ESW_APP_MINIMIZATION_RESIZING_COMPLETED");
    };
    r.prototype.initializeFeatureObjects = function () {
        embeddedservice_bootstrap.prechatAPI = new qa();
        embeddedservice_bootstrap.autoResponseAPI = new ra();
        embeddedservice_bootstrap.userVerificationAPI = new pa();
        embeddedservice_bootstrap.utilAPI = new da();
    };
    r.prototype.init = function (a, b, c, d) {
        try {
            embeddedservice_bootstrap.settings.orgId = a;
            embeddedservice_bootstrap.settings.eswConfigDevName = b;
            embeddedservice_bootstrap.settings.siteURL = c;
            embeddedservice_bootstrap.settings.snippetConfig = d;
            za(d || {});
            if ("string" !== typeof embeddedservice_bootstrap.settings.siteURL || !embeddedservice_bootstrap.settings.siteURL.length)
                throw Error(`Expected a valid Site URL value to be a string but received: ${embeddedservice_bootstrap.settings.siteURL}.`);
            if ("string" !== typeof embeddedservice_bootstrap.settings.scrt2URL || !embeddedservice_bootstrap.settings.scrt2URL.length)
                throw Error(`Expected a valid SCRT 2.0 URL value to be a string but received: ${embeddedservice_bootstrap.settings.scrt2URL}.`);
            if (!embeddedservice_bootstrap.settings.orgId || !embeddedservice_bootstrap.isOrganizationId(embeddedservice_bootstrap.settings.orgId))
                throw Error("Invalid OrganizationId Parameter Value: " + embeddedservice_bootstrap.settings.orgId);
            if ("string" !== typeof embeddedservice_bootstrap.settings.eswConfigDevName || !embeddedservice_bootstrap.settings.eswConfigDevName.length)
                throw Error(`Expected a valid ESW Config Dev Name value to be a string but received: ${embeddedservice_bootstrap.settings.eswConfigDevName}.`);
            try {
                window.localStorage;
            } catch (h) {
                l("localStorage is not available. User chat sessions continue only in a single-page view and not across multiple pages."), (embeddedservice_bootstrap.isLocalStorageAvailable = !1);
            }
            try {
                window.sessionStorage;
            } catch (h) {
                l("sessionStorage is not available. User chat sessions end after a web page refresh or across browser tabs and windows."), (embeddedservice_bootstrap.isSessionStorageAvailable = !1);
            }
            navigator.userAgent && -1 < navigator.userAgent.toLowerCase().indexOf("firefox") && (embeddedservice_bootstrap.isLocalStorageAvailable = !1);
            db();
            if (!embeddedservice_bootstrap.settings.targetElement) throw Error("No targetElement specified.");
            window.addEventListener("message", Aa);
            embeddedservice_bootstrap.isLocalStorageAvailable && window.addEventListener("storage", Fa);
            embeddedservice_bootstrap.settings.hasBottomTabBar = qb();
            embeddedservice_bootstrap.settings.isAuraSite = !!embeddedservice_bootstrap.settings.isAuraSite;
            embeddedservice_bootstrap.settings.omitSandbox = !!embeddedservice_bootstrap.settings.omitSandbox;
            embeddedservice_bootstrap.settings.hideChatButtonOnLoad = embeddedservice_bootstrap.settings.hideChatButtonOnLoad;
            const e = Ha()
                    .then(Promise.resolve.bind(Promise), () => Ha(D()))
                    .catch(() => {
                        throw Error("Error loading CSS.");
                    }),
                f = Ia()
                    .then(
                        (h) => {
                            za(h);
                            h = embeddedservice_bootstrap.settings.embeddedServiceConfig;
                            embeddedservice_bootstrap.brandingData = h && h.branding ? h.branding : [];
                            embeddedservice_bootstrap.settings.embeddedServiceConfig.scrt2URL = embeddedservice_bootstrap.settings.scrt2URL;
                            embeddedservice_bootstrap.settings.embeddedServiceConfig.orgId = embeddedservice_bootstrap.settings.orgId;
                            if (!embeddedservice_bootstrap.settings.embeddedServiceConfig) throw Error("Embedded Service Config settings not present in configuration response.");
                            if (!embeddedservice_bootstrap.settings.embeddedServiceConfig.name) throw Error("Embedded Service Config developer name not present in configuration response.");
                            if (!embeddedservice_bootstrap.settings.embeddedServiceConfig.embeddedServiceMessagingChannel) throw Error("Embedded Service Messaging Channel settings not present in configuration response.");
                            if (!embeddedservice_bootstrap.settings.embeddedServiceConfig.embeddedServiceMessagingChannel.authMode) throw Error("Auth mode setting not present in configuration response.");
                            if (!Object.values(u).includes(embeddedservice_bootstrap.settings.embeddedServiceConfig.embeddedServiceMessagingChannel.authMode)) throw Error("Auth mode in configuration response is invalid.");
                            k = `${embeddedservice_bootstrap.settings.orgId}_WEB_STORAGE`;
                            zb();
                        },
                        (h) =>
                            new Promise((q, Cb) => {
                                Ia().then(q, Cb);
                            })
                    )
                    .catch(() => {
                        throw Error("Unable to load Embedded Messaging configuration.");
                    });
            f.then(() => {
                T("ESW_3RDPARTY_STORAGE_REQUEST", {
                    orgId: embeddedservice_bootstrap.settings.orgId,
                });
            });
            Promise.all([e, f, Ka(), Bb]).then(() => {
                ua();
                embeddedservice_bootstrap.initializeFeatureObjects();
                embeddedservice_bootstrap.emitEmbeddedMessagingReadyEvent();
                B(p.JWT) ? (embeddedservice_bootstrap.generateMarkup(!0), vb()) : w() === u.UNAUTH && embeddedservice_bootstrap.generateMarkup();
            });
        } catch (e) {
            g("Error: " + e);
        }
    };
    window.embeddedservice_bootstrap = new r();
})();
