let isclicked = false;
setInterval(() => {
  let dateNow = new Date();
  let hours = dateNow.getHours() + 1;
  let minutes = dateNow.getMinutes();
  let seconds = dateNow.getSeconds();
  let p = document.querySelector("p");
  let a = document.querySelectorAll("a");
  if (hours === 24) {
    hours=0;
  }
  if (!isclicked) {
    document.querySelector(".hours").innerHTML =
      `${hours}` < 10 ? `0${hours}` : hours;
  }
  for (let i = 0; i < a.length; i++) {
    a[i].onclick = async () => {
      isclicked = true;
      let ele = await (await fetch("clock.json")).json();
      if (a[i].id === Object.keys(ele[0])[i]) {
        p.innerHTML = `${Object.keys(ele[0])[i]} clock`;
        hours = hours + Object.values(ele[0])[i];
        if (hours <= 0) {
          hours = Math.abs(hours);
        }
        console.log(Object.keys(ele[0])[i]);
        document.querySelector(".hours").innerHTML =
          `${hours}` < 10 ? `0${hours}` : hours;
        if (a[i].id === Object.keys(ele[0])[i]) {
          document.querySelector(".clock").style.backdropFilter = "blur(1px)";
          let urlimg = `url(./images/${a[i].id}.jpg)`;
          document.body.style.backgroundImage = `${urlimg}`;
        }
      }
      a[i].onclick = null;
    };
  }
  document.querySelector(".minutes").innerHTML =
    `${minutes}` < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML =
    `${seconds}` < 10 ? `0${seconds}` : seconds;
}, 1000);
