const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getData(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyAIxAdFz4w0C_mzKlfj67kVkpgwO3Tf8oY',
    q: `${searchTerm} in:name`,
    per_page: 15,
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function onSubmit() {
  $('.searchForm').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.searchQuery');
    const query = queryTarget.val();
    queryTarget.val("");
    getData(query, displayData);
  });
}

function displayData(data) {
  console.log(data);
  const length_data = data.items.length;
  const thumbnails = [];
    const videoId = [];
    const description = [];
    $(".results").html(`<p aria-live="assertive">Your search returned ${length_data} results</p>`);
    for (i=0; i<length_data; i++) {
    let item = data.items[i]; 
    thumbnails.push(item.snippet.thumbnails.medium.url);
    videoId.push(item.id.videoId);
    description.push(item.snippet.description);
    $(".results").append(`<a href=https://www.youtube.com/watch?v=${videoId[i]}>
            <img src=${thumbnails[i]} class="thumbnails" alt="${description[i]}"></a>`);  
    }
  }

$(onSubmit);