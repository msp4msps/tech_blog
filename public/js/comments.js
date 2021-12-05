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

document.querySelector("#newComment").addEventListener("submit", createHandler);
