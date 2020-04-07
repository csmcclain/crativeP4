<template>
<div id="app">
  <div class="header">
    <div class="logo">
    <img src="/handbag.jpg" class="bag">
    <p class="title">Welcome to Bag</p>
    </div>
    <router-link to="/upload" class="link">Upload</router-link>
    <router-link to="/download" class="link">Download</router-link>
  </div>
  <div class="content">
    <p>Like Box or Google Drive, only simpler! :D</p>
    <router-view />
  </div>
  <div class="footer">
    
  </div>
</div>
</template>

<style>
.link {
  padding-top: 1.9em;
  text-decoration: none;
  color: rgb(49, 197, 235);
}

.link:hover {
  font-weight: bold;
  color:darkblue;
}

html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  justify-content: space-around;
  background-color:	#f7f7f7;
  color: rgb(49, 197, 235);
}

.title {
  margin-top: 5px;
  padding-top: .6em;
}

.title h1 {
  font-size: 30px;
}

.logo{
  display: flex;
  font-size: 2em;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #f7f7f7;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.bag {
  width: 120px;
  height: auto;
}
</style>
