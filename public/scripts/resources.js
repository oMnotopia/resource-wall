/* eslint-disable no-undef */

$(document).ready(() => {

  //Allows users to like a resource
  $("like-icon").ready(() => {
    const $like = $("#like-icon");
    $like.on("click", function() {
      const url = window.location.href;
      const value = url.split('/')[4];
      if (($like).hasClass('fa-solid')) {
        $.ajax({
          url: `${value}/like/remove`,
          method: "POST",
          success: function() {
            loadLikes();
          }
        });
        $(this).removeClass('fa-solid');
        $(this).addClass('fa-regular');
      } else {
        $.ajax({
          url: `${value}/like`,
          method: "POST",
          success: function() {
            loadLikes();
          },
          error: function() {
            window.location.href = '/error';
          }
        });
        $(this).addClass('fa-solid');
        $(this).removeClass('fa-regular');
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
      $(this).addClass('star-bg-colour');
      for (sibling of $siblings) {
        $(sibling).addClass('star-bg-colour');
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
        })
        .fail(() => {
          window.location.href = '/error';
        });
    });
  });
});

//Reloads rating component
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

//Reloads like component
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
