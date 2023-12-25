const refs = {
  body: document.querySelector("body"),
  input: document.querySelector("input"),
  confirmBtn: document.querySelector(".confirm-btn"),
  postsBlock: document.querySelector(".posts-block"),
};

const URL = "https://jsonplaceholder.typicode.com/posts";

refs.confirmBtn.addEventListener("click", () => {
  const inputValue = refs.input.value;
  if (
    inputValue >= 1 &&
    inputValue <= 100 &&
    inputValue != "" &&
    isNaN(inputValue) != true
  ) {
    getFile(`${URL + "/" + inputValue}`)
      .then((data) => createPost(data))
      .catch((err) => console.log(err));
  }
});

async function getFile(url) {
  let request = await fetch(url);
  let response = request.ok
    ? request.json()
    : Promise.catch(request.statusText);

  return response;
}

function createPost(post) {
  const postBlock = document.createElement("div");
  postBlock.classList.add("post");
  postBlock.innerHTML = `<h2 class="post-block__title">${post.title}</h2>
  <p class="post-block__text">${post.body}</p>`;

  const button = document.createElement("button");
  button.classList.add("comments-btn");
  button.textContent = "Add comments";
  postBlock.append(button);

  button.addEventListener("click", (event) => {
    getFile(`${URL + "/" + post.id + "/" + "comments"}`)
      .then((data) => addComments(data, postBlock))
      .catch((err) => console.log(err));

    event.target.remove();
  });

  refs.postsBlock.append(postBlock);
}

function addComments(comments, postBlock) {
  console.log(comments);
  console.log(comments[0].body);
  const list = document.createElement("ul");
  comments.forEach((comment) => {
    const listItem = document.createElement("li");
    listItem.textContent = comment.body;
    list.append(listItem);
  });
  postBlock.append(list);
}
