const header = `
<div class="header">
    <div class="logoContainer">
      <div class="logoBox">
        <h1 class="logo"><i><span class="name">MACHINE</span> MINDMAPS</i></h1>
      </div>
    </div>
    <div class="navbar">
      <ul class="pages">
        <li><a href="Home.html">Home</a></li>
        <li><a href="Data-Structure.html">Data Structure</a></li>
        <li><a href="Sorting.html">Sorting Algorithms</a></li>
        <li><a href="About-Us.html">Our Story</a></li>
      </ul>
    </div>
  </div>
`;
const headerpart = document.createElement('div');

headerpart.innerHTML = header;

document.body.appendChild(headerpart);

function toggleNav() {
    const nav = document.getElementById('navbar');
    const crossBtn = document.querySelector('.cross-btn');
    const togglebtn = document.querySelector('.toggle-icon');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    // crossBtn.style.display = crossBtn.style.display === 'block' ? 'none' : 'block';
    togglebtn.style.display = togglebtn.style.display === 'none' ? 'block' : 'none';
}