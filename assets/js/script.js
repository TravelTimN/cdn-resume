// Google Maps for "interests.html"
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: {
            lat: 53.554564,
            lng: -7.757595
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
        { lat: 53.346925, lng: -6.306470 },
        { lat: 53.341396, lng: -6.249129 },
        { lat: 53.338981, lng: -6.261951 },
        { lat: 52.123733, lng: -6.929418 },
        { lat: 51.929094, lng: -8.570950 },
        { lat: 52.138341, lng: -10.270777 },
        { lat: 52.971664, lng: -9.430907 },
        { lat: 54.002478, lng: -7.399948 },
        { lat: 54.055402, lng: -7.394841 }
    ];

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
};

// GitHub username fetch for "github.html"
function userInformationHTML(user) {
    return `
        <h3>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h3>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}">
                </a>
            </div>
            <p>Followers: <b>${user.followers}</b> <br> Following: <b>${user.following}</b> <br> Repos: <b>${user.public_repos}</b></p>
        </div>`;
};

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos found!</div>`;
    }
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`
};

function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h4>Please enter a GitHub username</h4>`);
        return;
    }
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/images/octocat.gif" alt="..loading..." style="width:175px;">
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h3>No info found for user ${username}</h3>`);
            } else if(errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(
                    `<h4 style="color:red;">Too many requests!
                        <br>
                        Please wait until:
                        <br><br>
                        <h3>
                            <mark style="color:red;background-color:rgba(255, 255, 0, 0.5);">${resetTime.toLocaleTimeString()}</mark>
                        </h3>
                    </h4>
                    <br><br>`
                );
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h3>Error: ${errorResponse.responseJSON.message}</h3>`);
            }
        }
    );
};

$(document).ready(fetchGitHubInformation);


// EMAIL.js
function sendMail(contactForm) {
    emailjs.init("user_RJTzsfaVO84Ek8tbUFlSn");
    emailjs.send("gmail", "code_institute_rosie", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            alert("Success", response);
        },
        function(error) {
            alert("Failed", error);
        }
    );
    return false;
}

