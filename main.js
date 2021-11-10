console.log("Hi WebSocket!");
const ws = new WebSocket("ws://localhost:8080");

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  ws.send(textField.value);
});

ws.onopen = function (e) {
  console.log("Open ws connection");
};

ws.onmessage = function (e) {
  const data = JSON.parse(e.data);
  console.log(data);
  let text = "";

  switch (data.type) {
    case "info":
      text = data.message;
      break;

    case "message":
      text = `${data.client}: ${data.message}`;
      break;

    default:
      alert(data.message);
      break;
  }

  const newElement = document.createElement("DIV");
  newElement.textContent = text;
  subscribe.appendChild(newElement);
};
