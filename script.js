window.onload = function () {
  $(document).ready(function () {
    // Image Hover Animation
    gsap.set(".hover-img", { xPercent: -50, yPercent: -50 });

    const items = document.querySelectorAll(".anime-list li");
    items.forEach((el) => {
      const image = el.querySelector(".hover-img");
      const innerImage = el.querySelector(".hover-img img");

      const pos = { x: window.innerWidth / 2 };
      const mouse = { x: pos.x };
      const speed = 0.1;
      const xSet = gsap.quickSetter(image, "x", "px");

      window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
      });

      gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        xSet(pos.x);
      });

      let lastCursorX = 0;
      const cursorThreshold = 150;

      function mouseMoveHandler(e) {
        if (Math.abs(e.clientX - lastCursorX) > cursorThreshold) {
          innerImage.style.transform = e.clientX < lastCursorX ? "rotate(-15deg)" : "rotate(15deg)";
          lastCursorX = e.clientX;
        }
      }

      function resetImageRotation() {
        innerImage.style.transform = "rotate(0deg)";
      }

      document.addEventListener("mousemove", mouseMoveHandler);
      $(document).on("mousemoveend", resetImageRotation);

      (function ($) {
        let timeout;
        $(document).on("mousemove", function (event) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            $(event.target).trigger("mousemoveend");
          }, 100);
        });
      })(jQuery);
    });

    // Custom Cursor Animation
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    const ball = document.querySelector(".ball");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.08;

    const xSet = gsap.quickSetter(ball, "x", "px");
    const ySet = gsap.quickSetter(ball, "y", "px");

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    // Text Scramble Effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    document.querySelectorAll(".anime-list li").forEach((el) => {
      el.onmouseenter = (event) => {
        const targetElement = event.target.querySelector("h2");
        if (!targetElement) return;

        let iteration = 0;
        const originalText = targetElement.dataset.value;

        const interval = setInterval(() => {
          targetElement.innerText = originalText
            .split("")
            .map((letter, index) =>
              index < iteration ? originalText[index] : letters[Math.floor(Math.random() * 26)]
            )
            .join("");

          if (iteration >= originalText.length) {
            clearInterval(interval);
          }
          iteration += 1 / 3;
        }, 20);
      };
    });
  });
};
