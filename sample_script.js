//chrome.runtime.sendMessage({ todo: "showfb" });

// var selector = document.querySelector(
//   "#groupsUnifiedQueueLHCTabs > div > ul > li:nth-child(4) > div > a"
// );

// $(document).ready(function () {
//   $("#groupsUnifiedQueueLHCTabs div ul li:nth-child(4) div a").click(
//     function () {
//       checkPageLoad();
//     }
//   );
// });

// $(document).ready(function () {
//   $(document).on(
//     "click",
//     "#groupsUnifiedQueueLHCTabs div ul li:nth-child(4) div a",
//     function () {
//       checkPageLoad();
//     }
//   );
// });

// var observer = new MutationObserver(function (mutations, observer) {
//   console.log(mutations, observer);
//   console.log("Hi");
// });
// observer.observe(document, {
//   subtree: true,
//   characterData: true,
// });

// document.querySelector("#mainContainer").addEventListener("load", function () {
//   console.log("Page is loaded");
// });
// $("#mainContainer").on("DOMSubtreeModified", function () {
//   if (document.getElementById("member_requests_pagelet")) {
//     if (
//       document
//         .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
//         .querySelectorAll(".clearfix").length > 0
//     ) {
//       console.log("matched");
//     }
//   }
// });
// document.body.addEventListener("DOMSubtreeModified", function () {
//   if (document.getElementById("member_requests_pagelet")) {
//     console.log("Hi");
//   }
// });
// selector.addEventListener("click", checkPageLoad());
function checkPageLoad() {
  console.log("I'm here");
  if (document.getElementById("member_requests_pagelet")) {
    console.log("Hi");
    if (change_buttons()) {
      scrap_all_mem_details();
    }
  } else {
    window.setTimeout(function () {
      checkPageLoad();
    }, 3000);
  }
}

$("#mainContainer").on("DOMSubtreeModified", function () {
  if (document.getElementById("member_requests_pagelet")) {
    if (
      document
        .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
        .querySelectorAll(".clearfix").length > 0
    ) {
      if (
        document
          .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
          .querySelectorAll(".clearfix")[0]
          .querySelectorAll("._4wsp._51xa")[0]["firstElementChild"].innerHTML ==
        "Approve"
      ) {
        console.log("matched");
        checkPageLoad();
      }
    }
  }
});

// function checkPageLoad() {
//   console.log("I'm here");
//   if (document.getElementById("#member_requests_pagelet")) {
//     console.log("Hi");
//     change_buttons();
//     scrap_all_mem_details();
//   }
// }

function change_buttons() {
  // change Approve all button
  var count = document
    .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
    .querySelectorAll(".clearfix").length;
  if (
    count > 1 &&
    $(
      "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
    )[0].innerText != "Approve all by grepInfo"
  ) {
    var approve_all_button = $(
      "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
    ).clone();
    approve_all_button.text("Approve all by grepInfo");

    approve_all_button.insertBefore(
      "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
    );

    $(
      "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
    ).click(function () {
      $(
        "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(2)"
      ).click();
    });
    // change all Approve buttons
    for (i = 0; i < count; i++) {
      document
        .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
        .querySelectorAll(".clearfix")
        [i].querySelectorAll("._4wsp._51xa")[0]["firstElementChild"].innerHTML =
        "Approve by grepInfo";
    }
  } else if (count == 1) {
    // change all Approve buttons
    for (i = 0; i < count; i++) {
      document
        .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
        .querySelectorAll(".clearfix")
        [i].querySelectorAll("._4wsp._51xa")[0]["firstElementChild"].innerHTML =
        "Approve by grepInfo";
    }
  } else return false;
  return true;
}

function scrap_all_mem_details() {
  console.log("Yoooo");
  var count = document
    .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
    .querySelectorAll(".clearfix").length;
  member_json = {};
  for (i = 0; i < count; i++) {
    var details_array = [];
    json = {};
    if (
      document
        .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
        .querySelectorAll(".clearfix")
        [i].querySelectorAll("._4wsr").length > 0
    ) {
      var details = document
        .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
        .querySelectorAll(".clearfix")
        [i].querySelectorAll("._4wsr")[0].innerText;
      details_array = details.split("\n");
    }
    json["groupId"] = window.location.pathname.match("groups/([^/]+)/")[1];
    json["profileName"] = document
      .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
      .querySelectorAll(".clearfix")
      [i].querySelectorAll("._66jq")[0].innerText;
    details_array.forEach((element, j) => {
      if (j % 2 == 0) {
        json[element] = details_array[j + 1];
      }
    });
    member_json[i] = json;
  }
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const options = {
    method: "POST",
    headers,
    mode: "cors",
    body: JSON.stringify(member_json),
  };
  fetch("https://ennqm0ktjblqj.x.pipedream.net/", options);
}
////////////////////////////////////////////////////////////////////
// window.addEventListener ("load", ()=>{
  var observer = new MutationObserver(function (mutations, observer) {
    if (document.getElementById("member_requests_pagelet")) {
      try {
        if (parseInt($("#count_badge_requests")[0].innerText) > 0) {
          if (
            document
              .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
              .querySelectorAll(".clearfix")[0]
              .querySelectorAll("._4wsp._51xa")[0]["firstElementChild"]
              .innerHTML == "Approve"
          ) {
            checkPageLoad();
          }
        }
      } catch (error) {}
    }
  });
  observer.observe(document, {
    subtree: true,
    characterData: true,
    attributes: true,
  });
  
  function checkPageLoad() {
    if (document.getElementById("member_requests_pagelet")) {
      if (change_buttons()) {
        scrap_all_mem_details();
      }
    } else {
      window.setTimeout(function () {
        checkPageLoad();
      }, 3000);
    }
  }
  
  function change_buttons() {
    // change Approve all button
    var count = document
      .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
      .querySelectorAll(".clearfix").length;
    if (
      $(
        "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
      )[0].innerText != "Approve all by grepInfo"
    ) {
      var approve_all_button = $(
        "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
      ).clone();
      approve_all_button.text("Approve all by grepInfo");
  
      approve_all_button.insertBefore(
        "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
      );
  
      $(
        "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(1)"
      ).click(function () {
        $(
          "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(2)"
        ).click();
      });
      // change all Approve buttons
      for (i = 0; i < count; i++) {
        document
          .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
          .querySelectorAll(".clearfix")
          [i].querySelectorAll("._4wsp._51xa")[0]["firstElementChild"].innerHTML =
          "Approve by grepInfo";
      }
    } else return false;
    return true;
  }
  
  function scrap_all_mem_details() {
    console.log("Yoooo");
    var count = document
      .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
      .querySelectorAll(".clearfix").length;
    member_json = {};
    for (i = 0; i < count; i++) {
      var details_array = [];
      json = {};
      if (
        document
          .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
          .querySelectorAll(".clearfix")
          [i].querySelectorAll("._4wsr").length > 0
      ) {
        var details = document
          .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
          .querySelectorAll(".clearfix")
          [i].querySelectorAll("._4wsr")[0].innerText;
        details_array = details.split("\n");
      }
      json["groupId"] = window.location.pathname.match("groups/([^/]+)/")[1];
      json["profileName"] = document
        .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
        .querySelectorAll(".clearfix")
        [i].querySelectorAll("._66jq")[0].innerText;
      details_array.forEach((element, j) => {
        if (j % 2 == 0) {
          json[element] = details_array[j + 1];
        }
      });
      member_json[i] = json;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    const options = {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(member_json),
    };
    fetch("https://ennqm0ktjblqj.x.pipedream.net/", options);
  }
  