document.getElementById("periodForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var lastPeriod = new Date(document.getElementById("lastPeriod").value);
  var cycleLength = parseInt(document.getElementById("cycleLength").value);

  var nextPeriod = new Date(lastPeriod.getTime());
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  var formattedNextPeriod = nextPeriod.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  document.getElementById("predictionResult").innerText = "Next period: " + formattedNextPeriod;

  // Clear chatbot messages
  document.getElementById("chatbotMessages").innerHTML = "";

  // Chatbot assistance
  var chatbotResponse = getChatbotResponse(cycleLength);
  displayChatbotResponse(chatbotResponse);
});

document.getElementById("sendButton").addEventListener("click", function() {
  var userInput = document.getElementById("userInput").value;
  displayUserMessage(userInput);
  processUserInput(userInput);
});

function getChatbotResponse(cycleLength) {
  var response = "";

  if (cycleLength < 21) {
    response = "Your cycle length seems to be shorter than average. It's recommended to consult a doctor.";
  } else if (cycleLength > 35) {
    response = "Your cycle length seems to be longer than average. It's recommended to consult a doctor.";
  } else {
    response = "Your cycle length falls within the average range.";
  }

  return response;
}

function displayChatbotResponse(response) {
  var chatbotContainer = document.createElement("div");
  chatbotContainer.classList.add("chatbot-message");
  chatbotContainer.innerText = "Chatbot: " + response;

  document.getElementById("chatbotMessages").appendChild(chatbotContainer);

  // Scroll to the bottom of chat messages
  document.getElementById("chatbotMessages").scrollTop = document.getElementById("chatbotMessages").scrollHeight;
}

function displayUserMessage(message) {
  var userContainer = document.createElement("div");
  userContainer.classList.add("user-message");
  userContainer.innerText = "User: " + message;

  document.getElementById("chatbotMessages").appendChild(userContainer);

  // Scroll to the bottom of chat messages
  document.getElementById("chatbotMessages").scrollTop = document.getElementById("chatbotMessages").scrollHeight;
}

function processUserInput(userInput) {
  // Here, you can implement the logic to handle different user queries and provide appropriate responses.
  // For simplicity, let's provide a generic response in this example.

  var chatbotResponse = "Thank you for your message. How can I assist you?";
  displayChatbotResponse(chatbotResponse);
}
document.addEventListener("DOMContentLoaded", function() {
  var calendarContainer = document.getElementById("calendar");
  var periodForm = document.getElementById("periodForm");
  var predictionResult = document.getElementById("predictionResult");

  periodForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var lastPeriod = new Date(document.getElementById("lastPeriod").value);
    var cycleLength = parseInt(document.getElementById("cycleLength").value);

    var periodDates = calculatePeriodDates(lastPeriod, cycleLength);
    var fertilityDates = calculateFertilityDates(periodDates[0], periodDates[1]);

    renderCalendar(periodDates, fertilityDates);
  });

  function calculatePeriodDates(lastPeriod, cycleLength) {
    var periodStartDate = new Date(lastPeriod);
    var periodEndDate = new Date(lastPeriod);
    periodEndDate.setDate(periodEndDate.getDate() + cycleLength - 1); // Predicted period date
    periodEndDate.setDate(periodEndDate.getDate() + 3); // Three additional days
    return [periodStartDate, periodEndDate];
  }
  

  function calculateFertilityDates(periodStartDate, periodEndDate) {
    var fertilityStartDate = new Date(periodStartDate);
    fertilityStartDate.setDate(fertilityStartDate.getDate() - 10); // Start on the 7th day from predicted period date
    var fertilityEndDate = new Date(periodEndDate);
    fertilityEndDate.setDate(fertilityEndDate.getDate() + 4); // End on the 13th day from predicted period date
    return [fertilityStartDate, fertilityEndDate];
  }

  function renderCalendar(periodDates, fertilityDates) {
    var calendar = "";
  
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    var monthName = currentDate.toLocaleString("default", { month: "long" });

    // Add month name to the calendar
    calendar += "<div class='month'>" + monthName + " " + currentYear + "</div>";

  
    for (var day = 1; day <= totalDays; day++) {
      var date = new Date(currentYear, currentMonth, day);
  
      var dayClass = "day";
      if (isWithinRange(date, periodDates[0], periodDates[1])) {
        dayClass += " period";
      } else if (isWithinRange(date, fertilityDates[0], fertilityDates[1])) {
        dayClass += " fertility";
      }
  
      calendar += "<div class='" + dayClass + "'>" + day + "</div>";
    }
  
    calendarContainer.innerHTML = calendar;
  }
  
  function isWithinRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
  }
  
});
