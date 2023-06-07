/* eslint-disable no-undef */

$(document).ready(() => {
  //Allows users to like a resource
  $("like").ready(() => {
    const $like = $(".like");
    $like.on("click", function() {
      const url = window.location.href;
      const value = url.split('/')[4];
      if ($(this).hasClass('fa-solid')) {
        $(this).toggleClass('fa-solid');
        $.post(
          `${value}/like/remove`
        );
      } else {
        $(this).toggleClass('fa-solid');
        $.ajax({
          url: `${value}/like`,
          method: "POST",
          success: function() {
            loadLikes();
          }
        });
      }
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
      const url = window.location.href;
      const value = url.split('/')[4];
      const data = $siblings.length + 1;
      $.post(
        `${value}/rate`,
        {data: data},
      )
        .done(() => {
          loadRating();
        });
    });
  });
});

const loadRating = () => {
  const url = window.location.href;
  const value = url.split('/')[4];
  $.ajax({
    url: `${value}/rate`,
    method: "GET",
  })
    .done(res => {
      $(".rating").text(res.average_rating);
    });
};


const loadLikes = () => {
  const url = window.location.href;
  const value = url.split('/')[4];
  $.ajax({
    url: `${value}/like`,
    method: "GET",
  })
    .done(res => {
      $(".likes").text(res.like_count);
    });
};
