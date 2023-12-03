
document.getElementById('finalizeButton').addEventListener('click', function() {

  var spinner = document.querySelector('.spinner');
  spinner.classList.remove('hidden');
  setTimeout(function() {
    revealHiddenSection();
  }, 10000); 

});

function revealHiddenSection() {

   var spinner = document.querySelector('.spinner');
  spinner.classList.add('hidden');
  
  var hiddenSection = document.querySelector('.hiddenSection');
  hiddenSection.style.display = 'block';

 

  hiddenSection.scrollIntoView({ behavior: 'smooth' });
  var audio = document.getElementById('audioPlayer');
  audio.play();
}