//Loader HTML indholdet, const-samling der hiver fat i de enkelte elementer
document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.querySelector("#taskInput");
  const addButton = document.querySelector("button");
  const taskList = document.querySelector("#taskList");
  const doneList = document.querySelector("#doneList");
  const taskTemplate = document.querySelector("#taskTemplate");

  // click-event for at tilføje task
  addButton.addEventListener("click", addTask);

  // addTask funktion, gør følgende:
  // opretter const der henviser til det skrevne i input, samt trimmer for unødvendig whitepsace
  // if statement der tjekker at inputtet ikke er en tom streng
  // const der tilgår samt cloner template --> .cloneNode(true) laver en "deep copy" af templates indhold og børn
  // tager fat i span elementet i clone af template og indsætter taskName i span, som er den trimmede input fra brugeren
  function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
      const clone = taskTemplate.content.cloneNode(true);
      clone.querySelector("span").textContent = taskName;

      // Tager fat i deleteButton
      // Tilføjer EventListener på click --> deleteTask
      const deleteButton = clone.querySelector(".deleteButton");
      deleteButton.addEventListener("click", deleteTask);

      // Tager fat i det første element med klassen .taskCheckbox inde i den clonede template
      // Tilføjer EventListener på change (hvis boksen krydses af eksempelvis) på checkbox elementet og kalder "moveTask" funktionen
      // Tilføjer (appends) klonen (liste-tilføjelsen) som "child node til taskList elementet, elementet ryger nederst på tasklisten på to-doen
      // resetter input feltet til en tom streng
      const checkbox = clone.querySelector(".taskCheckbox");
      checkbox.addEventListener("change", moveTask);
      taskList.appendChild(clone);
      taskInput.value = "";
    }
  }
  // function der kan flytte task elementerne mellem done og to do
  // const der tager fat i den tætteste li på det element der triggerede eventet (så vidt jeg forstår?)
  // const der tager fat i checkbox elementet til den valgte listItem
  // if statement der tjekker om checkbox er afkrydset og derfra enten tilføjer (appender) til doneList eller taskList
  // Tilføjer classlist der gennemstreger teksten
  function moveTask() {
    const listItem = this.closest("li");
    const checkbox = listItem.querySelector(".taskCheckbox");
    if (checkbox.checked) {
      doneList.appendChild(listItem);
      listItem.classList.add("done");
    } else {
      taskList.appendChild(listItem);
      listItem.classList.remove("done");
    }
  }

  // function der sletter task elementer
  // const der tager fat i den tætteste li på det element der triggerede eventet (så vidt jeg forstår?)
  // Fjerner
  function deleteTask() {
    const listItem = this.closest("li");
    listItem.remove();
  }
});
