$(document).ready(function() {
  setCurrentProject(0);
  document.getElementsByClassName("totalProjects")[0].innerHTML = Object.keys(projectList).length;
  
  $(window).scroll(function() { //Listen for the window's scroll event
      if (isScrolledAfterElement("#homeContainer")) { //if it has scrolled beyond the #content elment
        $('.header').fadeOut(); //hide the navigation bar
      } else {
        $('.header').fadeIn(); //Else show it
      }
    });

  //Function that returns true if the window has scrolled beyond the given element
  function isScrolledAfterElement(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;

    return elemTop < docViewTop;
  }

  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.children[0].children[0].children[0].animate([{
          opacity: '0',
          transform: 'translateY(30%)', // Start from the current position
        },
        {
          opacity: '1',
          transform: 'translateY(0)', // Slide out to the right (adjust the value as needed)
        }], {
          duration: 2000,
          iterations: 1,
          easing: 'ease-in-out'
        });
        entry.target.children[0].children[0].children[1].animate([{
          opacity: '0',
          transform: 'translateX(-30%)', // Start from the current position
        },
        {
          opacity: '1',
          transform: 'translateX(0)', // Slide out to the right (adjust the value as needed)
        }], {
          duration: 2000,
          iterations: 1,
          easing: 'ease-in-out'
        })
        
        // observer.unobserve(entry.target); // Stop observing once animation is applied
      }
    });
  }
  
  const projectSection = document.getElementById('projects');
  const options = {
    threshold: 0.2 // Adjust as needed, represents the percentage of the target element that must be visible to trigger the callback
  };
  
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(projectSection);
});

function openProject(id, projectName){
  setCurrentProject(id);
    console.log("function openProject() called");
    var elements = document.getElementsByClassName("projectLinkLi");
      for(var i=id; i<elements.length; i++){
        elements[i].animate([{
        opacity: '1',
        transform: 'rotate3d(0, 1, 0, -45deg) translateZ(0) scale(1)'
        
      },
     {
        opacity: '0',
        transform: 'rotate3d(0, 1, 0, 180deg) translateZ(0) scale(1)'
      }], {
        duration: 1500,
        iterations: 1,
        delay: (i-id+1) * 100
      
      });
    }
    for(var i=0; i<id; i++){
      elements[i].animate([{
      opacity: '1',
      transform: 'rotate3d(0, 1, 0, -45deg) translateZ(0) scale(1)'
      
    },
   {
      opacity: '0',
      transform: 'rotate3d(0, 1, 0, 180deg) translateZ(0) scale(1)'
    }], {
      duration: 1500,
      iterations: 1,
      delay: (id) * 100
    
    });
  }

}

function delay (URL) {
    setTimeout( function() { window.location = URL;
      }, 500 );
   
}

function openTab(tabDetailContainer, tab) {
  var x = document.getElementsByClassName("project-tab");
  for (var i = 0; i < x.length; i++) {
    if(x[i]==tab){
      x[i].classList.add("selected-tab");
      x[i].classList.remove("unselected-tab") 
    }
    else{
    x[i].classList.add("unselected-tab");
    x[i].classList.remove("selected-tab") 
    }
     
  }
  var x = document.getElementsByClassName("tab-detail");
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 

  }
  document.getElementById(tabDetailContainer).style.display = "flex";  
}

document.addEventListener('DOMContentLoaded', function () {
  const allSections = document.querySelectorAll('section');
  const viewportHeight = window.innerHeight;
  
  let scrolling = false;
  let scrollTimeout = null;
  
  window.addEventListener('scroll', () => {
      scrolling = true;
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
          if (scrolling) {
              const scrollY = window.scrollY;
              let closestDistance = Infinity;
              let closestSection = null;

              allSections.forEach((section) => {
                  const rect = section.getBoundingClientRect();
                  const distance = Math.abs(rect.top);

                  if (distance < closestDistance && distance <= viewportHeight / 2) {
                      closestDistance = distance;
                      closestSection = section;
                  }
              });

              if (closestSection) {
                  closestSection.scrollIntoView({ behavior: 'smooth'});
              }

              scrolling = false;
          }
      }, 500); // Adjust the timeout duration as needed
  });
});

var projectList = {
  ChatUp : {
      Heading : "Chat Up",
      projectImage : "18.jpg",
      projectLiveLink : "",
      Description : "A Console-Based Two-Way Chat Application that follows a TCP/UDP Connection between two users with the functionality of file data transfer, an  auto connection of sockets between the user and end application in absence of the receiver",
      TechUsed : ["css", "html", "python"],
      LastUpdatedOn : "",
      githubLink : "https://github.com/kingpingx/Chat-Chat"
  },
  EduCare : {
    Heading : "Edu-care",
    projectImage : "18.jpg",
    projectLiveLink : "",
    Description : "A Django-based web application to provide primary education using an ML Model is based on a Convolutional neural network to help children learn to write alphabets and numbers using freestyle hand movements.",
    TechUsed : ["django", "css", "html", "python"],
    LastUpdatedOn : "",
    githubLink : "https://github.com/kingpingx/Edu-care"
  },
  Avekshaka : {
    Heading : "Avekshaka",
    projectImage : "18.jpg",
    projectLiveLink : "",
    Description : "It is a website created as an extension of its Mobile Application that is designed for people suffering from Alzheimers. This website is used to ease the sign-up process, update profiles, and handle app crashes and other situations. APIs are also created using REST API to connect it to Mobile applications.",
    TechUsed : ["css", "html", "python"],
    LastUpdatedOn : "",
    githubLink : "https://github.com/kingpingx/imagine"
  },
  CampusTube : {
    Heading : "Campus Tube",
    projectImage : "18.jpg",
    projectLiveLink : "",
    Description : "It is an Edutainment website like YouTube developed for School Students with functionalities like User Authentication, Video Uploading, Video System, Search Engine, and Credit Point System",
    TechUsed : ["django", "css", "html", "python"],
    LastUpdatedOn : "",
    githubLink : ""
  },
  Vizit : {
    Heading : "Vizit",
    projectImage : "18.jpg",
    projectLiveLink : "",
    Description : "",
    TechUsed : ["css", "html", "python"],
    LastUpdatedOn : "",
    githubLink : ""
  }, 
  Speech2Text : {
    Heading : "Speech2Text",
    projectImage : "18.jpg",
    projectLiveLink : "",
    Description : "Its a Speech Converting Application that uses GTTS Module, PyDub Module and Speech Recoginition Library. It can listen to any sound and convert it and also takes audio file and reads it too.",
    TechUsed : ["django", "css", "html", "python"],
    LastUpdatedOn : "",
    githubLink : "https://github.com/kingpingx/Text2Speech-Speech2Text"
  },
  TheCodersBank : {
    Heading : "The Coder's Bank",
    projectImage : "18.jpg",
    projectLiveLink : "",
    Description : "A Dummy Banking System with functionalities like Login, Logout, Transfer to other accounts, Transaction History, Add Money To User using Django as Backend and MsSQL as Database.",
    TechUsed : ["css", "html", "python"],
    LastUpdatedOn : "",
    githubLink : "https://github.com/kingpingx/Basic-Banking-System"
  },
  BouncingBall : {
    Heading : "Bouncing Ball",
    projectImage : "18.jpg",
    projectLiveLink : "",
    Description : "A Python (turtle) project using concept of Coordinate geometry",
    TechUsed : ["django", "css", "html", "python"],
    LastUpdatedOn : "",
    githubLink : "https://github.com/kingpingx/Bouncing-Ball"
  }
}

function setProjectDetails(){
  document.getElementsByClassName("selectedProjectIndex")[0].innerHTML = currentProjectIndex+1;
  document.getElementsByClassName("project-image")[0].style.backgroundImage = currentProject.projectImage;
  document.getElementsByClassName("project-heading")[0].innerHTML = currentProject.Heading;
  document.getElementsByClassName("project-live-link")[0].innerHTML = currentProject.projectLiveLink;
  var x = document.getElementById("Description");
  // x.children[0].innerHTML = currentProject.Heading;
  x.children[0].innerHTML = currentProject.Description;
  var techListDiv = document.getElementById("TechUsed");
  var techUsedArray = currentProject.TechUsed;
  techListDiv.innerHTML = '';
  techUsedArray.forEach(function (tech) {
      var span = document.createElement("span");
      span.classList.add("techspan");
      span.textContent = tech;
      techListDiv.appendChild(span);
  });
  document.getElementsByClassName("project-date")[0].innerHTML = currentProject.LastUpdatedOn;
  document.getElementsByClassName("project-github-repo-link")[0].innerHTML = currentProject.Heading;
  document.getElementsByClassName("project-github-repo-link")[0].href = currentProject.githubLink;
  
}

var currentProjectIndex = 0;

function previousProject() {
   var container = document.getElementsByClassName("project-container")[0];
    var headingcontainer = document.getElementsByClassName("project-heading")[0];
    var bgEnhancerContainer = document.getElementById("project-view");
    
    headingcontainer.animate([{
      opacity: '1',
      transform: 'translateX(0)', // Start from the current position
    },
    {
      opacity: '0',
      transform: 'translateX(10%)', // Slide out to the right (adjust the value as needed)
    }], {
      duration: 500,
      iterations: 1,
      easing: 'ease-in-out'
    });

    container.animate([{
      opacity: '1',
    },
    {
      opacity: '0.7',
    }], {
      duration: 500,
      iterations: 1,
      easing: 'ease-in-out'
    });
    bgEnhancerContainer.animate([{
      opacity: '1',
      transform: 'translateX(40%)', // Start from the current position
    },
    {
      opacity: '0',
      transform: 'translateX(0%)', // Slide out to the right (adjust the value as needed)
    }], {
      duration: 800,
      iterations: 1,
      easing: 'ease-in-out'
    });

  setTimeout(()=>{
    setCurrentProject((currentProjectIndex - 1 + Object.keys(projectList).length) % Object.keys(projectList).length)
    }, 400);
  
}

function nextProject() {
    var headingcontainer = document.getElementsByClassName("project-heading")[0];
    var container = document.getElementsByClassName("project-container")[0];
    var bgEnhancerContainer = document.getElementById("project-view");
    
    headingcontainer.animate([{
      opacity: '1',
      transform: 'translateX(0)', // Start from the current position
    },
    {
      opacity: '0',
      transform: 'translateX(10%)', // Slide out to the right (adjust the value as needed)
    }], {
      duration: 500,
      iterations: 1,
      easing: 'ease-in-out'
    });

    container.animate([{
      opacity: '1',
    },
    {
      opacity: '0.7',
    }], {
      duration: 500,
      iterations: 1,
      easing: 'ease-in-out'
    });
    bgEnhancerContainer.animate([{
      opacity: '1',
      transform: 'translateX(40%)', // Start from the current position
    },
    {
      opacity: '0',
      transform: 'translateX(0%)', // Slide out to the right (adjust the value as needed)
    }], {
      duration: 800,
      iterations: 1,
      easing: 'ease-in-out'
    });

  setTimeout(()=>{
    setCurrentProject((currentProjectIndex + 1) % Object.keys(projectList).length)
    }, 400);
}

function setCurrentProject(id, withAnimation = false)
{
  currentProjectIndex = id;
  currentProject = projectList[Object.keys(projectList)[currentProjectIndex]];
  var projects= document.getElementsByClassName('project-list')[0].children;
  Object.keys(projectList).forEach((key)=>{
    var element = document.getElementById(key);
    if(element.id == Object.keys(projectList)[currentProjectIndex]){
        element.classList.add('selectedProject');
    }
    else{
      element.classList.remove('selectedProject');
    }
  })
  if(withAnimation){
    var headingcontainer = document.getElementsByClassName("project-heading")[0];
    var container = document.getElementsByClassName("project-container")[0];
    var bgEnhancerContainer = document.getElementById("project-view");
    headingcontainer.animate([{
      opacity: '1',
      transform: 'translateX(0)', // Start from the current position
    },
    {
      opacity: '0',
      transform: 'translateX(10%)', // Slide out to the right (adjust the value as needed)
    }], {
      duration: 500,
      iterations: 1,
      easing: 'ease-in-out'
    });
    container.animate([{
      opacity: '1',
    },
    {
      opacity: '0.7',
    }], {
      duration: 500,
      iterations: 1,
      easing: 'ease-in-out'
    });
    bgEnhancerContainer.animate([{
      opacity: '1',
      transform: 'translateX(40%)', // Start from the current position
    },
    {
      opacity: '0',
      transform: 'translateX(0%)', // Slide out to the right (adjust the value as needed)
    }], {
      duration: 800,
      iterations: 1,
      easing: 'ease-in-out'
    });
    setTimeout(()=>{
      setProjectDetails();
      }, 400);
  }
  else{
    setProjectDetails();
  }
}



