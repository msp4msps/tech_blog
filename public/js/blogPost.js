let postId;

const createHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-name").value;
  const content = document.querySelector("#post-content").value;

  if (title && content) {
    const response = await fetch(`/api/blogPost`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const delBtnHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const prompt = confirm("Are you sure?");
    if (prompt) {
      const response = await fetch(`/api/blogPost/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post");
      }
    }
  }
};

const getcontentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-update")) {
    const id = event.target.getAttribute("data-update");

    postId = id;

    const response = await fetch(`/api/blogPost/${id}`);

    const postData = await response.json();

    document.querySelector("#post1-content").value = postData.content;
    document.querySelector("#post1-name").value = postData.title;

    return postData;
  }
};

const uptateBtnhandler = async (event) => {
  if (event.target.hasAttribute("data-put")) {
    const content = document.querySelector("#post1-content").value;
    const title = document.querySelector("#post1-name").value;

    const response = await fetch(`/api/BlogPost/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to send final post update");
    }
  }
};

document
  .querySelector("#create-button")
  .addEventListener("click", createHandler);

document.querySelector(".blog-posts").addEventListener("click", delBtnHandler);

document
  .querySelector(".blog-posts")
  .addEventListener("click", getcontentHandler);

document
  .querySelector("#update-button")
  .addEventListener("click", uptateBtnhandler);
