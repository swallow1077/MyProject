(function() {
  (function() {
    var filterBG_lg, filterBG_md;
    let Controller = 1; // Control Row In md Size Screen
    function resetBackground() {
      if (window.innerWidth >= 768) {
        filterBG_md.style.display = 'none';
        filterBG_lg.style.display = 'block';
      } else {
        filterBG_lg.style.display = 'none';
        filterBG_md.style.display = 'block';
      }
    }

    function setStatus() {
      let statusActive, statistics;
      let active = 1; //Active Row Number
      let activeNow = 0; // Row Number Record
      let runStatus = 1; // Card Bar Select Number
      let runRecord = 1; // Number Of People Record Bar
      let activeLine = 0; // Anometion Active Line
      // let Controller = 1; // Control Row In md Size Screen
      var bodyTop = 0;
      var setWidth = false;
      var firstTime = (firstTime2 = true);

      function getScrollTop() {
        // var bodyTop = 0;
        if (typeof window.pageYOffset != 'undefined') {
          bodyTop = window.pageYOffset;
        } else if (
          typeof document.compatMode != 'undefined' &&
          document.compatMode != 'BackCompat'
        ) {
          bodyTop = document.documentElement.scrollTop;
        } else if (typeof document.body != 'undefined') {
          bodyTop = document.body.scrollTop;
        }
      }
      getScrollTop();

      if (window.innerWidth <= 767) {
        activeLine = 1600;
        active = Math.floor((bodyTop - 1174) / 426);
        Controller = Math.floor((bodyTop - 1174) / 426);
      } else {
        activeLine = 600;
        active = Math.floor((bodyTop - 174) / 426);
      }

      if (bodyTop >= activeLine) {
        // console.log(active)
        if (active != activeNow) {
          activeNow = active;
          setWidth = true;
        } else {
          console.log('#');
          setWidth = false;
        }
      } else {
        console.log('$');
        setWidth = false;
      }

      if (setWidth && active > 0) {
        function setInjection() {
          function getActive() {
            if (window.innerWidth <= 767)
              return $(
                `.products_row:nth-of-type(${Controller}) .products_levelBar:nth-of-type(${runStatus++}) .bar_set`,
              );
            else
              return $(
                `.products_row:nth-of-type(${active}) .products_levelBar:nth-of-type(${runStatus++}) .bar_set`,
              );
          }
          function getStatis() {
            if (window.innerWidth <= 767)
              return $(
                `.products_row:nth-of-type(${Controller}) .products_statusBar:nth-of-type(${runRecord++}) .bar_set`,
              );
            else
              return $(
                `.products_row:nth-of-type(${active}) .products_statusBar:nth-of-type(${runRecord++}) .bar_set`,
              );
          }

          if (window.innerWidth <= 767) {
            statusActive = getActive();

            console.log(Controller, runStatus);
            console.log(
              window
                .getComputedStyle(statusActive[(active + 1) % 2], null)
                .getPropertyValue('width'),
            );
            if (
              window
                .getComputedStyle(statusActive[(active + 1) % 2], null)
                .getPropertyValue('width') == '0px'
            ) {
              let rand = Math.floor(Math.random() * 101);
              statusActive[(active + 1) % 2].style.width = `${rand}%`;
            }

            if (runRecord == 1) {
              if (firstTime2 || active % 3 == 0) {
                firstTime2 = false;
                statistics = getStatis();
              }

              if (
                window
                  .getComputedStyle(statistics[(active + 3) % 2], null)
                  .getPropertyValue('width') == '0px'
              ) {
                let rand = Math.floor(Math.random() * 101);
                statistics[(active + 1) % 2].style.width = `${rand}%`;
              }
            }

            if (runStatus != 1) {
              setTimeout(() => {
                if (runStatus == 4) runStatus = 0;
                setInjection();
              }, 200);
            }
          } else {
            statusActive = getActive();

            for (let i = 0; i < statusActive.length; i++) {
              if (
                window.getComputedStyle(statusActive[i], null).getPropertyValue('width') == '0px'
              ) {
                let rand = Math.floor(Math.random() * 101);
                statusActive[i].style.width = `${rand}%`;
              }
            }

            if (runRecord == 1) {
              let statistics = getStatis();

              for (let i = 0; i < statistics.length; i++) {
                if (
                  window.getComputedStyle(statistics[i], null).getPropertyValue('width') == '0px'
                ) {
                  let rand = Math.floor(Math.random() * 101);
                  statistics[i].style.width = `${rand}%`;
                }
              }
            }

            if (runStatus != 0) {
              setTimeout(() => {
                if (runStatus == 4) runStatus = 0;
                setInjection();
                // if(runStatus == 4) runStatus = 0;
              }, 200);
            }
          }

          // statusActive = getActive();

          // for( let i = 0 ; i < statusActive.length ; i++ )
          // {
          //     if(window.getComputedStyle(statusActive[i],null).getPropertyValue("width") == "0px" )
          //     {
          //         let rand = Math.floor( Math.random() * 101 );
          //         statusActive[i].style.width = `${rand}%`;
          //     }
          // }

          // if(runRecord == 1)
          // {
          //     let statistics = getStatis();

          //     for( let i = 0 ; i < statistics.length ; i++ )
          //     {
          //         if(window.getComputedStyle(statistics[i],null).getPropertyValue("width") == "0px" )
          //         {
          //             let rand = Math.floor( Math.random() * 101 );
          //             statistics[i].style.width = `${rand}%`;
          //         }
          //     }
          // }

          // if(runStatus != 1)
          // {
          //     setTimeout(()=>{
          //         setInjection()
          //         if(runStatus == 4) runStatus = 0;
          //     },200);
          // }
        }

        setInjection();
      }
      console.log(bodyTop);
    }

    // function loadMore() {
    //     console.log('!')
    //     $(".products_cardList").append("<div class='products_row'></div>");
    //     $(".products_row").last().get('fakedata.php');
    // }

    function init() {
      filterBG_lg = document.getElementById('filter_bg_lg');
      filterBG_md = document.getElementById('filter_bg_md');

      resetBackground();

      window.addEventListener('resize', resetBackground, false);
      window.addEventListener('scroll', setStatus, false);
    }

    window.addEventListener('load', init, false);
  })();
})();
