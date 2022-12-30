export const thumparallax = () => {
  var imageUp = document.getElementsByClassName("thumparallax");
  if (imageUp) {
    try {
      new simpleParallax(imageUp, {
        delay: 1,
        scale: 1.1,
      });
    } catch (error) {
      return null;
    }
  }
};
export const thumparallaxDown = () => {
  var imageDown = document.getElementsByClassName("thumparallax-down");
  if (imageDown) {
    try {
      new simpleParallax(imageDown, {
        orientation: "down",
        delay: 1,
        scale: 1.1,
      });
    } catch (error) {
      return null;
    }
  }
};
