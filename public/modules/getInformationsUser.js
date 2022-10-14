export async function getInformationsUser() {
    const userName = document.getElementById("name-user-all");
    const userNameModal = document.getElementById("name-user-modal");

    const res = await fetch('/user/', {
        method: 'GET',
      });
      
      const infoName = await res.json();

      userName.innerHTML = infoName.name;
      userNameModal.innerHTML = infoName.name; 
}