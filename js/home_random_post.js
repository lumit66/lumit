hexo.extend.generator.register('thePosts', function (locals) {
  const jsonData = locals.posts
    .filter(post => post.random !== false)
    .map(post => {
      return {
        title: post.title || "暂无标题",
        abbrlink: post.abbrlink,
        cover: post.cover,
        description: post.description || "暂无简介"
      };
    });

  return {
    path: 'random.json',
    data: JSON.stringify(jsonData)
  };
});

function getRandomElementsFromArray(arr, num) {
  const totalElements = arr.length;
  const selectedElements = new Set();
  while (selectedElements.size < num) {
    const randomIndex = Math.floor(Math.random() * totalElements);
    selectedElements.add(arr[randomIndex]);
  }
  return Array.from(selectedElements);
}
function renderingPosts(data){
  const randomElements = getRandomElementsFromArray(data, 6);
  const postsHtml = randomElements.map((i) => `
    <div class="top_post_item">
      <div class="post_cover">
        <a href="/article/${i.abbrlink}.html" title="${i.title}">
          <img class="post_bg entered loaded" src="${i.cover}" alt="${i.title}" data-no-lazy>
          <div class="post_cover_info">
            <p class="post_cover_text">${i.description}</p>
          </div>
        </a>
      </div>
      <div class="post_info" onclick="window.open('/article/${i.abbrlink}.html', '_self')">
        <a class="article-title" href="/article/${i.abbrlink}.html" title="${i.title}">${i.title}</a>
      </div>
    </div>`).join('');
  document.querySelector("#homeTopGroup>.top_post_group").innerHTML = postsHtml
}
if(!sessionStorage.getItem("postsInfo")){
  fetch("/random.json")
  .then(res=>res.json())
  .then(data=>{
    console.log(1);
    sessionStorage.setItem("postsInfo", JSON.stringify(data));
    renderingPosts(data);
  })
}else{
  renderingPosts(JSON.parse(sessionStorage.getItem("postsInfo")));
}

