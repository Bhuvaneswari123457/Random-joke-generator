const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");

const apiKey = "iqgCDYK8yZHEx+SvwINFKA==xXTtjAXQ9xlBgHqV";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const limit = 1;
const apiURL = "https://api.api-ninjas.com/v1/dadjokes";

async function getJoke() {
  try {
    jokeEl.innerText = "Updating...";
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";

    const response = await fetch(apiURL, options);
    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data[0] || !data[0].joke) {
      throw new Error("No joke found in the response.");
    }

    jokeEl.innerText = data[0].joke;
  } catch (error) {
    jokeEl.innerText = "An error happened, try again later";
    console.error("Error:", error);
  } finally {
    btnEl.disabled = false;
    btnEl.innerText = "Tell me a joke";
  }
}

btnEl.addEventListener("click", getJoke);
