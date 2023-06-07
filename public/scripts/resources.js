/* eslint-disable no-undef */

$(document).ready(() => {
  //Allows users to like a resource
  $("like").ready(() => {
    const $like = $(".like");
    $like.on("click", function() {
      $(this).toggleClass('fa-solid');
      const url = window.location.href;
      const value = url.split('/')[4];

      $.post(
        `${value}/like`
      );
    });
  });

  //Allows a user to rate a resource
  $("star").ready(() => {
    const $star = $(".star");
    $star.on("click", function() {
      $star.siblings().toggleClass('fa-solid',false);
      const $siblings = $(this).prevAll();
      $(this).toggleClass('fa-solid');
      for (sibling of $siblings) {
        $(sibling).toggleClass('fa-solid');
      }
    });
  });
});
