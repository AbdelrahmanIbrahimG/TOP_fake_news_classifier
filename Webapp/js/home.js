let burger_icon = document.getElementById("burger-icon");
let nav = document.getElementById("nav");
burger_icon.addEventListener("click", () => {
  nav.classList.toggle("navf");
});
function sendmail() {
  Email.send({
    SecureToken: "49c5db05-c3a2-48d8-b7e4-eff42611c594",
    To: "abdelrahmanibrahim425@gmail.com",
    From: document.getElementsByName("email")[0].value,
    Subject:
      document.getElementsByName("email")[0].value + " want to talk to you",
    Body:
      "from : " +
      document.getElementsByName("name")[0].value +
      " <br> subject : " +
      document.getElementsByName("message")[0].value,
  }).then((message) => alert(message));
}
let header = document.getElementsByClassName("header")[0];
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    header.classList.add("header-box-shadow");
  } else {
    header.classList.remove("header-box-shadow");
  }
});
let currentHighlightedNavItem = null;

function highlightNavItem() {
  const navLinks = document.querySelectorAll("#nav li");

  navLinks.forEach((li) => {
    const sectionId = li.querySelector("a").getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);

    if (section && isElementInViewport(section)) {
      if (currentHighlightedNavItem !== li) {
        if (currentHighlightedNavItem) {
          currentHighlightedNavItem.classList.remove("orange");
        }
        currentHighlightedNavItem = li;
        li.classList.add("orange");
      }
    }
  });
}
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener("scroll", highlightNavItem);
window.addEventListener("resize", highlightNavItem);
window.addEventListener("load", highlightNavItem);
