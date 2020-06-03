//chrome.runtime.sendMessage({ todo: "showfb" });

var selector = document.querySelector(
  "#groupsUnifiedQueueLHCTabs > div > ul > li:nth-child(4) > div > a"
);

selector.addEventListener("click", checkPageLoad());
function checkPageLoad() {
  if (document.getElementById("member_requests_pagelet")) {
    change_buttons();
  } else {
    window.setTimeout(function () {
      checkPageLoad();
    }, 3000);
  }
}

function change_buttons() {
  request_count = document
    .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
    .querySelectorAll(".clearfix").length;
  // change Approve all button
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
    scrap_all_mem_details(request_count);
    $(
      "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(2)"
    ).click();
    console.log(
      $(
        "#member_requests_pagelet ._3k4n._4-u3:nth-child(1) .clearfix ._51xa button:nth-child(2)"
      )
    );
  });

  // change all Approve buttons
  for (i = 0; i < request_count; i++) {
    document
      .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
      .querySelectorAll(".clearfix")
      [i].querySelectorAll("._4wsp._51xa")[0]["firstElementChild"].innerHTML =
      "Approve by grepInfo";

    // when clicks on approve button
    document
      .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
      .querySelectorAll(".clearfix")
      [i].querySelectorAll("._4wsp._51xa")[0]
      ["firstElementChild"].addEventListener("click", function (e) {
        send_details(e);
      });
  }
}

function send_details(e) {
  for (i = 0; i < request_count; i++) {
    if (
      e["path"][0] ==
      document
        .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
        .querySelectorAll(".clearfix")
        [i].querySelectorAll("._4wsp._51xa")[0]["firstElementChild"]
    ) {
      scrap_details(i);
      break;
    }
  }
}

function scrap_details(i) {
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
    console.log(details);
    details_array = details.split("\n");
    console.log(details_array);
  }
  json["groupId"] = window.location.pathname.match("groups/([^/]+)/")[1];
  console.log(json.groupId);
  json["profileName"] = document
    .querySelectorAll("#member_requests_pagelet ._3k4n._4-u3")[2]
    .querySelectorAll(".clearfix")
    [i].querySelectorAll("._66jq")[0].innerText;
  details_array.forEach((element, j) => {
    if (j % 2 == 0) {
      json[element] = details_array[j + 1];
    }
  });
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const options = {
    method: "POST",
    headers,
    mode: "cors",
    body: JSON.stringify(json),
  };
  fetch("https://ennqm0ktjblqj.x.pipedream.net/", options);
}

function scrap_all_mem_details(count) {
  member_json = {};
  for (i = 0; i < count; i++) {
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
      console.log(details);
      details_array = details.split("\n");
      console.log(details_array);
    }
    json["groupId"] = window.location.pathname.match("groups/([^/]+)/")[1];
    console.log(json.groupId);
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
