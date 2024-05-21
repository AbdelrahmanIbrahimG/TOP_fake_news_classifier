let subbtn = document.getElementById("submit");
subbtn.addEventListener("click", async () => {
  let news = document.getElementById("news").value.trim();
  //   console.log(document.getElementById("news"));
  //   console.log(news);
  if (news != "") {
    const newDiv = document.createElement("div");
    const responedev = document.createElement("div");
    const response_container = document.createElement("div");
    newDiv.textContent = news;
    const pred_text = await getpred(news);
    console.log(pred_text);
    if (pred_text == "0") {
      responedev.textContent = "Unfortunately That Was A Fake News";
      //style for the user response news
      responedev.classList.add("fake");
      //   responedev.style.color = "red";
    } else {
      responedev.textContent = "The News You Provided Is Real News";
      //style for the user response news
      //   responedev.style.color = "green";
      responedev.classList.add("true");
    }
    //style for the user input news
    newDiv.classList.add("user-news-item");
    response_container.classList.add("response-container");
    document.querySelector(".main").appendChild(newDiv);
    document
      .querySelector(".main")
      .appendChild(response_container)
      .appendChild(responedev);

    document.getElementById("news").value = "";
  }
});

let textarea = document.getElementById("news");

textarea.addEventListener("keydown", async (event) => {
  if (event.ctrlKey && event.keyCode === 13) {
    event.preventDefault(); // Prevent the default behavior of the Enter key

    // Trigger the click event on the submit button
    subbtn.click();
  }
});

async function getpred(selectedText) {
  const url = "https://top9.p.rapidapi.com/classify";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "e6332296a5msh157cb1e6e200cfdp145336jsn914f220362a4",
      "X-RapidAPI-Host": "top9.p.rapidapi.com",
    },
    body: JSON.stringify({text: selectedText}),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.prediction;
  } catch (error) {
    console.error(error);
    return "";
  }
}
delete_btn = document.getElementsByClassName("delete")[0];
delete_btn.addEventListener("click", () => {
  location.reload();
});
