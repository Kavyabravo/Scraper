/* global MutationObserver */
var observer = new MutationObserver(function (mutations, observer) {
  if (document.getElementById('member_requests_pagelet')) {
    try {
      if (
        parseInt(document.getElementById('count_badge_requests').innerText) > 0
      ) {
        checkPageLoad()
      }
    } catch (error) { }
  }
})
observer.observe(document, {
  subtree: true,
  characterData: true,
  attributes: true
})

function checkPageLoad () {
  if (
    document
      .querySelectorAll('#member_requests_pagelet ._3k4n._4-u3')[2]
      .querySelectorAll('.clearfix')[0]
      .querySelectorAll('._4wsp._51xa')[0]
  ) {
    if (document.getElementById('grepInfoIdentifier') === null) {
      // adding div as a checkmark to check if page has already loaded
      var div = document.createElement('div')
      div.id = 'grepInfoIdentifier'
      document
        .querySelector('#member_requests_pagelet ._3k4n._4-u3')
        .appendChild(div)
      // scraping member details
      scrapeMemDetails()
    }
  } else {
    window.setTimeout(function () {
      checkPageLoad()
    }, 3000)
  }
}

function scrapeMemDetails () {
  var count = parseInt(
    document.getElementById('count_badge_requests').innerText
  )
  var memberJson = {}
  for (var i = 0; i < count; i++) {
    var detailsArray = []
    var json = {}
    if (
      document
        .querySelectorAll('#member_requests_pagelet ._3k4n._4-u3')[2]
        .querySelectorAll('.clearfix')[i].querySelectorAll('._4wsr').length > 0
    ) {
      var details = document
        .querySelectorAll('#member_requests_pagelet ._3k4n._4-u3')[2]
        .querySelectorAll('.clearfix')[i].querySelectorAll('._4wsr')[0].innerText
      detailsArray = details.split('\n')
    }
    json.uid = document
      .querySelectorAll('#member_requests_pagelet ._3k4n._4-u3')[2]
      .querySelectorAll('.clearfix')[i].querySelectorAll('._66jq ._z_3')[0]
      .getAttribute('uid')
    json.requestTime = document
      .querySelectorAll('#member_requests_pagelet ._3k4n._4-u3')[2]
      .querySelectorAll('.clearfix')[i].querySelectorAll('._50f8 .livetimestamp')[0]
      .getAttribute('data-utime')
    json.groupId = window.location.pathname.match('groups/([^/]+)/')[1]
    json.profileName = document
      .querySelectorAll('#member_requests_pagelet ._3k4n._4-u3')[2]
      .querySelectorAll('.clearfix')[i].querySelectorAll('._66jq')[0].innerText
    detailsArray.forEach((element, j) => {
      if (j % 2 === 0) {
        json[element] = detailsArray[j + 1]
      }
    })
    memberJson[i] = json
  }
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const options = {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(memberJson)
  }
  fetch('https://ennqm0ktjblqj.x.pipedream.net/', options)
}
