/* eslint-disable no-undef */

$(document).ready(() => {
  $('#close-create').on('click', function() {
    window.history.back();
  });
  
  $('#resource-url').on('input', function() {
    const enteredUrl = $(this).val();
    const isYoutubeLink = checkYoutubeLink(enteredUrl);

    if (isYoutubeLink) {
      const youtubeId = getYoutubeId(enteredUrl);
      const previewUrl = getYoutubePreview(youtubeId)
      console.log(previewUrl);
      $('#resource-img-url').attr('src', previewUrl);
    }
  });

  $('#create-new-resource').on('click', function(event) {
    event.preventDefault();
    const title = $('#create-title').val();
    const img_url = $('#resource-img-url').val();
    const url = $('#resource-url').val();
    const description = $('#create-description').val();
    const category = $('#create-category').val();

    if (url === '') {
      $('#resource-url').attr('placeholder', 'Cannot be empty');
    }
    if (description === '') {
      $('#create-description').attr('placeholder', 'Cannot be empty');
    }
    if (category === '') {
      $('#create-category').attr('placeholder', 'Cannot be empty');
    }
    if (title === '') {
      $('#create-title').attr('placeholder', 'Cannot be empty');
    }
  
    if (url !== '' && description !== '' && category !== '' && title !== '') {
      const data = {
        title: title,
        img_url: img_url,
        url: url,
        description: description,
        category: category
      };

      $.ajax({
        url: '/create',
        method: 'POST',
        data: data,
        success: function(response) {
          console.log('POST request successful:', response);
          window.location.replace(`/resources/${response.id}`);
        },
        error: function(error) {
          console.log('POST request failed:', error);
        }
      });

    }
  });
  
});

function getYoutubePreview(videoId) {
  return 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
}

function checkYoutubeLink(url) {
  const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com)\//;
  //return true if the url match the pattern
  return youtubePattern.test(url);
}

function getYoutubeId(url) {
  const pattern = /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/vi\/|\/user\/\S+|\/videos\/|\/channels\/|\/playlist\/|\/[A-Za-z0-9_-]{11})([^\s\/\?]+)/;
  const match = url.match(pattern);
  return (match && match.length > 1) ? match[1] : null;
}
