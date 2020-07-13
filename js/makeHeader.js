var title = document.createElement("title");
title.appendChild(document.createTextNode("U-Shape vs V-Shape Recession"));
var header = document.createElement("header");
var imgContainer = document.createElement("div");
imgContainer.classList.add("headerImgContainer");
header.appendChild(imgContainer);

var homeLink = document.createElement("a");
homeLink.setAttribute("href", "index.html");
imgContainer.appendChild(homeLink);

var bannerImg = document.createElement("img");
bannerImg.setAttribute("src", "imgs/bannerImg1.jpg");
homeLink.appendChild(bannerImg);

var bannerText = document.createElement("div");
bannerText.classList.add("bannerText");
bannerText.appendChild(document.createTextNode("w209 Final Project - U Shape vs V Shape Recession"));
homeLink.appendChild(bannerText);

var menu = document.createElement("nav");
menu.classList.add("menu");
var list = document.createElement("ul");

var menuItem1 = document.createElement("li");
var menuLink1 = document.createElement("a");
menuLink1.setAttribute("href", "index.html");
menuLink1.appendChild(document.createTextNode("Home"));
menuItem1.appendChild(menuLink1);
list.appendChild(menuItem1);

var menuItem5 = document.createElement("li");
var menuLink5 = document.createElement("a");
menuLink5.setAttribute("href", "PreFace.html");
menuLink5.appendChild(document.createTextNode("PreFace"));
menuItem5.appendChild(menuLink5);
list.appendChild(menuItem5);

var menuItem6 = document.createElement("li");
var menuLink6 = document.createElement("a");
menuLink6.setAttribute("href", "Page1Intro.html");
menuLink6.appendChild(document.createTextNode("Chapter 1"));
menuItem6.appendChild(menuLink6);
list.appendChild(menuItem6);


var menuItem2 = document.createElement("li");
var menuLink2 = document.createElement("a");
menuLink2.setAttribute("href", "page1.html");
menuLink2.appendChild(document.createTextNode("Page1"));
menuItem2.appendChild(menuLink2);
list.appendChild(menuItem2);

var menuItem7 = document.createElement("li");
var menuLink7 = document.createElement("a");
menuLink7.setAttribute("href", "Page2Intro.html");
menuLink7.appendChild(document.createTextNode("Chapter 2"));
menuItem7.appendChild(menuLink7);
list.appendChild(menuItem7);

var menuItem3 = document.createElement("li");
var menuLink3 = document.createElement("a");
menuLink3.setAttribute("href", "page2.html");
menuLink3.appendChild(document.createTextNode("Page2"));
menuItem3.appendChild(menuLink3);
list.appendChild(menuItem3);

var menuItem8 = document.createElement("li");
var menuLink8 = document.createElement("a");
menuLink8.setAttribute("href", "Page3Intro.html");
menuLink8.appendChild(document.createTextNode("Chapter 3"));
menuItem8.appendChild(menuLink8);
list.appendChild(menuItem8);

var menuItem4 = document.createElement("li");
var menuLink4 = document.createElement("a");
menuLink4.setAttribute("href", "page3.html");
menuLink4.appendChild(document.createTextNode("Page3"));
menuItem4.appendChild(menuLink4);
list.appendChild(menuItem4);

var menuItem9 = document.createElement("li");
var menuLink9 = document.createElement("a");
menuLink9.setAttribute("href", "Summary.html");
menuLink9.appendChild(document.createTextNode("Summary"));
menuItem9.appendChild(menuLink4);
list.appendChild(menuItem9);



menu.appendChild(list);

var body = document.getElementById("bodyMain");
body.appendChild(header);
body.appendChild(menu);
