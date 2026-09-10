/* @ds-bundle: {"format":4,"namespace":"RaghavMobileAccessoriesDesignSystem_092910","components":[{"name":"OfferBanner","sourcePath":"components/commerce/OfferBanner.jsx"},{"name":"Price","sourcePath":"components/commerce/Price.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Rating","sourcePath":"components/commerce/Rating.jsx"},{"name":"WhatsAppCTA","sourcePath":"components/commerce/WhatsAppCTA.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"SearchBar","sourcePath":"components/forms/SearchBar.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/commerce/OfferBanner.jsx":"f13a3d196eb2","components/commerce/Price.jsx":"c82dab76caac","components/commerce/ProductCard.jsx":"a0197e9a2fcb","components/commerce/Rating.jsx":"fb14c59dc8ce","components/commerce/WhatsAppCTA.jsx":"20bc820ac2bb","components/core/Badge.jsx":"80e9a99d2998","components/core/Button.jsx":"f8671938ff4f","components/core/Card.jsx":"ef7c3d55f2c9","components/core/Icon.jsx":"4ab77564cd94","components/core/IconButton.jsx":"a93d8a433002","components/core/SectionHeading.jsx":"c90b2aeea898","components/core/Tag.jsx":"5edbb12bb95e","components/forms/Checkbox.jsx":"156903f0b569","components/forms/Input.jsx":"ea783852eccd","components/forms/QuantityStepper.jsx":"d0a358d18fc9","components/forms/SearchBar.jsx":"d1e0c4520f3f","components/forms/Select.jsx":"39e602fa0d21","components/navigation/Breadcrumbs.jsx":"5d3ef62dc1e4","components/navigation/Tabs.jsx":"3cbf6d649f67","ui_kits/storefront/CartScreen.jsx":"069d1f4ce976","ui_kits/storefront/CategoryScreen.jsx":"00c3b7934d70","ui_kits/storefront/HomeScreen.jsx":"d55199be26ef","ui_kits/storefront/ProductScreen.jsx":"9ed2bd33eb0c","ui_kits/storefront/Shell.jsx":"d676a64c1bcc","ui_kits/storefront/data.js":"ff4a4f4db30c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RaghavMobileAccessoriesDesignSystem_092910 = window.RaghavMobileAccessoriesDesignSystem_092910 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/OfferBanner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function OfferBanner({
  title,
  subtitle,
  cta,
  tone = "navy",
  style,
  ...rest
}) {
  const navy = tone === "navy";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--sp-6)",
      padding: "var(--sp-6) var(--sp-8)",
      borderRadius: "var(--radius-lg)",
      background: navy ? "var(--surface-dark)" : "var(--orange-500)",
      color: "var(--white)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-h3)/1.15 var(--font-display)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)",
      color: navy ? "var(--navy-200)" : "var(--orange-100)"
    }
  }, subtitle)), cta);
}
Object.assign(__ds_scope, { OfferBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/OfferBanner.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Price.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Price({
  amount,
  mrp,
  size = "md",
  style,
  ...rest
}) {
  const fmt = n => "₹" + Number(n).toLocaleString("en-IN");
  const fs = {
    sm: "var(--fs-base)",
    md: "var(--fs-h3)",
    lg: "var(--fs-h2)"
  }[size];
  const off = mrp && mrp > amount ? Math.round((1 - amount / mrp) * 100) : null;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: "var(--sp-2)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) " + fs + "/1.1 var(--font-body)",
      color: "var(--price)"
    }
  }, fmt(amount)), mrp && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-medium) var(--fs-sm)/1 var(--font-body)",
      color: "var(--price-strike)",
      textDecoration: "line-through"
    }
  }, fmt(mrp)), off && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color: "var(--save)"
    }
  }, off, "% off"));
}
Object.assign(__ds_scope, { Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Price.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const map = {
  sale: {
    bg: "var(--orange-500)",
    fg: "var(--white)"
  },
  new: {
    bg: "var(--navy-800)",
    fg: "var(--white)"
  },
  stock: {
    bg: "var(--green-100)",
    fg: "var(--green-600)"
  },
  out: {
    bg: "var(--red-100)",
    fg: "var(--red-600)"
  },
  info: {
    bg: "var(--gray-100)",
    fg: "var(--gray-800)"
  },
  warn: {
    bg: "var(--amber-100)",
    fg: "var(--amber-600)"
  }
};
function Badge({
  tone = "sale",
  children,
  style,
  ...rest
}) {
  const t = map[tone] || map.info;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-1)",
      background: t.bg,
      color: t.fg,
      font: "var(--type-label)",
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase",
      padding: "5px 10px",
      borderRadius: "var(--radius-xs)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const base = {
  font: "var(--fw-bold) var(--fs-base)/1 var(--font-body)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--sp-2)",
  border: "1.5px solid transparent",
  borderRadius: "var(--radius-pill)",
  cursor: "pointer",
  transition: "var(--transition-control)",
  whiteSpace: "nowrap",
  textDecoration: "none"
};
const sizes = {
  sm: {
    height: "var(--control-sm)",
    padding: "0 var(--sp-4)",
    fontSize: "var(--fs-sm)"
  },
  md: {
    height: "var(--control-md)",
    padding: "0 var(--sp-6)"
  },
  lg: {
    height: "var(--control-lg)",
    padding: "0 var(--sp-8)",
    fontSize: "var(--fs-lg)"
  }
};
const variants = {
  primary: {
    background: "var(--orange-500)",
    color: "var(--white)",
    boxShadow: "var(--shadow-brand)"
  },
  secondary: {
    background: "var(--navy-800)",
    color: "var(--white)"
  },
  outline: {
    background: "transparent",
    color: "var(--navy-800)",
    borderColor: "var(--navy-800)"
  },
  ghost: {
    background: "transparent",
    color: "var(--navy-800)"
  },
  whatsapp: {
    background: "var(--whatsapp)",
    color: "var(--white)"
  }
};
const hovers = {
  primary: {
    background: "var(--orange-600)"
  },
  secondary: {
    background: "var(--navy-700)"
  },
  outline: {
    background: "var(--navy-50)"
  },
  ghost: {
    background: "var(--gray-100)"
  },
  whatsapp: {
    background: "var(--whatsapp-dark)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft,
  iconRight,
  as = "button",
  href,
  children,
  style,
  onClick,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  const Tag = as === "a" ? "a" : "button";
  const s = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(h && !disabled ? hovers[variant] : null),
    width: fullWidth ? "100%" : undefined,
    transform: disabled ? undefined : p ? "var(--press-scale)" : h ? "var(--lift-hover)" : "none",
    opacity: disabled ? .45 : 1,
    pointerEvents: disabled ? "none" : undefined,
    ...style
  };
  return React.createElement(Tag, {
    href,
    onClick,
    disabled: Tag === "button" ? disabled : undefined,
    style: s,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    ...rest
  }, iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  padding = "var(--sp-5)",
  interactive = false,
  tone = "light",
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: dark ? "var(--surface-dark)" : "var(--surface-card)",
      color: dark ? "var(--text-on-dark)" : "var(--text-body)",
      border: "1px solid " + (dark ? "transparent" : "var(--border-subtle)"),
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: interactive && h ? "var(--shadow-hover)" : "var(--shadow-card)",
      transform: interactive && h ? "var(--lift-hover)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Wrapper over the Lucide icon set (CDN: lucide UMD must be on the page). */
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = "currentColor",
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const draw = () => {
      if (window.lucide && el) {
        el.innerHTML = "";
        const i = document.createElement("i");
        i.setAttribute("data-lucide", name);
        el.appendChild(i);
        window.lucide.createIcons({
          attrs: {
            width: size,
            height: size,
            "stroke-width": strokeWidth
          },
          nameAttr: "data-lucide"
        });
      }
    };
    draw();
    const t = setTimeout(draw, 300);
    return () => clearTimeout(t);
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      color,
      flex: "0 0 auto",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Rating({
  value = 4.5,
  count,
  size = 14,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-1)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-1)",
      background: "var(--green-100)",
      color: "var(--green-600)",
      padding: "3px 7px",
      borderRadius: "var(--radius-xs)",
      font: "var(--fw-bold) var(--fs-xs)/1 var(--font-body)"
    }
  }, value.toFixed(1), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "star",
    size: size - 2
  })), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-medium) var(--fs-xs)/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "(", count, ")"));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Rating.jsx", error: String((e && e.message) || e) }); }

// components/commerce/WhatsAppCTA.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function WhatsAppCTA({
  phone = "919999999999",
  message = "Hi Raghav Mobile Accessories, I want to order:",
  label = "Order on WhatsApp",
  floating = false,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  const pos = floating ? {
    position: "fixed",
    right: "var(--sp-6)",
    bottom: "var(--sp-6)",
    zIndex: 50,
    boxShadow: "var(--shadow-hover)"
  } : {};
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noreferrer",
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      height: "var(--control-lg)",
      padding: "0 var(--sp-6)",
      borderRadius: "var(--radius-pill)",
      background: h ? "var(--whatsapp-dark)" : "var(--whatsapp)",
      color: "var(--white)",
      font: "var(--fw-bold) var(--fs-base)/1 var(--font-body)",
      textDecoration: "none",
      transition: "var(--transition-control)",
      transform: h ? "var(--lift-hover)" : "none",
      ...pos,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "message-circle",
    size: 20
  }), label);
}
Object.assign(__ds_scope, { WhatsAppCTA });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/WhatsAppCTA.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  label,
  tone = "neutral",
  size = 44,
  active = false,
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const tones = {
    neutral: {
      color: "var(--navy-800)",
      bg: h ? "var(--gray-100)" : "transparent"
    },
    brand: {
      color: h ? "var(--white)" : "var(--orange-500)",
      bg: h ? "var(--orange-500)" : "var(--orange-50)"
    },
    onDark: {
      color: "var(--white)",
      bg: h ? "rgba(255,255,255,.16)" : "transparent"
    }
  }[tone];
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-pill)",
      border: active ? "1.5px solid var(--orange-500)" : "1.5px solid transparent",
      background: tones.bg,
      color: tones.color,
      cursor: "pointer",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProductCard({
  title,
  subtitle,
  price,
  mrp,
  badge,
  rating,
  reviews,
  image,
  imageAlt = "",
  onAdd,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: h ? "var(--shadow-hover)" : "var(--shadow-card)",
      transform: h ? "var(--lift-hover)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "1/1",
      background: "var(--surface-sunken)",
      display: "grid",
      placeItems: "center"
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) var(--fs-xs)/1.4 var(--font-body)",
      color: "var(--text-faint)",
      textAlign: "center",
      padding: "var(--sp-4)"
    }
  }, "Product photo"), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "var(--sp-3)",
      left: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badge.tone || "sale"
  }, badge.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "var(--sp-2)",
      right: "var(--sp-2)",
      opacity: h ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Add to wishlist",
    tone: "brand",
    size: 36,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "heart",
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-4)",
      display: "grid",
      gap: "var(--sp-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-base)/1.3 var(--font-body)",
      color: "var(--text-strong)",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, subtitle), rating != null && /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    count: reviews
  }), /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: price,
    mrp: mrp
  }), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onAdd && onAdd();
    },
    style: {
      marginTop: "var(--sp-1)",
      height: "var(--control-sm)",
      border: "1.5px solid var(--orange-500)",
      borderRadius: "var(--radius-pill)",
      background: h ? "var(--orange-500)" : "var(--orange-50)",
      color: h ? "var(--white)" : "var(--orange-600)",
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      cursor: "pointer",
      transition: "var(--transition-control)"
    }
  }, "Add to cart")));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  title,
  action,
  align = "left",
  tone = "light",
  style,
  ...rest
}) {
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: align === "center" ? "center" : "space-between",
      gap: "var(--sp-4)",
      marginBottom: "var(--sp-5)",
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--orange-500)",
      marginBottom: "var(--sp-2)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      color: dark ? "var(--white)" : "var(--text-strong)"
    }
  }, title)), action);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      font: "var(--fw-semibold) var(--fs-sm)/1 var(--font-body)",
      padding: "0 var(--sp-4)",
      height: "var(--control-sm)",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      transition: "var(--transition-control)",
      border: "1.5px solid " + (selected ? "var(--navy-800)" : "var(--border-default)"),
      background: selected ? "var(--navy-800)" : h ? "var(--navy-50)" : "var(--white)",
      color: selected ? "var(--white)" : "var(--navy-800)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked = false,
  onChange,
  count,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      cursor: "pointer",
      minHeight: "var(--tap-min)",
      font: "var(--type-body)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: "0 0 auto",
      borderRadius: "var(--radius-xs)",
      display: "grid",
      placeItems: "center",
      border: "1.5px solid " + (checked ? "var(--orange-500)" : "var(--border-default)"),
      background: checked ? "var(--orange-500)" : "var(--white)",
      transition: "var(--transition-control)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 6,
      borderLeft: "2px solid #fff",
      borderBottom: "2px solid #fff",
      transform: "rotate(-45deg) translateY(-1px)"
    }
  })), /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      font: "var(--fw-medium) var(--fs-sm)/1 var(--font-mono)"
    }
  }, count));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  iconLeft,
  suffix,
  style,
  ...rest
}) {
  const [foc, setFoc] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: "var(--sp-2)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      height: "var(--control-md)",
      padding: "0 var(--sp-4)",
      background: "var(--white)",
      borderRadius: "var(--radius-md)",
      border: "1.5px solid " + (error ? "var(--red-600)" : foc ? "var(--orange-500)" : "var(--border-default)"),
      boxShadow: foc ? "var(--ring-brand)" : "none",
      transition: "var(--transition-control)"
    }
  }, iconLeft, /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFoc(true),
    onBlur: () => setFoc(false),
    style: {
      flex: 1,
      border: 0,
      outline: 0,
      background: "transparent",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      minWidth: 0
    }
  }, rest)), suffix), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "var(--sp-2)",
      font: "var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)",
      color: error ? "var(--red-600)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  style,
  ...rest
}) {
  const btn = {
    width: 36,
    height: 36,
    border: 0,
    background: "transparent",
    color: "var(--navy-800)",
    font: "var(--fw-bold) 18px/1 var(--font-body)",
    cursor: "pointer",
    borderRadius: "var(--radius-pill)"
  };
  const set = v => onChange && onChange(Math.min(max, Math.max(min, v)));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-1)",
      padding: "3px",
      border: "1.5px solid var(--border-default)",
      borderRadius: "var(--radius-pill)",
      background: "var(--white)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    style: btn,
    "aria-label": "Decrease",
    onClick: () => set(value - 1)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: "center",
      font: "var(--fw-bold) var(--fs-base)/1 var(--font-mono)",
      color: "var(--text-strong)"
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    style: btn,
    "aria-label": "Increase",
    onClick: () => set(value + 1)
  }, "+"));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SearchBar({
  placeholder = "Search covers, glass, chargers…",
  value,
  onChange,
  onSubmit,
  style,
  ...rest
}) {
  const [foc, setFoc] = React.useState(false);
  return /*#__PURE__*/React.createElement("form", _extends({
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(value);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      height: "var(--control-md)",
      padding: "0 var(--sp-3) 0 var(--sp-4)",
      background: "var(--white)",
      borderRadius: "var(--radius-pill)",
      border: "1.5px solid " + (foc ? "var(--orange-500)" : "transparent"),
      boxShadow: foc ? "var(--ring-brand)" : "var(--shadow-card)",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18,
    color: "var(--gray-400)"
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFoc(true),
    onBlur: () => setFoc(false),
    style: {
      flex: 1,
      border: 0,
      outline: 0,
      background: "transparent",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      height: 34,
      padding: "0 var(--sp-4)",
      border: 0,
      borderRadius: "var(--radius-pill)",
      background: "var(--orange-500)",
      color: "var(--white)",
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      cursor: "pointer"
    }
  }, "Search"));
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: "var(--sp-2)"
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    style: {
      width: "100%",
      height: "var(--control-md)",
      padding: "0 var(--sp-4)",
      background: "var(--white)",
      border: "1.5px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      cursor: "pointer",
      appearance: "none"
    }
  }, rest), options.map(o => {
    const v = typeof o === "string" ? o : o.value,
      l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Breadcrumbs({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      flexWrap: "wrap",
      font: "var(--fw-medium) var(--fs-sm)/1 var(--font-body)",
      color: "var(--text-muted)",
      ...style
    }
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    const l = typeof it === "string" ? it : it.label;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-strong)",
        fontWeight: "var(--fw-bold)"
      }
    }, l) : /*#__PURE__*/React.createElement("a", {
      href: it && it.href || "#",
      style: {
        color: "var(--text-muted)",
        fontWeight: "var(--fw-medium)"
      }
    }, l), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)"
      }
    }, "/"));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--sp-6)",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), items.map(it => {
    const v = typeof it === "string" ? it : it.value,
      l = typeof it === "string" ? it : it.label,
      on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(v),
      style: {
        border: 0,
        background: "transparent",
        cursor: "pointer",
        padding: "0 0 var(--sp-3)",
        font: "var(--fw-bold) var(--fs-base)/1 var(--font-body)",
        color: on ? "var(--navy-800)" : "var(--text-muted)",
        borderBottom: "3px solid " + (on ? "var(--orange-500)" : "transparent"),
        marginBottom: -1,
        transition: "var(--transition-control)"
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CartScreen.jsx
try { (() => {
const {
  Card,
  Price,
  Button,
  Input,
  Select,
  QuantityStepper,
  Icon,
  Badge,
  WhatsAppCTA,
  Checkbox,
  SectionHeading
} = window.RaghavMobileAccessoriesDesignSystem_092910;
function CartScreen({
  items,
  setItems,
  onNav
}) {
  const [mode, setMode] = React.useState("delivery");
  const [done, setDone] = React.useState(false);
  const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = mode === "pickup" || sub >= 499 ? 0 : 40;
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: "0 auto",
      padding: "var(--sp-16) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-10)",
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 64,
      height: 64,
      borderRadius: 999,
      background: "var(--green-100)",
      color: "var(--green-600)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 30
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h1)",
      marginTop: 20
    }
  }, "Order placed"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, "We'll WhatsApp you in a few minutes to confirm. Order #RM-2481."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(WhatsAppCTA, {
    label: "Message the shop"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      setItems([]);
      setDone(false);
      onNav({
        screen: "home"
      });
    }
  }, "Keep shopping"))));
  if (!items.length) return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: "0 auto",
      padding: "var(--sp-16) var(--gutter)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-10)"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h2)"
    }
  }, "Your cart is empty"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, "Add a cover or a screen guard and it'll show up here."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onNav({
      screen: "home"
    })
  }, "Browse products"))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--sp-8) var(--gutter) 0"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: items.length + " items",
    title: "Your cart"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 380px",
      gap: "var(--sp-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-4)"
    }
  }, items.map(it => /*#__PURE__*/React.createElement(Card, {
    key: it.id,
    padding: "var(--sp-4)",
    style: {
      display: "flex",
      gap: "var(--sp-4)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-sunken)",
      display: "grid",
      placeItems: "center",
      font: "var(--fw-bold) 10px/1.3 var(--font-body)",
      color: "var(--text-faint)",
      textAlign: "center",
      flex: "0 0 auto"
    }
  }, "Photo"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-base)/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)",
      color: "var(--text-muted)",
      margin: "4px 0 8px"
    }
  }, it.subtitle, " \xB7 Black"), /*#__PURE__*/React.createElement(Price, {
    amount: it.price,
    mrp: it.mrp,
    size: "sm"
  })), /*#__PURE__*/React.createElement(QuantityStepper, {
    value: it.qty,
    onChange: v => setItems(items.map(x => x.id === it.id ? {
      ...x,
      qty: v
    } : x))
  }), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove",
    onClick: () => setItems(items.filter(x => x.id !== it.id)),
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      color: "var(--gray-400)",
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    size: 18
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-5)",
    style: {
      display: "grid",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-h3)/1.2 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "How do you want it?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, [["delivery", "Home delivery", "Today, 6–9 pm"], ["pickup", "Store pickup", "Ready in 10 min"]].map(([k, t, s]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setMode(k),
    style: {
      textAlign: "left",
      padding: "14px 16px",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      border: "1.5px solid " + (mode === k ? "var(--orange-500)" : "var(--border-default)"),
      background: mode === k ? "var(--orange-50)" : "var(--white)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-base)/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) var(--fs-xs)/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "WhatsApp number",
    placeholder: "98xxxxxxxx"
  }), mode === "delivery" && /*#__PURE__*/React.createElement(Input, {
    label: "Address",
    placeholder: "Flat, street, landmark",
    style: {
      gridColumn: "1 / -1"
    }
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Payment",
    options: ["Cash on delivery", "UPI on delivery", "Pay now via UPI"]
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-5)",
    style: {
      position: "sticky",
      top: 110,
      display: "grid",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-h3)/1.2 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 4
    }
  }, "Order summary"), [["Subtotal", "₹" + sub.toLocaleString("en-IN")], [mode === "pickup" ? "Store pickup" : "Delivery", ship ? "₹40" : "Free"]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)",
      fontWeight: 600
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: 12,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) var(--fs-base)/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Total"), /*#__PURE__*/React.createElement(Price, {
    amount: sub + ship
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "stock"
  }, "Saving \u20B9", items.reduce((s, i) => s + ((i.mrp || i.price) - i.price) * i.qty, 0))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    onClick: () => setDone(true),
    style: {
      marginTop: 8
    }
  }, "Place order"), /*#__PURE__*/React.createElement(WhatsAppCTA, {
    label: "Order on WhatsApp instead",
    style: {
      width: "100%",
      justifyContent: "center"
    }
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Send order updates on WhatsApp",
    checked: true
  }))));
}
Object.assign(window, {
  CartScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CartScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CategoryScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Breadcrumbs,
  SectionHeading,
  ProductCard,
  Checkbox,
  Select,
  Tag,
  Card,
  Icon,
  Button
} = window.RaghavMobileAccessoriesDesignSystem_092910;
function CategoryScreen({
  cat,
  onNav,
  onAdd
}) {
  const data = window.RM_DATA;
  const meta = data.categories.find(c => c.id === cat) || data.categories[0];
  const [brand, setBrand] = React.useState("iPhone");
  const list = data.products.filter(p => p.cat === meta.id);
  const grid = list.length ? list : data.products;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--sp-6) var(--gutter) 0"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: [{
      label: "Home",
      href: "#"
    }, meta.label]
  }), /*#__PURE__*/React.createElement(SectionHeading, {
    style: {
      marginTop: "var(--sp-5)"
    },
    eyebrow: meta.count + " products",
    title: meta.label,
    action: /*#__PURE__*/React.createElement(Select, {
      options: ["Sort: Popular", "Price: low to high", "Price: high to low", "Newest"],
      style: {
        width: 220
      }
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "250px 1fr",
      gap: "var(--sp-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-5)",
    style: {
      position: "sticky",
      top: 110,
      display: "grid",
      gap: "var(--sp-5)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 12,
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase"
    }
  }, "Phone brand"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, data.brands.slice(0, 6).map(b => /*#__PURE__*/React.createElement(Tag, {
    key: b,
    selected: b === brand,
    onClick: () => setBrand(b)
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 6,
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase"
    }
  }, "Type"), data.categories.slice(0, 4).map((c, i) => /*#__PURE__*/React.createElement(Checkbox, {
    key: c.id,
    label: c.label,
    count: c.count,
    checked: c.id === meta.id
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 6,
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase"
    }
  }, "Price"), ["Under ₹200", "₹200 – ₹500", "₹500 – ₹1000", "Above ₹1000"].map(p => /*#__PURE__*/React.createElement(Checkbox, {
    key: p,
    label: p
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "In stock at Vastral store",
    checked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Free fitting included"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--sp-5)"
    }
  }, grid.concat(grid).slice(0, 9).map((x, i) => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: i
  }, x, {
    onAdd: () => onAdd(x),
    onClick: () => onNav({
      screen: "product",
      id: x.id
    })
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: "var(--sp-8)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 18
    })
  }, "Load more")))));
}
Object.assign(window, {
  CategoryScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CategoryScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Icon,
  Card,
  SectionHeading,
  ProductCard,
  OfferBanner,
  Tag,
  Badge,
  WhatsAppCTA
} = window.RaghavMobileAccessoriesDesignSystem_092910;
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-dark)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--sp-16) var(--gutter)",
      display: "grid",
      gridTemplateColumns: "1.1fr .9fr",
      gap: "var(--sp-10)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px",
      borderRadius: 999,
      background: "rgba(242,106,0,.16)",
      color: "var(--orange-400)",
      font: "var(--type-label)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "store",
    size: 13
  }), "Vastral's accessory shop, now online"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-display)",
      color: "#fff",
      margin: "18px 0 0",
      maxWidth: 520
    }
  }, "Covers that actually fit your phone."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      font: "var(--fw-medium) var(--fs-lg)/1.55 var(--font-body)",
      color: "var(--navy-200)",
      maxWidth: 460
    }
  }, "Pick your model, see what's in stock today, and collect it in 10 minutes \u2014 or get it delivered free across Vastral."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 26,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    }),
    onClick: () => onNav({
      screen: "category",
      cat: "covers"
    })
  }, "Shop by model"), /*#__PURE__*/React.createElement(WhatsAppCTA, {
    label: "Ask on WhatsApp"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 26,
      marginTop: 32,
      flexWrap: "wrap"
    }
  }, [["shield-check", "7-day replacement"], ["truck", "Free local delivery"], ["hand-coins", "Cash on delivery"]].map(([i, t]) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      font: "var(--fw-semibold) var(--fs-sm)/1 var(--font-body)",
      color: "var(--navy-200)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 16,
    color: "var(--orange-400)"
  }), t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/3",
      borderRadius: "var(--radius-xl)",
      background: "rgba(255,255,255,.06)",
      border: "1.5px dashed rgba(255,255,255,.22)",
      display: "grid",
      placeItems: "center",
      textAlign: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1.5 var(--font-body)",
      color: "var(--navy-200)"
    }
  }, "Hero photo slot", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, "shelf wall / product flat-lay from the shop")))));
}
function CategoryTiles({
  onNav
}) {
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Browse",
    title: "What are you looking for?"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6,1fr)",
      gap: "var(--sp-4)"
    }
  }, window.RM_DATA.categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => onNav({
      screen: "category",
      cat: c.id
    }),
    style: {
      border: "1px solid var(--border-subtle)",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--sp-5) var(--sp-3)",
      cursor: "pointer",
      display: "grid",
      gap: 10,
      justifyItems: "center",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 999,
      background: "var(--orange-50)",
      display: "grid",
      placeItems: "center",
      color: "var(--orange-600)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1.3 var(--font-body)",
      color: "var(--text-strong)",
      textAlign: "center"
    }
  }, c.label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-medium) var(--fs-xs)/1 var(--font-mono)",
      color: "var(--text-faint)"
    }
  }, c.count, " items")))));
}
function ModelPicker() {
  const [b, setB] = React.useState("iPhone");
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-6)",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-h3)/1.2 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Find by phone model"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Only exact-fit products are shown.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      flex: 1
    }
  }, window.RM_DATA.brands.map(x => /*#__PURE__*/React.createElement(Tag, {
    key: x,
    selected: x === b,
    onClick: () => setB(x)
  }, x)))));
}
function HomeScreen({
  onNav,
  onAdd
}) {
  const p = window.RM_DATA.products;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(CategoryTiles, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(ModelPicker, null), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Fast movers",
    title: "Popular this week",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      }),
      onClick: () => onNav({
        screen: "category",
        cat: "covers"
      })
    }, "View all")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--sp-5)"
    }
  }, p.slice(0, 4).map(x => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: x.id
  }, x, {
    onAdd: () => onAdd(x),
    onClick: () => onNav({
      screen: "product",
      id: x.id
    })
  }))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(OfferBanner, {
    title: "Free screen-guard fitting, every day",
    subtitle: "Buy any tempered glass and we fit it in store \u2014 bubble-free or we replace it.",
    cta: /*#__PURE__*/React.createElement(Button, {
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "map-pin",
        size: 18
      })
    }, "Get directions")
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Just in",
    title: "New arrivals"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--sp-5)"
    }
  }, p.slice(4).map(x => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: x.id
  }, x, {
    onAdd: () => onAdd(x),
    onClick: () => onNav({
      screen: "product",
      id: x.id
    })
  }))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--sp-5)"
    }
  }, [["instagram", "Seen it on Instagram?", "Send us the reel or post — we'll tell you the price and if it's in stock."], ["wrench", "Repairs & fitting", "Screen guard fitting, cover cutting and charging-port cleaning at the counter."], ["users", "Bulk & dealer rates", "Buying 20+ pieces for your shop? Ask for the wholesale list on WhatsApp."]].map(([i, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 44,
      height: 44,
      borderRadius: 999,
      background: "var(--navy-50)",
      color: "var(--navy-800)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-h3)/1.2 var(--font-body)",
      color: "var(--text-strong)",
      margin: "14px 0 6px"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, d))))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/ProductScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Breadcrumbs,
  Badge,
  Price,
  Rating,
  Button,
  Tabs,
  Tag,
  Card,
  Icon,
  QuantityStepper,
  WhatsAppCTA,
  ProductCard,
  SectionHeading
} = window.RaghavMobileAccessoriesDesignSystem_092910;
function ProductScreen({
  id,
  onNav,
  onAdd
}) {
  const data = window.RM_DATA;
  const p = data.products.find(x => x.id === id) || data.products[0];
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("Details");
  const [shot, setShot] = React.useState(0);
  const body = {
    Details: ["Soft-touch matte finish that doesn't collect fingerprints.", "Raised camera lip, 1.2mm shock-absorbing corners.", "Precise cutouts — checked on the actual handset in store."],
    Compatibility: ["Fits " + p.subtitle + " only.", "Not compatible with the Plus / Max variants.", "Works with MagSafe and wireless charging pads."],
    Reviews: ["\"Fitted it at the shop in 2 minutes, no bubbles.\" — Jignesh P.", "\"Colour is exactly like the photo.\" — Hetal S.", "\"Cheaper than the mall price.\" — Mitesh D."]
  }[tab];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--sp-6) var(--gutter) 0"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: [{
      label: "Home",
      href: "#"
    }, {
      label: "Cases & Covers",
      href: "#"
    }, p.title]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--sp-10)",
      marginTop: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "72px 1fr",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10,
      alignContent: "start"
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setShot(i),
    style: {
      aspectRatio: "1/1",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-sunken)",
      border: "1.5px solid " + (shot === i ? "var(--orange-500)" : "var(--border-subtle)"),
      cursor: "pointer",
      font: "var(--fw-bold) 10px/1 var(--font-body)",
      color: "var(--text-faint)"
    }
  }, i + 1))), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "1/1",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-sunken)",
      display: "grid",
      placeItems: "center",
      border: "1px solid var(--border-subtle)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 16,
      left: 16
    }
  }, /*#__PURE__*/React.createElement(Badge, null, p.badge ? p.badge.label : "In stock")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1.5 var(--font-body)",
      color: "var(--text-faint)",
      textAlign: "center"
    }
  }, "Product photo ", shot + 1, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, "square, white background")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h1)",
      color: "var(--text-strong)"
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: p.rating,
    count: p.reviews
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-medium) var(--fs-sm)/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, p.subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Price, {
    amount: p.price,
    mrp: p.mrp,
    size: "lg"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) var(--fs-xs)/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, "Inclusive of all taxes"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 10
    }
  }, "Colour"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, ["Black", "Navy", "Sand", "Clear"].map((c, i) => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: i === 0
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginTop: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      size: 18
    }),
    onClick: () => {
      onAdd(p, qty);
      onNav({
        screen: "cart"
      });
    }
  }, "Add to cart"), /*#__PURE__*/React.createElement(WhatsAppCTA, {
    message: "Hi! I want the " + p.title + " (" + p.subtitle + ")."
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-4)",
    style: {
      marginTop: 22,
      display: "grid",
      gap: 10
    }
  }, [["store", "Available at Vastral store today — collect in 10 min"], ["truck", "Free delivery in Vastral · ₹40 elsewhere in Ahmedabad"], ["shield-check", "7-day replacement if it doesn't fit"]].map(([i, t]) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      font: "var(--fw-semibold) var(--fs-sm)/1.3 var(--font-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 17,
    color: "var(--orange-500)"
  }), t))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ["Details", "Compatibility", "Reviews"],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "16px 0 0",
      paddingLeft: 18,
      display: "grid",
      gap: 8,
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, body.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-16)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Goes well with",
    title: "Customers also bought"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--sp-5)"
    }
  }, data.products.filter(x => x.id !== p.id).slice(0, 4).map(x => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: x.id
  }, x, {
    onAdd: () => onAdd(x),
    onClick: () => onNav({
      screen: "product",
      id: x.id
    })
  }))))));
}
Object.assign(window, {
  ProductScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/ProductScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Shell.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  SearchBar,
  Badge
} = window.RaghavMobileAccessoriesDesignSystem_092910;
function TopStrip() {
  const d = window.RM_DATA.shop;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--navy-900)",
      color: "var(--navy-200)",
      font: "var(--fw-medium) var(--fs-xs)/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "9px var(--gutter)",
      display: "flex",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13
  }), d.area, " \xB7 ", d.hours), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 13
  }), "Free delivery in Vastral over \u20B9499"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 13
  }), d.insta))));
}
function Header({
  cartCount,
  onNav,
  active
}) {
  const links = [["home", "Home"], ["covers", "Cases & Covers"], ["glass", "Screen Guards"], ["chargers", "Charging"], ["audio", "Audio"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "var(--surface-dark)",
      boxShadow: "var(--shadow-sticky)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--sp-4) var(--gutter)",
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav({
      screen: "home"
    }),
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      padding: 0,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 26px/1 var(--font-display)",
      color: "#fff",
      letterSpacing: "-.02em"
    }
  }, "Ragh", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange-500)"
    }
  }, "a"), "v"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 9px/1 var(--font-body)",
      letterSpacing: "var(--ls-caps)",
      color: "var(--navy-200)",
      textTransform: "uppercase",
      marginTop: 4
    }
  }, "Mobile Accessories")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    placeholder: "Search by phone model\u2026"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--sp-5)",
      marginLeft: "auto"
    }
  }, links.map(([id, l]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => onNav(id === "home" ? {
      screen: "home"
    } : {
      screen: "category",
      cat: id
    }),
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color: active === id ? "var(--orange-400)" : "var(--navy-200)",
      padding: "8px 0"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Wishlist",
    tone: "onDark"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Cart",
    tone: "onDark",
    onClick: () => onNav({
      screen: "cart"
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shopping-bag"
  })), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      right: 0,
      minWidth: 18,
      height: 18,
      borderRadius: 999,
      background: "var(--orange-500)",
      color: "#fff",
      font: "var(--fw-bold) 10px/18px var(--font-body)",
      textAlign: "center",
      padding: "0 4px"
    }
  }, cartCount)))));
}
function Footer() {
  const d = window.RM_DATA.shop;
  const col = (t, items) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color: "#fff",
      marginBottom: 14
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: "var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)",
      color: "var(--navy-200)"
    }
  }, i))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--navy-900)",
      marginTop: "var(--sp-20)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--sp-12) var(--gutter)",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: "var(--sp-8)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 24px/1 var(--font-display)",
      color: "#fff"
    }
  }, "Ragh", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange-500)"
    }
  }, "a"), "v"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      font: "var(--fw-medium) var(--fs-sm)/1.6 var(--font-body)",
      color: "var(--navy-200)",
      maxWidth: 280
    }
  }, "Your neighbourhood mobile accessories shop in ", d.area, ". Covers, glass, chargers and more \u2014 fitted free in store."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "grid",
      placeItems: "center",
      width: 38,
      height: 38,
      borderRadius: 999,
      background: "rgba(255,255,255,.1)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "grid",
      placeItems: "center",
      width: 38,
      height: 38,
      borderRadius: 999,
      background: "rgba(255,255,255,.1)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "grid",
      placeItems: "center",
      width: 38,
      height: 38,
      borderRadius: 999,
      background: "rgba(255,255,255,.1)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 18
  })))), col("Shop", ["Back covers", "Tempered glass", "Chargers", "Cables", "Earbuds"]), col("Help", ["Track my order", "Fitting & warranty", "Returns in 7 days", "Bulk / dealer rates"]), col("Visit us", [d.area, d.hours, "+91 99999 99999"])), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "16px var(--gutter)",
      font: "var(--fw-medium) var(--fs-xs)/1 var(--font-body)",
      color: "var(--navy-200)",
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Raghav Mobile Accessories"), /*#__PURE__*/React.createElement("span", null, "GST 24XXXXX1234X1ZX \xB7 Made in Ahmedabad"))));
}
function Section({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--sp-12) var(--gutter) 0",
      ...style
    }
  }, children);
}
Object.assign(window, {
  TopStrip,
  Header,
  Footer,
  Section
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
window.RM_DATA = {
  shop: {
    name: "Raghav Mobile Accessories",
    area: "Vastral, Ahmedabad",
    hours: "10:00 am – 10:00 pm, all days",
    phone: "919999999999",
    insta: "@raghavmobile"
  },
  categories: [{
    id: "covers",
    label: "Back covers & cases",
    icon: "smartphone",
    count: 420
  }, {
    id: "glass",
    label: "Tempered glass",
    icon: "shield-check",
    count: 180
  }, {
    id: "chargers",
    label: "Chargers & adapters",
    icon: "zap",
    count: 96
  }, {
    id: "cables",
    label: "Cables",
    icon: "cable",
    count: 74
  }, {
    id: "audio",
    label: "Earphones & buds",
    icon: "headphones",
    count: 58
  }, {
    id: "power",
    label: "Power banks",
    icon: "battery-charging",
    count: 31
  }],
  brands: ["iPhone", "Samsung", "Redmi", "Realme", "Vivo", "Oppo", "OnePlus", "Poco"],
  products: [{
    id: 1,
    title: "Matte Silicone Case",
    subtitle: "iPhone 13 / 13 Pro",
    price: 249,
    mrp: 499,
    rating: 4.6,
    reviews: 38,
    cat: "covers",
    badge: {
      label: "50% off"
    }
  }, {
    id: 2,
    title: "9H Tempered Glass",
    subtitle: "Redmi Note 13 Pro",
    price: 99,
    mrp: 199,
    rating: 4.4,
    reviews: 112,
    cat: "glass",
    badge: {
      label: "Best seller",
      tone: "new"
    }
  }, {
    id: 3,
    title: "33W Fast Charger + Cable",
    subtitle: "Type-C · 1m braided",
    price: 649,
    mrp: 899,
    rating: 4.8,
    reviews: 26,
    cat: "chargers"
  }, {
    id: 4,
    title: "Clear Shockproof Bumper",
    subtitle: "Galaxy A55 5G",
    price: 299,
    mrp: 549,
    rating: 4.3,
    reviews: 54,
    cat: "covers",
    badge: {
      label: "New",
      tone: "new"
    }
  }, {
    id: 5,
    title: "Privacy Screen Guard",
    subtitle: "iPhone 15 / 15 Plus",
    price: 349,
    mrp: 599,
    rating: 4.7,
    reviews: 19,
    cat: "glass"
  }, {
    id: 6,
    title: "Braided Type-C Cable 1.5m",
    subtitle: "60W · fast charge",
    price: 199,
    mrp: 349,
    rating: 4.5,
    reviews: 88,
    cat: "cables",
    badge: {
      label: "Combo",
      tone: "info"
    }
  }, {
    id: 7,
    title: "TWS Earbuds Pro",
    subtitle: "40h playback · ENC mic",
    price: 1299,
    mrp: 2499,
    rating: 4.2,
    reviews: 63,
    cat: "audio",
    badge: {
      label: "48% off"
    }
  }, {
    id: 8,
    title: "10000mAh Slim Power Bank",
    subtitle: "22.5W · dual output",
    price: 1099,
    mrp: 1699,
    rating: 4.6,
    reviews: 41,
    cat: "power"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

__ds_ns.OfferBanner = __ds_scope.OfferBanner;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.WhatsAppCTA = __ds_scope.WhatsAppCTA;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
