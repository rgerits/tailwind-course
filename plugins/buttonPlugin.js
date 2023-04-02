const plugin = require("tailwindcss/plugin");
const { default: lightOrdarkColor } = require("@check-light-or-dark/color");

const buttonPlugin = plugin(function ({
  addComponents,
  matchComponents,
  theme,
}) {
  addComponents({
    ".btn": {
      display: "inline-block",
      cursor: "pointer",
      fontWeight: "bold",
      padding: '${theme("spacing.2")} ${theme("spacing.4")}',
      borderRadius: theme("borderRadius").lg,
    },
  });

  for (let key in theme("colors")) {
    if (typeof theme("colors")[key] !== "string") {
      for (let shade in theme("colors")[key]) {
        const colorType = lightOrdarkColor(theme("colors")[key][shade]);

        addComponents({
          [`.btn-${key}-${shade}`]: {
            backgroundColor: theme("colors")[key][shade],
            color: colorType === "dark" ? "black" : "white",
          },
        });
      }
    }
  }

  matchComponents({
    btn: (value) => {
      return {
        backgroundColor: value,
        color: lightOrdarkColor === "dark" ? "black" : "white",
      };
    },
  });
});

module.exports = buttonPlugin;
