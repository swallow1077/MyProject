(function(){window.onload=function(){var d=0,b=1,e=!1,a=1,c=0;(function(){setInterval(function(){500<=d&&(c=a+1,4==c&&(c=1));1E3<=d&&!e&&(e=!0,document.getElementById("box"+c).style.opacity="1",f());d+=10},10);var f=function(){var f=setInterval(function(){0<b?(document.getElementById("box"+a).style.opacity=""+b,b-=.001):0>=b&&(document.getElementById("box"+a).style.zIndex="-3",document.getElementById("box"+c).style.zIndex="-1",clearInterval(f),b=1,d=0,a++,4==a&&(a=1),e=!1)},5)}})()}})();