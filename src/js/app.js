import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "position-right", // social media bar position (position-left or position-right)
        //for social media links, only update usernames
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}, debug = true) {
  if (debug) {
    console.log("These are the current variables", variables);
  }

  const displayValues = getDisplayValues();

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${renderCover()}
      <img src="${displayValues.avatarURL}" class="photo" />
      <h1>${displayValues.name} ${displayValues.lastName}</h1>
      <h2>${displayValues.role}</h2>
      <h3>${displayValues.city}, ${displayValues.country}</h3>
      ${renderSocialMedia()}
    </div>
  `;

  function getDisplayValues() {
    const defaultSocialMediaUsername = "4geeksacademy";
    return {
      includeCover: variables.includeCover,
      background: variables.background,
      name: variables.name || "Name",
      lastName: variables.lastName || "Last Name",
      role: variables.role || "Web Developer",
      country: variables.country || "Country",
      city: variables.city || "City",
      avatarURL: variables.avatarURL,
      socialMediaPosition: variables.socialMediaPosition,
      twitter: variables.twitter || defaultSocialMediaUsername,
      github: variables.github || defaultSocialMediaUsername,
      linkedin: variables.linkedin || defaultSocialMediaUsername,
      instagram: variables.instagram || defaultSocialMediaUsername
    };
  }

  function renderCover() {
    if (!displayValues.includeCover) {
      return `<div class="cover"></div>`;
    }

    return `
      <div class="cover">
        <img src="${displayValues.background}" />
      </div>
    `;
  }

  function renderSocialMedia() {
    return `
      <ul class="${displayValues.socialMediaPosition}">
        <li>
          <a href="https://twitter.com/${displayValues.twitter}">
            <i class="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/${displayValues.github}">
            <i class="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/school/${displayValues.linkedin}">
            <i class="fab fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/${displayValues.instagram}">
            <i class="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
    `;
  }
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (position-left or position-right)
    socialMediaPosition: "position-right",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
