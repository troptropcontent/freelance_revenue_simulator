// Update all {{currentUrl}} by the current url of the website
const currentUrl = window.location.href;
document.body.innerHTML = document.body.innerHTML.replace(
  /{{currentUrl}}/g,
  currentUrl,
);

// Copy link to website into the clipboard
const copy_link = document.getElementById("copy_link_target");
const copy_button = document.getElementById("copy_link_button");
const copyToClipboardAndUpdateInnerText = ({ target }) => {
  navigator.clipboard.writeText(copy_link.innerText).then(() => {
    target.innerText = "Copié";
  });
};
copy_button.addEventListener("click", copyToClipboardAndUpdateInnerText);
