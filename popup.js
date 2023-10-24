document.addEventListener("DOMContentLoaded", function () {
    const urlInput = document.getElementById("urlInput");
    const checkButton = document.getElementById("checkButton");
    const result = document.getElementById("result");
  
    checkButton.addEventListener("click", () => {
      const url = urlInput.value;
  
      // Replace this with the actual API you want to use for security checks.
      // This is just a placeholder example.
      fetch("https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyBwiYXak3p5dwGoNgWL5hR0nW0UW0hs82s",{
        method: 'POST',
        body: JSON.stringify({
            "client": {
            "clientId":"testURLProject_IICS",
            "clientVersion": "1.0.0"
            },
            "threatInfo": {
            "threatTypes":["THREAT_TYPE_UNSPECIFIED","MALWARE", "SOCIAL_ENGINEERING","UNWANTED_SOFTWARE","POTENTIALLY_HARMFUL_APPLICATION"],
            "platformTypes":["WINDOWS"],
            "threatEntryTypes":["URL"],
            "threatEntries": [
                {"url": url},
            ]
            }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
      })
        .then((response) => response.json())
        .then((data) => {
            console.log("ResponseData data:"+data)
          if (JSON.stringify(data) === '{}') {
            result.innerHTML = "URL is safe. No matches found";
          } else {
            result.innerHTML = "URL is not safe. Matches in the list";
          }
        })
        .catch((error) => {
          result.innerHTML = "Error checking URL.";
        });
    });
  });
  