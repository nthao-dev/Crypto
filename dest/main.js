// Get Padding, Margin...
function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView
      .getComputedStyle(oElm, "")
      .getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue.replace("px", "");
}

// Update Width/ Height Item Testimonials When Resize
function handleItemTestiWidth() {
  let contW = document.querySelector(
      ".testimonial .container .testimonial__title"
    ).clientWidth,
    items = document.querySelectorAll(".testimonial__list--item"),
    gridGap = 26;
  if (document.documentElement.offsetWidth >= 768) {
    items.forEach((item) => {
      item.style.width = `${contW / 2 - gridGap / 2}px`;
    });
  } else {
    items.forEach((item) => {
      item.style.width = `${contW}px`;
    });
  }
}

function handleItemTestiHeight() {
  const items = document.querySelectorAll(".testimonial__list--item");
  let height = 0;
  items.forEach((item) => {
    let heightItem =
      item.querySelector(".detail").scrollHeight +
      item.querySelector(".author").scrollHeight +
      parseInt(getStyle(item.querySelector(".author"), "margin-top")) +
      parseInt(getStyle(item, "padding-top")) * 2;
    if (heightItem > height) {
      height = heightItem;
    }
  });
  items.forEach((item) => {
    item.style.height = height + "px";
  });
  document.querySelector(".testimonial__list .flickity-viewport").style.height =
    height + "px";
}

// Handle Slider Testimonials
function handleSliderTestimonials() {
  var slider = document.querySelector(".testimonial__list");
  if (slider) {
    const flktySlider = new FlickityResponsive(slider, {
      cellAlign: "center",
      contain: true,
      prevNextButtons: false,
      wrapAround: true,
      groupCells: 2,
      on: {
        ready: function () {
          handleItemTestiWidth();
          handleItemTestiHeight();
        },
        resize: function () {
          // setTimeout(() => {
          handleItemTestiHeight();
          // }, 500);
        },
      },
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            groupCells: 1,
          },
        },
      ],
    });
  }
}

// Handle Popup Video
function handlePopupVideo() {
  const videoOverlay = document.querySelector(".popup__video"),
    videoClose = document.querySelector(".popup__video .popup__video-close"),
    videoBtn = document.querySelector(".getstarted__video");
  if (videoOverlay) {
    function hideVideo() {
      document.querySelector(".popup__video").classList.add("--hide");
      document
        .querySelector(".popup__video .popup__video-inner iframe")
        .setAttribute("src", "");
      document.querySelector("body").classList.remove("--disable-scroll");
    }

    videoOverlay.addEventListener("click", hideVideo);
    videoClose.addEventListener("click", hideVideo);
    // Section Banner Video Popup
    videoBtn.addEventListener("click", () => {
      document.querySelector("body").classList.add("--disable-scroll");
      document.querySelector(".popup__video").classList.remove("--hide");
      document
        .querySelector(".popup__video .popup__video-inner iframe")
        .setAttribute(
          "src",
          "https://www.youtube.com/embed/VJ5WoHkrXdI?&autoplay=1"
        );
    });
  }
}
handlePopupVideo();

// Handle Btn Menu
function handleNavBtn() {
  const navBtns = document.querySelectorAll("header .header__navs li .btn");
  function removeActive() {
    navBtns.forEach((el) => {
      el.classList.remove("--active");
    });
  }
  navBtns.forEach((btn) => {
    if (btn.href == window.location.href) {
      removeActive();
      btn.classList.add("--active");
    }
  });
}
handleNavBtn();

// Handle Btn Menu Mobile
function handleMenuMobile() {
  const btnmenu = document.querySelector("header .btnmenu"),
    navmenu = document.querySelector("header .navmenu"),
    navMenuBtns = document.querySelectorAll("header .navmenu .btn");

  function removeActive() {
    navMenuBtns.forEach((el) => {
      el.classList.remove("--active");
    });
  }
  btnmenu.addEventListener("click", () => {
    btnmenu.classList.toggle("--active");
    navmenu.classList.toggle("--active");
    // document.querySelector("body").classList.toggle("--disable-scroll");
  });

  navMenuBtns.forEach((btn) => {
    if (btn.href == window.location.href) {
      removeActive();
      btn.classList.add("--active");
    }
  });
}
handleMenuMobile();

// Handle Posts
function handlePosts() {
  const postTag = document.querySelectorAll(
      ".lastestpost .textbox__right .btnmain"
    ),
    postWrap = document.querySelectorAll(
      ".lastestpost .post-container .post-wrap"
    ),
    postPage = document.querySelectorAll(
      ".lastestpost .lastestpost__pages-number"
    ),
    postPagePrev = document.querySelector(
      ".lastestpost .lastestpost__pages-prev"
    ),
    postPageNext = document.querySelector(
      ".lastestpost .lastestpost__pages-next"
    );

  function removeActive() {
    postTag.forEach((tag) => {
      tag.classList.remove("--active");
    });
    postWrap.forEach((item) => {
      item.classList.remove("--active");
    });
  }
  postTag.forEach((tag, index) => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      removeActive();
      tag.classList.add("--active");
      postWrap[index].classList.add("--active");
    });
  });
  postPage.forEach((page) => {
    page.addEventListener("click", () => {
      postPage.forEach((p) => {
        p.classList.remove("--active");
      });
      page.classList.add("--active");
    });
  });
}
handlePosts();

// Handle Dropdown Questions
function handleDropdownQuestion() {
  const toggle = document.querySelectorAll(".faqs .faqs__item .textbox"),
    faqsItem = document.querySelectorAll(".faqs .faqs__item"),
    desc = document.querySelectorAll(".faqs .faqs__item .desc");

  function removeActive() {
    faqsItem.forEach((el) => {
      el.classList.remove("--active");
    });
  }

  toggle.forEach((item, index) => {
    item.addEventListener("click", () => {
      // removeActive();
      faqsItem[index].classList.toggle("--active");
      if (desc[index].style.maxHeight) {
        desc[index].style.maxHeight = null;
      } else {
        desc[index].style.maxHeight = desc[index].scrollHeight + "px";
      }
    });
  });
}
handleDropdownQuestion();

// Validate Email
const validateEmail = (email) => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    console.log("Validate Email");
    return true;
  } else {
    console.log("Please try again!");
    return false;
  }
};

// Handle Validate
function handleValidate() {
  const formName = document.querySelector(".getintouch-form--name input"),
    formEmail = document.querySelector(".getintouch-form--email input"),
    formSubject = document.querySelector(".getintouch-form--subject input"),
    formMess = document.querySelector(".getintouch-form--message textarea"),
    formBtn = document.querySelector(
      ".getintouch .getintouch__wrap-left .btnmain"
    );
  if (formName) {
    function showAlert(inputType) {
      const formAlert = document.querySelector(
        `.getintouch .getintouch__wrap-left .getintouch-form--${inputType} .form-alert`
      );
      if (inputType === "email") {
        formAlert.innerText = "Invalid Email!";
        formAlert.style.display = "block";
      } else {
        formAlert.style.display = "block";
      }
    }
    function removeAlert(inputType) {
      const formAlert = document.querySelector(
        `.getintouch .getintouch__wrap-left .getintouch-form--${inputType} .form-alert`
      );
      formAlert.style.display = "none";
    }
    function removeBorder() {
      formName.style.border = "";
      formEmail.style.border = "";
      formSubject.style.border = "";
      formMess.style.border = "";
    }
    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      validateEmail(formEmail.value)
        ? ((formEmail.style.border = "1px solid #0328EE"), removeAlert("email"))
        : ((formEmail.style.border = "1px solid red"), showAlert("email"));

      formSubject.value
        ? ((formSubject.style.border = "1px solid #0328EE"),
          removeAlert("subject"))
        : ((formSubject.style.border = "1px solid red"), showAlert("subject"));

      formName.value
        ? ((formName.style.border = "1px solid #0328EE"), removeAlert("name"))
        : ((formName.style.border = "1px solid red"), showAlert("name"));

      formMess.value
        ? ((formMess.style.border = "1px solid #0328EE"),
          removeAlert("message"))
        : ((formMess.style.border = "1px solid red"), showAlert("message"));

      if (
        validateEmail(formEmail.value) &&
        formSubject.value &&
        formName.value &&
        formMess.value
      ) {
        setTimeout(() => {
          alert("Submitted!");
          formEmail.value = "";
          formSubject.value = "";
          formName.value = "";
          formMess.value = "";
          removeBorder();
        }, 500);
      }
    });
  }
}
handleValidate();

// Progress Bar/ Images Loaded
function handleImgLoaded() {
  let imgs = document.querySelectorAll("img"),
    loading = document.querySelector(".loading"),
    loadingLine = document.querySelector(".loading .loading-line div"),
    loadingPercent = document.querySelector(".loading .loading-percent");
  imagesLoaded(imgs, function () {
    let imgLoaded = 0;
    document.querySelector("body").classList.add("--disable-scroll");

    let result = setInterval(() => {
      imgLoaded++;

      if (imgLoaded <= imgs.length) {
        loadingLine.style.width = `${(imgLoaded / imgs.length) * 100}%`;
        loadingPercent.innerText = `${Math.round(
          loadingLine.style.width.replace("%", "")
        )}%`;
        // console.log(imgLoaded);
      } else {
        loading.classList.add("--done");
        document.querySelector("body").classList.remove("--disable-scroll");
      }
    }, 30);
  });
}
handleImgLoaded();

// Windown Load
window.addEventListener("load", () => {
  handleSliderTestimonials();
  window.addEventListener("resize", () => {
    if (document.querySelector(".testimonial")) {
      handleItemTestiWidth();
    }
    // Remove Menu Nav When Resize To Destop Screen
    if (document.documentElement.offsetWidth <= 991) {
      document.querySelector("header .navmenu").classList.remove("--active");
      document
        .querySelector("header .header__right .btnmenu")
        .classList.remove("--active");
    }
  });
});
