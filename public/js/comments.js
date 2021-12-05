const createHandler = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector("#commentBody").value;

  if (commentBody) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ commentBody }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create post");
    }
  }
};

let commentID;
const getComment = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-update")) {
    const id = event.target.getAttribute("data-update");
    const response = await fetch(`/api/comments/${id}`);
    console.log(response);

    // const commentData = await response.json();
    // console.log(commentData);

    // document.querySelector("#comment-content").value = commentData.commentBody;

    // return commentData;
  }
};

document.querySelector(".comments123").addEventListener("click", getComment);
document.querySelector("#newComment").addEventListener("submit", createHandler);
