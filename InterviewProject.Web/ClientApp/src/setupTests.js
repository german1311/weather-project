import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document,
  },
});
