const mouseEffect = () => {
  function mousecursor() {
    const cursorInner = document.querySelector(".cursor-inner"),
      cursorOuter = document.querySelector(".cursor-outer");
    let n,
      i = 0,
      o = !1;
    window.onmousemove = function (s) {
      o ||
        (cursorOuter.style.transform =
          "translate(" + s.clientX + "px, " + s.clientY + "px)"),
        (cursorInner.style.transform =
          "translate(" + s.clientX + "px, " + s.clientY + "px)"),
        (n = s.clientY),
        (i = s.clientX);
    };
    if (document.querySelector(".cursor-pointer")) {
      document
        .querySelector(".cursor-pointer")
        .addEventListener("mouseenter", function () {
          cursorInner.classList.add("cursor-hover"),
            cursorOuter.classList.add("cursor-hover");
        });
      document
        .querySelector(".cursor-pointer")
        .addEventListener("mouseleave", function () {
          cursorInner.classList.remove("cursor-hover"),
            cursorOuter.classList.remove("cursor-hover");
        }),
        (cursorInner.style.visibility = "visible"),
        (cursorOuter.style.visibility = "visible");
    }

    document.querySelectorAll("a", "Link").forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        cursorInner.classList.add("cursor-hover"),
          cursorOuter.classList.add("cursor-hover");
      });
    });
    document.querySelectorAll("a", "Link").forEach(function (item) {
      item.addEventListener("mouseleave", function () {
        cursorInner.classList.remove("cursor-hover"),
          cursorOuter.classList.remove("cursor-hover");
      });
    }),
      (cursorInner.style.visibility = "visible"),
      (cursorOuter.style.visibility = "visible");
  }

  mousecursor();
};

export default mouseEffect;
