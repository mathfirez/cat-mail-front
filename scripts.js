function send() {
    const author = document.getElementById("username").value.trim();
    const content = document.getElementById("content").value.trim();
    const receiver = "mathfirez";

    if (author === "" || content === "") {
        alert("All fields must be filled before sending.");
        return;
    }

    const message = {
        Author: author,
        Receiver: receiver,
        Content: content
    };

    fetch("https://srv1137806.hstgr.cloud/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        return response.text();
    })
    .then(() => {
        alert("Sent!");
    })
    .catch(err => {
        alert("Unable to send message. Try again later.\nError: " + err);
        console.error(err);
    });
}
