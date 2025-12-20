const api = async () => {
  try {
    const url = "http://localhost:3000/users";
    const response = await fetch(url);
const data = await response.json();
return data
  } catch (error) {
    throw new Error("Erro ao se conectar a api.");
  } finally {
    console.log("Api executanda.");
  }
};

  const  resultApi =  await api();
  // Cria uma lista ul
  const ul = document.createElement('ul');

  resultApi.data.forEach((user:{name:string,email:string,created_at:string})=>{
      const li = document.createElement("li");
      li.innerHTML  = `Name:${user.name} <br>  Email:${user.email} create_at:${user.created_at}`
      ul.appendChild(li)
      document.body.appendChild(ul)
  })
  console.log(resultApi)