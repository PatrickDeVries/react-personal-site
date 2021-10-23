"use strict";
exports.id = 269;
exports.ids = [269];
exports.modules = {

/***/ 4888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ useTheme),
/* harmony export */   "f": () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ThemeContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const useTheme = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
const ThemeProvider = ThemeContext.Provider;

/***/ }),

/***/ 5083:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6818);
/* harmony import */ var _headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9914);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var _ThemeContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4888);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);







const StyledCard = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.Card.Container).withConfig({
  displayName: "WorkCard__StyledCard",
  componentId: "sc-17b3joc-0"
})(["", ""], () => {
  const {
    theme
  } = (0,_ThemeContext__WEBPACK_IMPORTED_MODULE_4__/* .useTheme */ .F)();
  return `
      margin: 1rem;
      background-color: ${theme.backgroundHighlight};
      width: fit-content;
      align-self: stretch;
      @media (min-width: 800px) {
        max-width: 40vw;
        min-height: 40vh;
      }
      @media (max-width: 799px) {
        width: 90vw;
      }
      outline: 2px solid ${theme.strongHighlight};
      `;
});
const BodySection = styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({
  displayName: "WorkCard__BodySection",
  componentId: "sc-17b3joc-1"
})(["display:flex;flex-direction:row;width:100%;"]);
const ScalingImg = styled_components__WEBPACK_IMPORTED_MODULE_2___default().img.withConfig({
  displayName: "WorkCard__ScalingImg",
  componentId: "sc-17b3joc-2"
})(["display:block;max-width:40%;object-fit:cover;"]);
const BodyText = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.Text.Container).withConfig({
  displayName: "WorkCard__BodyText",
  componentId: "sc-17b3joc-3"
})(["margin:1rem;text-align:justify;text-justify:inter-word;"]);
const TagSection = styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({
  displayName: "WorkCard__TagSection",
  componentId: "sc-17b3joc-4"
})(["display:flex;flex-wrap:wrap;gap:1rem;flex-direction:row;width:100%;margin-left:auto;bottom:1rem;"]);

const WorkCard = ({
  item
}) => {
  const {
    theme
  } = (0,_ThemeContext__WEBPACK_IMPORTED_MODULE_4__/* .useTheme */ .F)();
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__.default, {
    href: (item === null || item === void 0 ? void 0 : item.page) || (item === null || item === void 0 ? void 0 : item.href),
    passHref: true,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.Card, {
      StyledContainer: StyledCard,
      header: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.Text, {
        size: "1.25rem",
        color: theme.primary,
        children: item.header
      }),
      footer: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(TagSection, {
        children: item.tags.map(tagText => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.Tag, {
          variant: _headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.variants.outline,
          color: theme.secondary,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.Text, {
            size: "1rem",
            children: tagText
          })
        }, tagText))
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(BodySection, {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(ScalingImg, {
          src: item.image
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headstorm_foundry_react_ui__WEBPACK_IMPORTED_MODULE_0__.Text, {
          color: theme.text,
          StyledContainer: BodyText,
          children: item.description
        })]
      })
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkCard);

/***/ }),

/***/ 7269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Ar": () => (/* reexport */ components_Layout),
  "ot": () => (/* reexport */ components_MainNavigation)
});

// UNUSED EXPORTS: WorkCard

// EXTERNAL MODULE: external "@headstorm/foundry-react-ui"
var foundry_react_ui_ = __webpack_require__(6818);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./node_modules/next/dist/client/router.js
var client_router = __webpack_require__(4651);
// EXTERNAL MODULE: external "@mdi/react"
var react_ = __webpack_require__(7306);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: external "@mdi/js"
var js_ = __webpack_require__(2406);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./components/ThemeContext.tsx
var ThemeContext = __webpack_require__(4888);
// EXTERNAL MODULE: ./styles/myColors.ts
var myColors = __webpack_require__(5288);
// EXTERNAL MODULE: external "polished"
var external_polished_ = __webpack_require__(7158);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/MainNavigation.tsx












const NavDiv = external_styled_components_default().div.withConfig({
  displayName: "MainNavigation__NavDiv",
  componentId: "sc-1xol9ew-0"
})(["", ""], () => {
  const {
    theme
  } = (0,ThemeContext/* useTheme */.F)();
  return `
      width: 100%;
      height: 3rem;
      display: flex;
      align-items: center;
      background-color: ${theme.backgroundHighlight};
      color: ${theme.text};
      border-bottom: 1px solid ${theme.primary};
    `;
});
const Header = external_styled_components_default().div.withConfig({
  displayName: "MainNavigation__Header",
  componentId: "sc-1xol9ew-1"
})(["", ""], () => {
  const {
    theme
  } = (0,ThemeContext/* useTheme */.F)();
  return `
      left: auto;
      margin-left: 2rem;
      filter: drop-shadow(0 0 0.75rem ${theme.secondary});
  `;
});
const Footer = external_styled_components_default().div.withConfig({
  displayName: "MainNavigation__Footer",
  componentId: "sc-1xol9ew-2"
})(["margin-left:auto;margin-right:1rem;"]);
const NavSection = external_styled_components_default().div.withConfig({
  displayName: "MainNavigation__NavSection",
  componentId: "sc-1xol9ew-3"
})(["margin-left:2rem;display:flex;flex-direction:row;height:100%;justify-content:stretch;"]);
const NavTag = external_styled_components_default()(foundry_react_ui_.Tag.Container).withConfig({
  displayName: "MainNavigation__NavTag",
  componentId: "sc-1xol9ew-4"
})(["", ""], ({
  color
}) => {
  const {
    theme
  } = (0,ThemeContext/* useTheme */.F)();
  return `
      outline: 1px solid ${theme.primary};
      height: 100%;
      border-radius: 0 0 0 0;
      &:hover {
        background-color: ${color !== '#0000' ? theme.name === 'light' ? (0,external_polished_.darken)(0.1, color) : (0,external_polished_.lighten)(0.1, color) : theme.name === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(256, 256, 256, 0.05)'};
      }
  `;
});
const Name = external_styled_components_default().span.withConfig({
  displayName: "MainNavigation__Name",
  componentId: "sc-1xol9ew-5"
})(["white-space:nowrap;"]);
const pages = {
  Home: '/',
  'My Work': '/work',
  'Contact Me': '/contact',
  Résumé: 'https://media-exp1.licdn.com/dms/document/C4E2DAQHCFUhb3AZYAA/profile-treasury-document-pdf-analyzed/0/1612393403952?e=1634878800&v=beta&t=h57kKXP43wP3HJhmKmdOWmvU4_L9wEgxKwJKdY4-m0I'
};

const MainNavigation = () => {
  const router = (0,client_router.useRouter)();
  const {
    theme,
    setTheme
  } = (0,ThemeContext/* useTheme */.F)();
  console.log(setTheme);
  const [dark, setDark] = external_react_default().useState(true);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(NavDiv, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Header, {
      children: /*#__PURE__*/jsx_runtime_.jsx(foundry_react_ui_.Text, {
        size: "1.5rem",
        color: theme.secondary,
        children: /*#__PURE__*/jsx_runtime_.jsx(Name, {
          children: "Patrick DeVries"
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(NavSection, {
      children: Object.keys(pages).map(label => /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: pages[label],
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          children: /*#__PURE__*/jsx_runtime_.jsx(foundry_react_ui_.Tag, {
            color: router.pathname === pages[label] ? theme.strongHighlight : '#0000',
            variant: foundry_react_ui_.variants.fill,
            StyledContainer: NavTag,
            containerProps: {
              color: router.pathname === pages[label] ? theme.strongHighlight : '#0000'
            },
            children: /*#__PURE__*/jsx_runtime_.jsx(foundry_react_ui_.Text, {
              color: theme.text,
              children: label
            })
          })
        })
      }, label))
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer, {
      children: /*#__PURE__*/jsx_runtime_.jsx(foundry_react_ui_.Button, {
        color: "#0000",
        onClick: () => {
          setDark(!dark);

          if (dark) {
            setTheme(myColors/* darkColors */._);
          } else {
            setTheme(myColors/* lightColors */.C);
          }
        },
        children: /*#__PURE__*/jsx_runtime_.jsx((react_default()), {
          path: js_.mdiThemeLightDark,
          size: "1.5rem",
          color: theme.secondary
        })
      })
    })]
  });
};

/* harmony default export */ const components_MainNavigation = (MainNavigation);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./components/Layout.tsx







const HomeDiv = external_styled_components_default().div.withConfig({
  displayName: "Layout__HomeDiv",
  componentId: "sc-s9jzm3-0"
})(["", ""], () => {
  const {
    theme
  } = (0,ThemeContext/* useTheme */.F)();
  return `
  background-repeat: no-repeat;
  background-image: linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight});
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  `;
});
const Body = external_styled_components_default().div.withConfig({
  displayName: "Layout__Body",
  componentId: "sc-s9jzm3-1"
})(["display:flex;flex-direction:column;justify-content:center;align-items:flex-start;height:fit-content;"]);

const Layout = props => /*#__PURE__*/(0,jsx_runtime_.jsxs)(HomeDiv, {
  children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
    children: /*#__PURE__*/jsx_runtime_.jsx("title", {
      children: "Patrick DeVries"
    })
  }), /*#__PURE__*/jsx_runtime_.jsx(components_MainNavigation, {}), /*#__PURE__*/jsx_runtime_.jsx(Body, {
    children: props.children
  })]
});

/* harmony default export */ const components_Layout = (Layout);
// EXTERNAL MODULE: ./components/WorkCard.tsx
var WorkCard = __webpack_require__(5083);
;// CONCATENATED MODULE: ./components/index.ts





/***/ }),

/***/ 5288:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ darkColors),
/* harmony export */   "C": () => (/* binding */ lightColors)
/* harmony export */ });
const darkColors = {
  name: 'dark',
  text: 'white',
  primary: '#00FF9D',
  secondary: '#03FFFF',
  background: '#031016',
  backgroundHighlight: '#0b232e',
  strongHighlight: '#113547'
};
const lightColors = {
  name: 'light',
  text: 'black',
  primary: '#3277b3',
  secondary: '#d705fc',
  background: '#fff',
  backgroundHighlight: '#eee',
  strongHighlight: '#ddd'
};

/***/ })

};
;