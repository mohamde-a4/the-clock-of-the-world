let isclicked = false;
setInterval(() => {
  let dateNow = new Date();
  let hours = dateNow.getUTCHours() + 3;
  let minutes = dateNow.getUTCMinutes();
  let seconds = dateNow.getUTCSeconds();
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
        let formatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          hour12: false,
          minute: 'numeric',
          second: "numeric",
          timeZone: `${Object.values(ele[0])[i]}`,
        });
        p.innerHTML = `${Object.keys(ele[0])[i]} clock`;
        hours = formatter.format(dateNow).split(":")[0];
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
