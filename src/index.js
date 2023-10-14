const funcio = async () => {
  try {
    const response = async () => {
      const result = await axios.get(`https://api.waifu.im/search`, {
        params: {
          many: true,
        },
      });

      let imagen = "";
      let num = 0;
      let imageurl = "";
      
      result.data.images.forEach((element) => {
        
        if (num <= 10) {
          imageurl = element.url;
          imagen =
            imagen +
            `<div class="w-[300px] h-full relative rounded-lg flex-col my-12 overflow-hidden group transition border-2 border-red-500 shadow-md mx-3">
               <div class="relative bg-auto ">
                   <div class="w-full h-full bg-slate-800 group-hover:blur-[2px] ">
                       <img id="${element.url}" src="${element.url}" alt="${num}">
                       
                   </div>
                   <div class="absolute top-6 -right-11 group-hover:right-0 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300">
                           <button class="bg-red-600 p-4 rounded-md text-white"><svg class="i i-heart" viewBox="0 0 24 24"><path d="m12 21-8.8-8.3A5.6 5.6 0 1 1 12 6a5.6 5.6 0 1 1 8.9 6.6z"></path></svg></button>
                           <a download= "${element.image_id}" href="${imageurl}" class="bg-fuchsia-50 p-4 rounded-md"><svg class="i i-upload" viewBox="0 0 24 24"><path d="m7 8 5-5 5 5m-5 7V3m10 12v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4"></path></svg></a>
                          
                   </div>
               </div>
              
           </div>
           `;
    
        }
        num++;
        
      });
      
      document.getElementById("contenedor").innerHTML = imagen;
      return result
    };
    response()
    console.log(response())
    const contenedor = document.getElementById("contenedor");

    contenedor.addEventListener("click", async (e) => {
      const ventana = document.getElementById("ventana");
      let contenedor = document.getElementById("contenedor");
      const click_id = e.target.id;
      const num_data = e.target.alt;

      const data = await response()
      const data_converter = JSON.stringify(data)
      console.log(data_converter);
      contenedor.classList.toggle("hidden");
      ventana.classList.toggle("h-full");
      // const id = result.data.images[0].artist.artist_id;
       
      let validate_data;
      let twitter;
      let pixiv;
      let enlace;
      let source;

      if (data.data.images[num_data].artist === null) {
        validate_data,twitter,pixiv = "No encontrado";
      } else {
        validate_data = data.data.images[num_data].artist.name;
        twitter = undefined ? "No encontrado" : data.data.images[num_data].artist.twitter;
        pixiv = undefined ? "No encontrado" :data.data.images[num_data].artist.pixiv;
        enlace = undefined ? "No encontrado" : data.data.images[num_data].url;
        source = data.data.images[num_data].artist.source;
      }
      const url = click_id;
      const mostrar = ` 

      <div class="flex space-y-5 max-w-5xl mt-12 justify-center flex-wrap bg-slate-600 rounded-xl  h-[200px] sm:h-[300px] mx-auto w-[400px]">
      <div class="flex-col flex w-full">
        <div class="flex mx-auto">
          <span class="text-white text-sm sm:text-xl mb-7">INFORMACION</span>
        </div>
        <div class="flex flex-col space-y-3">
          <span class="text-white text-sm sm:text-base">Artist: <span class="text-red-500 text-sm sm:text-xl underline "> ${validate_data}</span></span>
         
            <span class="text-white text-sm sm:text-base ">Twitter: <a href= "${twitter}" class="text-red-500 underline text-sm sm:text-xl "> ${twitter}</a></span>
            <span class="text-white text-sm sm:text-base">Pixiv: <a href= "${pixiv}" class="text-red-500  underline text-sm sm:text-xl "> ${pixiv}</a></span>
            <span class="text-white text-sm sm:text-base">Enlace: <a href= "${enlace}" class="text-red-500  underline text-sm sm:text-xl "> ${enlace}</a></span>

        </div>
        
      </div>
    </div>
   
        <div class="w-[400px] sm:w-[600px] h-full relative rounded-lg flex-col my-12 overflow-hidden group transition border-2 border-red-500 shadow-md mx-auto">
               <div class="relative bg-auto ">
                   <div class="w-full h-full bg-slate-800 group-hover:blur-[2px] ">
                       <img id="${url}" src="${url}" alt="">
                       
                   </div>
                   <div class="absolute top-5 -right-11 group-hover:right-0 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300">
                           <button class="bg-red-600 p-4 rounded-md text-white"><svg class="i i-heart" viewBox="0 0 24 24"><path d="m12 21-8.8-8.3A5.6 5.6 0 1 1 12 6a5.6 5.6 0 1 1 8.9 6.6z"></path></svg></button>
                           <a download="image" href="${url}" class="bg-fuchsia-50 p-4 rounded-md"><svg class="i i-upload" viewBox="0 0 24 24"><path d="m7 8 5-5 5 5m-5 7V3m10 12v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4"></path></svg></a>
                          
                   </div>
               </div>
              
           </div>
           

    `;
      console.log(mostrar);
      document.getElementById("mostrar").innerHTML += mostrar;
    });
  } catch (error) {
    console.log(error);
  }
};
funcio();
