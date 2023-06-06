/* eslint-disable no-undef */
$(document).ready(() => {
  //Allows users to like a resource
  $("like").ready(() => {
    const $like = $(".like");
    $like.on("click", function() {
      $(this).toggleClass('fa-solid');
    });
  });

  //Allows a user to rate a resource
  $("star").ready(() => {
    const $star = $(".star");
    $star.on("click", function() {
      const $siblings = $(this).prevAll();
      $(this).toggleClass('fa-solid');
      for (sibling of $siblings) {
        $(sibling).toggleClass('fa-solid');
      }
    });
  });
});
