document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    update('contact');
});

function update(item){
// var arrItems= {
//   'about':'test1',
//   'proj':'test2',
//   'skills':'test3',
//   'fun':'test4',
//   'don':'test5'
// };
//console.log(arrItems);
// var infoElement = document.getElementById("update");
// console.log(infoElement);
// infoElement.html(arrItems.item);
var parent = document.getElementById("update");
if(item=='contact'){
  parent.innerHTML = `
  <h3>Contacts</h3>
    <ul>
      <li><a href="mailto:gavelyukworking@gmail.com">gavelyukworking@gmail.com</a></li>
      <li><a href="https://www.instagram.com/gavelyuk/">https://instagram.com/gavelyuk/</a></li>
      <li><a href="https://twitter.com/EvilEpicCoder">https://twitter.com/EvilEpicCoder</a></li>
      <li><a href="http://www.freecodecamp.com/evilepiccoder">http://freecodecamp.com/evilepiccoder</a></li>
      <li><a href="http://www.facebook.com/igor.gavelyuk">http://facebook.com/igor.gavelyuk</a></li>
      <li><a href="http://vk.com/evilepiccoder">http://vk.com/evilepiccoder</a></li>
    </ul>
  `;
}else if(item=='proj'){
  parent.innerHTML = `
  <h3>Projects</h3>
    <ul>
      <li><a href="https://github.com/BrotherhoodOfEden">https://github.com/BrotherhoodOfEden</a></li>
      <li><a href="https://github.com/EvilEpicCoder">https://github.com/EvilEpicCoder</a></li>
    </ul>
    <a href="https://codepen.io/EvilEpicCoder/full/MvZeXL/">Weather</a>
    <a href="https://codepen.io/EvilEpicCoder/full/ZXEXZM/">Wikipedia</a>
    <a href="https://codepen.io/EvilEpicCoder/full/RLrzBX/">Pomodoro Clock</a>
  `;
  return true;
}else if(item=='skill'){
  parent.innerHTML = `
  <h3>Skill area</h3>
  <ul>
    <li><a href="https://en.wikipedia.org/wiki/JavaScript">JavaScript</a></li>
    <li><a href="https://en.wikipedia.org/?curid=7966125">HTML5</a></li>
    <li><a href="https://en.wikipedia.org/?curid=23290197">CSS3</a></li>
    <li><a href="https://en.wikipedia.org/wiki/Web_server">Hosting</a></li>
    <li><a href="https://en.wikipedia.org/?curid=605856">Wordpress</a></li>
    <li><a href="https://www.deviantart.com/">I love deviant art</a></li>
  </ul>
  `;
  return true;
}else if(item=='fun'){
  parent.innerHTML = `
  <h3>Youtube</h3>
  <ul>
    <li><a href="https://www.youtube.com/channel/UCAs-ACerAWoh51EIbvdVIew?view_as=subscriber">My Channel</a></li>
    <li><a href="https://www.youtube.com/channel/UC5FOycKBG1f3QQ5aXWaGGSQ/videos?view=0&flow=grid">Mech warrior youtube channel</a></li>
  </ul>
  `;
  return true;
}else if(item=='don'){
  parent.innerHTML = `
  <h3>Donation</h3>
  <ul>
    <li><a href="https://codepen.io/EvilEpicCoder/full/EoJzQm/">Go to CPU mining page</a></li>
    <li><a href="https://www.patreon.com/bePatron?u=8582657" data-patreon-widget-type="become-patron-button">Become a Patron!</a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script></li>
  </ul>

  `;
  return true;
}else{

}



console.log("Done");
}
