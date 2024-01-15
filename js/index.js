document.addEventListener("DOMContentLoaded", function () {
    getUsers();
  });
  
  urlOne = "https://api.github.com/users/octocat/repos";
  
  function getUsers() {
    fetch(urlOne)
      .then((res) => res.json())
      .then((data) => {
        const userList = document.querySelector("#user-list");
        const form = document.getElementById("github-form");
  
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
  
         
          const searchInput = document.querySelector("#search");
          const search = searchInput.value.toLowerCase();
  
         
          let matchingUsers = [];
          let userExistence = false;
  
         
          for (const item of data) {
            const fullName = item.full_name.toLowerCase();
  
            if (fullName.includes(search)) {
              userExistence = true;
              
              matchingUsers.push(item);
            }
          }
  
          if (!userExistence) {
            alert(`User ${search} not found`);
          } else {
            
            userList.innerHTML = "";
  
        
            for (const item of matchingUsers) {
              const fullName = item.full_name;
              const avatarUrl = item.owner.avatar_url;
              const profileUrl = item.owner.html_url;
  
             
              const userContainer = document.createElement("div");
              userContainer.classList.add("user-container");
  
              const userAvatar = document.createElement("img");
              userAvatar.src = avatarUrl;
  
              const fullNameElm = document.createElement("p");
              fullNameElm.textContent = `Full Name: ${fullName}`;
  
              const profileLink = document.createElement("a");
              profileLink.href = profileUrl;
              profileLink.textContent = "View Profile";
  
              
              userContainer.addEventListener("click", async () => {
                
                const username = fullName.split("/")[0].trim();
                
                const userReposUrl = `https://api.github.com/users/${username}/repos`;
  
                try {
                 
                  const reposResponse = await fetch(userReposUrl);
                  const repos = await reposResponse.json();
  
                  
                  const reposContainer = document.createElement("div");
                  reposContainer.classList.add("repos-container");
  
                  repos.forEach((repo) => {
                    const repoNameElm = document.createElement("p");
                    repoNameElm.textContent = `Repository: ${repo.name}`;
  
                    const repoDescriptionElm = document.createElement("p");
                    repoDescriptionElm.textContent = `Description: ${
                      repo.description || "No description"
                    }`;
  
                    const repoUrlLink = document.createElement("a");
                    repoUrlLink.href = repo.html_url;
                    repoUrlLink.textContent = "View Repository";
  
                    const repoContainer = document.createElement("div");
                    repoContainer.classList.add("repo-container");
                    repoContainer.appendChild(repoNameElm);
                    repoContainer.appendChild(repoDescriptionElm);
                    repoContainer.appendChild(repoUrlLink);
  
                    reposContainer.appendChild(repoContainer);
                  });
  
                 
                  userContainer.appendChild(reposContainer);
                } catch (error) {
                  console.error("Error fetching repositories:", error);
                }
              });
  
             
              userContainer.appendChild(userAvatar);
              userContainer.appendChild(fullNameElm);
              userContainer.appendChild(profileLink);
  
              
              userList.appendChild(userContainer);
            }
  
            
            searchInput.value = "";
          }
        });
      });
  }